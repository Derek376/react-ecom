import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router";
import { describe, expect, it } from "vitest";
import { dashboardTableConfigs } from "../utils/dashboardTableQuery";
import useDashboardTableQuery from "./useDashboardTableQuery";

const QueryProbe = () => {
  const location = useLocation();
  const {
    page,
    sortBy,
    sortOrder,
    changePage,
    changeSortBy,
    changeSortOrder,
  } = useDashboardTableQuery(dashboardTableConfigs.products);

  return (
    <>
      <p>{`${page}:${sortBy}:${sortOrder}`}</p>
      <p data-testid="location">{location.search}</p>
      <button onClick={() => changePage(3)}>Page 3</button>
      <button onClick={() => changeSortBy("quantity")}>Sort quantity</button>
      <button onClick={() => changeSortOrder("asc")}>Ascending</button>
    </>
  );
};

describe("useDashboardTableQuery", () => {
  it("preserves sorting when the page changes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={[
          "/admin/products?page=2&sortBy=price&sortOrder=desc",
        ]}
      >
        <QueryProbe />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Page 3" }));

    expect(screen.getByText("3:price:desc")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent(
      "?page=3&sortBy=price&sortOrder=desc",
    );
  });

  it("returns to page one only when sorting changes", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter
        initialEntries={[
          "/admin/products?page=3&sortBy=price&sortOrder=desc",
        ]}
      >
        <QueryProbe />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", { name: "Sort quantity" }),
    );

    expect(screen.getByText("1:quantity:desc")).toBeInTheDocument();
  });
});
