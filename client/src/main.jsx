import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createRoot } from "react-dom/client";
import RootRouter from "./router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <RootRouter />
);
