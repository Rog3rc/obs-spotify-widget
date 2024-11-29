import { SetStateAction } from "react";
import updateTimers from "./Timers";

const CurrentTrack = async (token: string, setRange?: SetStateAction<any>) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data && data.item) {
      let trackName = document.getElementById("track-name");
      let trackArtist = document.getElementById("artist-name");
      if (trackName) {
        trackName.innerText = data.item.name;
      }
      if (trackArtist) {
        trackArtist.innerText = data.item.artists
          .map((artist: any) => artist.name)
          .join(", ");
      }

      const trackDuration = data.item.duration_ms; // Obtener la duración total de la canción
      const currentPosition = data.progress_ms; // Obtener la posición actual de la canción

      // Actualizar la barra de progreso
      setRange((currentPosition / trackDuration) * 100); // Actualiza la posición de la barra

      // Actualizar los temporizadores
      updateTimers(currentPosition, trackDuration);
    } else {
      console.error("No hay pistas activas.");
    }
  } catch (error) {
    console.error("Error al conectarse a Spotify:", error);
  }
};

export default CurrentTrack;
