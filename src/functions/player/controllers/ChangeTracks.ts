export const NextTrack = async (token: string) => {
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const PreviousTrack = async (token: string) => {
  await fetch("https://api.spotify.com/v1/me/player/previous", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
