import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const ShowToast = (
  setShow: Dispatch<SetStateAction<boolean>>,
  html: string
) => {
  return Swal.fire({
    toast: true,
    position: "center",
    showConfirmButton: false,
    showCancelButton: false,
    timerProgressBar: false,
    html: html,
    didOpen: (toast) => {
      if (toast) {
        const yes = toast.querySelector("#yesButton") as HTMLButtonElement;
        const no = toast.querySelector("#noButton") as HTMLButtonElement;
        if (yes) {
          yes.addEventListener("click", () => {
            setShow(true);
            Swal.close();
          });
        }
        if (no) {
          no.addEventListener("click", () => {
            setShow(false);
            Swal.close();
          });
        }
      }
    },
  });
};
