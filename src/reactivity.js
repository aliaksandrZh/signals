let activeConsumer;

export const producerNotifyConsumers = (node) => {
  if (!node.consumers) return;
  for (const consumer of node.consumers) {
    producerRecomputeValue(consumer);
    producerNotifyConsumers(consumer);
  }
};

export const producerRemoveConsumer = (node) => {
  for (const producer of node.producers) {
    producer.consumers = producer.consumers.filter((c) => c != node);
  }
  node.producers = [];
};

export const producerAccessed = (node) => {
  if (!activeConsumer) return;

  activeConsumer.producers.push(node);
  node.consumers.push(activeConsumer);
};

export const producerRecomputeValue = (node) => {
  node.value = node.computation();
};

export const setActiveConsumer = (consumer) => {
  activeConsumer = consumer;
};
