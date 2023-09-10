import { createElement } from "react";

import { cx } from "@/utils/className";
import { getColorVariable } from "@/utils/color";
import { COLOR_KEY } from "@/constant";

const elements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  link: "link",
  paragraph: "p",
  span: "span",
};

const modifiers = {
  "body-1": "body-1",
  "body-2": "body-2",
  "body-3": "body-3",
  "body-4": "body-4",
  "body-5": "body-5",
  "body-6": "body-6",
};

import Link from "next/link";

import "./styles.scss";

const Typography = (props) => {
  const {
    children,
    className,
    color = COLOR_KEY.cardTitle,
    fontWeight = 400,
    margin = 0,
    modifier = "body-3",
    tagElement = "p",
    textDecoration = "initial",
    ...res
  } = props;
  let selectedModifier = modifiers[modifier];
  let selectedTag = elements[tagElement];

  if (!selectedTag) return null;

  if (selectedTag !== "link") {
    return createElement(
      elements[tagElement],
      {
        ...res,
        className: cx([
          "typography",
          {
            [`typography--${selectedModifier}`]:
              typeof selectedModifier === "string",
          },
          className,
        ]),
        style: {
          color: `var(${getColorVariable(color)})`,
          fontWeight,
          margin,
          textDecoration,
        },
      },
      children
    );
  }

  return (
    <Link
      {...res}
      className={cx([
        "typography",
        {
          [`typography--${selectedModifier}`]:
            typeof selectedModifier === "string",
        },
        className,
      ])}
      style={{
        color: `var(${getColorVariable(color)})`,
        fontWeight,
        margin,
        textDecoration,
      }}
    >
      {children}
    </Link>
  );
};

Typography.h1 = (props) => {
  return <Typography {...props} tagElement="h1" />;
};

Typography.h2 = (props) => {
  return <Typography {...props} tagElement="h2" />;
};

Typography.h3 = (props) => {
  return <Typography {...props} tagElement="h3" />;
};

Typography.h4 = (props) => {
  return <Typography {...props} tagElement="h4" />;
};

Typography.h5 = (props) => {
  return <Typography {...props} tagElement="h5" />;
};

Typography.h6 = (props) => {
  return <Typography {...props} tagElement="h6" />;
};

Typography.span = (props) => {
  return <Typography {...props} tagElement="span" />;
};

Typography.links = (props) => {
  return <Typography {...props} tagElement="link" />;
};

Typography.paragraph = (props) => {
  return <Typography {...props} tagElement="paragraph" />;
};

export default Typography;
