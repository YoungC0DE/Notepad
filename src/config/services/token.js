const TOKEN_KEY = "token_id";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const destroyToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const createToken = () => {
  const newToken = Math.random().toString(36).substr(2, 9);
  saveToken(newToken);

  return newToken;
}
