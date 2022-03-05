import { getVideoServices } from "../../services/getVideosService";
import { ENUMS_VIDEOS } from "./types/types";

export const getVideoActions = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({
      type: ENUMS_VIDEOS.REQUEST,
    });

    const response = await getVideoServices(getState().videos.nextPageToken);

    if (response) {
      dispatch({
        type: ENUMS_VIDEOS.SUCESS,
        payload: {
          videos: response.items,
          nextPageToken: response.nextPageToken,
          totalResult: response.pageInfo.totalResults,
        },
      });
    } else {
      dispatch({
        type: ENUMS_VIDEOS.FAIL,
        error: "Error for load the videos",
      });
    }
  } catch (error: any) {
    if (error) {
      dispatch({
        type: ENUMS_VIDEOS.FAIL,
        error: error.message,
      });
    }
  }
};
