import { getRelatedVideosService } from "../../services/getRelatedVideosService";

import { ENUMS_VIDEOS } from "./types/types";

export const getRelatedVideosActions =
  (id?: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: ENUMS_VIDEOS.REQUEST,
      });

      const response = await getRelatedVideosService(
        getState().videos.nextPageToken,
        id
      );

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
