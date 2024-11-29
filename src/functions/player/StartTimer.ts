import { SetStateAction } from "react";
import CurrentTrack from "./CurrentTrack";

const startTimer = (token: string, setRange: SetStateAction<any>) => {
  setInterval(async () => {
    await CurrentTrack(token, setRange);
  }, 1000); // Actualiza cada segundo
};

export default startTimer;
