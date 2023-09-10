import Image from "next/image";

const SubRedditModules = (props) => {
  const { bannerImage, children, subRedditLogo, subRedditName } = props;

  return (
    <html lang="en">
      <body>
        <div>
          <Image
            src={subRedditLogo}
            alt={subRedditName}
            width={80}
            height={80}
          />
          <div style={{ height: "200px", position: "relative", width: "100%" }}>
            <Image
              src={bannerImage}
              alt={subRedditName}
              fill
              objectFit="cover`"
            />
          </div>
        </div>
        <div>
          <div>{children}</div>
          <div>Sidebar</div>
        </div>
      </body>
    </html>
  );
};

export default SubRedditModules;
