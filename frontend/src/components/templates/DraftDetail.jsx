import {
  DraftDetailMainBox,
  HorizontalLine,
  ListDiv,
  SmallDraftBox,
  SmallTattooistBox,
  DraftEditBtn,
  DraftInQuiryBtn,
  ToastAlarmBox
} from "../../styledComponents";
import SmallTattooist from "../organisms/tattooist/SmallTattooist";
import SmallDraft from "../organisms/draft/SmallDraft";
import Genre from "../organisms/tattooist/Genre";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "../../config/cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import useCreateReservation from "../../hooks/useCreateReservation";
import { toast, ToastContainer } from "react-toastify";

// { detail }
const DraftDetail = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { detail } = useOutletContext();
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
    cost: detail.cost,
  };

  useEffect(() => {
    const id = getCookie("tattooist_id");
    if (id && id === tattooist.drawer_id) {
      setIsAdmin(true);
    }

    // console.log(detail)
  }, [detail]);

  const navigate = useNavigate();
  const goEdit = () => {
    navigate("../edit");
  };

  const createReservation = useCreateReservation();

  const onCreateReservation = () => {
    const user = getCookie("user_id");

    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    } else {
      toast.success("상담 요청이 되었습니다");
      const data = {
        customer_id: user,
        tattooist_id: tattooist.drawer_id,
        image: draft.image,
        cost: genre.cost,
      };

      createReservation({ data });
    }
  };

  return (
    <ListDiv>
      <ToastAlarmBox>
        <ToastContainer position="top-right" autoClose="1500" closeOnClick />
      </ToastAlarmBox>
      <DraftDetailMainBox>
        <SmallDraftBox>
          {isAdmin && (
            <DraftEditBtn onClick={goEdit}>
              <FontAwesomeIcon icon={faGear} />
            </DraftEditBtn>
          )}
          <SmallDraft draft={draft} />
        </SmallDraftBox>

        <SmallTattooistBox>
          <SmallTattooist tattooist={tattooist} />
          {/* <HorizontalLine /> */}
          <Genre genre={genre} />
        </SmallTattooistBox>
      </DraftDetailMainBox>

      <DraftInQuiryBtn onClick={onCreateReservation}>
        상담문의
      </DraftInQuiryBtn>
    </ListDiv>
  );
};

export default DraftDetail;
