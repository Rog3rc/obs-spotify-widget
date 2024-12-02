import { FC, useEffect, useState } from "react";
import IconBack from "../Icons/IconBackPlay";
import IconNext from "../Icons/IconNextPlay";
import IconPause from "../Icons/IconPause";
import IconPlay from "../Icons/IconPlay";
import { PPTrack } from "../../functions/player/controllers/PPTrack";
import {
  NextTrack,
  PreviousTrack,
} from "../../functions/player/controllers/ChangeTracks";

export interface IControllers {
  token: string;
  range: number;
}

const Controllers: FC<IControllers> = ({ token, range }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  useEffect(() => {
    if (range > 0) {
      setPlaying(!playing);
    }
  }, []);
  return (
    <div className="m-2">
      <button className="btn" onClick={() => PreviousTrack(token)}>
        <IconBack />
      </button>
      <button className="btn" onClick={() => PPTrack(token, setPlaying)}>
        {playing ? <IconPlay /> : <IconPause />}
      </button>
      <button className="btn" onClick={() => NextTrack(token)}>
        <IconNext />
      </button>
    </div>
  );
};

export default Controllers;
