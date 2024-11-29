const Token = (): string | null => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  return token;
};

export default Token;
