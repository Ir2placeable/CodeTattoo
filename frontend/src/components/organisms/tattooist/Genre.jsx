import React from "react";
import {
  TattooistGenreBox,
  TattooistKeyword,
  TattooistKeywordBox,
  TattooistGenreLabel
} from "../../../styledComponents";

const Genre = ({ genre }) => {
  console.log("Genre");
  const keywords = genre.keywords;
  console.log(keywords)
  return (
    <>
      <TattooistGenreBox>
        <TattooistGenreLabel>장르</TattooistGenreLabel> 
        {genre.genre}
        <TattooistKeywordBox>
          <TattooistGenreLabel>주제</TattooistGenreLabel>
          {keywords &&
            keywords.map((keyword, idx) => (
              <TattooistKeyword key={idx}>
                {keyword}
              </TattooistKeyword>
            ))}
        </TattooistKeywordBox>
      </TattooistGenreBox>
    </>
  );
};

export default Genre;
