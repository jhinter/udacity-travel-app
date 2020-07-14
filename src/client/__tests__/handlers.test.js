const { validateForm } = require("../js/handlers");

describe("Testing functionalities related to handlers", () => {
  test("validateForm", async () => {
    const invalidUserInput = {
      city: "Dinkelscherben",
      zip: 86424,
      date: "",
    };
    expect(validateForm(invalidUserInput)).toBeFalsy();

    const validUserInput = {
      city: "Dinkelscherben",
      zip: 86424,
      date: new Date(),
    };
    expect(validateForm(validUserInput)).toBeTruthy();
  });
});
