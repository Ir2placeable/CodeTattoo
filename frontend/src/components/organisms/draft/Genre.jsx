import React from "react";
import {
  TattooistGenreBox,
  TattooistKeyword,
  TattooistKeywordBox,
  TattooistGenreLabel,
  TattooistGenreLabelDiv,
  TattooistKeywords,
} from "../../../styledComponents";

/** 상위 컴포넌트 === DraftDetail.jsx
 * 도안 상세 페이지 / 장르
 * @param {Object} genre 장르 데이터 
 */

const Genre = ({ genre }) => {
  const keywords = genre.keywords;
  return (
    <>
      <TattooistGenreBox>

        <TattooistKeywordBox>
          <TattooistGenreLabelDiv>
            <TattooistGenreLabel>
                장르
            </TattooistGenreLabel>
          </TattooistGenreLabelDiv>
          <TattooistKeyword>
              {genre.genre}
          </TattooistKeyword>
        </TattooistKeywordBox>

        <TattooistKeywordBox>
          <TattooistGenreLabelDiv>
            <TattooistGenreLabel>
                주제
            </TattooistGenreLabel>
          </TattooistGenreLabelDiv>
          <TattooistKeywords>
            {keywords &&
              keywords.map((keyword, idx) => (
                <TattooistKeyword key={idx}>{keyword}</TattooistKeyword>
            ))}
          </TattooistKeywords>
        </TattooistKeywordBox>

        <TattooistKeywordBox>
          <TattooistGenreLabelDiv>
            <TattooistGenreLabel>
                가격
            </TattooistGenreLabel>
          </TattooistGenreLabelDiv>
          <TattooistKeyword>
            {genre.cost} won
          </TattooistKeyword>
        </TattooistKeywordBox>
      </TattooistGenreBox>
    </>
  );
};

export default React.memo(Genre);
