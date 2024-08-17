import classNames from "classnames";
import styles from "./button.module.scss";

export const Button = (props: Props) => {
  const { type, className, text, disabled, onClick } = props;

  return (
    <button
      type={type}
      className={classNames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface Props {
  type?: "submit" | "button";
  className?: string;
  text: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
