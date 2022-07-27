import React from "react";
import { useCombobox } from "downshift";

function Combobox({ label, placeholder, items }) {
  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items,
  });

  return (
    <>
      <label {...getLabelProps()}>{label}</label>
      <div {...getComboboxProps()}>
        <input readOnly placeholder={placeholder} {...getInputProps()} />
        <button {...getToggleButtonProps()}>&gt;</button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              {...getItemProps({ item, index })}
              key={item}
              style={{ background: index === highlightedIndex && "lightgray" }}
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Combobox;