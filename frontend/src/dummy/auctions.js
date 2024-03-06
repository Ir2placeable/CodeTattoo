const getAuctionData = (id) => {
  return {
    auction_id: `auction${id}`,
    genre: `도안요청`,
    image: `${process.env.PUBLIC_URL}/img/drafts/draft${id}.jpeg`,
    cost: 100000,
    bidder_count: 23,
  };
};

export default [
  getAuctionData(1),
  getAuctionData(2),
  getAuctionData(3),
  getAuctionData(4),
  getAuctionData(5),
  getAuctionData(6),
  getAuctionData(7),
];
