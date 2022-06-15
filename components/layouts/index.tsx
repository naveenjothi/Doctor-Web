import React from "react";
import DefaultFooterComponent from "./footers";
import DefaultHeaderComponent from "./headers";

type Props = {
  children: JSX.Element;
};

const DefaultLayoutComponent: React.FC<Props> = (props) => {
  return (
    <div className="min-h-full">
      <DefaultHeaderComponent />
      <main className="-mt-24 pb-8">{props.children}</main>
      <DefaultFooterComponent />
    </div>
  );
};

export default React.memo(DefaultLayoutComponent);
