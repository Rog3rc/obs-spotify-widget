/**
 * Módulo de autenticación PKCE para Spotify Web API (2026)
 * Authorization Code Flow con Proof Key for Code Exchange
 */

// Genera un string aleatorio para el code verifier
function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Genera el hash SHA-256 del code verifier
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

// Codifica en base64url (sin padding, con caracteres URL-safe)
function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Genera el code challenge a partir del code verifier
async function generateCodeChallenge(verifier) {
  const hashed = await sha256(verifier);
  return base64encode(hashed);
}

/**
 * Redirige al usuario a la página de autorización de Spotify con PKCE
 * @param {string} clientId - El Client ID de la app de Spotify
 * @param {string} redirectUri - La URI de redirección registrada
 * @param {string[]} scopes - Los scopes requeridos
 */
export async function redirectToAuth(clientId, redirectUri, scopes) {
  const codeVerifier = generateRandomString(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Guardar el code verifier y clientId para usarlos después del callback
  window.localStorage.setItem("code_verifier", codeVerifier);
  window.localStorage.setItem("spotify_client_id", clientId);

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

/**
 * Intercambia el authorization code por un access token
 * @param {string} clientId - El Client ID de la app de Spotify
 * @param {string} redirectUri - La URI de redirección registrada
 * @param {string} code - El authorization code recibido del callback
 * @returns {Promise<string|null>} El access token o null si falla
 */
export async function exchangeCodeForToken(clientId, redirectUri, code) {
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      // Limpiar code verifier ya usado
      localStorage.removeItem("code_verifier");
      return data.access_token;
    } else {
      console.error("Error al obtener token:", data);
      return null;
    }
  } catch (error) {
    console.error("Error en la solicitud de token:", error);
    return null;
  }
}

/**
 * Detecta si hay un authorization code en la URL y lo intercambia por un token
 * @param {string} redirectUri - La URI de redirección registrada
 * @returns {Promise<string|null>} El access token o null
 */
export async function getTokenFromCallback(redirectUri) {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const error = urlParams.get("error");

  if (error) {
    console.error("Error de autorización:", error);
    return null;
  }

  if (code) {
    const clientId = localStorage.getItem("spotify_client_id");
    if (!clientId) {
      console.error("No se encontró el client_id guardado.");
      return null;
    }

    const token = await exchangeCodeForToken(clientId, redirectUri, code);

    // Limpiar la URL para quitar el ?code=...
    window.history.replaceState({}, document.title, window.location.pathname);

    return token;
  }

  return null;
}
