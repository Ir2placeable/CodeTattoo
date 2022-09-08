// import React from 'react';
// import {
//     ChatBigDiv,
//     ChatBtn,
//     ChatContents,
//     ChatDate,
//     ChatDiv,
//     ChatInput,
//     ChatInputDiv,
//     ChatTextarea,
//     ChattingBox,
//     ChattingDiv,
//     ChattingHeader,
//     ChattingImg,
//     ChattingInfoDiv,
//     ChattingListDiv,
//     ChattingReserv,
//     ChattingRoomDiv,
//     ChattingRoomHeader,
//     ChattingText,
//     ChattingTextDiv,
//     ChattingTime,
// } from '../../../styledComponents';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

// const ChattingList = () => {
//     return (
//         <>
//             <ChattingDiv>
//                 <ChattingHeader>
//                     <FontAwesomeIcon icon={faCommentDots} /> Chatting
//                 </ChattingHeader>

//                 <ChattingListDiv>
//                     {/* <ChattingBox>
//             <ChattingImg src='../../img/react.jpg' />
//             <ChattingInfoDiv>
//               <ChattingTextDiv>
//                 <ChattingText size='big'>킹아영</ChattingText>
//                 <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//               </ChattingTextDiv>
//               <ChattingTextDiv sort="right">
//                 <ChattingText size="small">2022년 8월 17일의 예약 손님</ChattingText>
//                 <ChattingText size="small">010-6595-0827</ChattingText>
//                 <ChattingText size="small">200,000원</ChattingText>
//               </ChattingTextDiv>
//               <ChattingTime>
//                 오후 5:37
//               </ChattingTime>
//             </ChattingInfoDiv>
//           </ChattingBox> */}


//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="standby" />
//                     </ChattingBox>

//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>

//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>
//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>
//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>
//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>
//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>
//                     <ChattingBox>
//                         <ChattingImg src='../../img/react.jpg' />


//                         <ChattingTextDiv>
//                             <ChattingText size='big'>킹아영</ChattingText>
//                             <ChattingText size="medium">채팅 마지막 내용 미리보기</ChattingText>
//                         </ChattingTextDiv>

//                         <ChattingReserv state="complete" />
//                     </ChattingBox>

//                 </ChattingListDiv>

//                 <ChattingRoomDiv>

//                     <ChattingRoomHeader>

//                         <ChattingImg src='../../img/react.jpg' />
//                         <ChattingText size='main'>킹아영</ChattingText>

//                     </ChattingRoomHeader>

//                     <ChatBigDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>

//                         <ChatDiv who="me">
//                             <ChatContents who="me">
//                                 sibal
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 12월 17일 12:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="me">
//                             <ChatContents who="me">
//                                 sibal
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 12월 17일 12:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="me">
//                             <ChatContents who="me">
//                                 sibal
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 12월 17일 12:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="me">
//                             <ChatContents who="me">
//                                 sibal
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 12월 17일 12:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="me">
//                             <ChatContents who="me">
//                                 sibal
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 12월 17일 12:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                         <ChatDiv who="you">
//                             <ChatContents who="you">
//                                 ...
//                             </ChatContents>
//                             <ChatDate>
//                                 2022년 8월 17일 5:17pm
//                             </ChatDate>
//                         </ChatDiv>
//                     </ChatBigDiv>

//                     <ChatInputDiv>
//                         <ChatInput />
//                         <ChatBtn type="submit">전송</ChatBtn>
//                         <ChatBtn type="image">이미지</ChatBtn>
//                     </ChatInputDiv>

//                 </ChattingRoomDiv>

//             </ChattingDiv>
//         </>
//     );
// };

// export default ChattingList;