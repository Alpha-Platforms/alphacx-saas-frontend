/* eslint-disable */
import React, { useState, useEffect } from 'react';

export const currencyFormat = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
};

export const Capitalize = (string) => {
    string = string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase());
    return string;
};

export const useScrollDetect = () => {
    const [shadow, setShadow] = useState(false);
    const handleScroll = (event) => {
        const scrollTop = window.scrollY;
        if (scrollTop > 10) {
            setShadow(true);
        } else {
            setShadow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);
    return { shadow };
};
