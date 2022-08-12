import {
  DraftDetailMainBox,
  HorizontalLine,
  ListDiv,
  SmallDraftBox,
  SmallTattooistBox,
} from "../../styledComponents";
import SmallTattooist from "../organisms/tattooist/SmallTattooist";
import SmallDraft from "../organisms/draft/SmallDraft";
import Genre from "../organisms/tattooist/Genre";

const DraftDetail = ({ detail }) => {
  const draft = {
    draft_id: detail.draft_id,
    image: detail.image,
    title: detail.title,
    like: detail.like,
    isScraped: detail.isScraped,
  };
  const tattooist = {
    drawer_id: detail.drawer_id,
    drawer_image: detail.drawer_image,
    drawer_nickname: detail.drawer_nickname,
    drawer_location: detail.drawer_location,
    isFollowed: detail.isFollowed,
  };
  const genre = {
    genre: detail.genre,
    keywords: detail.keywords,
  };

  return (
    <ListDiv>
      <DraftDetailMainBox>
        <SmallDraftBox>
          <SmallDraft draft={draft} />
        </SmallDraftBox>
        <SmallTattooistBox>
          <SmallTattooist tattooist={tattooist} />
          <HorizontalLine />
          <Genre genre={genre} />
        </SmallTattooistBox>
      </DraftDetailMainBox>
    </ListDiv>
  );
};

export default DraftDetail;
