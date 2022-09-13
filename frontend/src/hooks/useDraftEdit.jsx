import axios from 'axios';
import { APIURL } from '../config/key';

/** 타투이스트가 도안을 수정/삭제할 때 호출하는 함수
 * @param {String} draft_id
 * @param {String} tattooist_id 
 * @returns 도안 수정과 도안 삭제 요청을 보내는 함수 반환 
 */
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