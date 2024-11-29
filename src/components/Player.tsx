import { FC } from "react";
import Controllers from "./Player/Controllers";
import Info from "./Player/Info";
import Slider from "./Player/Slider";

export interface IPlayer {
  token: string;
}

const Player: FC<IPlayer> = ({ token }) => {
  return (
    <div className="d-flex flex-column align-items-center w-50 border border-primary">
      <Info />
      <Slider token={token} />
      <Controllers token={token} />
    </div>
  );
};

export default Player;
