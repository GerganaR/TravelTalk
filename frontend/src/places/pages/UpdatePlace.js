import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import addImage from "../../assets/add-form.png";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceForm.css";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Нещо се обърка!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="add-place-page">
        <div className="add-place-img">
          <img src={addImage} alt="addImage" />
        </div>
        <div className="add-place-form-wrapper">
          <div className="form-content">
            <h2>Редактирайте добавеното място</h2>
            {!isLoading && loadedPlace && (
              <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                  id="title"
                  element="input"
                  type="text"
                  label="Име на мястото"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Въведете валидно име."
                  onInput={inputHandler}
                  initialValue={loadedPlace.title}
                  initialValid={true}
                />
                <Input
                  id="description"
                  element="textarea"
                  rows={17}
                  label="Описание на мястото"
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Въведете валидно описание (минимум 5 знака)."
                  onInput={inputHandler}
                  initialValue={loadedPlace.description}
                  initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  АКТУАЛИЗИРАЙТЕ ДАННИТЕ
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdatePlace;
