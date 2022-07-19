import React from 'react';
import { DraftImg } from '../../../styledComponents';

const DraftImage = ({ src, alt, id }) => {

  return (
    <>
      <DraftImg 
        src={src}
        alt={alt}
        id={id}
      />
    </>
  );
};

export default React.memo(DraftImage);