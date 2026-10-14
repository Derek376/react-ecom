import { beforeEach, expect, it, vi } from "vitest";
import api, { changeApiSession } from "./api";

beforeEach(() => changeApiSession(null));

it("rejects demo writes before reaching the network", async () => {
  changeApiSession({ demo: true });
  const adapter = vi.fn();
  await expect(api.post("/orders", {}, { adapter })).rejects.toMatchObject({
    code: "DEMO_READ_ONLY", response: { status: 403, data: { code: "DEMO_READ_ONLY" } },
  });
  expect(adapter).not.toHaveBeenCalled();
});

it("allows demo reads and cancels a request when identity changes", async () => {
  changeApiSession({ demo: true });
  let complete;
  let signal;
  const adapter = vi.fn((config) => {
    signal = config.signal;
    return new Promise((resolve) => { complete = () => resolve({ config, status: 200, data: [] }); });
  });
  const request = api.get("/admin/orders", { adapter });
  await vi.waitFor(() => expect(adapter).toHaveBeenCalled());
  changeApiSession({ demo: false });
  expect(signal.aborted).toBe(true);
  complete();
  await expect(request).rejects.toMatchObject({ code: "ERR_CANCELED" });
});
