import { Link } from "react-router-dom";
import Auth from "../../components/auth";
import folderBlue from "../../img/folderBlue.png";
import "./login-page.css";

function LoginPage(): JSX.Element {
  return (
    <section className="auth">
      <img className="auth__logo" src={folderBlue} width="65" height="65" alt="логотип"/>
      <h2 className="auth__title title">Регистрация</h2>
      <Auth />
      <Link className="auth__redirect link" target="_blank" to="https://oauth.yandex.ru/authorize?response_type=token&client_id=d8669218cc284b0caca64d1f55a5b1b7">
        Получить OAuth-токен
      </Link>
    </section>
  );
}

export default LoginPage;
