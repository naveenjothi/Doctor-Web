import React from "react";

type Props = {
  children: JSX.Element;
};

const DefaultLayoutComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
};

export default React.memo(DefaultLayoutComponent);
