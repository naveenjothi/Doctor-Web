import { classNames } from "@/libs/utilities";

type Props = {
  message?: string;
  className?: string;
};

const ErrorComponent: React.FC<Props> = ({ message, className }) => {
  return (
    <span className={classNames(className, "text-red-600 text-xs")}>
      {message}
    </span>
  );
};

export default ErrorComponent;
