import { FC, useEffect, useState } from "react";
import Image from "./components/Customize/Image";
import Player from "./components/Player";
import Login from "./functions/login";
import Token from "./functions/token";
import { ShowToast } from "./functions/alerts";
import Btns from "./components/Customize/Btns";

export interface IApp {
  props?: "";
}

const App: FC<IApp> = () => {
  // Show or Hide Player-Form
  const [show, setShow] = useState<boolean>(false);

  // Show customizations
  const [showCustom, setShowCustom] = useState<boolean>(true);

  // Set Spotify Dev's Id
  const [id, setId] = useState<string>("");

  // Set Spotify User's Token
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const checkToken = Token();
    if (checkToken) {
      setToken(checkToken);
      setShow(true);
      setShowCustom(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      ShowToast(
        setShowCustom,
        `
      <div class="container-sm d-flex flex-column">
        <p>¿Deseas personalizar el reproductor?</p>
        <div class="d-flex flex-row gap-2">
        <button id="yesButton" class="btn btn-success">Sí</button>
        <button id="noButton" class="btn btn-success">No</button>
        </div>
      </div>
    `
      );
    }
  }, [token]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 border border-danger">
      <Image />
      {show ? (
        <>
          <Player token={token} />
          <Btns show={showCustom} />
          <button
            className="btn btn-success m-2"
            type="button"
            onClick={() => setShowCustom(!showCustom)}
          >
            Customize
          </button>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center w-50 border border-primary">
          <div className="w-25 m-2">
            <input
              type="text"
              className="form-control"
              placeholder="Paste Here"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button
              className="btn rounded-5 bg-success text-white mt-2"
              onClick={() => Login(id)}
            >
              Connect to Spotify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
