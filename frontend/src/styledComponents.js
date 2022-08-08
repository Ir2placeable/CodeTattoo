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
  min-height: 733px;
  padding-top: 130px;
  padding-bottom: 130px;
`;

export const MyPageDiv = styled.div`
padding: 50px 0;
`
// position: relative;

export const ListDiv = styled.div`
  width: 100%;
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
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 20px 0;
`;

export const TattooistInfoBox = styled.div`
  width: 700px;
  height: 210px;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
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

export const TattooistControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TattooistButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: relative;
  background-color: rgba(72, 72, 72, 0.3);
  border-radius: 24px;
  color: rgba(72, 72, 72);
  font-weight: bold;
  cursor: pointer;
  margin: 15px 0;

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
`;

// *** Show Tattooist Detil ***

export const GridDiv = styled.div`
  width: 990px;
  display: flex;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  width: 300px;
  height: 300px;
  background-color: #444;
  margin: 15px;
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
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const SmallDraftInfoBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: center;
`;

export const SmallDraftTitle = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 700;
`;

export const SmallTattooistBox = styled.div`
  flex-basis: 55%;
  padding: 20px;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SmallTattooistProfileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 550px;
`;

export const SmallTattooistInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

export const SmallTattooistNickname = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 38px;
  font-weight: 700;
  width: 350px;
`;

export const SmallTattooistLocation = styled.div`
  font-size: 20px;
`;

export const TattooistGenreBox = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  font-size: 24px;
`;

export const TattooistKeywordBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`;

export const TattooistKeyword = styled.div`
  font-size: 14px;
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
`;

export const ProfileImg = styled.div`
  color: #ffffff;
  text-align: center;
  border-radius: 70%;
  object-fit: contain;
  z-index: 1;
  background-color: #777;
  ${(props) =>
    props.size === "profile" &&
    css`
      width: 210px;
      height: 210px;
      line-height: 210px;
      overflow: hidden;
    `}

  ${(props) =>
    props.size === "tattooist" &&
    css`
      width: 150px;
      height: 150px;
      line-height: 150px;
      box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
    `}
`;

export const ProfileImgEdit = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  top: -40px;
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
  //width: 1550px;
  width: calc(380px * 4);
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-wrap: wrap;
  //background-color: orange;
`;

export const DraftImgBox = styled.div`
  margin: 20px 15px;
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
`


export const DraftDrawer = styled.p`
  margin-left: 20px;
`;


export const UserIconStyle = {
  color: 'white',
  fontSize: '20px'
}

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
`

export const DraftDrawerImg = styled.img`
// display: inline-block;
width: 35px;
height: 35px;
// background-color: black;
// border-radius: 50%;
// border: 2px solid black;
object-fit: contain;
`
export const DraftImgDiv = styled.div`
width: 300px;
height: 300px;
border-radius: 8px;
box-sizing: border-box;
overflow: hidden;
box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.4);
position: relative;
z-index: 15;
`
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
background-color: rgba(0, 0, 0, .4);
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
`

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
`

// =================== FOOTER ==========================
export const FooterDiv = styled.footer`
  background-color: #484848;
  width: 100%;
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
