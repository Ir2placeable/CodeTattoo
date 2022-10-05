import React from "react";
import useDraftList from "../../hooks/useDraftList";
import { ListDiv, EmptyBox, DraftMainBox } from "../../styledComponents";
import Draft from "../organisms/draft/Draft";
import { useOutletContext } from "react-router-dom";

/**
 * 상위 컴포넌트 === ShowDraftList.jsx
 * 도안 목록 템플릿
 * @param {String} filter 추천순/최신순
 */
const DraftList = ({ filter }) => {
  // 페이지네이션
  const { page } = useOutletContext();

  // 도안 목록 데이터
  const drafts = useDraftList({
    filter: filter,
    page: page,
  });

  return (
    <>
      <ListDiv>
        {drafts.length === 0 ? (
          <EmptyBox>
            {filter === "drafts/search" ? (
              <>검색 결과가 없습니다.</>
            ) : (
              <>아직 도안이 없습니다.</>
            )}
          </EmptyBox>
        ) : (
          <DraftMainBox>
            {drafts.map((draft) => (
              <Draft
                key={draft.draft_id}
                draft_id={draft.draft_id}
                image={draft.image}
                title={draft.title}
                like={draft.like}
                drawer_id={draft.drawer_id}
                drawer_image={draft.drawer_image}
                drawer_nickname={draft.drawer_nickname}
                isScraped={draft.isScraped}
                genre={draft.genre}
              />
            ))}
          </DraftMainBox>
        )}
      </ListDiv>
    </>
  );
};

export default DraftList;
