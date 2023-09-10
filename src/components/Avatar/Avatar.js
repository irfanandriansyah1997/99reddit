import Image from "next/image";

import { cx } from "@/utils/className";

import "./styles.scss";

const Avatar = (props) => {
  const {
    alt,
    className,
    mode = "circle",
    size,
    src,
    unoptimized = true,
    withBorder = false,
  } = props;

  return (
    <div
      style={{ height: size, width: size }}
      className={cx([
        "avatar",
        {
          "avatar--with-border": withBorder,
          [`avatar--${mode}`]: mode === "circle" || "rounded",
        },
        className,
      ])}
    >
      <Image
        width={size}
        height={size}
        alt={alt}
        unoptimized={unoptimized}
        src={src}
      />
    </div>
  );
};

export default Avatar;
