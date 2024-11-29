const fileInput = document.getElementById("file-upload");
const fileNameSpan = document.getElementById("file-name");
const player = document.getElementById("player");
const container = document.getElementById("file-input-container");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      player.style.height = "250px";
      player.style.width = "250px";
      player.style.backgroundImage = `url(${e.target.result})`;
      player.style.backgroundRepeat = "no-repeat";
      player.style.backgroundSize = "cover";
      player.style.backgroundPosition = "center";
      player.style.backgroundRepeat = "no-repeat";
      fileNameSpan.textContent = file.name;
      container.style.display = "none";
    };
    reader.readAsDataURL(file);
  } else {
    player.style.backgroundImage = "";
    fileNameSpan.textContent = "No file selected";
    container.style.display = "block";
  }
});
