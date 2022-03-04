export type IVideoPropsState = {
  videos?: Array<object>;
  nextPageToken?: string;
  totalResult?: number;
  loading: boolean;
  error?: string;
};
