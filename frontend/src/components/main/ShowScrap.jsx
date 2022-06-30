import React from 'react';
import { 
  ContentsDiv
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowScrap = () => {
  <>
      <SmallNavigationComp texts={["Draft", "Tattooist"]}
        searchBox={false} location={2} />

      <ContentsDiv>
        
      </ContentsDiv>
    </>
};

export default ShowScrap;