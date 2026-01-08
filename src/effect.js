import { createEffectNode } from "./reactive-node";
import { setActiveConsumer, producerRemoveConsumer, producerRecomputeValue } from "./reactivity";

export const effect = (computation) => {
  const node = createEffectNode();
  node.computation = computation;

  setActiveConsumer(node);
  producerRecomputeValue(node);

  const cleanupFn = () => {
    producerRemoveConsumer(node);
  };

  setActiveConsumer(null);

  return cleanupFn;
};
