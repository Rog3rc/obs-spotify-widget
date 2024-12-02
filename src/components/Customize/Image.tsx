import { FC } from "react";
import { handleFile } from "../../functions/customize/background";

export interface IImage {
  props?: "";
}

const Image: FC<IImage> = () => {
  return (
    <div className="d-none d-flex flex-column align-items-center" id="back">
      <h4>Customize Backgroud</h4>
      <input
        type="file"
        accept="image/*, video/*"
        name="file"
        className="form-control m-2 w-50"
        onChange={handleFile}
      />
    </div>
  );
};

export default Image;
