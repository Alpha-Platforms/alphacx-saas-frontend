import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import errorReducer from './errorReducer';
import userAuthReducer from './userAuthReducer';
import customerReducer from './customerReducer';
import ticketReducer from './ticketReducer';
import priorityReducer from './priorityReducer';
import categoryReducer from './categoryReducer';
import statusReducer from './statusReducer';
import groupReducer from './groupReducer';
import agentReducer from './agentReducer';
import userReducer from './userReducer';
import tagReducer from './tagReducer';
import subCategoryReducer from './subCategoryReducer';
import configReducer from './configReducer';

const persistConfig = {
    key: 'alphacx_platform',
    storage,
    whitelist: ['error', 'tenantAuth', 'userAuth', 'priority', 'category', 'status', 'group', 'tag', 'subCategory', 'config']
}

const rootReducer = combineReducers({
    error: errorReducer,
    userAuth: userAuthReducer,
    customer: customerReducer,
    ticket: ticketReducer,
    priority: priorityReducer,
    category: categoryReducer,
    status: statusReducer,
    group: groupReducer,
    agent: agentReducer,
    user: userReducer,
    tag: tagReducer,
    subCategory: subCategoryReducer,
    config: configReducer
});

export default persistReducer(persistConfig, rootReducer);