import {
  COLOR_DARK_THEME,
  COLOR_KEY,
  COLOR_LIGHT_THEME,
  DEFAULT_THEME_KIND,
  THEME_KIND,
} from "@/constant";

const generateColorVariable = (colorKeyName) => {
  const formattedColorAttributeKey = colorKeyName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  return `--${formattedColorAttributeKey}`;
};

export const getColorPallete = (args) => {
  const { primaryColor, theme = DEFAULT_THEME_KIND } = args;
  let colorObject = {
    primaryColor: primaryColor,
  };

  switch (theme) {
    case THEME_KIND.dark:
      colorObject = { ...colorObject, ...COLOR_DARK_THEME };
      break;

    case THEME_KIND.light:
    default:
      colorObject = { ...colorObject, ...COLOR_LIGHT_THEME };
      break;
  }

  return Object.keys(colorObject).reduce((result, colorAttribute) => {
    return {
      ...result,
      [generateColorVariable(colorAttribute)]: colorObject[colorAttribute],
    };
  }, {});
};

export const getColorVariable = (key) => {
  if (Object.prototype.hasOwnProperty.call(COLOR_KEY, key)) {
    return generateColorVariable(key);
  }

  return "";
};
