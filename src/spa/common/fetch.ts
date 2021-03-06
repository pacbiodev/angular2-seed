/// <reference path="../../../typings/tsd.d.ts" />

export function status(response) {
  if ((response.status >= 200) &&
      (response.status < 300)) {
    return Promise.resolve(response);
  }
  return response.text()
                 .then((text) => {
                          throw new Error(text);
                        });
}

export function text(response) {
  return response.text();
}

export function json(response) {
  return response.json();
}
