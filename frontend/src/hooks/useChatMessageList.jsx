import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../config/cookie";
import { CHATAPIURL } from "../config/key";

const useChatMessageList = () => {
    const [messageList, setMessageList] = useState([]);
    const sendRequest = async () => {
        let url = "";
        if (getCookie("user_id")) {
            url = `user/${getCookie("user_id")}`;
        } else if (getCookie("tattooist_id")) {
            url = `tattooist/${getCookie("tattooist_id")}`;
        }

        const res = await axios.get(`${CHATAPIURL}/chat/userlist/${url}`);
        console.log(res);
    };

    useEffect(() => {
        sendRequest();
    }, [])

    return chatList;
}

export default useChatMessageList;