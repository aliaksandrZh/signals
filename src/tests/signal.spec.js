import { describe, it, expect, beforeEach, vi, afterEach, test } from "vitest";
import { signal } from "../signal";

describe("signal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("base call return the initial value", () => {
    const s = signal(1);
    expect(1).toEqual(s());
  });

  test("should have set function", () => {
    const s = signal(1);
    expect(s.set).toBeTruthy();
    expect(s.set).toBeTypeOf("function");
  });

  test("set should update the data", () => {
    const s = signal(1);
    const setSpy = vi.spyOn(s, 'set');
    expect(1).toEqual(s());

    s.set(2);
    expect(setSpy).toHaveBeenCalledWith(2);
    expect(setSpy).toHaveBeenCalledTimes(1);
    expect(2).toEqual(s());
  });

  test("should have update function", () => {
    const s = signal(1);
    expect(s.update).toBeTruthy();
    expect(s.update).toBeTypeOf("function");
  });

  test("set should update the data", () => {
    const s = signal(1);
    const updateSpy = vi.spyOn(s, 'update');
    const updater = vi.fn();
    updater.mockImplementation((oldValue) => oldValue + 5)

    expect(1).toEqual(s());
    s.update(updater);

    expect(updateSpy).toHaveBeenCalledWith(updater);
    expect(updater).toHaveBeenCalledWith(1);
    expect(updater).toHaveBeenCalledTimes(1);
    expect(6).toEqual(s());
  });
});
