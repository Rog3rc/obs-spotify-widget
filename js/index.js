import { CONFIG } from "./config.js";
import { ifToast, Toast } from "./toasts.js";

let clientId;
const redirectUri = CONFIG.URL; // Debe coincidir con el URI registrado en Spotify
const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
];

document.getElementById("login").addEventListener("click", () => {
  if (document.getElementById("textId").value) {
    clientId = document.getElementById("textId").value;
  } else {
    Toast.fire({
      icon: "error",
      title: "Please enter a client ID",
    });
    return;
  }

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}`;
  document.getElementById("textId").value = "";
  window.location.href = authUrl;
});

let accessToken = "";

// Obtener token de acceso desde la URL
function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  return token;
}

// Configurar token y mostrar reproductor
window.onload = async () => {
  document.getElementById("file-input-container").style.display = "none";
  accessToken = getTokenFromUrl();
  if (accessToken) {
    document.getElementById("login").style.display = "none";
    document.getElementById("textId").style.display = "none";
    document.getElementById("player").style.display = "block";
    ifToast.fire({
      html: `
      <div>
        <p>¿Deseas mostrar el elemento?</p>
        <button id="yesButton" style="margin-right: 10px;">Sí</button>
        <button id="noButton">No</button>
      </div>
    `,
    });
    await getCurrentTrack();
    startTimer();
  } else {
    console.error("No se pudo obtener el token. Por favor, inicia sesión.");
  }
};

// Obtener información de la pista actual
async function getCurrentTrack() {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data && data.item) {
      document.getElementById("track-name").innerText = data.item.name;
      document.getElementById("artist-name").innerText = data.item.artists
        .map((artist) => artist.name)
        .join(", ");
      const trackDuration = data.item.duration_ms; // Obtener la duración total de la canción
      const currentPosition = data.progress_ms; // Obtener la posición actual de la canción

      // Actualizar la barra de progreso
      const progressBar = document.getElementById("progress-bar");
      progressBar.value = (currentPosition / trackDuration) * 100; // Actualiza la posición de la barra

      // Actualizar los temporizadores
      updateTimers(currentPosition, trackDuration);
    } else {
      console.error("No hay pistas activas.");
    }
  } catch (error) {
    console.error("Error al conectarse a Spotify:", error);
  }
}

// Actualizar los temporizadores
function updateTimers(currentPosition, trackDuration) {
  const currentTime = formatTime(currentPosition);
  const remainingTime = formatTime(trackDuration - currentPosition);

  document.getElementById("current-time").innerText = currentTime;
  document.getElementById("remaining-time").innerText = `${remainingTime}`;
}

// Formatear el tiempo en formato mm:ss
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Obtener el device_id del dispositivo activo
async function getActiveDeviceId() {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const devices = await response.json();

    if (devices.devices && devices.devices.length > 0) {
      const activeDevice = devices.devices.find((device) => device.is_active);
      if (activeDevice) {
        return activeDevice.id;
      } else {
        console.error("No hay dispositivo activo.");
        return null;
      }
    } else {
      console.error("No se encontraron dispositivos.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener dispositivos:", error);
    return null;
  }
}

// Función para mover la pista a una nueva posición
async function seekToPosition(position) {
  const deviceId = await getActiveDeviceId();
  if (!deviceId) {
    console.error("No se pudo obtener el device_id.");
    return;
  }

  try {
    const positionMs = Math.floor(position); // Convertir a milisegundos enteros

    const response = await fetch(
      `https://api.spotify.com/v1/me/player/seek?device_id=${deviceId}&position_ms=${positionMs}`,
      {
        method: "PUT", // Usar el método PUT
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error en la solicitud:", response.status, errorDetails);
    } else {
      console.log("La pista ha sido movida a:", positionMs, "ms");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
}

// Control de la barra de progreso
document
  .getElementById("progress-bar")
  .addEventListener("input", async (event) => {
    const progress = event.target.value;

    // Obtener la pista actual para obtener la duración de la canción
    const currentTrack = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => res.json());

    if (currentTrack && currentTrack.item) {
      const trackDurationMs = currentTrack.item.duration_ms;
      const newPosition = (progress / 100) * trackDurationMs; // Calcular la nueva posición en milisegundos

      // Mover la pista a la nueva posición
      await seekToPosition(newPosition);
    } else {
      console.error("No hay una pista en reproducción.");
    }
  });

// Controlar reproducción (Play/Pause)
document.getElementById("play-pause").addEventListener("click", async () => {
  // Verificamos el estado actual del reproductor
  const response = await fetch("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  if (data && data.is_playing) {
    // Si está en reproducción, pausamos
    await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } else {
    // Si está en pausa, reproducimos
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Actualizamos la información de la pista
  await getCurrentTrack();
});

document.getElementById("next").addEventListener("click", async () => {
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  getCurrentTrack();
});

document.getElementById("prev").addEventListener("click", async () => {
  await fetch("https://api.spotify.com/v1/me/player/previous", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  getCurrentTrack();
});

// Iniciar el temporizador de actualización
let timerInterval;
function startTimer() {
  timerInterval = setInterval(async () => {
    await getCurrentTrack();
  }, 1000); // Actualiza cada segundo
}
