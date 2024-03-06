const getTattooistData = (id) => {
  return {
    tattooist_id: `tattooist${id}`,
    image: null,
    followers: 123,
    nickname: `타투이스트${id}`,
    location: "서울",
    specialize: "블랙",
    description: "타투하러 오세용~",
    isFollowed: false,
  };
};

export default [
  getTattooistData(1),
  getTattooistData(2),
  getTattooistData(3),
  getTattooistData(4),
  getTattooistData(5),
  getTattooistData(6),
  getTattooistData(7),
];
