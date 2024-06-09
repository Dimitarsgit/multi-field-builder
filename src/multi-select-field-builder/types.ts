export type MultiSelectField = {
  label: string;
  required: boolean;
  default: string;
  choices: MultiSelectOption[];
  displayAlpha: boolean;
};

export type MultiSelectOption = {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
};
