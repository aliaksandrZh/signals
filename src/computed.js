import { createComputedNode } from './reactive-node';

export const computed = (computation) => {
  const node = createComputedNode();
  node.computation = computation;

  node.setActiveConsumer(node);
  
  node.producerRecomputeValue(node);

  const computedFn = () => {
    node.producerAccessed(node);
    return node.value;
  }

  node.setActiveConsumer(null);

  return computedFn;
}