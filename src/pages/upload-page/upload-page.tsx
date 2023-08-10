import Upload from "../../components/upload";
import folderGreen from "../../img/folderGreen.png";
import "./upload-page.css";

function UploadPage(): JSX.Element {
  return (
    <section className="upload">
      <img className="auth__logo" src={folderGreen} width="65" height="65" alt="логотип" />
      <h2 className="upload__title title">Загрузка файлов</h2>
      <Upload />
    </section>
  );
}

export default UploadPage;
