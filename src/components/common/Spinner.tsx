import { useTheme } from "@emotion/react";
import React from "react";
import { MoonLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/helpers/props";

export const Spinner: React.FC<LoaderSizeProps> = (props) => {
  const theme = useTheme();
  return <MoonLoader color={theme.textPrimary} {...props} />;
};
