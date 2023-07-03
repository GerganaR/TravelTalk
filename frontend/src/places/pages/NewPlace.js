import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import addImage from "../../assets/add-form.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewPlace.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="add-place-page">
        <div className="add-place-img">
          <img src={addImage} />
        </div>
        <div className="add-place-form-wrapper">
          <div className="form-content">
            <h2>Споделете място с приятелите си</h2>
            <form className="add-place-form" onSubmit={placeSubmitHandler}>
              {isLoading && <LoadingSpinner asOverlay />}
              <div className="add-form-group">
                <span>
                  <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
                </span>
                <Input
                  id="title"
                  element="input"
                  type="text"
                  placeholder={"Име на мястото"}
                  // label="Title"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Въведете валидно заглавие."
                  onInput={inputHandler}
                />
              </div>

              <div className="add-form-group">
                <span>
                  <DescriptionOutlinedIcon fontSize="small" />
                </span>
                <Input
                  id="description"
                  element="textarea"
                  placeholder={"Добавете описание..."}
                  validators={[VALIDATOR_MINLENGTH(5)]}
                  errorText="Въведете валидно описание. Минимум 5 символа."
                  onInput={inputHandler}
                />
              </div>
              <div className="add-form-group">
                <span>
                  <LocationOnOutlinedIcon fontSize="small" />
                </span>
                <Input
                  id="address"
                  element="input"
                  placeholder={"Адрес"}
                  // label="Address"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Въведете валиден адрес."
                  onInput={inputHandler}
                />
              </div>

              <ImageUpload id="image" onInput={inputHandler} />
              <Button type="submit" disabled={!formState.isValid}>
                ДОБАВИ МЯСТО
              </Button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPlace;
