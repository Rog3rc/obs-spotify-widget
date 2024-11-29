import { FC, useEffect, useState } from "react";
import Colors from "./components/Customize/Colors";
import Image from "./components/Customize/Image";
import Player from "./components/Player";
import { ShowToast } from "./functions/alerts";
import Login from "./functions/login";
import Token from "./functions/token";

export interface IApp {}

const App: FC<IApp> = () => {
  // Show or Hide Player-Form
  const [show, setShow] = useState<boolean>(false);

  // Set Spotify Dev's Id
  const [id, setId] = useState<string>("");

  // Set Spotify User's Token
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const checkToken = Token();
    if (checkToken) {
      setToken(checkToken);
      setShow(true);
      ShowToast.fire({
        html: `
        <div>
          <p>¿Deseas personalizar el reproductor?</p>
          <button id="yesButton" style="margin-right: 10px;">Sí</button>
          <button id="noButton">No</button>
        </div>
      `,
      });
    }
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 border border-danger">
      {show ? (
        <>
          <Image />
          <Player token={token} />
          <Colors />
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
