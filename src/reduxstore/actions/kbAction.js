import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export const addHelpfulArticle = (articleSlug) => {
    return { type: types.ADD_HELPFUL_ARTICLE, payload: articleSlug };
};
