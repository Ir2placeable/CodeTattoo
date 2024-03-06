export const data = {
  opponent_id: "opponent1",
  opponent_image: `${process.env.PUBLIC_URL}/img/찡구.png`,
  opponent_nickname: "짱구",
  content: "안녕하세요~ 문의드려요~",
  created_at: new Date(),
  sender: "sender1",
  is_image: false,
  tattoo_id: "tattoo1",
};

const getMessageData = (mine, content) => {
  return {
    is_image: false,
    tattoo_id: null,
    mine,
    content,
    created_at: "2024-01-01 12:03PM",
  };
};

export const messages = [
  getMessageData(false, "안녕하세요~ 문의드려요~"),
  getMessageData(true, "안녕하세요!"),
  getMessageData(false, "20XX-XX-XX 날짜에 예약 가능할까요?"),
];
