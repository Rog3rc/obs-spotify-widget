import { Dispatch, SetStateAction } from "react";

const ActiveDevice = async (token: string) => {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const devices = await response.json();

    if (devices.devices && devices.devices.length > 0) {
      const activeDevice = devices.devices.find(
        (device: { is_active: boolean }) => device.is_active
      );
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
};

const SeekPosition = async (
  token: string,
  position: number,
  setPosition: Dispatch<SetStateAction<number>>
) => {
  const deviceId = await ActiveDevice(token);
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error en la solicitud:", response.status, errorDetails);
    } else {
      console.log("La pista ha sido movida a:", positionMs, "ms");
      setPosition(positionMs); // Actualizar la posición en el controlador de barra de progreso
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
  }
};
export const SliderController = async (
  token: string,
  progress: number,
  setProgress: Dispatch<SetStateAction<number>>
) => {
  // Obtener la pista actual para obtener la duración de la canción
  const currentTrack = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  if (currentTrack && currentTrack.item) {
    const trackDurationMs = currentTrack.item.duration_ms;
    const newPosition = (progress / 100) * trackDurationMs; // Calcular la nueva posición en milisegundos

    // Mover la pista a la nueva posición
    await SeekPosition(token, newPosition, setProgress);
  } else {
    console.error("No hay una pista en reproducción.");
  }
};
