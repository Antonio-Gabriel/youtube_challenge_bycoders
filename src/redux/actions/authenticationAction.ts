import firebase from "firebase/compat/app";
import { authentication } from "../../services/firebase/firebaseConfig";
import { saveCredentialsInStorage } from "../../utils/saveCredentialsInStorage";

import { ENUMS } from "./types/types";

export const signIn = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ENUMS.REQUEST,
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.upload");

    const authResponse = await authentication.signInWithPopup(provider);

    if (authResponse) {
      const creadentials =
        authResponse.credential as firebase.auth.OAuthCredential;
      const accessToken = creadentials.accessToken;

      const profile = {
        id: authResponse.user?.uid,
        name: authResponse.user?.displayName,
        photo: authResponse.user?.photoURL,
      };

      saveCredentialsInStorage({ accessToken: accessToken, user: profile });

      dispatch({
        type: ENUMS.SUCESS,
        payload: accessToken,
      });

      dispatch({
        type: ENUMS.LOADPROFILE,
        payload: profile,
      });
    } else {
      dispatch({
        type: ENUMS.FAIL,
        error: "Error to authenticate!, please try again later",
      });
    }
  } catch (error: any) {
    if (error) {
      dispatch({
        type: ENUMS.FAIL,
        error: error.message,
      });
    }
  }
};

export const signOut = () => async (dispatch: any) => {
  dispatch({
    type: ENUMS.LOGOUT,
  });

  await authentication.signOut();

  localStorage.removeItem("bycoders-accessToken");
  localStorage.removeItem("bycoders-user");
};
