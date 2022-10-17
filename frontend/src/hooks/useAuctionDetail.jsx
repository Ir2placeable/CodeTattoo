import axios from "axios";
import { APIURL } from "../config/key";
import { useEffect, useState } from "react";
import { getCookie } from "../config/cookie";
import { useParams } from "react-router-dom";

/** 경매 상세 페이지 / 경매 상세 데이터 API
 * @returns 경매 상세 데이터 반환
 */

const useAuctionDetail = () => {
    
    const [auction, setAuction] = useState({
        auction_id: "",
        creator: "",
        image: "",
        genre: "",
        cost: "",
        bidder_count: "",
        bidders: [],
    })

    const param = useParams();
    const auction_id = param.id;

    const sendRequest = async () => {

        let query = "";
        if (getCookie("user_id")) {
            query = `?user_id=${getCookie("user_id")}`;
        }
        const res = await axios.get(`${APIURL}/auction/${auction_id}${query}`);

        if (res.data.success) {
            setAuction(res.data.auction)
        } else {
            console.log("Auction Detail Get Request Fail");
        }
    }

    useEffect(() => {
        sendRequest();
    },[])

    return auction;
}

export default useAuctionDetail;