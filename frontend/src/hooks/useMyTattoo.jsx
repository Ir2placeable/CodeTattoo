import axios from "axios";
import { useState, useEffect } from "react";
import { APIURL } from "../config/key";

const useMyTattoo = ({ cookies }) => {
  const [tattoos, setTattoos] = useState([]);

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/main/my-tattoo/?user_id=${cookies.user_id}`
    );

    if (res.data.success) {
      setTattoos(res.data.tattoo_list);
      console.log(res.data.tattoo_list);
    } else {
      console.log("Tattoo List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return tattoos;
};

export default useMyTattoo;
