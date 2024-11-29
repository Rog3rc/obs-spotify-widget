import { FC } from "react";

export interface IColors {}

const Colors: FC<IColors> = () => {
  return (
    <div id="buttons" className="m-2 d-flex flex-column align-items-center">
      <h4>Customize</h4>
      <div className="d-flex flex-row align-items-center">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
};

export default Colors;
