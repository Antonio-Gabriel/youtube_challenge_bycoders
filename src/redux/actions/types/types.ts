const actionTypes = {
  SUCESS: 201,
  FAIL: 400,
  REQUEST: 102,
  LOGOUT: 205,
  LOADPROFILE: 200,
};

const videoTypes = {
  SUCESS: 200,
  FAIL: 400,
  REQUEST: 102,
};

const ENUMS = Object.freeze(actionTypes);
const ENUMS_VIDEOS = Object.freeze(videoTypes);
const ENUMS_VIDEOS_RESULTS = Object.freeze(videoTypes);

export { ENUMS, ENUMS_VIDEOS, ENUMS_VIDEOS_RESULTS };
