export const profile = {
  tattooist_id: "tattooist1",
  image: null,
  nickname: "타투이스트1",
  location: "서울",
  specialize: "블랙",
  description: "안녕하세요, 타투이스트 oo입니다.",
};

export const drafts = [
  {
    draft_id: "draft1",
    image: `${process.env.PUBLIC_URL}/img/drafts/draft1.jpeg`,
    likes: 10,
  },
  {
    draft_id: "draft2",
    image: `${process.env.PUBLIC_URL}/img/drafts/draft6.jpeg`,
    likes: 10,
  },
];

export const artworks = [
  {
    artwork_id: "artwork1",
    tattooist_id: "tattooist1",
    image: `${process.env.PUBLIC_URL}/img/drafts/draft3.jpeg`,
    cost: 50000,
  },
  {
    artwork_id: "artwork2",
    tattooist_id: "tattooist1",
    image: `${process.env.PUBLIC_URL}/img/drafts/draft4.jpeg`,
    cost: 30000,
  },
];

export const reservations = [];
