import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SetQuantity from "./SetQuantity";

describe("SetQuantity", () => {
  it("prevents the quantity from being reduced below one", () => {
    render(
      <SetQuantity
        quantity={1}
        cardCounter={false}
        handeQtyIncrease={vi.fn()}
        handleQtyDecrease={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    expect(screen.getByText("QUANTITY")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls the supplied handlers when the user changes quantity", async () => {
    const user = userEvent.setup();
    const increase = vi.fn();
    const decrease = vi.fn();

    render(
      <SetQuantity
        quantity={2}
        cardCounter
        handeQtyIncrease={increase}
        handleQtyDecrease={decrease}
      />,
    );

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "-" }));

    expect(increase).toHaveBeenCalledOnce();
    expect(decrease).toHaveBeenCalledOnce();
    expect(screen.queryByText("QUANTITY")).not.toBeInTheDocument();
  });
});
