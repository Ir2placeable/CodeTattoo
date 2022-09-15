import React from "react";
import { useOutletContext } from "react-router-dom";
import { GridDiv, MyPageAddBtn, MyPageAddBtnDiv } from "../../styledComponents";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailDraft from "../organisms/tattooist/DetailDraft";
import { getCookie } from "../../config/cookie";

/** 
 * 상위 컴포넌트 === ShowTattooistDetail.jsx
 * 타투이스트 도안 목록 템플릿 
 */

const TattooistDetailDraft = () => {
  // 도안 데이터
  const items = useOutletContext();

  // 관리자 여부
  const [isAdmin, setIsAdmin] = useState(false);
  const params = useParams();

  useEffect(() => {
    if(params.tattooist_id === getCookie('tattooist_id')){
      setIsAdmin(true);
    }
  }, [])

  const onMouseEnter = (e) => {
    e.target.innerText = `${e.target.id} 추가`
  }
  const onMouseLeave = (e) => {
    e.target.innerText = '+';
  }

  const navigate = useNavigate();

  return (
    <>
      <GridDiv>
        {items &&
          items.map((draft) => (
            <DetailDraft key={draft.draft_id} draft={draft} />
          ))}
      </GridDiv>

      {isAdmin && (
        <MyPageAddBtnDiv>
          <MyPageAddBtn 
            type="draft"
            id="도안"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => navigate('/upload')}
          >
            +
          </MyPageAddBtn>
        </MyPageAddBtnDiv>
        )}
    </>
  );
};

export default TattooistDetailDraft;
