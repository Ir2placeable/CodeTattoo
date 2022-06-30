import React from 'react';
import { 
  ContentsDiv
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowTattooistList = () => {
  return (
    <>
      <SmallNavigationComp texts={["Best", "All"]}
        searchBox={true} location={1} />

      <ContentsDiv>
        
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistList;