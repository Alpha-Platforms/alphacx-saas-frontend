/* eslint-disable */
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function GoBack() {
    const history = useHistory();

    return history.goBack();
}
