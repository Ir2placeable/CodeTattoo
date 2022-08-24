import styled, { css } from "styled-components";

// ======================  COMMON  =====================

export const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  font-size: 20px;
  position: relative;
  background-color: rgba(72, 72, 72, 0.3);
  border-radius: 24px;
  color: rgba(72, 72, 72);
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;
  transition: 0.5s;

  &: hover {
    background-color: white;
    border: 1px solid black;
    box-sizing: border-box;
  }
`;

export const HorizontalLine = styled.div`
  width: 90%;
  border-bottom: 1px solid #aaa;
  margin: 10px 0 15px;
`;

export const ContentsDiv = styled.div`
  max-width: 100vw;
  min-height: 733px;
  padding-top: 130px;
  padding-bottom: 130px;
`;

export const MyPageDiv = styled.div`
  padding: 50px 0;
`;
// position: relative;

export const ListDiv = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  position: relative;
  // background-color: aqua;
  margin-bottom: 50px;
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

export const EyeIconBox = styled.div`
  position: absolute;
  z-index: 10;
  cursor: pointer;
  left: 1150px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-itmes: center;
`;

// =========================  HEADER  ======================
export const HeaderDiv = styled.header`
  background-color: #f6f6f6;
  height: 90px;
  // width: 100%;
  width: 100vw;
`;

export const HeaderInner = styled.div`
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const HeaderTitle = styled.div`
  // background-color: orange;

  width: max-content;
  height: 90px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  display: inline-block;
  height: 80%;
  object-fit: contain;
`;

export const HeaderText = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 90px;
  // margin-left: 10px;
  text-align: center;
  text-shadow: 5px 7px 10px #b7b7b7;
  // background-color: aqua;
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
  width: 90px;
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

// *** Entry page ***
export const EntryDiv = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EntryBtnDiv = styled.div`
  width: 300px;
  line-height: 300px;
  text-align: center;
  margin: 0 30px;
  background-color: black;
  font-weight: bold;
  font-size: 30px;
  color: white;
  cursor: pointer;
  border-radius: 10px;
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

// *** Show MyTattoo ***

export const MyTattooMainBox = styled.div`
  width: 1350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const MyTattooContainer = styled.div`
  display: flex;
  width: 1350px;
  min-height: 450px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const MyTattooImg = styled.img`
  color: #ffffff;
  line-height: 250px;
  text-align: center;
  width: 300px;
  height: 300px;
  background-color: rgba(72, 72, 72);
  margin-left: 30px;
`;

export const MyTattooStateBox = styled.div`
  width: 950px;
  display: flex;
  padding: 0 20px;
`;

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
  background-color: #e4e8f0;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 20px 0;
`;

export const TattooistImgBox = styled.div`
  z-index: 1;
  box-sizing: border-box;
  width: 210px;
  height: 210px;
`;

export const TattooistImgHover = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  text-align: center;
  border-radius: 70%;
  z-index: 10;
  width: 210px;
  height: 210px;
  line-height: 210px;
  overflow: hidden;
  position: relative;
  top: -211px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const TattooistInfoBox = styled.div`
  width: 700px;
  height: 210px;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  background-color: white;
  position: relative;
  left: -110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TattooistInfoUnitBox = styled.div`
  display: flex;
  width: 600px;
  height: 30px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;C
`;

export const TattooistInfoTitle = styled.div`
  flex-basis: 150px;
  font-size: 24px;
  font-weight: 700;

  display: flex;
  justify-content: flex-end;
  margin-left: 80px;
  margin-right: 15px;
`;

export const TattooistInfoText = styled.div`
  flex-basis: 200px;
  font-size: 18px;
  font-weight: 700;
`;

export const TattooistControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: -40px;
`;

export const TattooistControlDisabled = styled.div`
  width: 150px;
  height: 180px;
`;

export const TattooistButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: relative;
  background-color: #484848;
  color: white;
  border-radius: 24px;
  border: 3px solid #484848;
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;
  transition: 0.5s;

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 150px;
      height: 60px;
      font-size: 20px;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      width: 100px;
      height: 45px;
      font-size: 14px;
    `}
    
    &:hover {
    color: black;
    background-color: white;
  }
`;

// *** Show Tattooist Detail ***

export const GridDiv = styled.div`
  width: 990px;
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0;
`;

export const DetailDraftImgBox = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 15px;
`;

export const DetailDraftImg = styled.img`
  width: 300px;
  height: 300px;
  cursor: pointer;
  object-fit: contain;
`;

export const DetailDraftImgHover = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -302px;
`;

export const DetailArtworkImgBox = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  margin: 15px;
`;

export const DetailArtworkImg = styled.img`
  width: 300px;
  height: 300px;
  cursor: pointer;
  object-fit: contain;
`;

export const DetailArtworkImgHover = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  font-size: 18px;
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -303px;
`;

// *** Show Draft Detail ***
export const DraftDetailMainBox = styled.div`
  width: 100%;
  min-height: 550px;
  display: flex;
  justify-content: space-between;
`;

export const SmallDraftBox = styled.div`
  flex-basis: 35%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
  // box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);

  position: relative;
`;

export const DraftEditBtn = styled.div`
  font-size: 25px;
  position: absolute;
  cursor: pointer;
  top: 60px;
  right: 95px;
  color: #bbb;
  transition: 0.3s;

  &:hover {
    color: #333;
  }
`;

export const SmallDraftImg = styled.img`
  width: 400px;
  height: 400px;
  object-fit: contain;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const SmallDraftInfoBox = styled.div`
  // background-color: orange;
  //display: flex;
  width: 400px;
  line-height: 35px;
  // justify-content: space-between;
  //align-items: center;
  position: relative;
`;

export const SmallDraftTitle = styled.div`
  padding: 0 20px;
  font-size: 28px;
  font-weight: 900;
`;

export const SmallTattooistBox = styled.div`
  flex-basis: 55%;
  padding: 20px;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  // justify-content: space-evenly;
  align-items: center;
`;

export const SmallTattooistProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 550px;
  width: 80%;
  // background-color: orange;
  padding: 20px 10px;
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
`;

export const SmallTattooistInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  width: calc(100% - 180px);
  // background-color: orange;
`;

export const SmallTattooistNickname = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 38px;
  font-weight: 700;
  // width: 350px;
  // width: calc(100% - 150px);
`;

export const SmallTattooistLocation = styled.div`
  font-size: 20px;
`;

export const TattooistGenreBox = styled.div`
  // background-color: orange;
  // display: flex;
  // align-items: center;
  // width: 500px;
  width: 600px;
  padding: 30px;
  font-weight: bold;
  font-size: 24px;
`;

export const TattooistKeywordBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  align-items: center;
  // width: 300px;
  // background-color: aqua;
  margin-top: 20px;
`;

export const TattooistKeyword = styled.div`
  // font-size: 16px;
  margin: 0 5px;
  background-color: #eee;
  font-size: 18px;
  line-height: 30px;
  width: 90px;
  text-align: center;
  border-radius: 20px;
`;

export const TattooistGenreLabel = styled.span`
  display: inline-block;
  background-color: gray;
  color: white;
  border-radius: 5px;
  line-height: 40px;
  width: 100px;
  text-align: center;
  margin-right: 20px;
`;

// *** My Page ***
export const MyPageProfileBox = styled.div`
  width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

export const ProfileImgBox = styled.div`
  ${(props) =>
    props.size === "profile" &&
    css`
      width: 210px;
      height: 210px;
      line-height: 210px;
    `}

  ${(props) =>
    props.size === "tattooist" &&
    css`
      width: 150px;
      height: 150px;
      line-height: 150px;
    `}

    ${(props) =>
    props.size === "edit" &&
    css`
      width: 300px;
      height: 300px;
      line-height: 300px;
    `}
`;

export const ProfileImgIcon = styled.div`
  background-color: black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 70%;
  z-index: 1;
  ${(props) =>
    props.size === "profile" &&
    css`
      width: 210px;
      height: 210px;
      line-height: 210px;
      overflow: hidden;
      cursor: pointer;
    `}

  ${(props) =>
    props.size === "tattooist" &&
    css`
      width: 150px;
      height: 150px;
      line-height: 150px;
      box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
      cursor: pointer;
    `}

    ${(props) =>
    props.size === "edit" &&
    css`
      width: 300px;
      height: 300px;
      line-height: 300px;
      overflow: hidden;
      background-color: #777;
    `}
`;

export const ProfileImg = styled.img`
  background-color: black;
  color: #000;
  text-align: center;
  border-radius: 70%;
  object-fit: contain;
  z-index: 1;
  background-color: #aaa;

  ${(props) =>
    props.size === "profile" &&
    css`
      width: 210px;
      height: 210px;
      line-height: 210px;
      overflow: hidden;
      cursor: pointer;
    `}

  ${(props) =>
    props.size === "tattooist" &&
    css`
      width: 150px;
      height: 150px;
      line-height: 150px;
      box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
      cursor: pointer;
    `}

    ${(props) =>
    props.size === "edit" &&
    css`
      width: 300px;
      height: 300px;
      line-height: 300px;
      overflow: hidden;
      box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
    `}
`;

export const ProfileNickname = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin: 30px 0;
`;

export const ProfileImgEdit = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  top: -150px;
  left: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`;

export const MyPageProfileInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 700px;
  height: 210px;
  margin-left: 100px;
`;

export const MyPageProfileNickname = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

export const MyPageProfileInfoList = styled.div`
  display: flex;
  align-items: center;
`;

export const MyPageProfileInfo = styled.div`
  font-size: 24px;
  margin-right: 30px;
`;

export const MyPageProfileDescription = styled.div`
  font-size: 20px;
`;

export const ProfileEdit = styled.div`
  position: relative;
  top: -75px;
  cursor: pointer;
`;

export const MyPageNavigation = styled.div`
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
  width: 70%;
  height: 50px;
`;

export const MyPageNavigationInner = styled.div`
  margin: 0 auto;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyPageNavigationBtn = styled.div`
  box-sizing: border-box;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
  color: rgba(72, 72, 72, 0.5);
  border: 3px solid white;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const MyPageNavigationBtnStyle = {
  color: "black",
  borderBottom: "3px solid black",
};
// *** Profile Edit ***

export const ProfileEditBox = styled.div`
  display: flex;
  width: 1250px;
  margin: 0 auto;
  border-radius: 3px;
  border: 2px solid #777;
  box-sizing: border-box;
`;

export const SideNavBox = styled.div`
  flex-basis: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  border-right: 2px solid rgba(72, 72, 72, 0.5);
`;

export const SideNavigationBtn = styled.div`
  box-sizing: border-box;
  height: 75px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(72, 72, 72, 0.5);
  border: 3px solid white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ProfileEditorBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: 50px 0;
`;

export const EditImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

export const ProfileImgInputBox = styled.div`
  position: relative;
  left: 350px;
  top: 25px;
`;

export const ProfileImgInputLabel = styled.label`
  border-radius: 6px;
  background-color: #2374e1;
  color: white;
  padding: 10px 10px;
  margin-right: 20px;
  cursor: pointer;
`;

export const ProfileFormBox = styled.div`
  min-width: 900px;
  background-color: #d8d8d8;
  padding: 75px 0;
  margin: 0 50px;
  border-radius: 16px;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
`;

export const ProfileImgInput = styled.input`
  display: none;
`;

export const ProfileInfoInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 75px;
`;

export const ProfileInfoInputLabel = styled.label`
  flex-basis: 100px;
  margin-left: 125px;
  font-size: 32px;
  font-weight: 900;
`;

export const ProfileInfoInput = styled.input`
  flex-basis: 425px;
  line-height: 40px;
  font-size: 18px;
  margin-right: 125px;
  border: 0;
  border-bottom: 2px solid #888;
  background-color: #d8d8d8;
  &:focus {
    outline: none;
    border-bottom-color: #333;
  }
`;

export const ProfileUploadButton = styled.div`
  color: white;
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  border-radius: 7px;
  cursor: pointer;
  position: relative;
  transition: 0.5s;
  ${(props) =>
    props.type === "profile" &&
    css`
      background-color: black;
      border: solid 3px black;
      left: 350px;
      width: 200px;

      &:hover {
        color: black;
        background-color: white;
      }
    `}

  ${(props) =>
    props.type === "image" &&
    css`
      background-color: black;
      border: solid 3px black;
      top: 75px;
      width: 500px;

      &:hover {
        color: black;
        background-color: white;
      }
    `}

    ${(props) =>
    props.type === "delete" &&
    css`
      background-color: #e60023;
      border: solid 3px #e60023;
      left: 350px;
      width: 200px;

      &:hover {
        color: white;
        background-color: #ad081b;
        border: solid 3px #ad081b;
      }
    `}
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
  max-width: 100%;
  // width: calc(380px * 4);
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;
  // background-color: orange;
`;

export const DraftImgBox = styled.div`
  margin: 20px 10px;
  background-color: #e4e8f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  height: 440px;
  //width: 340px;
  padding: 0 25px;
  border-radius: 8px;
`;

export const DraftDrawerDiv = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  // background-color: orange;
  margin-bottom: 10px;
  width: max-content;
  cursor: pointer;
  margin-left: 20px;
`;

export const DraftDrawer = styled.p`
  margin-left: 20px;
`;

export const UserIconStyle = {
  color: "white",
  fontSize: "20px",
};

export const DraftDrawerImgDiv = styled.div`
  width: 35px;
  height: 35px;
  overflow: hidden;
  background-color: black;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DraftDrawerImg = styled.img`
  // display: inline-block;
  width: 35px;
  height: 35px;
  // background-color: black;
  // border-radius: 50%;
  // border: 2px solid black;
  object-fit: contain;
`;
export const DraftImgDiv = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 15;
`;
export const DraftImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
  // box-sizing: border-box;
  // border-radius: 8px;
  // box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  background-color: white;
  cursor: pointer;
  position: absolute;
`;

export const DraftImgHoverDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-weight: bold;
  font-size: 18px;
  // border-radius: 8px;
  width: 300px;
  height: 300px;
  cursor: pointer;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DraftImgInfo = styled.div`
  // margin-top: 15px;
  margin: 15px 15px 0;
  height: 35px;
  display: flex;
  align-items: center;
  position: relative;

  // background-color: orange;
`;

export const DraftHeartBox = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: aqua;

  position: absolute;
  top: 0;
  right: 0;
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
  font-weight: bold;
`;

export const SearchResText = styled.div`
  font-size: 20px;
  margin-bottom: 50px;
  // background-color: orange;
  text-align: center;
  font-weight: bold;
`;

// *** Image Upload ***
export const UploadDiv = styled.div`
  background-color: #f9f9f9;
  width: 1300px;
  height: 700px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 10px 10px 10px 0 #ececec;
  position: relative;
`;

export const ImgInputDiv = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  color: #fff;
  background-color: #000;
  font-weight: bold;
  height: 40px;
  width: 200px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImgInput = styled.input`
  display: block;
  margin-left: 10px;
`;

export const ImgInfoDiv = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadedImgDiv = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;
`;
export const LoadedImg = styled.img`
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

export const EmptyImgDiv = styled.div`
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  color: rgba(72, 72, 72, 0.5);
  width: 300px;
  line-height: 300px;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const LoadedImgDescDiv = styled.div`
  width: 50%;
  height: 220px;
  // display: flex;
  // flex-direction: column;
  // background-color: orange;
`;
export const LoadedImgText = styled.div`
  color: rgba(72, 72, 72);
  margin-bottom: 10px;
`;

export const LoadedImgTitle = styled.input`
  width: 350px;
  height: 35px;
  font-size: 18px;
  border-radius: 7px;
  border-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

export const LoadedImgDesc = styled.textarea`
  width: 450px;
  height: 100px;
  font-size: 18px;
  border-radius: 7px;
  border-color: rgba(0, 0, 0, 0.3);
`;

export const EnrollImgBtn = styled.div`
  color: #fff;
  background-color: #000;
  font-weight: bold;
  font-size: 20px;
  width: 450px;
  line-height: 40px;
  text-align: center;
  border-radius: 7px;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  left: 50%;
  margin-left: -225px;
`;

export const DraftEditDiv = styled.div`
  // background-color: orange;
  height: 40px;
  position: absolute;
  left: 50%;
  bottom: 80px;
  margin-left: -270px;
  display: flex;
`;
export const DraftEditBox = styled.div`
  background-color: black;
  color: white;
  width: 250px;
  line-height: 40px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;

  ${(props) =>
    props.color === "red" &&
    css`
      background-color: #da3333;
    `}
`;

export const DraftEditPopupDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const DraftEditPopup = styled.div`
  background-color: black;
  border-radius: 8px;
  color: white;
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const DraftPopupText = styled.div`
  width: 100%;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
`;
export const DraftPopupBtn = styled.div`
  width: 100px;
  line-height: 30px;
  border: 2px solid white;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin: 0 10px 30px;

  ${(props) =>
    props.color === "red" &&
    css`
      color: #da3333;
      border-color: #da3333;
    `}
`;

// *** Pagination ***
export const PagenationDiv = styled.div`
  width: 100%;
  // background-color: orange;
  position: absolute;
  bottom: 50px;
`;
export const PageDiv = styled.div`
  width: 100%;
  margin: 0 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageBox = styled.p`
  font-size: 14px;
  color: #afafaf;
  background-color: white;
  line-height: 25px;
  width: 25px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #afafaf;
  margin: 1px;
  cursor: pointer;
`;

export const CurrentPage = styled.p`
  font-size: 18px;
  color: #afafaf;
`;

// *** My Page ***
export const MyPageBigDiv = styled.div`
  min-height: 733px;
  padding-top: 130px;
`;
export const MyPageInfoDiv = styled.div`
  width: 100%;
  margin-top: -130px;
  background-color: black;
  padding: 30px 0;
`;

export const MyPageInfoInner = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  position: relative;
`;

export const ProfileIconDiv = styled.div`
  width: 150px;
  line-height: 150px;
  font-size: 80px;
  text-align: center;
  border-radius: 50%;
  border: 2px solid rgba(72, 72, 72, 0.5);
  background-color: white;
`;

export const ProfileDescDiv = styled.div`
  margin-left: 50px;
  font-weight: bold;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NicknameDiv = styled.div`
  font-size: 30px;
  margin: 10px;
  cursor: pointer;
`;

export const DescDiv = styled.div`
  margin: 10px;
  color: rgb(210, 210, 210);
`;

export const ProfileEditHoverStyle = {
  backgroundColor: "#444",
};

export const MyPageContentDiv = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

export const MyPageCategory = styled.div`
  box-sizing: border-box;
  width: 250px;
  padding: 50px 30px;
`;
//border-right: 1px solid rgba(72, 72, 72, .5);

export const CategoryBigText = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
`;

export const CategoryUl = styled.ul`
  margin-left: 20px;
`;

export const CategoryLi = styled.li`
  margin-bottom: 20px;
  cursor: pointer;
`;

// min-height: 733px;
// padding-top: 130px;
// padding-bottom: 130px;
// width: calc((100%) - 250px)

export const MyPageContentBox = styled.div`
  width: 100%;
  padding: 50px 0;
`;

// *** delete draft style ***
export const DeleteBigDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(72, 72, 72, 0.3);
`;
export const DeleteDiv = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  margin-top: -250px;
  margin-left: -250px;
  background-color: black;
  border-radius: 10px;
`;
export const DeleteText = styled.div`
  margin: 20px auto;
  color: red;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

export const DeleteImgDiv = styled.div`
  background-color: white;
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin: 50px auto 20px;
`;

export const DeleteImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
`;

export const DeleteDesc = styled.div`
  color: #f6f6f6;
  margin: 30px auto 60px;
  width: max-content;
`;

export const DeleteBtn = styled.div`
  width: 300px;
  line-height: 40px;
  border: 3px solid #f6f6f6;
  border-radius: 8px;
  margin: 20px auto;
  color: #f6f6f6;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

// *** Drom Down Menu ***
export const DropDownMenu = styled.div`
  width: 120px;
  position: relative;
  margin-right: 30px;
`;

export const DropDownDiv = styled.div`
  height: 35px;
  width: 120px;
  background-color: white;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DropDownText = styled.div`
  width: 90px;
  line-height: 35px;
  text-align: center;
`;
export const DropDownArrow = {
  cursor: "pointer",
};

export const DropList = styled.div`
  width: 143px;
  height: 250px;
  background-color: #e9e9e9;
  border-radius: 7px;
  overflow: scroll;
  position: absolute;
  top: 40px;
  z-index: 20;
`;

export const DropItem = styled.div`
  line-height: 35px;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

export const ChoiceItem = styled.div`
  line-height: 35px;
  width: 120px;
  text-align: center;
  background-color: #444;
  color: white;
  font-weight: bold;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  overflow: hidden;
  margin-top: -15px;
  margin-bottom: 20px;
`;

export const SelfInput = styled.input`
  display: block;
  height: 33px;
  width: 117px;
  font-weight: bold;
  background-color: white;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: -15px;
  margin-bottom: 20px;
`;

export const DropTagsDiv = styled.div`
  background-color: #e9e9e9;
  display: flex;
  position: absolute;
  top: 45px;
  z-index: 20;
`;
export const DropTagsBox = styled.div`
  width: 150px;
  border-right: 1px solid rgba(72, 72, 72, 0.3);
`;

export const DropTagsText = styled.div`
  line-height: 35px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid rgba(72, 72, 72, 0.3);
`;

export const DropTagsList = styled.div`
  width: calc(120px * 3 + 30px);
  display: flex;
  flex-wrap: wrap;
  margin-top: -15px;
  margin-bottom: 20px;
`;

export const DropTagsInput = styled.input`
  display: block;
  width: 90%;
  height: 30px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid rgba(72, 72, 72, 0.3);
`;
export const DropTagChoose = styled.div`
  background-color: #666;
  color: white;
  width: 120px;
  border-radius: 20px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TagChooseText = styled.div`
  width: 70%;
  line-height: 35px;
  text-align: center;
`;

export const XMarkStyle = {
  cursor: "pointer",
  width: "15px",
  height: "15px",
};

// Draft upload button
export const GoUpload = styled.div`
  background-color: black;
  width: 100px;
  line-height: 40px;
  text-align: center;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 0;
`;

// =================== FOOTER ==========================
export const FooterDiv = styled.footer`
  background-color: #484848;
  width: 100vw;
  height: 130px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

// temporary
export const userIconStyle = {
  fontSize: "70px",
  marginTop: "15px",
};

// Calenar
export const CalendarDiv = styled.div`
  // background-color: orange;
  margin: 60px auto;
  display: flex;
  align-items: center;
`;

export const ReservationDiv = styled.div`
  // background-color: whitesmoke;
  margin-left: 80px;
`;

export const DateDiv = styled.div`
  // line-height: 32px;
  text-align: center;
`;

export const TimeDiv = styled.div`
  // background-color: aqua;
  width: 300px;
`;
export const TimeText = styled.div`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
`;
export const TimeBox = styled.div`
  // background-color: orange;
  margin: 20px auto 40px;
  width: calc(74px * 3);
  display: flex;
  flex-wrap: wrap;
`;

export const Time = styled.div`
  width: 70px;
  background-color: rgba(72, 72, 72);
  line-height: 35px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  margin: 4px 2px 0;
  // cursor: pointer;
`;

export const ReservRequestBtn = styled.div`
  background-color: black;
  border: 3px solid black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: white;
  width: 200px;
  line-height: 35px;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 5px;
  transition: 0.45s;

  &:hover {
    color: black;
    background-color: white;
  }
`;

// reservation
export const ReservDiv = styled.div`
  // background-color: white;
  width: 70%;
  margin: 0 auto 50px;
  display: flex;
  justify-content: space-between;
`;
export const ReservInfoDiv = styled.div`
  // background-color: #A6C3D3;
  background-color: #d8d8d8;
  border-radius: 20px;
  padding: 30px 50px;
  display: flex;
  // width: 70%;
  width: 100%;
`;

export const ReservDraftImg = styled.img`
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: white;
  object-fit: contain;
  border-radius: 5px;
`;

export const ReservTextDiv = styled.div`
  // background-color: orange;
  width: calc(100% - 400px);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ReservText = styled.p`
  font-size: 18px;
  font-weight: bold;
  // background-color: aqua;
  line-height: 40px;
  margin: 5px 0;
`;

export const ReservLabel = styled.span`
  display: inline-block;
  width: 110px;
`;
export const ReservTextBox = styled.span`
  width: 300px;
  padding: 0 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 5px;
`;

export const ReservBtnDiv = styled.div`
  // width: 20%;
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const ReservBtn = styled.div`
  // background-color: #A6C3D3;
  background-color: black;
  width: 200px;
  height: 20%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: 3px solid black;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.45s;

  &:hover {
    color: black;
    background-color: white;
  }
`;

// Procedure state page
export const ProcedureDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  // background-color: orange;
`;

export const ProcedureImg = styled.img`
  display: inline-block;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
  width: 350px;
  height: 350px;
  object-fit: contain;
`;

export const ProcedureInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #ececec;
  font-weight: bold;
  padding: 64px 40px 40px;
  border-radius: 8px;
  width: 1000px;
`;

export const ProcedureText = styled.div`
  font-size: 24px;
  position: absolute;
  top: -30px;
  left: 10px;
`;

export const ProcedureBox = styled.div`
  width: calc(50% - 70px);
  background-color: black;
  margin-bottom: 64px;
  padding: 20px 20px 0;
  border-radius: 5px;
  position: relative;

  ${(props) =>
    props.size === "big" &&
    css`
      width: 100%;
      margin-bottom: 0;
    `}
`;

export const ProcedureWrap = styled.div`
  display: flex;
  height: 35px;
  // background-color: orange;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProcedureBigWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: max-content;
  // background-color: aqua;
`;

export const ProcedureLabel = styled.div`
  font-size: 20px;
  color: white;
  width: 100px;
  text-align: center;
`;

export const ProcedureData = styled.div`
  background-color: #f0f0f0;
  width: 310px;
  border-radius: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const ProcedureBtns = styled.div`
  display: flex;
  margin: 100px auto 0;
`;

export const ProcedureBtn = styled.div`
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  font-weight: bold;
  width: 300px;
  margin: 0 10px;

  ${(props) =>
    props.color === "gray" &&
    css`
      background-color: #797979;
    `}
`;

// Chatting Page
export const ChattingDiv = styled.div`
  // background-color: whitesmoke;
  margin: 0 auto;
  padding: 20px 50px;
  width: 1250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ChattingHeader = styled.div`
  font-weight: bold;
  font-size: 32px;
  width: 100%;
  max-height: 64px;
  line-height: 64px;
  margin-bottom: 20px;
  // background-color: aqua;
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
`;

export const ChattingListDiv = styled.div`
  background-color: #646464;
  padding: 5px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

export const ChattingBox = styled.div`
  background-color: #f3f3f3;
  width: 350px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;
  transition: 0.4s;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #bdbdbd;
  }
`;
export const ChattingImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  background-color: white;
`;
export const ChattingInfoDiv = styled.div`
  // background-color: aqua;
  width: calc(100% - 180px);
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ChattingTextDiv = styled.div`
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  margin-left: 15px;

  ${(props) =>
    props.sort === "right" &&
    css`
      align-items: flex-end;
      margin-top: 20px;
    `}
`;

export const ChattingText = styled.p`
  font-weight: bold;
  margin: 5px 0;

  ${(props) => {
    if (props.size === "big") {
      return css`
        font-size: 16px;
      `;
    } else if (props.size === "medium") {
      return css`
        font-size: 12px;
        color: #5e5e5e;
      `;
    } else if (props.size === "main") {
      return css`
        font-size: 20px;
        color: black;
        margin-left: 20px;
      `;
    }
  }}
`;

export const ChattingTime = styled.div`
  font-size: 14px;
  color: #ababab;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ChattingReserv = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;

  ${(props) => {
    if (props.state === "complete") {
      return css`
        background-color: #4ec059;
      `;
    } else if (props.state === "standby") {
      return css`
        background-color: #e84545;
      `;
    }
  }}
`;

export const ChattingRoomDiv = styled.div`
  background-color: #646464;
  padding: 71px 0 90px;
  width: 800px;
  height: calc(610px - 161px);
  // height: 600px;
  // overflow-y: scroll;
  position: relative;
`;

export const ChattingRoomHeader = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: calc(100% - 50px);
  height: 70px;
  border-bottom: 1px solid #8b8b8b;

  display: flex;
  align-items: center;
  padding-left: 50px;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  // background-color: orange;
`;

export const ChatBigDiv = styled.div`
  // background-color: aqua;
  height: calc(610px - 161px);
  overflow-y: scroll;
`;

export const ChatDiv = styled.div`
  // background-color: orange;
  width: calc(100% - 40px);
  display: flex;
  padding: 0 20px;
  margin: 10px 0;
  align-items: flex-end;

  ${(props) => {
    if (props.who === "me") {
      return css`
        flex-direction: row-reverse;
      `;
    } else if (props.who === "you") {
      return css`
        flex-direction: row;
      `;
    }
  }}
`;

export const ChatContents = styled.div`
  max-width: 580px;
  min-width: 100px;
  line-height: 35px;
  border-radius: 20px;
  padding: 0 20px;
  ${(props) => {
    if (props.who === "me") {
      return css`
        background-color: #e8e9b2;
      `;
    } else if (props.who === "you") {
      return css`
        background-color: white;
      `;
    }
  }}
`;
export const ChatDate = styled.div`
  color: #b1b1b1;
  font-size: 10px;
  margin: 0 5px;
`;

export const ChatInputDiv = styled.div`
  // background-color: orange;
  width: 100%;
  height: 90px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ChatInput = styled.input`
  background-color: white;
  border: none;
  border-radius: 5px;
  line-height: 40px;
  width: 550px;
`;

export const ChatBtn = styled.div`
  color: white;
  border-radius: 8px;
  cursor: pointer;
  line-height: 40px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  width: 80px;
  ${(props) => {
    if (props.type === "submit") {
      return css`
        background-color: black;
      `;
    } else if (props.type === "image") {
      return css`
        background-color: #7aa500;
      `;
    }
  }}
`;
