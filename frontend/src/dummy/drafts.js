const getDraftData = (id) => {
  const draft_id = `draft${id}`;

  return {
    draft_id,
    image: `${process.env.PUBLIC_URL}/img/drafts/${draft_id}.jpeg`,
    title: `도안${id}`,
    like: 10,
    drawer_id: `drawer${id}`,
    drawer_image: null,
    drawer_nickname: `타투이스트${id}`,
    isScraped: false,
    genre: "블랙",
  };
};

export default [
  getDraftData(1),
  getDraftData(2),
  getDraftData(3),
  getDraftData(4),
  getDraftData(5),
  getDraftData(6),
  getDraftData(7),
];
