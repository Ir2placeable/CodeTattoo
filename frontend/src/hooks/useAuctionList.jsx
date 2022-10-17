import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { APIURL } from "../config/key";
import { getCookie } from "../config/cookie";

/** 경매 목록 페이지 / 경매 목록 데이터 API
 * @param {String} filter 전체 / 커버 업 / 도안 요청
 * @param {Number} page 페이지네이션
 * @returns 경매 목록 반환
 */

const useAuctionList = ({ filter, page }) => {
    const [auctions, setAuctions] = useState([]);
    const param = useParams();
    const title = param.title;

    const sendRequest = async () => {
        let query = ""

        if(getCookie('user_id')){
          query = `?user_id=${getCookie('user_id')}`
          if(title){
            query += `&title=${title}`
          }
        } else {
          if(title){
            query = `?title=${title}`
          }
        }

        const res = await axios.get(`${APIURL}/${filter}/${page}${query}`);
    
        if (res.data.success) {
          setAuctions(res.data.auctions);
        } else {
          console.log(`${APIURL}/${filter}/${page}${query}`);
        }
      };
    
      useEffect(() => {
        sendRequest();
      }, [filter, page, title]);
    
      return auctions;
}

export default useAuctionList;