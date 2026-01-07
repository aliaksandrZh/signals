let activeConsumer;

export const REACTIVE_NODE = {
  consumers: [],
  producers: [],
  producerValueChanged: undefined,
  value: null,
  activeConsumer: null,
  producerNotifyConsumers: (node) => {
    if (!node.consumers) return;
    for (const consumer of node.consumers) {
      consumer.producerRecomputeValue(consumer);
      consumer.producerNotifyConsumers(consumer);
    }
  },
  producerAccessed: (node) => {
    if (!activeConsumer) return;

    activeConsumer.producers.push(node);
    node.consumers.push(activeConsumer);
  },
  setActiveConsumer: (consumer) => {
    activeConsumer = consumer;
  }
};

export const COMPUTED_REACTIVE_NODE = {
  ...REACTIVE_NODE,
  kind: 'computed',
  computation: () => {},
  producerRecomputeValue: (node) => {
    node.value = node.computation();
  }
}

let NODE_ID = 1;

const createReactiveNode = (kind) => {
  const node = Object.create(REACTIVE_NODE);
  node.kind = kind;
  node.NODE_ID = NODE_ID++;
  node.consumers = [];
  node.producers = [];
  return node;
}

export const createSignalNode = () => {
  return createReactiveNode('signal');
}
export const createComputedNode = () => {
  const node =  Object.create(COMPUTED_REACTIVE_NODE);
  node.NODE_ID = NODE_ID++;
  node.consumers = [];
  node.producers = [];
  return node;
}
