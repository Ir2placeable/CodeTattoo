import {
  AuctionImg,
  BidderImgBox,
  BidderProfileBox,
  BidderProfileItem,
  ProfileImgBox,
  ProfileImg,
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Bidder = ({ bidder }) => {
  return (
    <>
      <BidderImgBox>
        <AuctionImg type="bidder" src={bidder.draft_image} />
      </BidderImgBox>
      <BidderProfileBox>
        <ProfileImgBox size="profile">
          {bidder.drawer_image ? (
            <ProfileImg size="profile" src={bidder.drawer_image} />
          ) : (
            <ProfileImgIcon size="profile">
              <FontAwesomeIcon style={{ fontSize: "80px" }} icon={faUser} />
            </ProfileImgIcon>
          )}
        </ProfileImgBox>
        <BidderProfileItem type="nickname">{bidder.drawer_nickname}</BidderProfileItem>
        <BidderProfileItem type="specialize">{bidder.specialize}</BidderProfileItem>
      </BidderProfileBox>
      </>
  );
};

export default Bidder;
