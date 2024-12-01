import { Dispatch, SetStateAction } from "react";

export const PPTrack = async (
  token: string,
  setP: Dispatch<SetStateAction<boolean>>
) => {
  // Verificamos el estado actual del reproductor
  const response = await fetch("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${token}}`,
    },
  });

  const data = await response.json();
  if (data && data.is_playing) {
    // Si está en reproducción, pausamos
    await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setP(false);
  } else {
    // Si está en pausa, reproducimos
    await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setP(true);
  }
};
