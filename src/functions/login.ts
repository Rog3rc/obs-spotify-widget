import { Toast } from "./alerts";
import CONFIG from "./config";

const Login = (id: string) => {
  if (id === "") {
    return Toast.fire({
      icon: "error",
      title: "Please enter an id",
    });
  }
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${id}&response_type=token&redirect_uri=${encodeURIComponent(
    CONFIG.URL
  )}&scope=${encodeURIComponent(CONFIG.SCOPES.join(" "))}`;

  window.location.href = authUrl;
};

export default Login;
