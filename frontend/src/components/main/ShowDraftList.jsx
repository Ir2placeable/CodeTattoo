import React from 'react';
import { 
  ContentsDiv
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowDraftList = () => {
  return (
    <>
      <SmallNavigationComp texts={["Best", "All"]}
        searchBox={true} location={0} />

      <ContentsDiv>
        
      </ContentsDiv>
    </>
  );
};

export default ShowDraftList;