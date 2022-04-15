/* eslint-disable */
import React from 'react';
// URL.createObjectURL(e.target.files[0])

export default function GetImageUrl(Image) {
    const getUrl = Image;
    const res = URL.createObjectURL(getUrl);
    console.log(res);
    return res;
}
