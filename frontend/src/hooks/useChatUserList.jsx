import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../config/cookie";
import { CHATAPIURL } from "../config/key";

// ### 채팅 리스트 조회

// *채팅 페이지 → 왼쪽 채팅 리스트를 반환하는 API 입니다.*

// - GET : /chat/userlist/:type/:id
//     - type : 현재 접속한 사용자의 타입 (user, tattooist)
//     - id : 현재 접속한 사용자의 id (user_id, tattooist_id)
// - Query : None
// - Return : { success, userlist }
//     - userlist = 
//     [{ content, createdAt, opponent_id, opponent_image, 
//       opponent_nickname } ]
//     → Image type은 url, createdAt은 String
const useChatUserList = () => {
    const [chatList, setChatList] = useState([]);

    const sendRequest = async () => {
        let url = "";
        if (getCookie("user_id")) {
            url = `user/${getCookie("user_id")}`;
        } else if (getCookie("tattooist_id")) {
            url = `tattooist/${getCookie("tattooist_id")}`;
        }

        // test 용 유저 아이디
        // url = 'user/6315859fa26479438d3c1b95'

        const res = await axios.get(`${CHATAPIURL}/chat/list/${url}`);
        
        if(res.data.success){
            console.log('userlist: ',res.data)
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