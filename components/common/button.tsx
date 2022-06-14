import { classNames } from "@/libs/utilities";
import React, { ReactElement } from "react";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
  text: string;
  icon?: ReactElement;
  children?: JSX.Element;
  loading?: boolean;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  btnColor: "primary" | "secondary";
  onClick?: () =>
    | React.MouseEventHandler<HTMLButtonElement>
    | void
    | Promise<void>;
};

const ButtonComponent: React.FC<Props> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classNames(
        "w-full inline-flex justify-center py-2 px-4 border  rounded-md shadow-sm  text-sm font-medium",
        props.btnColor == "primary"
          ? "border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          : "border-gray-300 text-gray-500 hover:bg-gray-50 bg-white",
        props.className
      )}
    >
      {props.loading ? (
        <div>
          <PulseLoader size={8} />
        </div>
      ) : (
        <>
          <span className="pr-2">{props.text}</span>
          {props.icon}
          {props.children}
        </>
      )}
    </button>
  );
};
export default ButtonComponent;
