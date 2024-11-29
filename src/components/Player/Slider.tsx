import { FC, useEffect, useState } from "react";
import CurrentTrack from "../../functions/player/CurrentTrack";
import startTimer from "../../functions/player/StartTimer";

export interface ISlider {
  token: string;
}

const Slider: FC<ISlider> = ({ token }) => {
  const [range, setRange] = useState<number>(0);
  useEffect(() => {
    (async () => {
      await CurrentTrack(token, setRange);
      startTimer(token, setRange);
    })();
  }, []);
  return (
    <input
      className="form-range m-2 w-50 border border-3 border-primary"
      type="range"
      value={range}
      onChange={(e) => setRange(Number(e.target.value))}
      min={0}
      max={100}
      step={0.1}
    />
  );
};

export default Slider;
