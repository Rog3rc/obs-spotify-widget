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
      document.getElementById("buttons").style.display = "block";
      Swal.close(); // Cierra el Toast
    });

    toast.querySelector("#noButton").addEventListener("click", () => {
      document.getElementById("file-input-container").style.display = "none";
      document.getElementById("buttons").style.display = "none";
      Swal.close(); // Cierra el Toast
    });
  },
});

export const FontColorToast = (type, name) => {
  return Swal.fire({
    title: "Choose Hex Color...",
    text: "Choos with hex or name...",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Choose",
    confirmButtonColor: "#1db954",
    preConfirm: async (value) => {
      let docs;
      if (type == "id") {
        docs = document.getElementById(name);
        Array.from(docs.children).forEach((child) => {
          child.style.background = value;
        });
      } else {
        docs = document.getElementsByClassName(name);
        Array.from(docs).forEach((element) => {
          console.log(element);
          element.style.color = value;
        });
      }
    },
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Color Changed",
        text: "Changed to " + result.value,
        confirmButtonColor: "#1db954",
      });
    }
  });
};
