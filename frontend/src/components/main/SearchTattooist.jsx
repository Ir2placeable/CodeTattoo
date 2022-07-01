import React, { useState, useEffect } from "react";
import {} from "../../styledComponents";
import { APIURL } from "../../config/key";
import axios from "axios";

const SearchTattooist = ({ cookies, filter }) => {
  const [tattooist, setTattoist] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async () => {
    const res = await axios.get(`${APIURL}/tattooist/${filter}`);
    console.log(res);

    if (res.data.success) {
      setTattoist(res.data.tattooist_list);
    } else {
      console.log("Tattooist List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return <></>;
};

export default SearchTattooist;
