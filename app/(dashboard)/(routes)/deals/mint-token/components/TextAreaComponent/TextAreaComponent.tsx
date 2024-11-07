import classNames from "classnames";
import { useState } from "react";
import "./textAreaComponent.css";

type TextAreaComponentProps = {
  cols?: number;
  rows?: number;
  type?: string;
  value?: string;
  label?: string;
  btnLabel?: string;
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  onClick?: (text: string) => void;
};

export const TextAreaComponent = ({
  cols,
  rows,
  onClick,
  btnLabel,
  label = "",
  className,
  value = "",
  placeholder,
  inputClassName,
  type = "text",
}: TextAreaComponentProps) => {
  const [text, setText] = useState("");
  const labelClassName = label ? "with__label" : "";
  return (
    <div className={classNames(className, "input-group mb-3 input__container")}>
      <div className={classNames(labelClassName)}>
        {label && <label>{label}</label>}
        <textarea
          value={value}
          cols={cols}
          rows={rows}
          onChange={(event) => setText(event.target.value)}
          className={`form-control input ${inputClassName}`}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="button-addon2"
        ></textarea>
      </div>

      {btnLabel && (
        <button
          onClick={() => onClick?.(text)}
          className="btn btn-outline-secondary input--button"
          type="button"
          id="button-addon2"
        >
          {btnLabel}
        </button>
      )}
    </div>
  );
};
