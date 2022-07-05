import styled from "styled-components";

// ======================  COMMON  =====================

// =========================  HEADER  ======================
export const HeaderDiv = styled.header`
  background-color: #f6f6f6;
  height: 90px;
`;

export const HeaderInner = styled.div`
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const HeaderTitle = styled.div`
  font-size: 35px;
  font-weight: bold;
  width: max-content;
  line-height: 90px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
  text-shadow: 5px 7px 10px #b7b7b7;
`;

export const HeaderSubMenu = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 0;
`;

export const HeaderBtn = styled.div`
  margin-right: 5px;
  background-color: #484848;
  border: 2px solid #484848;
  color: #f6f6f6;
  font-size: 14px;
  line-height: 25px;
  width: 70px;
  border-radius: 5px;
  text-align: center;
  transition: 0.45s;
  cursor: pointer;
`;

export const HeaderBtnHover = {
  backgroundColor: "#f6f6f6",
  color: "#484848",
};

// =============== Main Container ===========================

// *** Account ***
export const AccountDiv = styled.div`
  width: 600px;
  margin: 150px auto;
  box-shadow: 5px 10px 20px #484848;
  border-radius: 8px;
  padding-bottom: 50px;
`;
export const AccountText = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
`;

export const AccountNavigateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  font-size: 20px;
  font-weight: bold;
`;

export const AccountNavigate = styled.div`
  width: 50%;
  line-height: 50px;
  border-radius: 15px 15px 0 0;
  text-align: center;
  color: rgba(72, 72, 72, 0.5);
  border-bottom: 1px solid rgba(72, 72, 72, 0.3);
  cursor: pointer;
`;

export const AccountNavigateHover = {
  borderBottom: "3px solid #484848",
  color: "#484848",
};

export const AccountInputDiv = styled.div`
  margin: 30px auto;
  width: min-content;
`;

export const AccountInputBox = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const InputErrorText = styled.div`
  font-size: 13px;
  position: absolute;
  right: 0;
  color: red;
`;

export const AccountLabel = styled.div`
  font-weight: bold;
  padding-bottom: 7px;
`;

export const AccountInput = styled.input`
  width: 350px;
  height: 30px;
  margin-bottom: 5px;
  border: 1px solid rgba(72, 72, 72, 0.3);
  border-radius: 5px;
`;

export const AccountBtn = styled.div`
  margin: 0 auto;
  width: 350px;
  line-height: 40px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 7px;
  background-color: #484848;
  color: #f6f6f6;
  text-align: center;
  cursor: pointer;
`;

export const AccountOtherDiv = styled.div`
  width: max-content;
  margin: 30px auto 0;
  display: flex;
`;

export const AccountOtherBtn = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

// *** Main Page ***
export const MainPageDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const MainNavigation = styled.div`
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
  height: 50px;
`;

export const MainNavigationInner = styled.div`
  margin: 0 auto;
  width: 1500px;
  height: 100%;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainNavigationBtn = styled.div`
  box-sizing: border-box;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  color: rgba(72, 72, 72, 0.5);
  border: 3px solid white;
  width: 25%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MainNavigationBtnStyle = {
  color: "black",
  borderBottom: "3px solid black",
};

export const MainContentsDiv = styled.div`
  width: 1500px;
  margin: 0 auto;
  position: relative;
`;

export const SmallNavigation = styled.div`
  width: max-content;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  position: absolute;
  top: 30px;
`;

export const SmallNavigationBtn = styled.div`
  font-size: 18px;
  height: 100%;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: rgba(72, 72, 72, 0.3);
  font-weight: bold;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  border: 1px solid rgba(72, 72, 72, 0.3);
  height: 24px;
  border-radius: 5px;
  width: 150px;
`;

export const SearchIconStyle = {
  fontSize: "14px",
  color: "rgba(72, 72, 72, .5)",
  position: "absolute",
  right: "22px",
  cursor: "pointer",
};
// ***  ***
export const ContentsDiv = styled.div`
  min-height: 733px;
  padding-top: 130px;
`;

export const ListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  position: relative;
`;

export const EmptyBox = styled.div`
  margin-top: 150px;
  color: #6e6e6e;
  font-weight: bold;
  font-size: 20px;
  border-radius: 20px;
  width: 400px;
  line-height: 35px;
  text-align: center;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;
// *** Show MyTattoo ***

export const MyTattooMainBox = styled.div`
  width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const MyTattooContainer = styled.div`
  display: flex;
  min-width: 1300px;
  min-height: 450px;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const MyTattooBtn = styled.div`
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 70%;
  background-color: rgba(72, 72, 72);
  overflow: hidden;
  cursor: pointer;
`;

export const MyTattooImg = styled.div`
  color: #ffffff;
  line-height: 250px;
  text-align: center;
  width: 250px;
  height: 250px;
  background-color: rgba(72, 72, 72);
  margin: 0 20px;
`;

export const MyTattooStateBox = styled.div`
  width: 1050px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const MyTattooCardContainer = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
`;

export const MyTattooCard = styled.div`
  position: relative;
  cursor: pointer;
`;

export const MyTattooCardFaceOne = styled.div`
  position: relative;
  width: 250px;
  height: 200px;
  transition: 0.5s;
  display: flex;
  background-color: rgba(172, 172, 172);
  justify-content: center;
  align-items: center;
  z-index: 1;
  transform: translateY(100px);

  ${MyTattooCard}: hover & {
    background-color: rgba(200, 200, 200);
    transform: translateY(0);
  }
`;

export const MyTattooContentOne = styled.div`
  opacity: 0.8;
  transition: 0.8s;
  &: hover {
    opacity: 1;
  }
  font-size: 24px;
  font-weight: 750;
`;

export const MyTattooCardFaceTwo = styled.div`
  position: relative;
  width: 250px;
  height: 200px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  transform: translateY(-100px);

  ${MyTattooCard}: hover & {
    transform: translateY(0);
  }
`;

export const MyTattooContentTwo = styled.div``;

// *** Show Tattooist List ***

export const TattooistMainBox = styled.div`
  width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const TattooistContainer = styled.div`
  display: flex;
  min-width: 1000px;
  min-height: 260px;
  border-radius: 8px;
  justify-content: space-between;
  padding: 0 20px;
  margin: 20px 0;
`;

export const TattooistInfoBox = styled.div`
  width: 700px;
  height: 210px;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  margin: 25px 0;
  position: relative;
  left: -110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TattooistInfo = styled.div`
  font-size: 18px;
  padding: 10px 0;
`;

export const TattooistImg = styled.div`
  color: #ffffff;
  line-height: 210px;
  text-align: center;
  width: 210px;
  height: 210px;
  border-radius: 70%;
  background-color: rgba(72, 72, 72);
  overflow: hidden;
  margin: 25px 0;
`;

export const TattooistControlBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TattooistBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  font-size: 20px;
  position: relative;
  background-color: rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  color: rgba(72, 72, 72);
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;
`;

// *** Show Draft List ***
export const DraftListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;

  position: relative;
`;

export const EmptyDraftBox = styled.div`
  margin-top: 150px;
  color: #6e6e6e;
  font-weight: bold;
  font-size: 20px;
  border-radius: 20px;
  width: 400px;
  line-height: 35px;
  text-align: center;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const DraftMainBox = styled.div`
  width: 1500px;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;
`;

export const DraftImgBox = styled.div`
  margin: 20px 30px 50px;
`;

export const DraftImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  background-color: white;
  cursor: pointer;
`;

export const DraftImgInfo = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const DraftHeartBox = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const DraftHeartCount = styled.div`
  font-size: 14px;
  position: absolute;
  right: 20px;
  color: #7c7c7c;
`;

export const DraftImgTitle = styled.p`
  font-size: 18px;
  margin-left: 20px;
  text-align: center;
`;

// =================== FOOTER ==========================
export const FooterDiv = styled.footer`
  background-color: #484848;
  width: 100%;
  height: 130px;
`;

// temporary
export const userIconStyle = {
  fontSize: "70px",
  marginTop: "15px",
};
