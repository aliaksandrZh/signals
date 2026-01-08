export const REACTIVE_NODE = {
  consumers: [],
  producers: [],
  producerValueChanged: undefined,
  value: null,
  activeConsumer: null,
};

export const SIGNAL_REACTIVE_NODE = {
  ...REACTIVE_NODE,
  kind: "signal",
};

export const COMPUTED_REACTIVE_NODE = {
  ...REACTIVE_NODE,
  kind: "computed",
  computation: () => {},
};

let NODE_ID = 1;

const createReactiveNode = (node) => {
  const _node = Object.create(node);
  _node.NODE_ID = NODE_ID++;
  _node.consumers = [];
  _node.producers = [];
  return _node;
};

export const createSignalNode = () => {
  return createReactiveNode(SIGNAL_REACTIVE_NODE);
};
export const createComputedNode = () => {
  const node = createReactiveNode(COMPUTED_REACTIVE_NODE);
  return node;
};
