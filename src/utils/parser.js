const _isFloat = (text) => {
  const pattern = /^-?\d*(\.\d+)?$/;

  if (!text.match(pattern)) return false;

  const val = parseFloat(text);
  const isNumber = Number.isInteger(val);

  return isNumber ? false : true;
};

const _isInteger = (text) => {
  const pattern = /^-?[0-9]+$/;

  if (!text.match(pattern)) return false;

  const val = parseInt(text, 10);
  const isNumber = Number.isInteger(val);

  return isNumber;
};

export const safeParseNumber = (text) => {
  try {
    return Number(text) || 0;
  } catch {
    // INFO: add polyfill if Number constructor is not working properly
    if (typeof text === "number" && !Number.isNaN(text)) return text;
    if (typeof text === "string") {
      if (_isFloat(text)) return parseFloat(text);
      if (_isInteger(text)) return parseInt(text, 10);
    }
    return 0;
  }
};

export const safeParseString = (rawText) => {
  if (typeof rawText === "string") return rawText;
  if (typeof rawText === "number") return String(rawText);

  return "";
};

export const safeParseBoolean = (args) => {
  if (typeof args === "boolean") return args;
  if (args === 0 || args === 1) return Boolean(args);

  return false;
};
