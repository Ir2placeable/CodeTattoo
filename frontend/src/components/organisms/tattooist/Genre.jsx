import React from "react";
import {
  TattooistGenreBox,
  TattooistKeyword,
  TattooistKeywordBox,
  TattooistGenreLabel,
  TattooistGenreLabelDiv,
  TattooistKeywords,
} from "../../../styledComponents";

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
