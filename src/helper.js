import {CsvBuilder} from 'filefy';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// function to return axios configuration with tenant token
export const tenantTokenConfig = getState => {
    //get tenant tenantToken from local storage
    const tenantToken = getState().tenantAuth.tenantToken;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If tenantToken, add to headers
    if (tenantToken) {
        axiosConfig.headers['Authorization'] = `Bearer ${tenantToken}`;
    }

    return axiosConfig;
}

// function to return axios configuration with user token
export const userTokenConfig = getState => {
    //get tenant tenantToken from local storage
    const userToken = getState().userAuth.userToken;

    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If tenantToken, add to headers
    if (userToken) {
        axiosConfig.headers['Authorization'] = `Bearer ${userToken}`;
    }

    return axiosConfig;
}

export const wordCapitalize = word => {
    return word
        .charAt(0)
        .toUpperCase() + word.slice(1);
}

export const exportTable = (exportColumns, exportData, exportType, fileName) => {

    const exportColumnsTitle = exportColumns.map(column => column.title);
    const exportDataFields = exportData.map(rowData => exportColumns.map(column => {
        switch (column.field) {
            case 'contact':
                return `${wordCapitalize(rowData.contact.firstname)} ${wordCapitalize(rowData.contact.lastname)}`
            default:
                return rowData[column.field]
        }
    }));

    if (exportType.toLowerCase() === "csv") {
        const builder = new CsvBuilder(fileName + ".csv");
        builder
            .setColumns(exportColumnsTitle)
            .addRows(exportDataFields)
            .exportFile();
    } else if (exportType.toLowerCase() === "pdf") {
        const doc = new jsPDF();

        doc.autoTable({
            head: [exportColumnsTitle],
            body: exportDataFields
        });

        doc.save(fileName + '.pdf');
    }
}


export const getUserInitials = (name) => {
    name = name.toUpperCase();
    const nameArr = name.split(' ');
    const firstInitial = nameArr[0] && nameArr[0][0];
    const secondInitial = nameArr[1] && nameArr[1][0];
    const result = `${firstInitial
        ? firstInitial
        : ''}${secondInitial
            ? secondInitial
            : ''}`;
    return <span>{result}</span>;
}


export const uuid =() => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
