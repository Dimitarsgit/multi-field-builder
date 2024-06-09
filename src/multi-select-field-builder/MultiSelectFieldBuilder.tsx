import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { MultiValue } from "react-select";
import { MultiSelectFieldBuilderView } from "./MultiSelectFieldBuilder.view";
import { fieldService } from "../services";
import { createOptions } from "./helpers/create-options";
import { MultiOptionSchema } from "./validation";
import { MultiSelectField, MultiSelectOption } from "./types";
import { MultiSelect } from "../types";

const initialValues: MultiSelectField = {
  label: "",
  required: false,
  displayAlpha: false,
  choices: [],
  default: "",
};

export const MultiSelectFieldBuilder = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [options, setOptions] = useState<MultiSelectOption[]>([]);
  const {
    handleSubmit,
    handleChange,
    setValues,
    values,
    setFieldValue,
    errors,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: MultiOptionSchema,
    onSubmit: async ({ choices, ...rest }) => {
      setIsloading(true);
      try {
        const fieldData = {
          choices: choices.map((choice) => choice.value),
          ...rest,
        };

        await fieldService.saveField(fieldData);

        if (!fieldData.choices.includes(fieldData.default)) {
          const updateOptions = createOptions([
            ...fieldData.choices,
            fieldData.default,
          ]);
          handleSelect(updateOptions);
        }
      } catch (e) {
        console.error(e);
      }
      setIsloading(false);
    },
  });

  useEffect(() => {
    (async () => {
      const { choices, ...rest }: MultiSelect = await fieldService.getField();
      const initialOptions = createOptions(choices);
      setOptions(initialOptions);

      await setValues({ choices: initialOptions, ...rest });
      setIsloading(false);
    })();
  }, [setValues]);

  const handleSelect = (selectedOptions: MultiValue<unknown>) => {
    if (selectedOptions.length > 50) {
      setErrors({
        ...errors,
        choices: "You can not select more than 50 options",
      });
      return;
    }
    setFieldValue("choices", selectedOptions);
  };

  const handleReset = async () => {
    await setValues(initialValues);
    setErrors({});
  };

  //TODO:
  // 1. Add styles for Select component to match mui and show the error with red text
  // 2. Add simple tests
  // 3. Think of a way to hydrate the state on page load
  // 4. Play with options to detect  if there is different option added from the input to save it in the list so the user can select them from dropdown
  // 5. Handle server errors and notify user about them
  return (
    <MultiSelectFieldBuilderView
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleSelect={handleSelect}
      handleReset={handleReset}
      values={values}
      errors={errors}
      options={options}
    />
  );
};
