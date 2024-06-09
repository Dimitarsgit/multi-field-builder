import { SAVE_FIELD_URL } from "./constants";
import { MultiSelect } from "../../types";

export const fieldService = {
  getField: async function (): Promise<MultiSelect> {
    return await new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            label: "Sales region",
            required: false,
            choices: [
              "Asia",
              "Australia",
              "Western Europe",
              "North America",
              "Eastern Europe",
              "Latin America",
              "Middle East and Africa",
            ],
            displayAlpha: true,
            default: "North America",
          }),
        1000,
      );
    });
  },
    // TODO: For some reason this url returns 404. Find out whats going on.
  saveField: async function (data: MultiSelect) {
    const response = await fetch(SAVE_FIELD_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response
  },
};
