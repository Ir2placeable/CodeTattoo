import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { APIURL } from "../config/key";


// ### 작업물 세부

// - GET : /artwork/:id
//     - id : tattoo_id
// - Query : { tattooist_id }
// - Return : { success, artwork_info, artwork_states }
//     - artwork_info = { image, date, taken_time, cost, tattooist_nickname, body_part, inks, machine }
//         - date : 시술 날짜
//         - taken_time(소요시간) : Unix time
//     - artwork_states = [ state1, state2, state3 … ]
//         - state = { activator_id, state, timestamp, cost, image, body_part, inks, niddle, depth, machine }

const useArtworkDetail = (tattooist_id) => {
    const param = useParams();
    const tattoo_id = param.tattoo_id;
    const [artwork, setArtwork] = useState();

    const sendRequest = async () => {
        const res = await axios.get(`${APIURL}/artwork/${tattoo_id}?tattooist_id=${tattooist_id}`)
    }
}

export default useArtworkDetail;