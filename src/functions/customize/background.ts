import { ChangeEventHandler } from "react";

export const showHide = (hide: boolean) => {
  const input = document.getElementById("back");
  if (input) {
    if (hide) {
      input.classList.add("d-none");
    } else {
      input.classList.remove("d-none");
    }
  }
};

export const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
  const file = e.target.files?.[0];
  const reader = new FileReader();
  const player = document.getElementById("player") as HTMLDivElement;
  const video = document.getElementById("video") as HTMLVideoElement;

  if (file) {
    if (file.type.includes("image")) {
      reader.onload = () => {
        if (player) {
          player.style.backgroundImage = `url(${reader.result})`;
          player.style.backgroundRepeat = "no-repeat";
          player.style.backgroundSize = "cover";
          player.style.backgroundPosition = "center";
          if (video) video.style.display = "none";
        }
      };
    }

    if (file.type.includes("video")) {
      reader.onload = () => {
        if (video) {
          player.style.backgroundImage = "none";
          video.style.display = "block";
          video.src = reader.result as string;
          video.load();
          video
            .play()
            .catch((err) =>
              console.error("Error al reproducir el video:", err)
            );
        }
      };
    }

    reader.readAsDataURL(file);
  }
};
