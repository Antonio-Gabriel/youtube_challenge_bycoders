import { IVideoActionProps } from "../../types/IActionProps";
import { IVideoPropsState } from "../../types/IVideoPropsState";
import { ENUMS_VIDEOS } from "../actions/types/types";

const initialState: IVideoPropsState = {
  videos: [],
  nextPageToken: "",
  totalResult: 0,
  loading: false,
};

export function carriesRelatedVideosReducer(
  prevState = initialState,
  action: IVideoActionProps
) {
  const { type, payload } = action;

  switch (type) {
    case ENUMS_VIDEOS.SUCESS:
      return {
        ...prevState,
        videos: payload?.videos,
        totalResult: payload?.totalResult,
        nextPageToken: payload?.nextPageToken,
        loading: false,
      };

    case ENUMS_VIDEOS.FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload,
      };

    case ENUMS_VIDEOS.REQUEST:
      return {
        ...prevState,
        loading: true,
      };

    default:
      return prevState;
  }
}
