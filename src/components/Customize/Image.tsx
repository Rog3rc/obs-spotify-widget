import { FC } from "react";

export interface IImage {
  props?: "";
}

const Image: FC<IImage> = () => {
  return (
    <div className="d-none d-flex flex-column align-items-center" id="imgC">
      <h4>Customize Backgroud</h4>
      <input
        type="file"
        accept="image/*"
        name="file"
        className="form-control m-2 w-50"
      />
    </div>
  );
};

export default Image;
