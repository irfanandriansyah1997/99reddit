import StickyHeader from "./StickyHeader";
import SubRedditHeader from "./SubRedditHeader";

const Header = (props) => {
  const {
    bannerImage,
    subRedditLogo,
    subRedditLogoSmall,
    subRedditName,
    subRedditPrefixName,
  } = props;

  return (
    <>
      <StickyHeader
        subRedditName={subRedditName}
        subRedditLogo={subRedditLogoSmall}
        subRedditPrefixName={subRedditPrefixName}
      />
      <SubRedditHeader
        bannerImage={bannerImage}
        subRedditLogo={subRedditLogo}
        subRedditName={subRedditName}
        subRedditPrefixName={subRedditPrefixName}
      />
    </>
  );
};

export default Header;
