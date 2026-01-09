import { describe, it, expect, beforeEach, vi, afterEach, test } from "vitest";
import { signal } from "../signal";
import { effect } from "../effect";
import { computed } from "../computed";

describe("effect", () => {
  let s = null;
  beforeEach(() => {
    s = signal(1);
  });
  afterEach(() => {
    s = null;
  });

  test("effect be initialized", () => {
    const e = effect(() => s());
    expect(e).toBeTypeOf("function");
  });

  test("computation called when producers are updated (with set)", () => {
    const computation = vi.fn();
    computation.mockImplementation(() => s() + 5);
    const e = effect(computation);

    s.set(5);
    expect(computation).toHaveBeenCalledTimes(2);
    computation.mockClear();
    s.set(5);
    s.set(0);
    s.set(1);
    s.set(2);
    expect(computation).toHaveBeenCalledTimes(4);
  });

  test("computation called when producers are updated (with update)", () => {
    const computation = vi.fn();
    computation.mockImplementation(() => s() + 5);
    const e = effect(computation);

    s.update(() => 5);
    expect(computation).toHaveBeenCalledTimes(2);
    computation.mockClear();
    s.update(() => 5);
    s.update(() => 0);
    s.update(() => 1);
    s.update(() => 2);
    expect(computation).toHaveBeenCalledTimes(4);
  });

  test("effect stops after cleanup", () => {
    const computation = vi.fn();
    computation.mockImplementation(() => s() + 5);
    const e = effect(computation);

    s.set(5);
    expect(computation).toHaveBeenCalledTimes(2);
    computation.mockClear();
    e();
    s.set(5);
    s.set(0);
    s.set(1);
    s.set(2);
    expect(computation).toHaveBeenCalledTimes(0);
  });

  test("effect tracks multiple signals", () => {
    const computation = vi.fn();
    const s2 = signal(1);
    computation.mockImplementation(() => s() + s2() + 5);
    const e = effect(computation);

    s.set(5);
    expect(computation).toHaveBeenCalledTimes(2);
    computation.mockClear();
    s.set(5);
    s2.set(0);
    s2.set(10);
    s.set(2);
    expect(computation).toHaveBeenCalledTimes(4);
  });

  test("effect tracks computed", () => {
    const computation = vi.fn();
    const s2 = signal(1);
    const c = computed(() => s2() * 2);
    computation.mockImplementation(() => s() + c() + 5);
    const e = effect(computation);

    s.set(5);
    expect(computation).toHaveBeenCalledTimes(2);
    computation.mockClear();
    s.set(5);
    s2.set(0);
    s2.set(10);
    s.set(2);
    expect(computation).toHaveBeenCalledTimes(4);
  });
});
