import React from 'react';
import { UserTextDiv, UserTextUl ,UserTextLi } from '../styledComponents';

const MyPageText = ({ texts }) => {
  return (
    <>
      <UserTextDiv>

        <UserTextUl>

          {
            texts.map(text => (
              <UserTextLi key={text.name}>
                {text.name} - {text.desc}
              </UserTextLi>
            ))
          }

        </UserTextUl>

      </UserTextDiv>
    </>
  );
};

export default MyPageText;