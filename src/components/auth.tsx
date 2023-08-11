import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../token/token";
import { AppRoute } from "../const";
import axios from "axios";

function Auth(): JSX.Element {
  let [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    axios({
      method: "get",
      url: "https://cloud-api.yandex.net/v1/disk/",
      headers: { Authorization: value }
    })
      .then(function () {
        saveToken(value);
        navigate(AppRoute.Upload);
      })
      .catch(function () {
        event.preventDefault();
        alert("Некорректные данные");
      });
  };

  return (
    <div className="auth__wrapper">
      <input className="auth__field" placeholder="Ваш OAuth-токен" value={value} onChange={handleInputChange} />
      <button className="auth__button button" type="button" onClick={handleButtonClick}>Войти</button>
    </div>
  );
}

export default Auth;
