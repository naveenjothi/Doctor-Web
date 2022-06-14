import { classNames } from "@/libs/utilities";
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
} from "react";

type Props = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
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
          required={props.required}
          disabled={props.disabled}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={classNames(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            props.className
          )}
        />
      </div>
    </div>
  );
};

export default InputComponent;
