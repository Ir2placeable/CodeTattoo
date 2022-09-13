import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../config/cookie";
import { CHATAPIURL } from "../config/key";

/** 채팅 페이지에서 채팅 목록 데이터 호출 함수
 * @returns 채팅 목록
 */
const useChatUserList = () => {
    const [chatList, setChatList] = useState([]);

    const sendRequest = async () => {
        let url = "";
        if (getCookie("user_id")) {
            url = `user/${getCookie("user_id")}`;
        } else if (getCookie("tattooist_id")) {
            url = `tattooist/${getCookie("tattooist_id")}`;
        }

        const res = await axios.get(`${CHATAPIURL}/chat/list/${url}`);
        
        if(res.data.success){
            console.log(res.data)
            setChatList(res.data.userlist)
        } else {
            console.log('get chatting user list fail')
        }
    };

    useEffect(() => {
        sendRequest();
    }, [])

    return chatList;
}

export default useChatUserList;