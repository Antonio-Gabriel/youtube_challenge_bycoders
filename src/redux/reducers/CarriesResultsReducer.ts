import { IVideoActionProps } from "../../types/IActionProps";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { ENUMS_VIDEOS_RESULTS } from "../actions/types/types";

const initialState: IVideoPropsState = {
  videos: [],
  nextPageToken: "",
  totalResult: 0,
  loading: false,
};

export function carriesResultsReducer(
  prevState = initialState,
  action: IVideoActionProps
) {
  const { type, payload } = action;

  switch (type) {
    case ENUMS_VIDEOS_RESULTS.SUCESS:
      return {
        ...prevState,
        videos: payload?.videos,
        totalResult: payload?.totalResult,
        nextPageToken: payload?.nextPageToken,
        loading: false,
      };

    case ENUMS_VIDEOS_RESULTS.FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload,
      };

    case ENUMS_VIDEOS_RESULTS.REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    default:
      return prevState;
  }
}
