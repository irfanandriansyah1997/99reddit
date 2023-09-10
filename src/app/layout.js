import SubRedditModules from "@/modules/sub-reddit/sub-reddit";
import { fetchAboutAPI } from "@/repository/about/fetch-about-api";

const RootLayout = async (props) => {
  const { children } = props;
  const { error, result } = await fetchAboutAPI();

  if (error || typeof result === "undefined") return null;

  return (
    <SubRedditModules
      accountActive={result.accountActive}
      bannerImage={result.bannerImage}
      description={result.description}
      primaryColor={result.primaryColor}
      subRedditLogo={result.subRedditLogo}
      subRedditName={result.subRedditName}
      subRedditPrefixName={result.subRedditPrefixName}
      subscribersNum={result.subscribersNum}
    >
      {children}
    </SubRedditModules>
  );
};

export default RootLayout;
