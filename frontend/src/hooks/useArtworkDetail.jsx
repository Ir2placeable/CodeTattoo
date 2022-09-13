import axios from "axios";
import { useEffect, useState } from "react";
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
//     - tattoos = [ state1, state2, state3 … ]
//         - state = { activator_id, state, timestamp, cost, image, body_part, inks, niddle, depth, machine }

const useArtworkDetail = () => {
  const param = useParams();
  const tattoo_id = param.tattoo_id;
  const tattooist_id = param.tattooist_id;

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/artwork/${tattoo_id}?tattooist_id=${tattooist_id}`
    );
    if (res.data.success) {
      console.log(res.data)
      return [res.data.artwork_info, res.data.states, res.data.image];
    } else {
      console.log("Artwork Detail Fail");
    }
  };

  return sendRequest;
};

export default useArtworkDetail;
