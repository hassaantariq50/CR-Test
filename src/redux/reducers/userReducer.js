import Cookies from "js-cookie";
import { USER } from "../constants";

const initialState = {
  isLoggedIn:
    Cookies.get("token") !== null &&
    Cookies.get("token") !== undefined &&
    Cookies.get("token") !== "",
  data: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.LOGIN: {
      const { payload } = action;
      return { ...state, ...payload, isLoggedIn: true };
    }

    case USER.LOGOUT: {
      // window.location.replace("/");
      return {
        isLoggedIn: false,
        data: {},
      };
    }

    case USER.UPDATE: {
      const { payload } = action;
      return { ...state, ...payload };
    }

    default:
      return state;
  }
};

export default userReducer;
