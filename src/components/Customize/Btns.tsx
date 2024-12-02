import { FC, MouseEventHandler, useState } from "react";
import { showHide } from "../../functions/customize/background";

export interface IColors {
  show: boolean;
}

const Btns: FC<IColors> = ({ show }) => {
  const [hide, setHide] = useState<boolean>(false);
  const handelChange: MouseEventHandler<HTMLButtonElement> = () => {
    setHide(!hide);
    showHide(hide);
  };
  return (
    <>
      {show && (
        <div className="m-2 d-flex flex-column align-items-center">
          <h4>Customize</h4>
          <div className="d-flex flex-row align-items-center gap-2">
            <button className="btn btn-success" onClick={handelChange}>
              Background
            </button>
            <button className="btn btn-success">Font Color</button>
            <button className="btn btn-success">Controls Background</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Btns;
