import { handleActions } from "redux-actions";
import { setToggle } from "../actions/drawerActions";
const initialState = {
  isOpen: false,
};

const drawerReducer = handleActions(
  {
    [setToggle]: (state, action) => (
      {
      ...state,
      isOpen: !state.isOpen,
    }),
  },
  initialState,
);
export default drawerReducer;