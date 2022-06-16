import React from 'react';
import { FooterDiv, FooterText } from '../styledComponents';

const Footer = () => {
  return (
    <>
      <FooterDiv>
        <FooterText>
          Back-end: Seongyeol An /   
          Front-end: Ahyoung Kim
        </FooterText>
        <FooterText>
          Tech Stack: React / Node.js / HyperLedger Fabric / MongoDB
        </FooterText>
      </FooterDiv>
    </>
  );
};

export default React.memo(Footer);