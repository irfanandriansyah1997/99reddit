"use client";

import { useMemo } from "react";

import Header from "@/components/Header";

import { getColorPallete } from "@/utils/color";

const SubRedditModules = (props) => {
  const {
    bannerImage,
    children,
    primaryColor,
    subRedditLogo,
    subRedditLogoSmall,
    subRedditName,
    subRedditPrefixName,
  } = props;

  const colorPallete = useMemo(
    () => getColorPallete({ primaryColor }),
    [primaryColor]
  );

  return (
    <html lang="en">
      <body style={colorPallete}>
        <Header
          bannerImage={bannerImage}
          subRedditLogo={subRedditLogo}
          subRedditLogoSmall={subRedditLogoSmall}
          subRedditName={subRedditName}
          subRedditPrefixName={subRedditPrefixName}
        />
        <container>
          <div>{children}</div>
          <div>Sidebar</div>
        </container>
      </body>
    </html>
  );
};

export default SubRedditModules;
