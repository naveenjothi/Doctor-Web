import { classNames } from "@/libs/utilities";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import ErrorComponent from "./error";

type Props = {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
  error?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>
  ) => ChangeEventHandler<HTMLInputElement> | void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement, Element>
  ) => FocusEventHandler<HTMLInputElement> | void;
};

const InputComponent: React.FC<Props> = (props) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>
      <div className="mt-1">
        <input
          id={props.name}
          name={props.name}
          type={props.type}
          autoComplete={props.autoComplete}
          disabled={props.disabled}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={classNames(
            "appearance-none block w-full px-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            props.className
          )}
        />
      </div>
      <ErrorComponent message={props.error} />
    </div>
  );
};

export default InputComponent;
