import React, { useEffect } from "react";
import "./helpCenter.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../assets/images/empty_article.png";
import { httpGetMain } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";

const HelpCenterSettings = () => {
  const [articles, setArticles] = useState([]);
  const fetchAllArticles = async () => {
    const res = await httpGetMain("articles/categories");
    if (res?.status == "success") {
      console.clear();
      console.log("articles", res);
      setArticles(res?.data[0].folders[1]);
      // setLoadingTicks(true);
      // setTickets(res?.data?.tickets);
      // setLoadingTicks(false);
    } else {
      // setLoadingTicks(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  const handleCheck = (e, index) => {
    let newArticles = articles;
    newArticles.articles[index].checked = e.target.checked;
    setArticles(newArticles);
  };

  const tableTheme = createTheme({
    palette: {
      primary: {
        main: "rgba(0, 98, 152)",
      },
      secondary: {
        main: "rgba(0, 98, 152)",
      },
    },
  });
  const [changingRow, setChangingRow] = useState(false);
  const tableColumns = [
    {
      title: "Title",
      field: "title",
      width: "40%",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Page Views",
      field: "views",
    },
    {
      title: "Author",
      field: "author",
    },
    {
      title: "Created at",
      field: "created_at",
    },
    {
      title: "Last modified at",
      field: "modified_at",
    },
  ];

  const AlphacxMTPagination = (props) => {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;

    return (
      <TablePagination
        {...tablePaginationProps}
        rowsPerPageOptions={[10, 20, 30]}
        rowsPerPage={5}
        count={20}
        page={1 - 1}
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
  };

  useEffect(() => {
    if (articles.length === 0) {
      fetchAllArticles();
    }
  }, [articles]);
  return (
    <div class="settings-email help-center-settings">
      <div class="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Help Center</span>
          </h6>
        </div>
        <div class="d-flex justify-content-between flex-row">
          <h5 class="mt-3 mb-4 fs-6 fw-bold">Help Center Settings</h5>
          <div>
            <Link
              class="btn btn-primary btn-sm ms-2"
              to="/settings/help-center/article"
            >
              <span>New Article</span>
            </Link>
          </div>
        </div>

        {articles?.articles?.length > 0 && (
          <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
            <div
              id="alphacxMTable"
              className="pb-5 acx-ticket-cust-table acx-ticket-table p-4"
            >
              <MuiThemeProvider theme={tableTheme}>
                <MaterialTable
                  columns={tableColumns}
                  title=""
                  icons={tableIcons}
                  data={articles?.articles?.map(({ title }) => ({
                    title,
                    status: "Published",
                    views: "100",
                    author: "Dabo Etela",
                    created_at: "12-05-2021",
                    modified_at: "12-05-2021",
                  }))}
                  options={{
                    search: true,
                    selection: true,
                    // exportButton: true,
                    tableLayout: "auto",
                    paging: true,
                    pageSize: 10,
                    headerStyle: {
                      // backgroundColor: '#f8f9fa'
                      backgroundColor: "#fefdfd",
                    },
                  }}
                  components={{
                    Pagination: AlphacxMTPagination,
                  }}
                />
              </MuiThemeProvider>
            </div>
          </div>
        )}
        {!articles?.articles && (
          <div class="text-center empty-state">
            <img src={EmptyArticle} alt="no article" class="img-fluid mb-4" />
            <p class="text-center">
              You currently have no Help Center Article record at <br />
              the moment
            </p>
            <Link
              class="btn btn-sm btn-primary"
              to="/settings/help-center/article"
            >
              New Article
            </Link>
          </div>
        )}
        {/* {articles?.articles?.length > 0 && (
              <div className="pagination">
                <p>Showing 1-1 of 1 entries</p>
              </div>
            )} */}
        {/* <div id="result"></div> */}
      </div>
    </div>
  );
};

export default HelpCenterSettings;
