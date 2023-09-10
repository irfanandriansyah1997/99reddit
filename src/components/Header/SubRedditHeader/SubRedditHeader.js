import Image from "next/image";

import Avatar from "@/components/Avatar";
import List from "@/components/List";
import Typography from "@/components/Typography";

import { cx } from "@/utils/className";
import { COLOR_KEY } from "@/constant";
import { SUB_REDDIT_LIST_MOCK } from "@/mocks/sub-reddit";

import "./styles.scss";

const SubRedditHeader = (props) => {
  const { bannerImage, subRedditLogo, subRedditName, subRedditPrefixName } =
    props;

  return (
    <header className="sub-reddit-header">
      <div className="sub-reddit-header__banner">
        <Image
          src={bannerImage}
          alt={subRedditName}
          fill
          objectFit="cover"
          unoptimized
        />
      </div>
      <section className="sub-reddit-header__container">
        <div className="sub-reddit-header__content">
          <Avatar
            className="sub-reddit-header__icon"
            src={subRedditLogo}
            alt={subRedditName}
            size={80}
            withBorder
            unoptimized
          />
          <div>
            <Typography.h1
              modifier="body-1"
              color={COLOR_KEY.heading}
              margin="0 0 4px"
              fontWeight={700}
            >
              {subRedditName}
            </Typography.h1>
            <Typography.h2
              modifier="body-4"
              color={COLOR_KEY.text}
              fontWeight={500}
            >
              {subRedditPrefixName}
            </Typography.h2>
          </div>
        </div>
        <List className="sub-reddit-header__menu">
          {SUB_REDDIT_LIST_MOCK.map((listItem) => {
            return (
              <List.Item
                key={listItem.title}
                className={cx({
                  "sub-reddit-header__menu--active": listItem.active,
                })}
              >
                {listItem.active ? (
                  <Typography.span
                    modifier="body-4"
                    color={COLOR_KEY.heading}
                    fontWeight={500}
                  >
                    {listItem.title}
                  </Typography.span>
                ) : (
                  <Typography.links
                    modifier="body-4"
                    color={COLOR_KEY.text}
                    href={listItem.url}
                    fontWeight={500}
                  >
                    {listItem.title}
                  </Typography.links>
                )}
              </List.Item>
            );
          })}
        </List>
      </section>
    </header>
  );
};

export default SubRedditHeader;
