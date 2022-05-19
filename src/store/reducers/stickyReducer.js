import { handleActions } from "redux-actions";
import { setSticky, removeSticky, setSidebarSticky, removeSidebarSticky } from "store/actions/stickyActions";
const initialState = {
  isSticky: false,
  isSidebarSticky: true,
};

const stickyReducer = handleActions(
  {
    [setSticky]: (state, action) => ({
      ...state,
      isSticky: true,
    }),
    [removeSticky]: (state, action) => ({
      ...state,
      isSticky: false,
    }),
    [setSidebarSticky]: (state, action) => ({
      ...state,
      isSidebarSticky: true,
    }),
    [removeSidebarSticky]: (state, action) => ({
      ...state,
      isSidebarSticky: false,
    }),
    default: (state, action) => {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  },
  initialState
);
export default stickyReducer;