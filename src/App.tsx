import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoute } from "./const";
import UploadPage from "./pages/upload-page/upload-page";
import LoginPage from "./pages/login-page/login-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<LoginPage />} />
        <Route path={AppRoute.Upload} element={<UploadPage />} />
      </Routes>
    </BrowserRouter>
  );
}
