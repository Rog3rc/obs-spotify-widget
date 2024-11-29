import { FC, useState } from "react";
import IconBack from "../Icons/IconBackPlay";
import IconNext from "../Icons/IconNextPlay";
import IconPause from "../Icons/IconPause";
import IconPlay from "../Icons/IconPlay";

export interface IControllers {
  token: string;
}

const Controllers: FC<IControllers> = ({ token }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  return (
    <div className="m-2 border border-primary border-3">
      <button className="btn">
        <IconBack />
      </button>
      <button className="btn" onClick={() => setPlaying(!playing)}>
        {playing ? <IconPause /> : <IconPlay />}
      </button>
      <button className="btn">
        <IconNext />
      </button>
    </div>
  );
};

export default Controllers;
