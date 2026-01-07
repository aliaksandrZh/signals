import { createSignalNode } from './reactive-node';

export const signal = (initialValue) => {
  const node = createSignalNode();
  node.value = initialValue;
  const signalFn = () => {
    node.producerAccessed(node);
    return node.value;
  };
  signalFn.set = (newValue) => {
    (node.value  = newValue);
    node.producerNotifyConsumers(node);
  };
  signalFn.update = (updater) => (node.value  = updater(node.value));
  return signalFn;
};
