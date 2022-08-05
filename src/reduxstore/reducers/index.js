/* eslint-disable */
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
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
import adminReducer from './adminReducer';
import supervisorReducer from './supervisorReducer';
import observerReducer from './observerReducer';
import userReducer from './userReducer';
import tagReducer from './tagReducer';
import subCategoryReducer from './subCategoryReducer';
import configReducer from './configReducer';
import analyticsReducer from './analyticsReducer';
import livechatReducer from './livechatReducer';
import smsReducer from './smsReducer';
import slaReducer from './slaReducer';
import emailTemplateReducer from './emailTemplateReducer';
import channelReducer from './channelReducer';
import customFieldReducer from './customFieldReducer';
import subscriptionReducer from './subscriptionReducer';
import socketReducer from './socketReducer';
import audioReducer from './audioReducer';
// ,
const persistConfig = {
    key: 'alphacx_platform',
    storage,
    whitelist: [
        'error',
        'tenantAuth',
        'userAuth',
        'priority',
        'status',
        'group',
        'tag',
        'subCategory',
        'config',
        'livechat',
        'sms',
        'sla',
        'emailTemplate',
        'channel',
        'subscription',
    ],
};

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
    admin: adminReducer,
    supervisor: supervisorReducer,
    observer: observerReducer,
    user: userReducer,
    tag: tagReducer,
    subCategory: subCategoryReducer,
    config: configReducer,
    analytics: analyticsReducer,
    livechat: livechatReducer,
    sms: smsReducer,
    sla: slaReducer,
    emailTemplate: emailTemplateReducer,
    channel: channelReducer,
    customField: customFieldReducer,
    subscription: subscriptionReducer,
    socket: socketReducer,
    audio: audioReducer
});

export default persistReducer(persistConfig, rootReducer);
