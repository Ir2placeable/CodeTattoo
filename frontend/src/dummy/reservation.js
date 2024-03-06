const getReservationData = (id, confirmed, procedure_status) => {
  return {
    reservation_id: `reservation${id}`,
    cost: 50000,
    image: `${process.env.PUBLIC_URL}/img/drafts/draft${id}.jpeg`,
    customer_nickname: "짱구",
    date: "10:30",
    confirmed,
    procedure_status,
  };
};

export const confirmed = [
  getReservationData(1, true, true),
  getReservationData(2, true, false),
];

export const pending = [getReservationData(3, false, false)];
