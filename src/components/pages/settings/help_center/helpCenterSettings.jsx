import React, { useEffect } from "react";
import "./helpCenter.scss";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import EmptyArticle from "../../../../assets/images/empty_article.png";
import { httpGetMain, httpPatchMain } from "../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { TablePagination } from "@material-ui/core";
import tableIcons from "../../../../assets/materialicons/tableIcons";
import { ReactComponent as DotSvg } from "../../../../assets/icons/dots.svg";
import { Dropdown } from "react-bootstrap";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import "../../../../styles/Ticket.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import Swal from "sweetalert2";
import { wordCapitalize } from "../../../../helper";

const HelpCenterSettings = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [policyLoading, setPolicyLoading] = useState(false);

  // function to fetch all articles for user
  const fetchAllArticles = async () => {
    setPolicyLoading(true);
    const res = await httpGetMain(`articles?page=${page}`);
    setPolicyLoading(false);
    if (res?.status == "success") {
      console.clear();
      console.log("articles", res);
      setArticles(res?.data?.articles);
      setMeta(res?.data?.meta);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  // const handleCheck = (e, index) => {
  //   let newArticles = articles;
  //   newArticles.articles[index].checked = e.target.checked;
  //   setArticles(newArticles);
  // };

  // function to publish articles
  const publishArticle = async (id, index) => {
    console.log("publishing");
    setPolicyLoading(true);
    const res = await httpPatchMain(`articles/${id}/publish`);
    setPolicyLoading(false);

    if (res?.status == "success") {
      NotificationManager.success(res?.message, "Success", 4000);
      let newArticles = articles;
      newArticles[index] = {
        ...newArticles[index],
        isPublished: !newArticles[index].isPublished,
      };

      setArticles([]);
      setArticles(newArticles);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  // function to unpublish articles
  const unPublishArticle = async (id, index) => {
    setPolicyLoading(true);
    const res = await httpPatchMain(`articles/${id}/unpublish`);
    setPolicyLoading(false);
    if (res?.status == "success") {
      NotificationManager.success(res?.message, "Success", 4000);
      let newArticles = articles;
      newArticles[index] = {
        ...newArticles[index],
        isPublished: !newArticles[index].isPublished,
      };

      setArticles([]);
      setArticles(newArticles);
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  // function to trigger popup modal for publish/unpublish confirmation
  function handlePublishChange() {
    const { title, isPublished, id, rowData } = this;
    const articleId = articles[id].id;
    console.log(rowData);

    Swal.fire({
      title: isPublished ? "Unpublish?" : "Publish?",
      text: `Do you want to ${
        isPublished ? "unpublish" : "publish"
      } "${wordCapitalize(title)}"?`,
      showCancelButton: true,
      confirmButtonColor: "#006298",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isPublished) {
          unPublishArticle(articleId, id);
        } else {
          publishArticle(articleId, id);
        }
      } else {
        console.log("Do nothing");
      }
    });
  }

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
      title: "Publish",
      field: "isPublished",
      render: (rowData) => (
        <div class="form-check form-switch">
          <input
            className="form-check-input form-check-input-lg mt-1"
            checked={rowData.isPublished}
            readOnly={true}
            onChange={handlePublishChange.bind({
              title: rowData.title,
              isPublished: rowData.isPublished,
              id: rowData.tableData.id,
              rowData: rowData,
            })}
            type="checkbox"
          />
        </div>
      ),
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
    {
      title: "",
      field: "dropdownAction",
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
                  window.location.href = `/settings/help-center/edit/${
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
                console.log("changing page", newPage);
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
  };

  useEffect(() => {
    fetchAllArticles();
  }, [page]);

  return (
    <div class="settings-email help-center-settings">
      {policyLoading && (
        <div
          className={`cust-table-loader ${
            policyLoading && "add-loader-opacity"
          }`}
        >
          <ScaleLoader loading={policyLoading} color={"#006298"} />
        </div>
      )}
      <div class="card card-body bg-white border-0 mt-4">
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
                data={articles?.map(
                  ({ title, created_at, updated_at, isPublished }) => ({
                    title,
                    isPublished,
                    views: "100",
                    author: "Dabo Etela",
                    created_at: created_at.split(" ")[0],
                    modified_at: updated_at.split(" ")[0],
                  })
                )}
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
