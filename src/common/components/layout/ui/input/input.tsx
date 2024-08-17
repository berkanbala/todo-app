import classNames from "classnames";
import styles from "./input.module.scss";

export const Input = (props: Props) => {
  const { type, value, onChange, className, placeholder, disabled } = props;

  return (
    <input
      className={classNames(
        styles.container,
        className,
        disabled && styles.disabled
      )}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

interface Props {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  disabled: boolean;
}
