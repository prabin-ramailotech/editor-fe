import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type InputType = {
  title?: string;
  isVerify?: boolean;
  message?: string;
  type: React.HTMLInputTypeAttribute;
  isShowSecureText?: boolean;
  isSecureText?: boolean;
  onSecureClick?: () => void;
  required?: boolean;
  className?: string;
  readonly?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  error?: any;
  info?: string | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isPhonenumber?: boolean;
  isOTP?: boolean;
  handleClick?: () => void;
  rightText?: string;
  rightClick?: () => void;
};

const LoginInput: FC<InputType> = ({
  title,
  readonly,
  type,
  isShowSecureText,
  required,
  handleClick,
  error,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  isPhonenumber,
  rightText,
  rightClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center"></div>
      <div className="flex-flex-col gap-1">
        <div className="py-2 rounded-xl flex flex-row items-center ">
          <TextField
            type={
              isShowSecureText
                ? showPassword
                  ? `${type}`
                  : "password"
                : `${type}`
            }
            id={id}
            label={title}
            name={name}
            placeholder={placeholder}
            value={value}
            required={required}
            disabled={readonly}
            variant="outlined"
            helperText={error}
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full  font-Poppins ${
              readonly && "cursor-not-allowed text-gray-400"
            } text-black text-base`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isPhonenumber && "+91"}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {isShowSecureText && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    edge="end"
                  >
                    <div
                      className="text-sm underline text-blue"
                      onClick={rightClick}
                    >
                      {rightText}
                    </div>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginInput;
