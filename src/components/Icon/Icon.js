import { cx } from "@/utils/className";
import { getColorVariable } from "@/utils/color";
import { COLOR_KEY } from "@/constant";

const Icon = (props) => {
  const { className, color = COLOR_KEY.text, iconName, size = 20 } = props;

  return (
    <i
      className={cx([
        "icon",
        {
          [`${iconName}`]: Boolean(typeof iconName === "string" && iconName),
        },
        className,
      ])}
      style={{
        color: `var(${getColorVariable(color)})`,
        fontSize: size,
        height: size,
        lineHeight: `${size}px`,
      }}
    />
  );
};

export default Icon;
