import React, { memo } from 'react';
import { DropItem } from '../../../styledComponents';

const DropDownItem = memo(({ text, onClick }) => {
  return (
    <>
      <DropItem
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#BFBCD3'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e9e9e9'
        }}
        onClick={onClick}
      >
        {text}
      </DropItem>
    </>
  );
});

export default DropDownItem;