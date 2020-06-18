import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { set } from 'lodash';

import { orderDragged } from './helpers';
import OrderableMultiValue from './components/OrderableMultiValue';

const OrderableSelect = ({
  onChange,
  defaultValue,
  value,
  options,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(
    value.map(v => options.find(opt => opt.value === v)).filter(v => !!v)
  );
  const moveDraggedOption = (dragIndex, hoverIndex) => {
    setInternalValue(orderDragged(internalValue, dragIndex, hoverIndex));
  };

  return (
    <Select
      components={{ MultiValue: OrderableMultiValue }}
      isMulti
      moveDraggedOption={moveDraggedOption}
      styles={{
        multiValue: (styles, { isDragging }) => ({
          ...styles,
          opacity: isDragging ? 0.5 : null,
        }),
      }}
      {...props}
      options={options}
      value={internalValue.map((o, i) => set(o, 'index', i))}
      onChange={(newValue, actionMeta) => {
        setInternalValue(newValue);
        onChange(newValue, actionMeta);
      }}
    />
  );
};
OrderableSelect.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.array,
  value: PropTypes.array,
};
OrderableSelect.defaultProps = {
  onChange: () => {},
  defaultValue: null,
  value: null,
};

export default OrderableSelect;
