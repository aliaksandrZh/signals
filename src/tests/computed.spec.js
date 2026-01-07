import { describe, it, expect, beforeEach, vi, afterEach, test } from "vitest";
import { computed } from "../computed";
import { signal } from "../signal";

describe('computed', () => {
  let s = null;
  beforeEach(() => {
    s = signal(1);
  })
  afterEach(() => {
    s = null;
  })

  test('should be initialized',  () => {
    const c = computed(() => s());
    expect(1).toBe(c());
  })
  test('computation is not called when call the compute object',  () => {
    const compute = vi.fn();
    compute.mockImplementation(() => s() + 5)
    const c = computed(compute);

    let callCount = 5;
    while(callCount != 0) {
      c();
      callCount--;
    }

    expect(6).toBe(c());
    expect(compute).toHaveBeenCalledTimes(1);
  });


  test('computation called when producers is updated',  () => {
    const compute = vi.fn();
    compute.mockImplementation(() => s() + 5)
    const c = computed(compute);

    s.set(5);
    expect(10).toBe(c());
    expect(compute).toHaveBeenCalledTimes(2);
    compute.mockClear();
    s.set(5);
    s.set(0);
    s.set(1);
    s.set(2);
    expect(compute).toHaveBeenCalledTimes(4);
  })
})