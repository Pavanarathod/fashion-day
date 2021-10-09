const initialState = { currentUser: null };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOGOUT_USER":
      return {
        currentUser: null,
      };
    default:
      return state;
  }
};
