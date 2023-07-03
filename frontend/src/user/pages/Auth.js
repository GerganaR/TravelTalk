import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import authImage from "../../assets/auth.png";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="auth-page">
        <div className="auth-image">
          <img src={authImage} alt="authImage" />
        </div>
        <div className="auth-form">
          <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            {/* <img src={logo} /> */}
            <h2>Здравейте!</h2>
            <div className="desc-login">
              <h4>
                Влезте отново в профила си, за да може да споделяте нови
                локации, които се посетили или създайте нов профил.
              </h4>
            </div>
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <div className="input-group">
                  <span>
                    <PermIdentityOutlinedIcon />
                  </span>
                  <Input
                    element="input"
                    id="name"
                    type="text"
                    // label="Your Name"
                    placeholder={"Име"}
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Въведете името си."
                    onInput={inputHandler}
                  />
                </div>
              )}
              {!isLoginMode && (
                <ImageUpload
                  center
                  id="image"
                  onInput={inputHandler}
                  // errorText="Изберете профилно изображение."
                />
              )}
              <div className="input-group">
                <span>
                  <MailOutlineOutlinedIcon fontSize="small" />
                </span>
                <Input
                  element="input"
                  id="email"
                  type="email"
                  placeholder={"Имейл адрес"}
                  // label="E-Mail"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Въведете валиден имейл адрес."
                  onInput={inputHandler}
                />
              </div>
              <div className="input-group">
                <span>
                  <KeyOutlinedIcon fontSize="small" />
                </span>
                <Input
                  element="input"
                  id="password"
                  type="password"
                  placeholder={"Парола"}
                  // label="Password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Въведете валидна парола, която е минимум 6 символа."
                  onInput={inputHandler}
                />
              </div>
              <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "ВЛЕЗ" : "РЕГИСТРИРАЙ СЕ"}
              </Button>
            </form>
            <Button onClick={switchModeHandler}>
              {isLoginMode ? "РЕГИСТРИРАЙ СЕ" : "ВЛЕЗ"}
            </Button>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
