const maxSortId = {
  links_max: 0,
  recos_max: 0,
};

export const rootreducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export const sortReducer = (maxSortId, action) => {
  switch (action.type) {
    case "INCREMENT":
      return maxSortId + 1;
    case "DECREMENT":
      return maxSortId - 1;
    default:
      return maxSortId;
  }
};
