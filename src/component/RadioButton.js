import React from 'react';

const RadioButton = ({ value, active, set_active }) => {
  const onClick = () => {
    set_active(value);
  };

  return (
    <button 
      className='radio-button' style={{
        borderWidth: active === value ? '4px' : '1px', 
        fontWeight: active === value ? 'bolder' : 'normal', 
        borderRadius: active === value ? '10px' : '6px', 
      }} onClick={onClick}
    >
      {value}
    </button>
  );
};

export default RadioButton;
