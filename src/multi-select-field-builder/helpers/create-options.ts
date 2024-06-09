export const createOptions = (choices: string[]) =>
  choices.map((choice) => ({
    value: choice,
    label: choice,
  }));
