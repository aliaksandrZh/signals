import { createSignalNode } from "./reactive-node";
import { producerAccessed, producerNotifyConsumers } from "./reactivity";

export const signal = (initialValue) => {
  const node = createSignalNode();
  node.value = initialValue;
  const signalFn = () => {
    producerAccessed(node);
    return node.value;
  };
  signalFn.set = (newValue) => {
    node.value = newValue;
    producerNotifyConsumers(node);
  };
  signalFn.update = (updater) => {
    node.value = updater(node.value);
    producerNotifyConsumers(node);
  };
  return signalFn;
};
