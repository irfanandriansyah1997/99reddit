"use client";

import Link from "next/link";

import "./styles.scss";

const ThreadListModules = (props) => {
  const { threadList } = props;

  return (
    <div className="thread-list-modules">
      <Link href={"/comment/167nev6"}>Redirect</Link>
      {threadList.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default ThreadListModules;
