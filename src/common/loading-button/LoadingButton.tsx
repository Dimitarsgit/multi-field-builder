import React, { FC } from "react";
import {
  Box,
  Button,
  ButtonOwnProps,
  CircularProgress,
  SxProps,
  Theme,
} from "@mui/material";

type Props = {
  styles: SxProps<Theme>;
  variant: ButtonOwnProps["variant"];
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading: boolean;
  color: ButtonOwnProps["color"];
  children: React.ReactNode;
};

export const LoadingButton: FC<Props> = ({
  styles,
  isLoading,
  onClick,
  children,
  type = "button",
  variant,
  color,
}) => {
  return (
    <Button
      sx={styles}
      onClick={onClick}
      disabled={isLoading}
      type={type}
      variant={variant}
      color={color}
    >
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress size={"25px"} />
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};
