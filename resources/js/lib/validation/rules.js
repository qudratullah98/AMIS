export const required = (msg = "This field is required") => (v) =>
    !v ? msg : null;

export const min = (minVal, msg) => (v) =>
    v < minVal ? msg || `Min ${minVal}` : null;

export const max = (maxVal, msg) => (v) =>
    v > maxVal ? msg || `Max ${maxVal}` : null;