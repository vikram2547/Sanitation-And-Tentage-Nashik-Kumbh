import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { getPreloadedState, saveToLocalStorage } from "./localStorage";
import sidebarSlice from "./sidebarSlice";
import commonSlice from "./commonSlice";
import MainReducer from "./reducer";
import themeSettingSlice from "./themeSettingSlice";
import registerSlice from "./registerSlice";
import signinReducer from "./signinSlice";
import verifyOtpReducer from "./verifyOtpSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import usersReducer from "./usersSlice";

const combinedReducer = combineReducers({
  sidebar: sidebarSlice,
  common: commonSlice,
  rootReducer: MainReducer,
  themeSetting: themeSettingSlice,
  register: registerSlice,
  signin: signinReducer,
  verifyOtp: verifyOtpReducer,
  forgotPassword: forgotPasswordReducer,
  users: usersReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "login/logout") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState()
});

function onStateChange() {
  saveToLocalStorage(store.getState());
}

store.subscribe(onStateChange);



export default store;