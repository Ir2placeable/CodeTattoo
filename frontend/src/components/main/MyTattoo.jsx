import React, { useState, useEffect } from "react";
import {
  EmptyBox,
  ListDiv,
  MyTattooMainBox,
  MyTattooImg,
  MyTattooContainer,
} from "../../styledComponents";
import { APIURL } from "../../config/key";
import axios from "axios";

const MyTattoo = ({ cookies }) => {
  const [tattoos, setTattoos] = useState([]);
  const [noTattoo, setNoTattoo] = useState(false);

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/main/my-tattoo/?user_id=${cookies.user_id}`
    );

    if (res.data.success) {
      setTattoos(res.data.tattoo_list);
      /*
        - tattoo_id
        - state
        - tattooist_id 
      */
      console.log(tattoos);
    } else {
      console.log("Tattoo List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <ListDiv>
        <MyTattooMainBox>
          <MyTattooContainer>
            <MyTattooImg>Image</MyTattooImg>
            <p>HI</p>
          </MyTattooContainer>
        </MyTattooMainBox>
      </ListDiv>
    </>
  );
};

export default MyTattoo;
