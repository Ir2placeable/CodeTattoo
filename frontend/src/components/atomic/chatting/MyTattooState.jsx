import React from 'react';
import { MyTattooInfo, MyTattooInfoDiv, MyTattooInfoSmall, MyTattooLabel, MyTattoooInfoBig, MyTattooStatus } from '../../../styledComponents';

const MyTattooState = ({
  state, cost, body_part, 
  depth, inks, machine, niddle
}) => {
  return (
    <>
      <MyTattooStatus>
        {state}
      </MyTattooStatus>

      <MyTattooInfoDiv color={state === '작업시작' ? "green" : "blue"}>

        <MyTattoooInfoBig>
          <MyTattooInfoSmall>
            <MyTattooLabel>가격</MyTattooLabel>
            <MyTattooInfo>{cost} won</MyTattooInfo>
          </MyTattooInfoSmall>
          <MyTattooInfoSmall>
            <MyTattooLabel>시술부위</MyTattooLabel>
            <MyTattooInfo>{body_part}</MyTattooInfo>
          </MyTattooInfoSmall>
        </MyTattoooInfoBig>

        <MyTattoooInfoBig>
          <MyTattooInfoSmall>
            <MyTattooLabel>사용기기</MyTattooLabel>
            <MyTattooInfo>{machine}</MyTattooInfo>
          </MyTattooInfoSmall>
          <MyTattooInfoSmall>
            <MyTattooLabel>사용바늘</MyTattooLabel>
            <MyTattooInfo>{niddle}</MyTattooInfo>
          </MyTattooInfoSmall>
        </MyTattoooInfoBig>

        <MyTattoooInfoBig>
          <MyTattooInfoSmall>
            <MyTattooLabel>사용잉크</MyTattooLabel>
            <MyTattooInfo>{inks}</MyTattooInfo>
          </MyTattooInfoSmall>
          <MyTattooInfoSmall>
            <MyTattooLabel>주사깊이</MyTattooLabel>
            <MyTattooInfo>{depth}</MyTattooInfo>
          </MyTattooInfoSmall>
        </MyTattoooInfoBig>

      </MyTattooInfoDiv>
    </>
  );
};

export default React.memo(MyTattooState);