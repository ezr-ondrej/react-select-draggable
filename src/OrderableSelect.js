import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { set, map } from "lodash";

import { orderDragged } from "./helpers";
import OrderableMultiValue from "./components/OrderableMultiValue";

const OrderableSelect = ({
  onChange,
  // defaultValue,
  value,
  options,
  ...props
}) => {
  const internalValue = map(value, (v) => options.find((opt) => opt.value === v.value)).filter(
    (v) => !!v
  );
  const moveDraggedOption = (dragIndex, hoverIndex) => {
    const oderDraggedInternalValue = orderDragged(
      internalValue,
      dragIndex,
      hoverIndex
    );

    onChange(oderDraggedInternalValue);
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
        options={options}
        value={map(internalValue, (o, i) => set(o, "index", i))}
        onChange={(newValue, actionMeta) => {
          onChange(newValue, actionMeta);
        }}
        {...props}
      />
    </DndProvider>
  );
};
OrderableSelect.propTypes = {
  onChange: PropTypes.func,
  // defaultValue: PropTypes.array,
  value: PropTypes.array,
};
OrderableSelect.defaultProps = {
  onChange: () => {},
  // defaultValue: null,
  value: null,
};

export default OrderableSelect;
