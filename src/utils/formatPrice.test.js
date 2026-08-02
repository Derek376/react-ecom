import { describe, expect, it } from "vitest";
import {
  formatPrice,
  formatPriceCalculation,
  formatRevenue,
} from "./formatPrice";

describe("price formatting utilities", () => {
  it("formats a value as euro currency for Ireland", () => {
    expect(formatPrice(1234.5)).toBe("€1,234.50");
  });

  it("calculates a line total from numeric strings", () => {
    expect(formatPriceCalculation("3", "19.99")).toBe("59.97");
  });

  it.each([
    [999, 999],
    [1_000, "1.0K"],
    [2_500_000, "2.5M"],
    [3_000_000_000, "3.0B"],
  ])("formats revenue %s as %s", (value, expected) => {
    expect(formatRevenue(value)).toBe(expected);
  });
});
