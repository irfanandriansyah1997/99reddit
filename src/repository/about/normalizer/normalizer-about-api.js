import { DEFAULT_ABOUT_API } from "@/repository/about/constant";

import { decodeHTMLEntities } from "@/utils/html";
import { safeParseNumber, safeParseString } from "@/utils/parser";

export const normalizerAboutAPI = (response) => {
  try {
    if (!response || !response.data) throw new Error();

    const {
      data: {
        accounts_active,
        banner_background_image,
        community_icon,
        description_html,
        display_name_prefixed,
        header_img,
        primary_color,
        subscribers,
        title,
      },
    } = response;

    return {
      accountActive: safeParseNumber(accounts_active),
      bannerImage: decodeHTMLEntities(safeParseString(banner_background_image)),
      description: decodeHTMLEntities(safeParseString(description_html)),
      primaryColor: safeParseString(primary_color),
      subRedditLogo: safeParseString(header_img),
      subRedditLogoSmall: decodeHTMLEntities(safeParseString(community_icon)),
      subRedditName: safeParseString(title),
      subRedditPrefixName: safeParseString(display_name_prefixed),
      subscribersNum: safeParseNumber(subscribers),
    };
  } catch (e) {
    return DEFAULT_ABOUT_API;
  }
};
