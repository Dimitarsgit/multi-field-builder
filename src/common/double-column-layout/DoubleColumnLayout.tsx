import React, { FC } from "react";
import { Box, Grid } from "@mui/material";

type Props = {
  FirstComponent?: React.ReactNode;
  SecondComponent?: React.ReactNode;
};

export const DoubleColumnLayout: FC<Props> = ({
  FirstComponent,
  SecondComponent,
}) => {
  return (
    <Box mb={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item maxWidth={"30%"} width={"100%"}>
          {FirstComponent}
        </Grid>
        <Grid item xs>
          {SecondComponent}
        </Grid>
      </Grid>
    </Box>
  );
};
