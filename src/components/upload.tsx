import axios from "axios";
import { useState, ChangeEvent } from "react";
import { getToken } from "../token/token";
import { FILE_LIMIT } from "../const";

function Upload(): JSX.Element {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [value, setValue] = useState("");
  const [upload, setUpload] = useState(false);
  const [counter, setCounter] = useState(0);

  const onInput = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
    setCounter(0);
    setUpload(false);
  };

  const files = fileList ? Array.from(fileList) : [];

  const handleUploadButton = () => {
    if (!fileList) {
      return;
    }
    const token = getToken();
    setCounter(0);

    if (fileList.length <= FILE_LIMIT) {
      files.forEach((file) => {
        axios({
          method: "get",
          url: `https://cloud-api.yandex.net/v1/disk/resources/upload?path=disk:/${file.name}`,
          headers: { Authorization: token }
        })
          .then(function (response) {
            const config = {
              headers: {
                "content-type": "multipart/form-data"
              }
            };
            axios
              .put(response.data.href, { file }, config)
              .then(() => {
                setValue("");
                setUpload(true);
                setCounter(count => count + 1)
              })
          })
          .catch( () => {
            alert(`Не удалось загрузить файл: ${file.name}`);
          });
      });
    } else {
      alert("Нельзя загрузить больше 100 файлов!");
    }
  };

  const handleResetButton = () => {
    setValue("");
  };

  return (
    <div>
      <div className="upload__wrapper">
        <input className="upload__field" id="upload" type="file" value={value} onInput={onInput} onChange={handleFileChange} multiple/>
        <label className="upload__label button button--outline button--outline-green" htmlFor="upload">
          Обзор...
        </label>
        {!value ? (
          <p className="upload__description">Файлы не выбраны</p>
        ) : (
          <p className="upload__description">
            Выбрано файлаов: {files.length}
          </p>
        )}
      </div>
      {value !== "" ? (
        <ul className="upload__list">
          {files.map((file, i) => (
            <li className="upload__item" key={i}>
              {file.name} - {file.type}
            </li>
          ))}
        </ul>
      ) : (
        <ul></ul>
      )}
      {upload ? <p>Загружено файлов: {counter}</p> : <p></p>}
      <button className="upload__button button button--green" type="button" onClick={handleUploadButton}>
        Загрузить на диск
      </button>
      <button className="upload__button-reset button button--outline" type="button" onClick={handleResetButton}>
        Очистить
      </button>
    </div>
  );
}

export default Upload;
