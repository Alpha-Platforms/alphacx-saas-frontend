/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import { TablePagination, TablePaginationProps } from '@material-ui/core';
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import { ReactComponent as DeleteGreySvg } from '../../../../../assets/icons/Delete-grey.svg';
import { ReactComponent as EditGreySvg } from '../../../../../assets/icons/Edit-grey.svg';
import { ReactComponent as DeleteWhiteSvg } from '../../../../../assets/icons/Delete-white.svg';
import { ReactComponent as DotSvg } from '../../../../../assets/icons/dots.svg';
import { httpPostMain } from '../../../../../helpers/httpMethods';
import EditCatModal from './EditCatModal';
import { getPaginatedCategories } from '../../../../../reduxstore/actions/categoryActions';

function TicketCategoriesTab({
    pagCategories,
    meta,
    isPagCategoriesLoaded,
    getPaginatedCategories,
    isUserAuthenticated,
}) {
    const [changingRow, setChangingRow] = useState(false);

    const [createModalShow, setCreateModalShow] = useState(false);
    const [currentCatInfo, setCurrentCatInfo] = useState(null);
    const [custLoading, setCustLoading] = useState(false);

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

    useEffect(() => {
        setCustLoading(!isPagCategoriesLoaded);
        if (isPagCategoriesLoaded) {
            setCustLoading(false);
        }
    }, [isPagCategoriesLoaded]);

    useEffect(() => {
        if (isUserAuthenticated) {
            // get first set of tickets
            getPaginatedCategories(50, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    const mixedCat = [];

    pagCategories.forEach((cat) => {
        mixedCat.push({ category: cat.name, parentCategory: '', catId: cat.id });

        // if (cat.subCategories.length === 0) {
        //   mixedCat.push({category: cat.name, parentCategory: ''});
        // } else {
        //   cat.subCategories.forEach(c => mixedCat.push({category: c.name, parentCategory: cat.name}));
        // }
    });

    // function AlphacxMTPagination(props) {
    //   const {
    //     ActionsComponent,
    //     onChangePage,
    //     onChangeRowsPerPage,
    //     ...tablePaginationProps
    //   } = props;

    //   return (
    //     <TablePagination
    //       {...tablePaginationProps}
    //       // @ts-expect-error onChangePage was renamed to onPageChange
    //       onPageChange={onChangePage}
    //       onRowsPerPageChange={onChangeRowsPerPage}
    //       ActionsComponent={(subprops) => {
    //         const { onPageChange, ...actionsComponentProps } = subprops;
    //         return (
    //           // @ts-expect-error ActionsComponent is provided by material-table
    //           <ActionsComponent
    //             {...actionsComponentProps}
    //             onChangePage={onPageChange}
    //           />
    //         );
    //       }}
    //     />
    //   );
    // }

    function AlphacxMTPagination(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                rowsPerPageOptions={[10, 20, 30, 50, 100, 150, 200]}
                rowsPerPage={meta?.itemsPerPage || 50}
                count={Number(meta?.totalItems || 20)}
                page={(meta?.currentPage || 1) - 1}
                onPageChange={onChangePage}
                // when the number of rows per page changes
                onRowsPerPageChange={(event) => {
                    // setChangingRow(true);
                    getPaginatedCategories(event.target.value, 1);
                }}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                            {...actionsComponentProps}
                            onChangePage={(event, newPage) => {
                                // fetch tickets with new current page
                                getPaginatedCategories(meta.itemsPerPage, newPage + 1);
                            }}
                            onRowsPerPageChange={(event) => {
                                // fetch tickets with new rows per page
                                getPaginatedCategories(event.target.value, meta.currentPage);
                            }}
                        />
                    );
                }}
            />
        );
    }

    const openModal = function () {
        const { id, name } = this;
        setCurrentCatInfo({ id, name });
        setCreateModalShow(true);
    };

    return (
        <div className="ticket-cat-tab">
            {custLoading && (
                <div className="cust-table-loader">
                    <MoonLoader loading={custLoading} color="#006298" size={30} />
                </div>
            )}

            <div className="tct-right position-relative">
                {/* <btn className="tr-delete-btn btn btn-sm bg-at-blue-light px-2"><span style={{ transform: 'scale(0.9)' }} className="d-inline-block"><DeleteWhiteSvg/></span> Delete</btn> */}
                <div id="alphacxMTable" className="mb-3 acx-user-table acx-category-table">
                    {pagCategories && !changingRow && (
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                title=""
                                icons={tableIcons}
                                columns={[
                                    {
                                        title: 'Category',
                                        field: 'category',
                                        width: '50%',
                                    },
                                    // {
                                    //   title: "Parent Category",
                                    //   field: "parentCategory",
                                    // },
                                    {
                                        title: 'Description',
                                        field: 'description',
                                    },
                                    {
                                        title: '',
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
                                                        onClick={openModal.bind({
                                                            id: rowData.catId,
                                                            name: rowData.category,
                                                        })}
                                                    >
                                                        <span className="black-text">Edit</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2">
                                                        <span className="black-text">Delete</span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ),
                                    },
                                ]}
                                data={mixedCat.map(({ category, parentCategory, catId }) => ({
                                    category,
                                    parentCategory,
                                    description: '',
                                    catId,
                                }))}
                                options={{
                                    search: false,
                                    selection: true,
                                    // exportButton: true,
                                    // tableLayout: "auto",
                                    // paging: true,
                                    // pageSize: 10,
                                    pageSize: meta?.itemsPerPage || 50,
                                    headerStyle: {
                                        backgroundColor: '#f8f9fa',
                                    },
                                    rowStyle: {
                                        // backgroundColor: '#f8f9fa'
                                    },
                                    // filtering: true
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination,
                                }}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: 'No categories to display',
                                    },
                                }}
                            />
                        </MuiThemeProvider>
                    )}
                </div>
            </div>
            <EditCatModal
                createModalShow={createModalShow}
                setCreateModalShow={setCreateModalShow}
                currentCatInfo={currentCatInfo}
            />
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    pagCategories: state.category.pagCategories,
    meta: state.category.pagMeta,
    isPagCategoriesLoaded: state.category.isPagCategoriesLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { getPaginatedCategories })(TicketCategoriesTab);
