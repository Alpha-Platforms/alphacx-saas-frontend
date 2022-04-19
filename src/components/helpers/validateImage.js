/* eslint-disable */
import { NotificationManager } from 'react-notifications';

const validateImage = (file) => {
    let valid = true;
    let message = 'uploading...';

    if (file[0] && !/\/(jpg|jpeg|tiff|png)$/i.test(file[0].type)) {
        valid = false;
        message = 'Invalid picture format';
        NotificationManager.error('Invalid picture format', 'Opps', 4000);
        return false;
    }
    if (file[0] && parseFloat(file[0].size) > 5097152) {
        valid = false;
        message = 'File size exceeds 5MB';
        NotificationManager.error('File size exceeds 5MB', 'Opps', 4000);
        return false;
    }

    return { valid, message };
};

export default validateImage;
