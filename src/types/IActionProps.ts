import { IVideoPropsState } from "./IVideoPropsState";

export type IActionProps = {
  type: string | number;
  payload?:
    | {
        user?: object;
        accessToken?: string;
        error?: string;
        loading?: boolean;
      }
    | string;
};

export type IVideoActionProps = {
  type: string | number;
  payload?: IVideoPropsState | any;
};
