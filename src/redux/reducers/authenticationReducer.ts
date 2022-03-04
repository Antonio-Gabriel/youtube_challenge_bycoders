import { IActionProps } from "../../types/IActionProps";
import { IAuthState } from "../../types/IAuthState";
import { ENUMS } from "../actions/types/types";

const initialState: IAuthState = {
  accessToken: localStorage.getItem("bycoders-accessToken") ?? null,
  user: localStorage.getItem("bycoders-user") ?? null,
  loading: false,
};

export function authenticateReducer(
  prevState = initialState,
  action: IActionProps
) {
  const { type, payload } = action;

  switch (type) {
    case ENUMS.REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    case ENUMS.SUCESS:
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };

    case ENUMS.FAIL:
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        error: payload,
      };

    case ENUMS.LOADPROFILE:
      return {
        ...prevState,
        user: payload,
      };

    case ENUMS.LOGOUT:
      return {
        ...prevState,
        accessToken: null,
        user: null,
        loading: false,
      };

    default:
      return prevState;
  }
}
