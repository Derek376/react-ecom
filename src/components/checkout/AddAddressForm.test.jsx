import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import AddAddressForm from "./AddAddressForm";

const renderForm = () => {
  const store = configureStore({
    reducer: () => ({ errors: { btnLoader: false } }),
  });

  return render(
    <Provider store={store}>
      <AddAddressForm address={null} setOpenAddressModal={() => {}} />
    </Provider>,
  );
};

describe("AddAddressForm validation", () => {
  it("applies the backend minimum lengths before submitting", async () => {
    const user = userEvent.setup();
    renderForm();

    for (const field of [
      "Building Name",
      "City",
      "State",
      "Eircode",
      "Street",
      "Country",
    ]) {
      await user.type(screen.getByLabelText(field), "test");
    }
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      await screen.findByText(
        "*Building name must be at least 5 characters long",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("*Eircode must be at least 5 characters long"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("*Street name must be at least 5 characters long"),
    ).toBeInTheDocument();
  });

  it("rejects values containing only whitespace", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Building Name"), "     ");
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      await screen.findByText("*Building Name is required"),
    ).toBeInTheDocument();
  });
});
