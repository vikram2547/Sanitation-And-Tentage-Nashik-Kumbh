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
import vendorsReducer from "./vendorsSlice";
import sectorReducer from "./sectorSlice";
import circleReducer from "./circleSlice";
import questionReducer from "./questionSlice";
import shiftReducer from "./shiftSlice";
import assetTypeReducer from "./assettypeSlice";
import sanitationAssetReducer from "./sanitationAssetSlice";
import vehicleReducer from "./vehicleSlice";
import vehicleRouteReducer from "./vehicleRouteSlice";
import vehicleGeofenceReducer from "./vehicleGeofenceSlice";
import vehicleCollectionPointReducer from "./vehicleCollectionPointSlice";
import vehicleDailyTripSummaryReducer from "./vehicleDailyTripSummarySlice";
import vehicleGpsTrackingReducer from "./vehicleGpsTrackingSlice";
import vehicleMaintenanceLogReducer from "./vehicleMaintenanceLogSlice";
import vehiclePerformanceMetricReducer from "./vehiclePerformanceMetricSlice";
import vehicleRouteAssignmentReducer from "./vehicleRouteAssignmentSlice";
import vehicleRoutePointsReducer from "./vehicleRoutePointsSlice";

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
  vendors: vendorsReducer,
  sectors: sectorReducer,
  circles: circleReducer,
  questions: questionReducer,
  shifts: shiftReducer,
  assetTypes: assetTypeReducer,
  sanitationAssets: sanitationAssetReducer,
  vehicles: vehicleReducer,
  vehicleRoutes: vehicleRouteReducer,
  vehicleGeofences: vehicleGeofenceReducer,
  vehicleCollectionPoints: vehicleCollectionPointReducer,
  vehicleDailyTripSummaries: vehicleDailyTripSummaryReducer,
  vehicleGpsTracking: vehicleGpsTrackingReducer,
  vehicleMaintenanceLogs: vehicleMaintenanceLogReducer,
  vehiclePerformanceMetrics: vehiclePerformanceMetricReducer,
  vehicleRouteAssignments: vehicleRouteAssignmentReducer,
  vehicleRoutePoints: vehicleRoutePointsReducer,
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