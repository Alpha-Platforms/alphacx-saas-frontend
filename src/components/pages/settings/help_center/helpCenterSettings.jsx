/* eslint-disable */
// @ts-nocheck
import React, { useEffect } from 'react';
import './helpCenter.scss';
import { css } from '@emotion/css';
import { NotificationManager } from 'react-notifications';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import '../../../../styles/Ticket.css';
import MoonLoader from 'react-spinners/MoonLoader';
import Swal from 'sweetalert2';
import moment from 'moment';
// import { wordCapitalize } from '../../../../helper';
import { ReactComponent as DotSvg } from '../../../../assets/icons/dots.svg';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { httpGetMain, httpPatchMain } from '../../../../helpers/httpMethods';
import EmptyArticle from '../../../../assets/images/empty_article.png';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
import { brandKit } from './../../../../helper';


function HelpCenterSettings() {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    const [policyLoading, setPolicyLoading] = useState(false);

    // function to fetch all articles for user
    const fetchAllArticles = async () => {
        setPolicyLoading(true);
        const res = await httpGetMain(`articles?page=${page}`);
        setPolicyLoading(false);
        if (res?.status == 'success') {
            console.clear();
            console.log('articles', res);
            setArticles(res?.data?.articles);
            setMeta(res?.data?.meta);
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };
    // const handleCheck = (e, index) => {
    //   let newArticles = articles;
    //   newArticles.articles[index].checked = e.target.checked;
    //   setArticles(newArticles);
    // };

    // function to publish articles
    const publishArticle = async (id, index) => {
        console.log('publishing');
        setPolicyLoading(true);
        const res = await httpPatchMain(`articles/${id}/publish`);
        setPolicyLoading(false);

        if (res?.status == 'success') {
            NotificationManager.success(res?.message, 'Success', 4000);
            const newArticles = articles;
            newArticles[index] = {
                ...newArticles[index],
                isPublished: !newArticles[index].isPublished,
            };

            setArticles([]);
            setArticles(newArticles);
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };
    // function to unpublish articles
    const unPublishArticle = async (id, index) => {
        setPolicyLoading(true);
        const res = await httpPatchMain(`articles/${id}/unpublish`);
        setPolicyLoading(false);
        if (res?.status == 'success') {
            NotificationManager.success(res?.message, 'Success', 4000);
            const newArticles = articles;
            newArticles[index] = {
                ...newArticles[index],
                isPublished: !newArticles[index].isPublished,
            };

            setArticles([]);
            setArticles(newArticles);
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };

    // function to trigger popup modal for publish/unpublish confirmation
    function handlePublishChange() {
        const { title, isPublished, id, rowData } = this;
        const articleId = articles[id].id;
        console.log(rowData);

        Swal.fire({
            title: '',
            text: `Do you want to ${isPublished ? 'unpublish' : 'publish'} "${title}"?`,
            showCancelButton: true,
            confirmButtonColor: isPublished ? '#ff0e0e' : brandKit({ bgCol: 0 })?.backgroundColor,
            cancelButtonColor: '#ffffff',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Confirm',
            customClass: {
                cancelButton: 'user-activation-cancel-btn',
                confirmButton: 'user-activation-confirm-btn',
                container: 'user-activation-container',
                popup: 'user-activation-popup',
                validationMessage: 'user-activation-validation-msg',
                htmlContainer: 'user-activation-html-container',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (isPublished) {
                    unPublishArticle(articleId, id);
                } else {
                    publishArticle(articleId, id);
                }
            } else {
                console.log('Do nothing');
            }
        });
    }

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
    const [changingRow, setChangingRow] = useState(false);
    const tableColumns = [
        {
            title: 'Title',
            field: 'title',
            width: '40%',
            render: (rowData) => {
                return (
                    <Link to={`/settings/knowledge-base/edit/${articles[rowData.tableData.id].id}`}>
                        {articles[rowData.tableData.id].title}
                    </Link>
                );
            },
        },
        {
            title: 'Publish',
            field: 'isPublished',
            render: (rowData) => (
                <div className="form-check form-switch">
                    <input
                        className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                        checked={rowData.isPublished}
                        readOnly
                        onChange={handlePublishChange.bind({
                            title: rowData.title,
                            isPublished: rowData.isPublished,
                            id: rowData.tableData.id,
                            rowData,
                        })}
                        type="checkbox"
                    />
                </div>
            ),
        },
        // {
        //   title: "Page Views",
        //   field: "views",
        // },
        {
            title: 'Category',
            field: 'category',
        },
        {
            title: 'Created at',
            field: 'created_at',
        },
        {
            title: 'Last modified at',
            field: 'modified_at',
        },
        {
            title: '',
            field: 'dropdownAction',
            render: (rowData) => (
                <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                    <Dropdown.Toggle variant="transparent" size="sm">
                        <span className="cust-table-dots">
                            <DotSvg />
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">
                            <span
                                className="black-text"
                                onClick={() => {
                                    // console.log(articles.articles[rowData.tableData.id].id);
                                    window.location.href = `/settings/knowledge-base/edit/${
                                        articles[rowData.tableData.id].id
                                    }`;
                                }}
                            >
                                Edit
                            </span>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <span className="black-text">Delete</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];

    function AlphacxMTPagination(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                rowsPerPageOptions={[10, 20, 30]}
                rowsPerPage={meta?.itemsPerPage || 10}
                count={Number(meta?.totalItems || 20)}
                page={(meta?.currentPage || 1) - 1}
                onPageChange={onChangePage}
                // when the number of rows per page changes
                onRowsPerPageChange={(event) => {
                    setChangingRow(true);
                    // getPaginatedTickets(event.target.value, 1);
                }}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                            {...actionsComponentProps}
                            onChangePage={(event, newPage) => {
                                console.log('changing page', newPage);
                                setPage(newPage + 1);
                                // fetch tickets with new current page
                                // getPaginatedTickets(meta.itemsPerPage, newPage + 1);
                            }}
                            onRowsPerPageChange={(event) => {
                                // fetch tickets with new rows per page
                                // getPaginatedTickets(event.target.value, meta.currentPage);
                            }}
                        />
                    );
                }}
            />
        );
    }

    useEffect(() => {
        fetchAllArticles();
    }, [page]);

    return (
        <div className="settings-email help-center-settings">
            {policyLoading && (
                <div className={`cust-table-loader ${policyLoading && 'add-loader-opacity'}`}>
                    <MoonLoader loading={policyLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 mt-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Knowledge Base</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Knowledge Base Settings</h5>
                    <div>
                        <Link className={`btn btn-sm px-3 ms-2 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`} to="/settings/knowledge-base/article">
                            <span>New Article</span>
                        </Link>
                        <Link className={`btn btn-sm px-3 ms-2 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`} to="/settings/knowledge-base/categories">
                            <span>Categories</span>
                        </Link>                        
                        <Link className={`btn btn-sm px-3 ms-2 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`} to="/knowledge-base/" target="_blank">
                            <span>View KB</span>
                        </Link>
                    </div>
                </div>

                <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
                    <div id="alphacxMTable" className="pb-5 acx-ticket-cust-table kb-settings-table acx-ticket-table p-4">
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                columns={tableColumns}
                                title=""
                                icons={tableIcons}
                                data={articles?.map(({ title, created_at, updated_at, isPublished, folder }) => ({
                                    title,
                                    isPublished,
                                    views: '100',
                                    category: folder?.category?.name,
                                    created_at: moment(created_at).format('DD MMM, YYYY'),
                                    modified_at: moment(updated_at).format('DD MMM, YYYY'),
                                }))}
                                options={{
                                    search: true,
                                    selection: true,
                                    // exportButton: true,
                                    tableLayout: 'auto',
                                    paging: true,
                                    pageSize: 10,
                                    headerStyle: {
                                        // backgroundColor: '#f8f9fa'
                                        backgroundColor: '#fefdfd',
                                    },
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination,
                                }}
                            />
                        </MuiThemeProvider>
                    </div>
                </div>

                {/* {articles?.articles?.length > 0 && (
              <div className="pagination">
                <p>Showing 1-1 of 1 entries</p>
              </div>
            )} */}
                {/* <div id="result"></div> */}
            </div>
        </div>
    );
}

export default HelpCenterSettings;
