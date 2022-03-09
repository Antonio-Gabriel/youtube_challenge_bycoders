import { getResultsService } from "../../services/getResultsService";

import { ENUMS_VIDEOS_RESULTS } from "./types/types";

export const getResultsActions =
  (search?: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({
        type: ENUMS_VIDEOS_RESULTS.REQUEST,
      });

      const response = await getResultsService(
        search,
        getState().videos.nextPageToken
      );

      if (response) {
        dispatch({
          type: ENUMS_VIDEOS_RESULTS.SUCESS,
          payload: {
            videos: response.items,
            nextPageToken: response.nextPageToken,
            totalResult: response.pageInfo.totalResults,
          },
        });
      } else {
        dispatch({
          type: ENUMS_VIDEOS_RESULTS.FAIL,
          error: "Error for load the videos",
        });
      }
    } catch (error: any) {
      if (error) {
        dispatch({
          type: ENUMS_VIDEOS_RESULTS.FAIL,
          error: error.message,
        });
      }
    }
  };
