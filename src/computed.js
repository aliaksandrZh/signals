import { createComputedNode } from "./reactive-node";
import { setActiveConsumer, producerAccessed, producerRecomputeValue } from "./reactivity";

export const computed = (computation) => {
  const node = createComputedNode();
  node.computation = computation;

  setActiveConsumer(node);
  producerRecomputeValue(node);

  const computedFn = () => {
    producerAccessed(node);
    return node.value;
  };

  setActiveConsumer(null);

  return computedFn;
};
