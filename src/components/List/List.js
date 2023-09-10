import { cx } from "@/utils/className";

import "./styles.scss";

const List = (props) => {
  const { children, className, gap = 8 } = props;

  return (
    <ul className={cx(["list", className])} style={{ gap }}>
      {children}
    </ul>
  );
};

List.Item = (props) => <li {...props} />;

export default List;
