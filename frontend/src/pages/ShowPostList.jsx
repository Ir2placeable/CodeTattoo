import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { 
  DraftListBigDiv,
  DraftMainDiv,
  CategoryTitle,
  EmptyDraftBox,
  PostListDiv,
  WriteBtnDiv,
  WriteBtnHoverStyle,
  PostTable,
  PostTableHead,
  TableHeadTr,
  TableHeadTd,
  PostTableBody,
  TableBodyTr,
  TitleTd,
  DateTd,
  WriterTd
} from '../styledComponents';

const temp_posts = [
  { post_id: 1, title: '제목1', date: '2022-06-20', writer: '익명'},
  { post_id: 2, title: '제목2', date: '2022-06-20', writer: '익명'},
  { post_id: 3, title: '제목3', date: '2022-06-20', writer: '익명'}
]

const ShowPostList = ({ apiUrl }) => {
  const [posts, setPosts] = useState([]);
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(hover ? false : true);
  }

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/board/post/list`);
    console.log(res);
    setPosts(res.data.posts);
  }

  useEffect(() => {
    //sendRequest();
  }, []);

  return (
    <>
      <DraftListBigDiv>

        <DraftMainDiv>
          <CategoryTitle>
            Board
          </CategoryTitle>

          {/* {posts.length === 0 ? (
            <EmptyDraftBox>
              아직 게시물이 없습니다.
            </EmptyDraftBox>
          ) : (
            <div></div>
          )} */}

          <PostListDiv>
            <WriteBtnDiv 
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              style={hover ? WriteBtnHoverStyle : {}}>
              글쓰기<FontAwesomeIcon icon={faPenToSquare} />
            </WriteBtnDiv>

            <PostTable>
              <PostTableHead>
                <TableHeadTr>
                  <TableHeadTd>제목</TableHeadTd>
                  <TableHeadTd>날짜</TableHeadTd>
                  <TableHeadTd>작성자</TableHeadTd>
                </TableHeadTr>
              </PostTableHead>

              <PostTableBody>
                {temp_posts.map(post => (
                  <TableBodyTr key={post.post_id}>
                    <TitleTd>{post.title}</TitleTd>
                    <DateTd>{post.date}</DateTd>
                    <WriterTd>{post.writer}</WriterTd>
                  </TableBodyTr>
                ))}
              </PostTableBody>
            </PostTable>

          </PostListDiv>
        </DraftMainDiv>

      </DraftListBigDiv>
    </>
  );
};

export default ShowPostList;