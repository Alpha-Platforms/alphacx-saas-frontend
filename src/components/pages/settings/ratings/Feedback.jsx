/* eslint-disable */
import React, { useEffect, useState } from 'react';
//
import { NotificationManager } from 'react-notifications';
//
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import SaveAlt from '@material-ui/icons/SaveAlt';

import Image from 'react-bootstrap/Image';
//
import { ReactComponent as StarUnactiveSvg } from '../../../../assets/icons/Star-unactive.svg';
import { ReactComponent as StarYellowSvg } from '../../../../assets/icons/Star-yellow.svg';
import EmptyStateImg from '../../../../assets/images/empty_article.png';

//
export default function Feedback() {
    const tableTheme = createTheme({
        palette: {
            primary: {
                main: 'rgba(0, 98, 152)',
            },
            secondary: {
                main: 'rgba(0, 98, 152)',
            },
        },
    });

    const getRatingStar = (rating = 0) => {
        if (!rating) {
            rating = 0;
        } else if (typeof rating?.value !== 'number') {
            rating = 0;
        } else {
            rating = rating?.value;
        }
        const ratingArr = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                ratingArr.push(true);
            } else {
                ratingArr.push(false);
            }
        }
        return (
            <div className="table-ratings">
                {ratingArr.map((x) => (
                    <span className="table-ratings-span">{x ? <StarYellowSvg /> : <StarUnactiveSvg />}</span>
                ))}
            </div>
        );
    };
    const tableColumns = [
        {
            title: 'Name',
            field: 'name',
        },
    ];
    return (
        <div className="mt-3 mb-5">
            <div className="py-5 text-center d-flex flex-column justify-content-center align-items-center">
                <Image src={EmptyStateImg} height="100" width="auto" />
                <h5 className="mt-3">Sorry! still cooking... 👩‍🍳 </h5>
            </div>
        </div>
    );
}
