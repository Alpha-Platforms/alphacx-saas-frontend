// TENANT AUTHENTICATION

export const TENANT_LOADING = 'TENANT_LOADING';
export const TENANT_LOADED = 'TENANT_LOADED';
export const TENANT_AUTH_ERROR = 'TENANT_AUTH_ERROR';
export const TENANT_LOGIN_SUCCESS = 'TENANT_LOGIN_SUCCESS';
export const TENANT_LOGIN_FAIL = 'TENANT_LOGIN_FAIL';
export const TENANT_LOGOUT_SUCCESS = 'TENANT_LOGOUT_SUCCESS';
export const TENANT_REGISTER_SUCCESS = 'TENANT_REGISTER_SUCCESS';
export const TENANT_REGISTER_FAIL = 'TENANT_REGISTER_FAIL';
export const ATTEMPT_TENANT_LOGIN = 'ATTEMPT_TENANT_LOGIN';
export const ATTEMPT_TENANT_LOGIN_FAILED = 'ATTEMPT_TENANT_LOGIN_FAILED';
export const RESET_TENANT_LOGIN_FAILED = 'RESET_TENANT_LOGIN_FAILED';
export const AFTER_TENANT_LOAD = 'AFTER_TENANT_LOAD';

// USER AUTHENTICATION
export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = 'USER_LOADED';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const ATTEMPT_USER_LOGIN = 'ATTEMPT_USER_LOGIN';
export const ATTEMPT_USER_LOGIN_FAILED = 'ATTEMPT_USER_LOGIN_FAILED';
export const RESET_USER_LOGIN_FAILED = 'RESET_USER_LOGIN_FAILED';
export const AFTER_USER_LOAD = 'AFTER_USER_LOAD';

// ERROR
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// CUSTOMERS
export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const CUSTOMERS_LOADING = 'CUSTOMERS_LOADING';

// CURRENT CUSTOMER
export const GET_CURRENT_CUSTOMER = 'GET_CURRENT_CUSTOMER';
export const CURRENT_CUSTOMER_LOADING = 'CURRENT_CUSTOMER_LOADING';
export const GET_CURRENT_CUSTOMER_TICKETS = 'GET_CURRENT_CUSTOMER_TICKETS';
export const CURRENT_CUSTOMER_TICKETS_LOADING = 'CURRENT_CUSTOMER_TICKETS_LOADING';

// TICKETS
export const GET_TICKETS = 'GET_TICKETS';
export const ADD_TICKET = 'ADD_TICKET';
export const TICKETS_LOADING = 'TICKETS_LOADING';
export const RESET_TICKET_CREATED = 'RESET_TICKET_CREATED';

// CURRENT TICKET
export const GET_CURRENT_TICKET = 'GET_CURRENT_TICKET';
export const CURRENT_TICKET_LOADING = 'CURRENT_TICKET_LOADING';

// PRIORITIES
export const GET_PRIORITIES = 'GET_PRIORITIES';
export const PRIORITIES_LOADING = 'PRIORITIES_LOADING';

// CATEGORIES
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PAG_CATEGORIES = 'GET_PAG_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
export const PAG_CATEGORIES_LOADING = 'PAG_CATEGORIES_LOADING';

// SUB_CATEGORIES
export const GET_SUB_CATEGORIES = 'GET_SUB_CATEGORIES';
export const ADD_SUB_CATEGORY = 'ADD_SUB_CATEGORY';
export const SUB_CATEGORIES_LOADING = 'SUB_CATEGORIES_LOADING';

// STATUSES
export const GET_STATUSES = 'GET_STATUSES';
export const ADD_STATUS = 'ADD_STATUS';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const STATUSES_LOADING = 'STATUSES_LOADING';

// GROUPS
export const GET_GROUPS = 'GET_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';
export const GROUPS_LOADING = 'GROUPS_LOADING';
export const DELETE_GROUP = 'DELETE_GROUP';

// AGENTS
export const GET_AGENTS = 'GET_AGENTS';
export const ADD_AGENT = 'ADD_AGENT';
export const AGENTS_LOADING = 'AGENTS_LOADING';
export const AGENTS_LOADING_FAILED = 'AGENTS_LOADING_FAILED';
export const RESET_AGENT_CREATED = 'RESET_AGENT_CREATED';
export const NEGATE_STATE = 'NEGATE_STATE';

// SINGLE USER
export const ADD_SINGLE_AGENT = 'ADD_SINGLE_AGENT';
export const ADD_SINGLE_SUPERVISOR = 'ADD_SINGLE_SUPERVISOR';
export const ADD_SINGLE_ADMIN = 'ADD_SINGLE_ADMIN';

// CURRENT AGENT
export const GET_CURRENT_AGENT = 'GET_CURRENT_AGENT';
export const CURRENT_AGENT_LOADING = 'CURRENT_AGENT_LOADING';

// ADMIN
export const GET_ADMINS = 'GET_ADMINS';
export const ADMINS_LOADING = 'ADMINS_LOADING';
export const ADMINS_LOADING_FAILED = 'ADMINS_LOADING_FAILED';
export const RESET_ADMIN_CREATED = 'RESET_ADMIN_CREATED';

// CURRENT ADMIN
export const GET_CURRENT_ADMIN = 'GET_CURRENT_ADMIN';
export const CURRENT_ADMIN_LOADING = 'CURRENT_ADMIN_LOADING';

// SUPERVISOR
export const GET_SUPERVISORS = 'GET_SUPERVISORS';
export const SUPERVISORS_LOADING = 'SUPERVISORS_LOADING';
export const SUPERVISORS_LOADING_FAILED = 'SUPERVISORS_LOADING_FAILED';
export const RESET_SUPERVISOR_CREATED = 'RESET_SUPERVISOR_CREATED';

// CURRENT SUPERVISOR
export const GET_CURRENT_SUPERVISOR = 'GET_CURRENT_SUPERVISOR';
export const CURRENT_SUPERVISOR_LOADING = 'CURRENT_SUPERVISOR_LOADING';

// OBSERVER
export const GET_OBSERVERS = 'GET_OBSERVERS';
export const OBSERVERS_LOADING = 'OBSERVERS_LOADING';
export const OBSERVERS_LOADING_FAILED = 'OBSERVERS_LOADING_FAILED';

// USERS
export const GET_USERS = 'GET_USERS';
export const USERS_LOADING = 'USERS_LOADING';
export const RESET_USER_CREATED = 'RESET_USER_CREATED';

// TAGS
export const GET_TAGS = 'GET_TAGS';
export const ADD_TAGS = 'ADD_TAGS';
export const TAGS_LOADING = 'TAGS_LOADING';

// CONFIGS
export const GET_CONFIGS = 'GET_CONFIGS';
export const ADD_CONFIG = 'ADD_CONFIG';
export const CONFIGS_LOADING = 'CONFIGS_LOADING';

// SLA
export const GET_SLAS = 'GET_SLAS';
export const ADD_SLA = 'ADD_SLA';
export const UPDATE_SLA = 'UPDATE_SLA';
export const SLAS_LOADING = 'SLAS_LOADING';

// CHANNEL
export const GET_CHANNELS = 'GET_CHANNELS';
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const UPDATE_CHANNEL = 'UPDATE_CHANNEL';
export const CHANNELS_LOADING = 'CHANNELS_LOADING';

// EMAIL TEMPLATES
export const GET_EMAIL_TEMPLATES = 'GET_EMAIL_TEMPLATES';
export const ADD_EMAIL_TEMPLATE = 'ADD_EMAIL_TEMPLATE';
export const UPDATE_EMAIL_TEMPLATE = 'UPDATE_EMAIL_TEMPLATE';
export const DELETE_EMAIL_TEMPLATE = 'DELETE_EMAIL_TEMPLATE';
export const EMAIL_TEMPLATES_LOADING = 'EMAIL_TEMPLATES_LOADING';

// CURRENT EMAIL TEMPLATE
export const GET_CURRENT_EMAIL_TEMPLATE = 'GET_CURRENT_EMAIL_TEMPLATE';
export const CURRENT_EMAIL_TEMPLATE_LOADING = 'CURRENT_EMAIL_TEMPLATE_LOADING';

// ANALYTICS
export const GET_ANALYTICS = 'GET_ANALYTICS';
export const GET_NEW_ANALYTICS = 'GET_NEW_ANALYTICS';
export const ADD_ANALYTICS = 'ADD_ANALYTICS';
export const ANALYTICS_LOADING = 'ANALYTICS_LOADING';

// LIVECHAT CONFIG
export const GET_LIVECHAT_CONFIG = 'GET_LIVECHAT_CONFIG';
export const UPDATE_LIVECHAT_CONFIG = 'UPDATE_LIVECHAT_CONFIG';
export const LIVECHAT_CONFIG_LOADING = 'LIVECHAT_CONFIG_LOADING';

// SMS CONFIG
export const GET_SMS_CONFIG = 'GET_SMS_CONFIG';
export const UPDATE_SMS_CONFIG = 'UPDATE_SMS_CONFIG';
export const SMS_CONFIG_LOADING = 'SMS_CONFIG_LOADING';

// TWITTER CONFIG
export const GET_TWITTER_CONFIG = 'GET_TWITTER_CONFIG';
export const UPDATE_TWITTER_CONFIG = 'UPDATE_TWITTER_CONFIG';
export const TWITTER_CONFIG_LOADING = 'TWITTER_CONFIG_LOADING';

// CUSTOM FIELDS
export const GET_CUSTOM_FIELDS = 'GET_CUSTOM_FIELDS';
export const ADD_CUSTOM_FIELD = 'ADD_CUSTOM_FIELD';
export const CUSTOM_FIELDS_LOADING = 'CUSTOM_FIELDS_LOADING';

// APP SUBSCRIPTION INFO
export const GET_SUBSCRIPTION = 'GET_SUBSCRIPTION';

// APP SOCKET
export const SET_APP_SOCKET = 'SET_APP_SOCKET';
export const SET_SOCKET_MESSAGE = 'SET_SOCKET_MESSAGE';
export const RESET_SOCKET_MESSAGE = 'RESET_SOCKET_MESSAGE';

// AUDIO
export const SET_AUDIO_INSTANCE = 'SET_AUDIO_INSTANCE';

// KB
export const ADD_HELPFUL_ARTICLE = 'ADD_HELPFUL_ARTICLE';
