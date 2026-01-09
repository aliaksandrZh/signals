import { signal } from "../signal";
import { computed } from "../computed";
import { effect } from "../effect";

import { describe, test, expect } from "vitest";

describe("Signals: Memory & Leak Tests", () => {
  test("should not duplicate subscriptions on multiple reads", () => {
    const sig = signal(1);
    let runs = 0;

    const comp = computed(() => {
      runs++;
      return sig() + sig() + sig();
    });

    effect(() => comp());

    runs = 0;
    sig.set(2);

    expect(runs).toBe(1);
  });

  tests("should be glitch-free (Diamond Problem)", () => {
    const root = signal(0);
    const left = computed(() => root() + 1);
    const right = computed(() => root() + 2);

    let effectRuns = 0;
    effect(() => {
      left() + right();
      effectRuns++;
    });

    expect(effectRuns).toBe(1);

    root.set(10);
    expect(effectRuns).toBe(2);
  });
});
