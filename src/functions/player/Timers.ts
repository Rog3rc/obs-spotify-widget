import formatTime from "./TimeFormat";

const updateTimers = (currentPosition: number, trackDuration: number) => {
  const currentTime = formatTime(currentPosition);
  const remainingTime = formatTime(trackDuration - currentPosition);
  let c = document.getElementById("current-time");
  let r = document.getElementById("remaining-time");
  if (c) c.innerText = `${currentTime}`;
  if (r) r.innerText = `${remainingTime}`;
};

export default updateTimers;
