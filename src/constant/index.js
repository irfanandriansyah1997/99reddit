///////////////////////////////////////////////////////////////////////////
// Misc Constant Section
///////////////////////////////////////////////////////////////////////////

export const MOCK_ACCOUNT_PHOTO =
  "https://styles.redditmedia.com/t5_4sq2zq/styles/profileIcon_bpc4r6b2mcnb1.jpg?width=256&height=256&crop=256:256,smart&s=79404c97651a73e6b55ceff428a1e69aaf41e135";

export const DEFAULT_SUB_REDDIT = "DotA2";

export const THEME_KIND = {
  dark: 1,
  light: 0,
};

export const DEFAULT_THEME_KIND = THEME_KIND.light;

export const COLOR_KEY = {
  background: "background",
  basicColor: "basicColor",
  border: "border",
  cardTitle: "cardTitle",
  cardTitleInactive: "cardTitleInactive",
  headerBackground: "headerBackground",
  headerIcon: "headerIcon",
  headerListItemBorderActive: "headerListItemBorderActive",
  headerListItemHover: "headerListItemHover",
  headerTextfield: "headerTextfield",
  heading: "heading",
  primaryColor: "primaryColor",
  text: "text",
  textInactive: "textInactive",
};

export const COLOR_LIGHT_THEME = {
  background: "#edeff1",
  basicColor: "#fff",
  border: "#ccc",
  cardTitle: "#222222",
  cardTitleInactive: "#9b9b9b",
  headerBackground: "#fff",
  headerIcon: "#1A1A1B",
  headerListItemBorderActive: "#ff4500",
  headerListItemHover: "#ff4500",
  headerTextfield: "#F6F7F8",
  heading: "#1c1c1c",
  text: "#898989",
  textInactive: "#7c7c7c",
};

export const COLOR_DARK_THEME = {
  background: "#030303",
  basicColor: "#000",
  border: "#343536",
  cardTitle: "#D7DADC",
  cardTitleInactive: "#6f7071",
  headerBackground: "#1A1A1B",
  headerIcon: "#D7DADC",
  headerListItemBorderActive: "#E9F5FD",
  headerListItemHover: "#E9F5FD",
  headerTextfield: "#272729",
  heading: "#D7DADC",
  text: "#D7DADC",
  textInactive: "#818384",
};

///////////////////////////////////////////////////////////////////////////
// API Section
///////////////////////////////////////////////////////////////////////////

export const THREAD_HOT_JSON_API =
  "https://www.reddit.com/r/{subReddit}/hot.json";
export const THREAD_NEW_JSON_API =
  "https://www.reddit.com/r/{subReddit}/new.json";
export const THREAD_TOP_JSON_API =
  "https://www.reddit.com/r/{subReddit}/top.json";

export const COMMENT_JSON_API =
  "https://www.reddit.com/r/{subReddit}/comments/{threadId}.json";

export const ABOUT_JSON_API = "https://www.reddit.com/r/{subReddit}/about.json";
