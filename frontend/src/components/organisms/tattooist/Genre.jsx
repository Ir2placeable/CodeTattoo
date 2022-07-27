import React from "react";
import {
  TattooistGenreBox,
  TattooistKeyword,
  TattooistKeywordBox,
} from "../../../styledComponents";

const Genre = ({ genre }) => {
  console.log("Genre");
  const keywords = genre.keywords;
  return (
    <>
      <TattooistGenreBox>
        {genre.genre}
        <TattooistKeywordBox>
          {keywords &&
            keywords.map((keyword) => (
              <TattooistKeyword key={keyword.id}>
                {keyword.content}
              </TattooistKeyword>
            ))}
        </TattooistKeywordBox>
      </TattooistGenreBox>
    </>
  );
};

export default Genre;
