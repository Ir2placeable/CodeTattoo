import React from "react";
import {
  EmptyBox,
  ListDiv,
  TattooistMainBox,
  TattooistContainer,
  TattooistControlBox,
  TattooistBtn,
} from "../../styledComponents";
import Tattooist from "../organisms/Tattooist";
import FollowBtn from "../common/FollowBtn";

const TattooistList = ({ tattooists }) => {
  console.log("Tattooist List");
  return (
    <>
      <TattooistMainBox>
        {tattooists.map((tattooist) => (
          <TattooistContainer key={tattooist.tattooist_id}>
            <Tattooist tattooist={tattooist} />
            {/*<TattooistControlBox>
              <FollowBtn
                tattooist_id={tattooist.tattooist_id}
                isFollowed={tattooist.isFollowed}
              ></FollowBtn>
              <TattooistBtn>Reserve</TattooistBtn>
            </TattooistControlBox>*/}
          </TattooistContainer>
        ))}
      </TattooistMainBox>
    </>
  );
};

export default TattooistList;
