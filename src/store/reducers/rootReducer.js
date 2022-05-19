import authReducer from './authReducer';
import { combineReducers } from 'redux';
import drawerReducer from './drawerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    drawer: drawerReducer,
});

export default rootReducer;
