import axios from "axios";

export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (e) {

    //
  }
};

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

export const setCredentials = (token) => {
  if (!token) return;
  localStorage.setItem("token", token);
};

export const getCredentials = () => {
  return localStorage.getItem("token");
};

export const clearCredentials = () => {
  localStorage.removeItem("token");
};
