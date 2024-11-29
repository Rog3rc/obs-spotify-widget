import { FC } from "react";

export interface IImage {}

const Image: FC<IImage> = () => {
  return (
    <div
      id="file-input-container"
      className="d-flex flex-column align-items-center"
    >
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
