import React, { useState, useEffect } from "react";
import {
  ContentsDiv,
  EmptyBox,
  ListDiv,
  MyTattooMainBox,
  MyTattooImg,
  MyTattooContainer,
  MyTattooBtn,
  MyTattooStateBox,
  MyTattooCardContainer,
  MyTattooCard,
  MyTattooCardFaceOne,
  MyTattooCardFaceTwo,
  MyTattooContentOne,
  MyTattooContentTwo,
} from "../../styledComponents";
import { APIURL } from "../../config/key";
import axios from "axios";

const ShowMyTattoo = ({ cookies }) => {
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
      <ContentsDiv>
        <ListDiv>
          <MyTattooMainBox>
            <MyTattooContainer>
              <MyTattooImg>Image</MyTattooImg>
              <MyTattooStateBox>
                <MyTattooBtn>←</MyTattooBtn>
                <MyTattooCardContainer>
                  <MyTattooCard>
                    <MyTattooCardFaceOne>
                      <MyTattooContentOne>
                        <h3>State 0</h3>
                      </MyTattooContentOne>
                    </MyTattooCardFaceOne>
                    <MyTattooCardFaceTwo>
                      <MyTattooContentTwo>
                        <p>State와 관련된 content를 보여주는 공간입니다.</p>
                      </MyTattooContentTwo>
                    </MyTattooCardFaceTwo>
                  </MyTattooCard>

                  <MyTattooCard>
                    <MyTattooCardFaceOne>
                      <MyTattooContentOne>
                        <h1>State 1</h1>
                      </MyTattooContentOne>
                    </MyTattooCardFaceOne>
                    <MyTattooCardFaceTwo>
                      <MyTattooContentTwo>
                        <p>State와 관련된 content를 보여주는 공간입니다.</p>
                      </MyTattooContentTwo>
                    </MyTattooCardFaceTwo>
                  </MyTattooCard>

                  <MyTattooCard>
                    <MyTattooCardFaceOne>
                      <MyTattooContentOne>
                        <h3>State 2</h3>
                      </MyTattooContentOne>
                    </MyTattooCardFaceOne>
                    <MyTattooCardFaceTwo>
                      <MyTattooContentTwo>
                        <p>State와 관련된 content를 보여주는 공간입니다.</p>
                      </MyTattooContentTwo>
                    </MyTattooCardFaceTwo>
                  </MyTattooCard>
                </MyTattooCardContainer>
                <MyTattooBtn>→</MyTattooBtn>
              </MyTattooStateBox>
            </MyTattooContainer>
          </MyTattooMainBox>
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowMyTattoo;
