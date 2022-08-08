import React from 'react';
import { DraftImg } from '../../../styledComponents';

const DraftImage = ({ src, alt, id, onHover }) => {

  return (
    <>
      <DraftImg 
        src={src}
        alt={alt}
        id={id}
        onMouseEnter={onHover}
      />
    </>
  );
};

export default React.memo(DraftImage);