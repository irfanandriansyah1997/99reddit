import { DEFAULT_ABOUT_API } from "@/repository/about/constant";

import { decodeHTMLEntities } from "@/utils/html";
import { safeParseNumber, safeParseString } from "@/utils/parser";

export const normalizerAboutAPI = (response) => {
  try {
    if (!response || !response.data) throw new Error();

    const {
      data: {
        accounts_active,
        description_html,
        display_name_prefixed,
        header_img,
        mobile_banner_image,
        primary_color,
        subscribers,
        title,
      },
    } = response;

    return {
      accountActive: safeParseNumber(accounts_active),
      bannerImage: safeParseString(mobile_banner_image),
      description: decodeHTMLEntities(safeParseString(description_html)),
      primaryColor: safeParseString(primary_color),
      subRedditLogo: safeParseString(header_img),
      subRedditName: safeParseString(title),
      subRedditPrefixName: safeParseString(display_name_prefixed),
      subscribersNum: safeParseNumber(subscribers),
    };
  } catch (e) {
    return DEFAULT_ABOUT_API;
  }
};
