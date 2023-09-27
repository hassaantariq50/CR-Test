import { USER } from "../constants";
import Cookies from "js-cookie";

export const loginAction = (data) => (dispatch) => {
  const token = data.jwtToken?.jwtToken;
  delete data.loggedDevices;
  delete data.jwtToken;
  delete data.password;

  const payload = { data, userRole: data.userRole };
  console.log("token", token);
  Cookies.set("token", token);
  Cookies.set("_W_U_DATA_", JSON.stringify(payload.data), { expires: 60 });

  dispatch({ type: USER.LOGIN, payload });
};

export const updateUserAction = (data) => (dispatch) => {
  delete data.loggedDevices;
  delete data.jwtToken;
  delete data.password;

  const payload = { data, userRole: data.userRole };
  dispatch({ type: USER.LOGIN, payload });
};

export const logoutAction = () => (dispatch) => {
  Cookies.remove("token");
  Cookies.remove("_W_U_DATA_");

  dispatch({ type: USER.LOGOUT });
};
