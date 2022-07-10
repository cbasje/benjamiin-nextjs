/* eslint-disable */
// @ts-nocheck
// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  /**
   * The accessToken to use for the request
   */
  accessToken?: string;
  /**
   * The siteId to use for the request
   * @default process.env.SITE_ID
   */
  siteId?: string;
};

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  path: Array<string | number>;
  message: string;
  extensions: Record<string, unknown>;
};

export type NowPlayingQuery = {
  /**
   * Any data from the function will be returned here
   */
  data: {
    me: {
      spotify: {
        player: {
          /**
           * If something is currently playing.
           */
          isPlaying: boolean;
          /**
           * The currently playing track. Can be `null` (e.g. If private session is enabled this will be `null`).
           */
          item: {
            /**
             * The name of the track.
             */
            name: string;
            /**
             * Known external URLs for this track.
             */
            externalUrls: {
              /**
               * The Spotify URL for the object.
               */
              spotify: string;
            };
            /**
             * The album on which the track appears. The album object includes a link in href to full information about the album.
             */
            album: {
              /**
               * The cover art for the album in various sizes, widest first.
               */
              images: Array<{
                /**
                 * The source URL of the image.
                 */
                url: string;
                /**
                 * The image height in pixels. If unknown: `null` or not returned.
                 */
                height: number;
                /**
                 * The image width in pixels. If unknown: `null` or not returned.
                 */
                width: number;
              }>;
            };
          };
        };
      };
    };
  };
  /**
   * Any errors from the function will be returned here
   */
  errors: Array<GraphQLError>;
};

/**
 * A query to receive the currently playing music from Spotify.
 */
export function fetchNowPlayingQuery(
  /**
   * Pass `{}` as no variables are defined for this function.
   */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<NowPlayingQuery>;

export interface Functions {
  /**
   * A query to receive the currently playing music from Spotify.
   */
  fetchNowPlayingQuery: typeof fetchNowPlayingQuery;
}

export const functions: Functions;

export default functions;
