const getChatData = (id) => {
  return {
    createdAt: `chat${id}`,
    opponent_image: `${process.env.PUBLIC_URL}/img/찡구.png`,
    opponent_nickname: "짱구",
    content: "안녕하세요~ 타투 문의 드려요~",
  };
};

export default [getChatData(1)];
