import { Dispatch, FC, SetStateAction } from "react";
import { SliderController } from "../../functions/player/controllers/SliderPosition";

export interface ISlider {
  token: string;
  range: number;
  setRange: Dispatch<SetStateAction<number>>;
}

const Slider: FC<ISlider> = ({ token, range, setRange }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = Number(e.target.value);
    setRange(progress);

    // Llama a SliderController para actualizar la posición
    await SliderController(token, progress, setRange);
  };

  return (
    <input
      className="form-range m-2 w-50 border border-3 border-primary"
      type="range"
      value={range}
      onChange={handleChange}
      min={0}
      max={100}
      step={0.1}
    />
  );
};

export default Slider;
