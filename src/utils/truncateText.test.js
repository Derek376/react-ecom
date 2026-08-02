import { describe, expect, it } from "vitest";
import { truncateText } from "./truncateText";

describe("truncateText", () => {
  it("returns short text unchanged", () => {
    expect(truncateText("Short description", 20)).toBe("Short description");
  });

  it("adds an ellipsis when text exceeds the limit", () => {
    expect(truncateText("A longer product description", 8)).toBe(
      "A longer...",
    );
  });

  it("uses a default limit of 90 characters", () => {
    const text = "a".repeat(91);

    expect(truncateText(text)).toBe(`${"a".repeat(90)}...`);
  });
});
