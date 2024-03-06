export default {
  auction_id: "auction1",
  creator: `tattooist1`,
  image: `${process.env.PUBLIC_URL}/img/drafts/draft1.jpeg`,
  genre: `도안요청`,
  cost: 100000,
  bidder_count: 23,
  finished: false,
  bidders: [
    {
      drawer_id: "tattooist2",
      isFollowed: false,
      draft_image: `${process.env.PUBLIC_URL}/img/drafts/draft2.jpeg`,
      drawer_image: `${process.env.PUBLIC_URL}/img/찡구.png`,
      drawer_nickname: "짱구",
      specialize: "블랙",
    },
  ],
};
