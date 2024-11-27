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

export const ShowToast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  showCancelButton: false,
  timer: false,
  didOpen: (toast) => {
    // Evento de apertura del Toast
    toast.querySelector("#yesButton").addEventListener("click", () => {
      document.getElementById("file-input-container").style.display = "block";
      Swal.close(); // Cierra el Toast
    });

    toast.querySelector("#noButton").addEventListener("click", () => {
      document.getElementById("file-input-container").style.display = "none";
      Swal.close(); // Cierra el Toast
    });
  },
});

export const ColorInput = Swal.mixin({});
