import moment from 'moment';

export const dateFormater = (date) => {
    const formatedDate = `${moment(`${date}`).format('Do MMM, yyyy')} at ${moment(`${date}`).format('LT')}
  `;
    return formatedDate;
};

export const timeFormater = (date) => {
    const formatedDate = moment(date).format('hh:mm a');

    return formatedDate;
};
// moment("2015-01-16T12:00:00").format("hh:mm:ss a") width: calc(100% - 636px);
// import React from 'react'
// import moment from 'moment'
// export default function dateFormater(date) {
//   let formatedDate = `${moment(`${date}`).format('Do MMM, yyyy')}
//   `
//   return (
//     formatedDate
//   )
// }
