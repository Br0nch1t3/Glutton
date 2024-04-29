export const HTTP_STATUS_NOT_MODIFIED = 304;

export function getConfitionalGetHeaders(
  modifiedSince?: string,
  etag?: string,
) {
  return {
    "If-Modified-Since": modifiedSince,
    "If-None-Match": etag,
  };
}
