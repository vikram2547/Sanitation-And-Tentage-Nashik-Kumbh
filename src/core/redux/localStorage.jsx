export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (e) {

    //
  }};

export const getPreloadedState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    //

    return undefined;
  }
};

const setCredentials = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getCredentials = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return token;
};

const clearCredentials = () => {
  localStorage.clear();
  sessionStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
};
export { setCredentials, getCredentials, clearCredentials };