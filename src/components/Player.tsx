import { FC, useEffect, useState } from "react";
import Controllers from "./Player/Controllers";
import Info from "./Player/Info";
import Slider from "./Player/Slider";
import CurrentTrack from "../functions/player/CurrentTrack";
import startTimer from "../functions/player/StartTimer";

export interface IPlayer {
  token: string;
}

const Player: FC<IPlayer> = ({ token }) => {
  const [range, setRange] = useState<number>(0);
  useEffect(() => {
    (async () => {
      await CurrentTrack(token, setRange);
      startTimer(token, setRange);
    })();
  }, [token]);

  return (
    <div className="d-flex flex-column align-items-center w-50 border border-primary">
      <Info />
      <Controllers token={token} range={range} />
      <Slider token={token} range={range} setRange={setRange} />
    </div>
  );
};

export default Player;
