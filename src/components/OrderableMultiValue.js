import React from 'react';
import { components } from 'react-select';

import { orderable } from '../helpers';

const orderConfig = {
  getItem: props => ({ value: props.selectProps.getOptionValue(props.data) }),
  getIndex: props => props.data.index,
  getMoveFnc: props => props.selectProps.moveDraggedOption,
};

// Wrap component to be draggable and droppable
const OrderableMultiValue = orderable(
  components.MultiValue,
  'multiValue',
  orderConfig
);

/**
 * Select's Control component prevents default on a MouseDown event
 * this component stops propagation of that event for the default - begginDrag - actually happen.
 */
export default props => (
  <div
    onMouseDown={e => {
      e.stopPropagation();
    }}
  >
    <OrderableMultiValue {...props} />
  </div>
);
