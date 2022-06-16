import styled from 'styled-components';

// HEADER
export const HeaderDiv = styled.header`
  height: 150px;
  background-color: #F6F6F6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderInner = styled.div`
  height: 100%;
  width: 1200px;
  position: relative;
`;

export const HeaderTitle = styled.div`
  width: max-content;
  font-size: 48px;
  font-weight: bold;
  position: absolute;
  left: 0;
  top: 45px;
  text-shadow: 10px 10px 10px  #b7b7b7;
  cursor: pointer;
`;

export const HeaderSubMenu = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  right: 0;
`;

export const SubMenuBtn = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #484848;
  color: #F6F6F6;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;

  transition: .45s;
`;

export const HoverBtnStyle = {
  backgroundColor: '#F6F6F6',
  color: '#484848',
  border: '3px solid #484848',
};

// LOGIN

export const LoginSection = styled.div`
  background-color:#c9c9c9;
  width: 700px;
  margin: 150px auto 222px;
  border-radius: 5px;
  overflow: hidden;
`;

export const LoginTextDiv = styled.div`
  background-color:#484848;
  color:#F6F6F6;
  font-weight: bold;
  height: 50px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: max-content;
  margin: 50px auto;
`;

export const LoginInputDiv = styled.div`
  border-radius: 7px;
  margin-bottom: 20px;
`;

export const LoginInput = styled.input`
  width: 450px;
  height: 35px;
  border-radius: 7px;
  border-color: rgba(0, 0, 0, 0);
`

export const LoginBtn = styled.div`
  background-color: #000;
  margin: 0 auto;
  border-radius: 10px;
  height: 50px;
  width: 400px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  color:#F6F6F6;
  cursor: pointer;
`;

// Entry
export const EntrySection = styled.section`
  display: flex;
`;


// Category

export const CategoryDiv = styled.div`
  width: 250px;
  border-right: .1px solid #484848;
`

export const CategoryBox = styled.div`
  width: 150px;
  margin: 10px auto 40px;
  padding: 0 20px;
`;

export const CategoryText = styled.p`
font-weight: bold;
font-size: 20px;
padding: 10px;
margin-top: 30px;
border-bottom: .1px solid #484848;
`;

export const CategoryUl = styled.ul`
margin: 30px auto;
`;

export const CategorySubText = styled.p`
font-weight: bold;
font-size: 18px;
border-bottom: .1px solid rgba(0, 0, 0, 0.3);
`;

export const CategoryLi = styled.li`
margin: 7px;
cursor: pointer;
`;

// Main Content
export const MainDiv = styled.div`
margin: 0 auto;
min-height: 725px;
width: 1400px;

display: flex;
justify-content: center;
align-items: center;
`;

// Entry 페이지 검은 박스 
export const BtnBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export const ContentBtn = styled.div`
background-color: #000;
color: white;
width: 300px;
height: 300px;
display: flex;
justify-content: center;
align-items: center;
font-size: 24px;
font-weight: bold;
margin: 50px;
border-radius: 10px;
cursor: pointer;
`;

// Enroll
// TattooistEnrollment
// Singup
export const EnrollDiv = styled.div`
margin: 0 auto;
  padding: 60px;
`;

export const EnrollBox = styled.div`
  background-color: #fbfbfb;
  box-shadow: 5px 10px 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 900px;
  margin: 0 auto;
  padding: 0 0 50px;
  overflow: hidden;
`;

export const EnrollBigText = styled.div`
background-color: #000;
color: #fff;
font-size:28px;
font-weight: bold;
text-align: center;
line-height: 40px;
`

export const EnrollUl = styled.ul`
  margin-bottom: 50px;
`;

export const EnrollText = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #484848;
  padding: 10px 20px;
  border-bottom: 0.1px solid #b0b0b0;
  margin: 0 0 20px;
`;

export const EnrollLi = styled.li`
  margin: 40px;
  position: relative;
  height: 30px;
`;

export const EnrollLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
`;

export const EnrollInput = styled.input`
  border-color: rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 30px;
  position:absolute;
  right: 420px;
`;

export const EnrollBtn = styled.div`
  margin: 0 auto;
  background-color: #000;
  color: white;
  font-weight: bold;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 40px;
  border-radius: 7px;
  cursor: pointer;
`;

// Drafts List
// ImgLoad
export const DraftsListDiv = styled.div`
margin: 0 auto;
width: 1400px;
min-height: 725px;
position: relative;
`;

// 도안 등록 버튼
export const DraftsBtn = styled.div`
box-sizing: border-box;
border: 3px solid black;
position: absolute;
top: 100px;
right: 30px;
color: white;
background-color: #000;
font-size: 18px;
font-weight: bold;
border-radius: 5px;
width: 110px;
line-height: 35px;
text-align: center;
cursor: pointer;

transition: .45s;
`;

// export const ImgListDiv = styled.div`
// position: absolute;
// top: 100px;
// `

// margin: 0 auto;
// width: 1400px;
// min-height: 725px;
// position: relative;

export const UploadDiv = styled.div`
background-color: #F6F6F6;
width: 800px;
height: 700px;
margin: 0 auto;

border-radius: 10px;
`

export const ImgInputDiv = styled.div`
margin: 50px auto;
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
export const ImgInput = styled.input`
display: block;
margin-left: 10px;
`

export const LoadedImgDiv = styled.div`
margin: 0 auto;
text-align: center;
`
export const LoadedImg = styled.img`
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: #fff;
width: 300px;
height: 300px;
object-fit: contain;
`

export const LoadedImgTitle = styled.input`
margin-top: 50px;
width: 350px;
height: 40px;
font-size: 18px;
border-radius: 7px;
border-color: rgba(0, 0, 0, .3);
`;
export const EnrollImgBtn = styled.div`
margin: 50px auto;
color: #fff;
background-color: #000;
font-weight: bold;
font-size: 20px;
width: 350px;
line-height: 40px;
border-radius: 7px;
cursor: pointer;
`

// Draft List
// ShowDraftList
export const DraftListBigDiv = styled.div`
display: flex;
flex-direction: column;
margin: 0 auto;
`;

export const DraftMainDiv = styled.div`
margin: 0 auto;
min-height: 725px;
width: 1400px;

display: flex;
flex-direction: column;
justify-content: stretch;
align-items: center;

position: relative;
`;

export const CategoryTitle = styled.div`
font-size: 28px;
font-weight: bold;
color: white;
background-color: black;
line-height: 45px;
width: 700px;
text-align: center;
margin: 30px 0 100px;
border-radius: 10px;
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
box-shadow: 5px 5px 15px 0px #6e6e6e;
`;

export const DraftMainBox = styled.div`
width: 1370px;
display: flex;
justify-content: stretch;
align-items: stretch;
flex-wrap: wrap;
`;

export const DraftImgBox = styled.div`
cursor: pointer;
margin: 20px 20px 50px;
`;

export const DraftImg = styled.img`
object-fit: contain;
box-sizing: border-box;
border-radius: 8px;
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: white;
`;

export const DraftImgInfo = styled.div`
margin-top: 20px;
margin-left: 20px;
display: flex;
align-items: center;
`;

export const DraftTattooistDiv = styled.div`
width: 30px;
height: 30px;
background-color: black;
margin-right: 10px;
border-radius: 50%;
`;

export const DraftImgTitle = styled.p`
font-size: 18px;
text-align: center;
`


// MY PAGE
export const MyPageMainDiv = styled.div`
margin: 0 auto;
min-height: 725px;
width: 1400px;

display: flex;
flex-direction: column;
justify-content: stretch;
align-items: center;
`

export const MyPageInfoDiv = styled.div`
height: 150px;
width: 100%;

display: flex;
justify-content: stretch;
align-items: center;

position: relative;
`;

export const UserImgDiv = styled.div`
width: 100px;
height: 100px;
border: 3px solid black;
border-radius: 50%;

background-color: white;
margin-left: 50px;

text-align: center;
`

export const UserIcon = styled.i`
font-size: 70px;
line-height: 100px;
`

export const userIconStyle = {
  fontSize: "70px",
  marginTop: "15px"
}

export const ttIconStyle = {
  fontSize: '24px',
  marginTop: "5px"
}

export const UserTextDiv = styled.div`
margin-left: 40px;
`

export const UserTextUl = styled.ul`
`

export const UserTextLi = styled.li`
font-weight: bold;
margin-bottom: 10px;
list-style-type: disc;
`

export const MyPageLine = styled.div`
height: 2px;
width: 100%;
background-color: black;
position: absolute;
bottom: 0;
`

export const MyPageMenu = styled.div`
display: flex;
position: absolute;
bottom: 0;
right: 300px;
`

export const MyPageMenuBtn = styled.div`
background-color: black;
border-radius: 10px 10px 0 0;
border: 3px solid black;
font-weight: bold;
width: 120px;
line-height: 40px;
text-align: center;
color: white;
cursor: pointer;
`

export const menuBtnClickedStyle = {
  backgroundColor: 'white',
  color: 'black',
  borderBottomColor: 'white'
}

export const ForTattooistDiv = styled.div`
position: absolute;
top: 0;
bottom: 0;
right: 100px;

display: flex;
flex-direction: column;
justify-content: center;
`

export const MyPageBtn = styled.div`
background-color: black;
color: white;
line-height: 35px;
margin-bottom: 20px;
width: 100px;
border: 3px solid black;
font-weight: bold;
text-align: center;
border-radius: 8px;
transition: .45s;
cursor: pointer;
`
export const MyPageBtnHoverStyle = {
  backgroundColor: 'white',
  color: 'black'
}

export const LikeDiv = styled.div`
text-align: center;
`

export const LikeIcon = styled.i`
font-size: 30px;

cursor: pointer;
color: red;
`
export const MyPageContentDiv = styled.div`
width: 100%;
min-height: 600px;
margin: 0 auto;

display: flex;
flex-wrap: wrap;
padding: 80px 0 50px;

position: relative;
`

export const DraftUploadDiv = styled.div`
position: absolute;
top: 30px;
right: 30px;
`

// cursor: pointer;
// margin: 20px 20px 50px;

export const ImgBox = styled.div`
margin: 20px 20px 50px;
position: relative;
`

export const ImgHeartBox = styled.div`
position: absolute;
top: 260px;
right: 15px;
`

export const MyPageDraftImg = styled.img`
object-fit: contain;
box-sizing: border-box;
border-radius: 8px;
box-shadow: 5px 5px 20px rgba(0, 0, 0, .4);
background-color: white;
`

export const ImgInfoDiv = styled.div`
margin-top: 20px;
margin-left: 20px;
display: flex;
align-items: center;
`

export const TattooistImg = styled.div`
width: 35px;
height: 35px;
background-color: white;
margin-right: 10px;
border-radius: 50%;
border: 3px solid black;
cursor: pointer;
text-align: center;
`

export const DraftTitle = styled.p`
text-align: center;
`




//  FOOTER
export const FooterDiv = styled.footer`
height: 130px;
width: 100%;
color: #F6F6F6;
background-color: #484848;
`;

export const FooterText = styled.p`
text-align: center;
padding: 30px 0 0;
`;