import styled from 'styled-components';

// ======================  COMMON  =====================


// =========================  HEADER  ======================
export const HeaderDiv = styled.header`
background-color: #f6f6f6;
height: 90px;
`

export const HeaderInner = styled.div`
height: 100%;
width: 1200px;
margin: 0 auto;
position: relative;
`

export const HeaderTitle = styled.div`
font-size: 35px;
font-weight: bold;
width: max-content;
line-height: 90px;
margin-left: 10px;
text-align: center;
cursor: pointer;
text-shadow: 5px 7px 10px  #b7b7b7;
`

export const HeaderSubMenu = styled.div`
display: flex;
position: absolute;
top: 10px;
right: 0;
`

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
transition: .45s;
cursor: pointer;
`

export const HeaderBtnHover = {
  backgroundColor: '#f6f6f6',
  color: '#484848'
}

// =============== Main Container ===========================

// *** Account ***
export const AccountDiv = styled.div`
width: 600px;
margin: 150px auto;
box-shadow: 5px 10px 20px #484848;
border-radius: 8px;
padding-bottom: 50px;
`
export const AccountText = styled.div`
font-size: 20px;
font-weight: bold;
line-height: 60px;
text-align: center;
`

export const AccountNavigateDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;

height: 60px;
font-size: 20px;
font-weight: bold;
`

export const AccountNavigate = styled.div`
width: 50%;
line-height: 50px;
border-radius: 15px 15px 0 0;
text-align: center;
color: rgba(72, 72, 72, .5);
border-bottom: 1px solid rgba(72, 72, 72, .3);
cursor: pointer;
`

export const AccountNavigateHover = {
  borderBottom: '3px solid #484848',
  color: '#484848'
}

export const AccountInputDiv = styled.div`
margin: 30px auto;
width: min-content;
`

export const AccountInputBox = styled.div`
margin-bottom: 20px;
position: relative;
`

export const InputErrorText = styled.div`
font-size: 13px;
position: absolute;
right: 0;
color: red;
`

export const AccountLabel = styled.div`
font-weight: bold;
padding-bottom: 7px;
`

export const AccountInput = styled.input`
width: 350px;
height: 30px;
margin-bottom: 5px;
border: 1px solid rgba(72, 72, 72, .3);
border-radius: 5px;
`

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
`

export const AccountOtherDiv = styled.div`
width: max-content;
margin: 30px auto 0;
display: flex;
`

export const AccountOtherBtn = styled.div`
text-decoration: underline;
cursor: pointer;
margin: 0 10px;
`



// =================== FOOTER ==========================
export const FooterDiv = styled.footer`
background-color: #484848;
width: 100%;
height: 130px;
`