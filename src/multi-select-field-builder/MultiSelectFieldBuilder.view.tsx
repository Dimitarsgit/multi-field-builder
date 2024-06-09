import React, { FC, useMemo } from "react";
import {
  FormControlLabel,
  Box,
  Checkbox,
  Container,
  FormGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormikErrors } from "formik";
import { MultiValue } from "react-select";
import Select from "react-select/creatable";
import { MultiSelectField, MultiSelectOption } from "./types";
import { DoubleColumnLayout, LoadingButton } from "../common";
import { styles } from "./styles";

type Props = {
  handleSubmit: () => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  handleSelect: (options: MultiValue<unknown>) => void;
  handleReset: () => void;
  values: MultiSelectField;
  errors: FormikErrors<MultiSelectField>;
  options: MultiSelectOption[];
  isLoading: boolean;
};

export const MultiSelectFieldBuilderView: FC<Props> = ({
  handleSubmit,
  handleChange,
  handleSelect,
  handleReset,
  values,
  errors,
  options,
  isLoading,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const buttonStyles = useMemo(
    () => ({
      buttonGroup: {
        ...styles.buttonGroup,
        flexDirection: isSmallScreen ? "column" : "row",
      },
      button: { ...styles.button, width: isSmallScreen ? "35%" : "20%" },
    }),
    [isSmallScreen],
  );

  return (
    <Container>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography>
            <b>Multi Select Field Builder</b>
          </Typography>
        </Box>

        <Box sx={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <DoubleColumnLayout
              FirstComponent={<Typography>Label</Typography>}
              SecondComponent={
                <TextField
                  error={!!errors.label}
                  helperText={!!errors.label && "Label is required"}
                  size={"small"}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="label"
                  value={values.label}
                  onChange={handleChange}
                  InputProps={{ style: styles.textField }}
                />
              }
            />

            <DoubleColumnLayout
              FirstComponent={<Typography>Default Value</Typography>}
              SecondComponent={
                <TextField
                  size={"small"}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="default"
                  value={values.default}
                  onChange={handleChange}
                  InputProps={{ style: styles.textField }}
                />
              }
            />

            <DoubleColumnLayout
              FirstComponent={<Typography>Choices</Typography>}
              SecondComponent={
                <Select
                  isLoading={isLoading}
                  onChange={handleSelect}
                  isMulti={true}
                  name="colors"
                  options={options}
                  value={values.choices}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              }
            />

            <FormGroup>
              <FormControlLabel
                disabled={isLoading}
                control={<Checkbox />}
                onChange={handleChange}
                name="displayAlpha"
                checked={values.displayAlpha}
                label="Order Choices Alphabetically"
              />
              <FormControlLabel
                disabled={isLoading}
                control={<Checkbox />}
                onChange={handleChange}
                name="required"
                checked={values.required}
                label="Make Field Required"
              />
            </FormGroup>

            <Box sx={buttonStyles.buttonGroup}>
              <LoadingButton
                isLoading={isLoading}
                variant="contained"
                color="success"
                type="submit"
                styles={buttonStyles.button}
              >
                Save
              </LoadingButton>

              <LoadingButton
                isLoading={isLoading}
                variant="contained"
                color="primary"
                onClick={handleReset}
                styles={buttonStyles.button}
              >
                Reset
              </LoadingButton>

              <LoadingButton
                variant="contained"
                color="error"
                isLoading={isLoading}
                styles={buttonStyles.button}
              >
                Cancel
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};
