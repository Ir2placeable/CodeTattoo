import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { APIURL } from '../../config/key';

import { 
  DeleteDiv, DeleteText, DeleteImgDiv, 
  DeleteImg, DeleteDesc, DeleteBtn
} from '../../styledComponents';

// - DELETE : http://3.39.196.91:3001/main/my-draft
// - query : { tattooist_id, draft_id }
// - return : { success }

const TrashIcon = ({ size, cookies, draft_id, image }) => {
  const [isClick, setIsClick] = useState(false);

  const iconStyle = {
    fontSize: `${size}px`,
    cursor: 'pointer',
    color: 'rgba(72, 72, 72)',
  }

  const sendRequest = async() => {
    const res = await axios.delete(`${APIURL}/main/my-draft/?tattooist_id=${cookies.tattooist_id}&draft_id=${draft_id}`)

    if(res.data.success){
      console.log('삭제 완료')
      setIsClick(false);
      //window.location.replace('/manageDraft')
    }
  }

  const onDelete = () => {
    
    sendRequest();
  }

  return (
    <>
      <FontAwesomeIcon 
        onClick={() => setIsClick(true)}
        style={iconStyle}
        icon={faTrashCan}
      />

      {isClick && (
        <DeleteDiv>
          <DeleteText>
            DELETE
          </DeleteText>

          <DeleteImgDiv>
            <DeleteImg src={image} />
          </DeleteImgDiv>

          <DeleteDesc>
            정말 이 도안을 삭제하시겠습니까?
          </DeleteDesc>

          <DeleteBtn onClick={onDelete}>삭제</DeleteBtn>
          <DeleteBtn onClick={() => setIsClick(false)}>취소</DeleteBtn>
        </DeleteDiv>
      )}
      
    </>
  );
};

export default TrashIcon;