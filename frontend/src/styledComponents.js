import styled from "styled-components";

// ======================  COMMON  =====================

// =========================  HEADER  ======================
export const HeaderDiv = styled.header `
  background-color: #f6f6f6;
  height: 90px;
`;

export const HeaderInner = styled.div `
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  position: relative;
`;

export const HeaderTitle = styled.div `
  font-size: 35px;
  font-weight: bold;
  width: max-content;
  line-height: 90px;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
  text-shadow: 5px 7px 10px #b7b7b7;
`;

export const HeaderSubMenu = styled.div `
  display: flex;
  position: absolute;
  top: 10px;
  right: 0;
`;

export const HeaderBtn = styled.div `
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
export const AccountDiv = styled.div `
  width: 600px;
  margin: 150px auto;
  box-shadow: 5px 10px 20px #484848;
  border-radius: 8px;
  padding-bottom: 50px;
`;
export const AccountText = styled.div `
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
`;

export const AccountNavigateDiv = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;

  height: 60px;
  font-size: 20px;
  font-weight: bold;
`;

export const AccountNavigate = styled.div `
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

export const AccountInputDiv = styled.div `
  margin: 30px auto;
  width: min-content;
`;

export const AccountInputBox = styled.div `
  margin-bottom: 20px;
  position: relative;
`;

export const InputErrorText = styled.div `
  font-size: 13px;
  position: absolute;
  right: 0;
  color: red;
`;

export const AccountLabel = styled.div `
  font-weight: bold;
  padding-bottom: 7px;
`;

export const AccountInput = styled.input `
  width: 350px;
  height: 30px;
  margin-bottom: 5px;
  border: 1px solid rgba(72, 72, 72, 0.3);
  border-radius: 5px;
`;

export const AccountBtn = styled.div `
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

export const AccountOtherDiv = styled.div `
  width: max-content;
  margin: 30px auto 0;
  display: flex;
`;

export const AccountOtherBtn = styled.div `
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

// *** Main Page ***
export const MainPageDiv = styled.div `
  width: 100%;
  margin: 0 auto;
`;

export const MainNavigation = styled.div `
  border-bottom: 1px solid rgba(72, 72, 72, 0.5);
  height: 50px;
`;

export const MainNavigationInner = styled.div `
  margin: 0 auto;
  width: 1500px;
  height: 100%;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainNavigationBtn = styled.div `
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

export const MainContentsDiv = styled.div `
  width: 1500px;
  margin: 0 auto;
  position: relative;
`;

export const SmallNavigation = styled.div `
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

export const SmallNavigationBtn = styled.div `
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

export const SearchInput = styled.input `
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
export const ContentsDiv = styled.div `
min-height: 733px;
padding-top: 130px;
padding-bottom: 130px;
`;
// position: relative;


export const ListDiv = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  position: relative;
`;

export const EmptyBox = styled.div `
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

// *** Show Tattooist List ***

export const TattooistMainBox = styled.div `
  width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const TattooistContainer = styled.div `
  display: flex;
  min-width: 1000px;
  min-height: 260px;
  border-radius: 8px;
  justify-content: space-between;
  padding: 0 20px;
  margin: 20px 0;
`;

export const TattooistInfoBox = styled.div `
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

export const TattooistInfo = styled.div `
  font-size: 18px;
  padding: 10px 0;
`;

export const TattooistImg = styled.div `
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

export const TattooistControlBox = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TattooistBtn = styled.div `
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
export const DraftListDiv = styled.div `
width: 100%;
display: flex;
flex-direction: column;
justify-content: stretch;
align-items: center;

position: relative;
`

export const EmptyDraftBox = styled.div `
margin-top: 150px;
color: #6e6e6e;
font-weight: bold;
font-size: 20px;
border-radius: 20px;
width: 400px;
line-height: 35px;
text-align: center;
box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, .5);
`;

export const DraftMainBox = styled.div `
width: 1500px;
display: flex;
justify-content: stretch;
align-items: stretch;
flex-wrap: wrap;
`;

export const DraftImgBox = styled.div `
margin: 20px 30px 50px;
`;

export const DraftImg = styled.img `
width: 300px;
height: 300px;
object-fit: contain;
box-sizing: border-box;
border-radius: 8px;
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: white;
cursor: pointer;
`;

export const DraftImgInfo = styled.div `
margin-top: 20px;
margin-left: 20px;
display: flex;
align-items: center;
position: relative;
`;

export const DraftHeartBox = styled.div `
width: 35px;
height: 35px;
display: flex;
align-items: center;
justify-content: center;
`
export const DraftHeartCount = styled.div `
font-size: 14px;
position: absolute;
right: 20px;
color: #7C7C7C;
`

export const DraftImgTitle = styled.p `
font-size: 18px;
margin-left: 20px;
text-align: center;
`

export const SearchResText = styled.div`
font-size: 20px;
margin-bottom: 50px;
`

// *** Image Upload ***
export const UploadDiv = styled.div `
background-color: #F9F9F9;
width: 1300px;
height: 700px;
margin: 0 auto;

border-radius: 10px;
box-shadow: 10px 10px 10px 0 #ececec;
position: relative;
`

export const ImgInputDiv = styled.div `
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
`
export const ImgInput = styled.input `
display: block;
margin-left: 10px;
`

export const ImgInfoDiv = styled.div `
width: 100%;
height: 90%;
display: flex;
justify-content: center;
align-items: center;
`

export const LoadedImgDiv = styled.div `
width: 50%;
margin: 0 auto;
text-align: center;
`
export const LoadedImg = styled.img `
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: #fff;
width: 300px;
height: 300px;
object-fit: contain;
`

export const EmptyImgDiv = styled.div `
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: #fff;
color: rgba(72, 72, 72, .5);
width: 300px;
line-height: 300px;
margin: 0 auto;
text-align: center;
font-weight: bold;
font-size: 18px;
`

export const LoadedImgDescDiv = styled.div `
width: 50%;
display: flex;
flex-direction: column;
`
export const LoadedImgText = styled.div `
color: rgba(72, 72, 72);
margin-bottom: 10px;
`

export const LoadedImgTitle = styled.input `
width: 350px;
height: 35px;
font-size: 18px;
border-radius: 7px;
border-color: rgba(0, 0, 0, .3);
margin-bottom: 50px;
`;

export const LoadedImgDesc = styled.textarea `
width: 450px;
height: 100px;
font-size: 18px;
border-radius: 7px;
border-color: rgba(0, 0, 0, .3);
`

export const EnrollImgBtn = styled.div `
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
`

// *** Pagination ***
export const PagenationDiv = styled.div `
width: 100%;
position: absolute;
bottom: 50px;
`
export const PageDiv = styled.div `
  width: 100%;
  margin: 0 0 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const PageBox = styled.p `
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
`

export const CurrentPage = styled.p `
font-size: 18px;
color: #afafaf;
`

// *** My Page ***
export const MyPageBigDiv = styled.div`
min-height: 733px;
padding-top: 130px;
`
export const MyPageInfoDiv = styled.div `
width: 100%;
margin-top: -130px;
background-color: black;
padding: 30px 0;
`

export const MyPageInfoInner = styled.div `
width: 1300px;
margin: 0 auto;
display: flex;
position: relative;
`

export const ProfileImgDiv = styled.div `
width: 150px;
height: 150px;
background-color: white;
border-radius: 50%;
position: relative;
`

export const ProfileImg = styled.img `
width: 150px;
height: 150px;
object-fit: contain;
border-radius: 50%;
border: 2px solid rgba(72, 72, 72, .5);
background-color: white;
`

export const ProfileIconDiv = styled.div `
width: 150px;
line-height: 150px;
font-size: 80px;
text-align: center;
border-radius: 50%;
border: 2px solid rgba(72, 72, 72, .5);
background-color: white;
`

export const ProfileImgEdit = styled.div `
background-color: black;
border: 3px solid white;
color: white;
border-radius: 50%;
width: 35px;
line-height: 35px;
text-align: center;
position: absolute;
bottom: 5px;
right: 5px;
z-index: 10;
cursor: pointer;
`

export const ProfileDescDiv = styled.div `
margin-left: 50px;
font-weight: bold;
color: white;

display: flex;
flex-direction: column;
justify-content: center;
`

export const NicknameDiv = styled.div `
font-size: 30px;
margin: 10px;
cursor: pointer;
`

export const DescDiv = styled.div `
margin: 10px;
color: rgb(210, 210, 210);
`

export const ProfileEdit = styled.div `
width: 100px;
height: 30px;
border: 2px solid white;
color: white;
font-weight: bold;
border-radius: 7px;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
right: 10px;
cursor: pointer;
transition: .45s;
`

export const ProfileEditHoverStyle = {
  backgroundColor: '#444'
}

export const MyPageContentDiv = styled.div `
width: 100%;
display: flex;
position: relative;
`

export const MyPageCategory = styled.div `
box-sizing: border-box;
width: 250px;
padding: 50px 30px;

`
//border-right: 1px solid rgba(72, 72, 72, .5);

export const CategoryBigText = styled.div `
font-weight: bold;
font-size: 24px;
margin-bottom: 40px;
`

export const CategoryUl = styled.ul `
margin-left: 20px;
`

export const CategoryLi = styled.li `
margin-bottom: 20px;
cursor: pointer;
`

// min-height: 733px;
// padding-top: 130px;
// padding-bottom: 130px;
// width: calc((100%) - 250px)

export const MyPageContentBox = styled.div `
width: 100%;
padding: 50px 0;
`


// *** delete draft style ***
export const DeleteBigDiv = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 10;
width: 100%;
height: 100%;
background-color: rgba(72, 72, 72, .3);
`
export const DeleteDiv = styled.div `
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
`
export const DeleteText = styled.div `
margin: 20px auto;
color: red;
font-size: 20px;
text-align: center;
font-weight: bold;
`

export const DeleteImgDiv = styled.div `
background-color: white;
width: 150px;
height: 150px;
border-radius: 8px;
margin: 50px auto 20px;
`

export const DeleteImg = styled.img `
width: 150px;
height: 150px;
object-fit: contain;
`

export const DeleteDesc = styled.div `
color: #f6f6f6;
margin: 30px auto 60px;
width: max-content;
`

export const DeleteBtn = styled.div `
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
`

// =================== FOOTER ==========================
export const FooterDiv = styled.footer `
  background-color: #484848;
  width: 100%;
  height: 130px;
`;

// temporary
export const userIconStyle = {
  fontSize: "70px",
  marginTop: "15px",
};