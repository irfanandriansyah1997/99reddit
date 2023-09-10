import Image from "next/image";

import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import List from "@/components/List";
import Typography from "@/components/Typography";

import { COLOR_KEY, DEFAULT_THEME_KIND, THEME_KIND } from "@/constant";
import { PROFILE_MOCK } from "@/mocks/profile";

import "./styles.scss";
import IllustrationRedditLogoDark from "@/assets/illustration/reddit-logo-dark.svg";
import IllustrationRedditLogoLight from "@/assets/illustration/reddit-logo-light.svg";

const iconListMock = [
  "icon-popular",
  "icon-chat",
  "icon-notification",
  "icon-add",
];

const StickyHeader = (props) => {
  const {
    subRedditLogo,
    subRedditPrefixName,
    theme = DEFAULT_THEME_KIND,
  } = props;
  return (
    <nav className="navbar">
      <Image
        className="navbar__logo"
        src={
          theme === THEME_KIND.light
            ? IllustrationRedditLogoLight
            : IllustrationRedditLogoDark
        }
        width={128}
        height={32}
        alt="Reddit Apps"
      />
      <div className="navbar__subreddit">
        <Typography.paragraph
          modifier="body-4"
          fontWeight={500}
          color={COLOR_KEY.heading}
        >
          <Avatar src={subRedditLogo} alt={subRedditPrefixName} size={20} />
          {subRedditPrefixName}
        </Typography.paragraph>
        <Icon iconName="icon-caret_down" color={COLOR_KEY.headerIcon} />
      </div>
      <div className="navbar__searchbar">
        <Icon iconName="icon-search" color={COLOR_KEY.text} />
        <Typography.paragraph
          modifier="body-4"
          fontWeight={400}
          color={COLOR_KEY.text}
        >
          Search Reddit
        </Typography.paragraph>
      </div>
      <div className="navbar__account">
        <List>
          {iconListMock.map((icon) => (
            <List.Item key={icon}>
              <Icon iconName={icon} />
            </List.Item>
          ))}
        </List>

        <button className="navbar__profile">
          <Avatar
            alt="User avatar"
            src={PROFILE_MOCK.photoProfile}
            size={24}
            mode="rounded"
          />
          <div>
            <Typography.paragraph
              modifier="body-5"
              fontWeight={500}
              color={COLOR_KEY.heading}
            >
              {PROFILE_MOCK.username}
            </Typography.paragraph>
            <Typography.paragraph
              modifier="body-5"
              color={COLOR_KEY.text}
              fontWeight={500}
            >
              <Icon
                iconName="icon-karma_fill"
                color={COLOR_KEY.primaryColor}
                size={12}
              />
              &nbsp;
              {PROFILE_MOCK.additionalData.karma} karma
            </Typography.paragraph>
          </div>
          <i className="_3x3dhQasGAuYcXVQ02QUzy icon icon-caret_down"></i>
        </button>
      </div>
    </nav>
  );
};

export default StickyHeader;
