import * as types from '../types';
// @ts-ignore
import notificationSound from '../../assets/audio/oppo-notification.mp3';

// eslint-disable-next-line import/prefer-default-export
export const setAudioInstance = () => {
    return { type: types.SET_AUDIO_INSTANCE, payload: new Audio(notificationSound) };
};
