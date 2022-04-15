/* eslint-disable */
// @ts-nocheck

import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Dropdown } from 'react-bootstrap';
import { TablePagination } from '@material-ui/core';
import { Link } from 'react-router-dom';
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import { ReactComponent as DotSvg } from '../../../../../assets/icons/dots.svg';
import { textCapitalize } from '../../../../../helper';

function ArticleCatTable({ setIsEditing, setTabKey, setNewCategory, setEditId, categories }) {
    const handleCatEdit = (cat) => {
        setIsEditing(true);
        setTabKey('category-form');
        setNewCategory((prev) => ({
            ...prev,
            name: cat.name,
            description: cat.description,
        }));
        setEditId(cat.id);
    };

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

    function AlphacxMTPagination2(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />;
                }}
            />
        );
    }

    return (
        <div id="alphacxMTable" className="pb-2 acx-group-table acx-user-table-2 fit-content">
            {categories && (
                <MuiThemeProvider theme={tableTheme}>
                    <MaterialTable
                        title=""
                        icons={tableIcons}
                        columns={[
                            {
                                title: 'Category',
                                field: 'category',
                                render: (rowData) => <span>{textCapitalize(rowData.category)}</span>,
                            },
                            {
                                title: 'Description',
                                field: 'description',
                                width: '20%',
                            },
                            {
                                title: 'Action',
                                field: 'action',
                                render: (rowData) => (
                                    <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                                        <Dropdown.Toggle variant="transparent" size="sm">
                                            <span className="cust-table-dots">
                                                <DotSvg />
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                eventKey="1"
                                                onClick={() =>
                                                    handleCatEdit({
                                                        name: rowData.category,
                                                        description: rowData.description,
                                                        id: rowData.id,
                                                    })
                                                }
                                            >
                                                <Link to="#">
                                                    <span className="black-text">Edit</span>
                                                </Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="2">
                                                <span className="black-text">Delete</span>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ),
                            },
                        ]}
                        data={categories.map(({ id, name, description }) => ({
                            category: name,
                            description,
                            id,
                        }))}
                        options={{
                            search: true,
                            selection: false,
                            // exportButton: true,
                            tableLayout: 'auto',
                            paging: true,
                            pageSize: 10,
                            rowStyle: {
                                backgroundColor: '#fff',
                            },
                            headerStyle: {
                                backgroundColor: '#f8f9fa',
                            },
                        }}
                        components={{
                            Pagination: AlphacxMTPagination2,
                        }}
                    />
                </MuiThemeProvider>
            )}
        </div>
    );
}

export default ArticleCatTable;
