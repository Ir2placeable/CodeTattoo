import axios from 'axios';
import React from 'react';
import { APIURL } from '../config/key';

// ### 타투이스트 도안 삭제

// - POST : /remove/draft/:id
//     - id : tattooist_id
// - body : { draft_id }
// - return : { success }

// ### 타투이스트 도안 수정

// - PATCH : /draft/:id
//     - id : draft_id
// - Body : { title, genre, [keywords] }
// - Return : { success }
// - 특이사항 : 이미지 수정 구현하지 않음
const useDraftEdit = ({ draft_id, tattooist_id }) => {
  const deleteDraft = async() => {
    const res = await axios.post(`${APIURL}/remove/draft/${tattooist_id}`, {
      draft_id
    })

    if(res.data.success){
      console.log('도안 삭제 성공')
    } else {
      console.log('도안 삭제 실패')
    }
  }

  const editDraft = async({title, genre, keywords, cost}) => {
    //console.log(title, genre, keywords)
    const res = await axios.patch(`${APIURL}/draft/${draft_id}`, {
      title, genre, keywords, cost
    })

    if(res.data.success){
      console.log('도안 수정 성공')
    } else {
      console.log('도안 수정 실패')
      console.log(res.data)
    }
  }

  return [deleteDraft, editDraft]

};

export default useDraftEdit;