export function shouldJsonify(o) {
  return o === undefined
    ? false
    : o instanceof FormData
    ? false
    : o instanceof Blob
    ? false
    : o instanceof ArrayBuffer
    ? false
    : o instanceof URLSearchParams
    ? false
    : typeof o === 'string'
    ? false
    : true;
}
