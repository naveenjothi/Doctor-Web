import React from "react";
import DefaultFooterComponent from "./footers";
import DefaultHeaderComponent from "./headers";

type Props = {
  children: JSX.Element;
  asPath: string;
};

const hiddenHeadersPath = [`/auth/`];
const hiddenFootersPath = [`/auth/`];

const DefaultLayoutComponent: React.FC<Props> = (props) => {
  return (
    <div className="min-h-full">
      {!hiddenHeadersPath.find((x) => props.asPath?.includes(x)) && (
        <DefaultHeaderComponent />
      )}
      <main className="pb-8">{props.children}</main>
      {!hiddenFootersPath.find((x) => props.asPath?.includes(x)) && (
        <DefaultFooterComponent />
      )}
    </div>
  );
};

export default React.memo(DefaultLayoutComponent);
