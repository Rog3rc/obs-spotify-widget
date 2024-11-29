import { FC } from "react";

export interface IInfo {}

const Info: FC<IInfo> = () => {
  return (
    <div className="m-2 text-center w-50 border border-primary">
      <h4 id="track-name">Song</h4>
      <h5 id="artist-name">Artist</h5>
      <div className="d-inline-flex flex-row align-items-center">
        <h5 id="current-time">00:00</h5>
        <h5>/</h5>
        <h5 id="remaining-time">00:00</h5>
      </div>
    </div>
  );
};

export default Info;
