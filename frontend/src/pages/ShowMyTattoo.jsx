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
} from "../styledComponents";
import { APIURL } from "../config/key";
import axios from "axios";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from "swiper";

const ShowMyTattoo = ({ cookies }) => {
  const [tattoos, setTattoos] = useState([]);
  const [noTattoo, setNoTattoo] = useState(false);
  const [index, setIndex] = useState(0);

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
      console.log(res.data.tattoo_list);
    } else {
      console.log("Tattoo List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const onRightClick = () => {
    setIndex((prevIndex) =>
      prevIndex >= datas.length - 3 ? datas.length - 3 : prevIndex + 1
    );
    console.log(index);
  };

  const onLeftClick = () => {
    setIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
    console.log(index);
  };

  const datas = [
    {
      id: 0,
      state: 0,
      description: "State와 관련된 content를 보여주는 공간입니다.",
    },
    {
      id: 1,
      state: 1,
      description: "State와 관련된 content를 보여주는 공간입니다.",
    },
    {
      id: 2,
      state: 2,
      description: "State와 관련된 content를 보여주는 공간입니다.",
    },
    {
      id: 3,
      state: 3,
      description: "State와 관련된 content를 보여주는 공간입니다.",
    },
  ];
  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <MyTattooMainBox>
            <MyTattooContainer>
              <MyTattooImg>Image</MyTattooImg>
              <MyTattooStateBox>
                <MyTattooBtn onClick={onLeftClick}>←</MyTattooBtn>
                <MyTattooCardContainer>
                  {datas.slice(index, index + 3).map((data) => (
                    <MyTattooCard key={data.id}>
                      <MyTattooCardFaceOne>
                        <MyTattooContentOne>
                          <h3>State {data.state}</h3>
                        </MyTattooContentOne>
                      </MyTattooCardFaceOne>
                      <MyTattooCardFaceTwo>
                        <MyTattooContentTwo>
                          <p>{data.description}</p>
                        </MyTattooContentTwo>
                      </MyTattooCardFaceTwo>
                    </MyTattooCard>
                  ))}
                </MyTattooCardContainer>
                <MyTattooBtn onClick={onRightClick}>→</MyTattooBtn>
              </MyTattooStateBox>
            </MyTattooContainer>
          </MyTattooMainBox>
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowMyTattoo;
