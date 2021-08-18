import { useState } from "react";
import MaterialTable from "material-table";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import tableIcons from "../../../../../assets/materialicons/tableIcons";
import { ReactComponent as DeleteGreySvg } from "../../../../../assets/icons/Delete-grey.svg";
import { ReactComponent as EditGreySvg } from "../../../../../assets/icons/Edit-grey.svg";
import { ReactComponent as DeleteWhiteSvg } from "../../../../../assets/icons/Delete-white.svg";
import { connect } from "react-redux";
import { ReactComponent as DotSvg } from "../../../../../assets/icons/dots.svg";
import { Dropdown } from "react-bootstrap";
import { httpPostMain } from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ScaleLoader from "react-spinners/ScaleLoader";

const TicketCategoriesTab = ({ categories, meta }) => {
  const [changingRow, setChangingRow] = useState(false);
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

  return (
    <div className="ticket-cat-tab">
      <div className=" position-relative">
        {/* <btn className="tr-delete-btn btn btn-sm bg-at-blue-light px-2"><span style={{ transform: 'scale(0.9)' }} className="d-inline-block"><DeleteWhiteSvg/></span> Delete</btn> */}
        <div
          id="alphacxMTable"
          className="mb-3 acx-user-table acx-category-table"
        >
          {categories && !changingRow && (
            <MuiThemeProvider theme={tableTheme}>
              <MaterialTable
                title=""
                icons={tableIcons}
                columns={[
                  {
                    title: "Category",
                    field: "category",
                  },
                  {
                    title: "Parent Category",
                    field: "parentCategory",
                  },
                  {
                    title: "Description",
                    field: "description",
                  },
                  {
                    title: "",
                    field: "action",
                    render: (rowData) => (
                      <Dropdown
                        id="cust-table-dropdown"
                        className="ticket-status-dropdown"
                      >
                        <Dropdown.Toggle variant="transparent" size="sm">
                          <span className="cust-table-dots">
                            <DotSvg />
                          </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1">
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
                data={categories.map(({ name }) => ({
                  category: name,
                  parentCategory: "complaint",
                  description: "Lorem ipsum dolor sit amet...",
                }))}
                options={{
                  search: false,
                  selection: true,
                  // exportButton: true,
                  tableLayout: "auto",
                  paging: true,
                  pageSize: 10,
                  headerStyle: {
                    backgroundColor: "#f8f9fa",
                  },
                  rowStyle: {
                    // backgroundColor: '#f8f9fa'
                  },
                  // filtering: true
                }}
                components={
                  {
                    // Pagination: AlphacxMTPagination
                  }
                }
              />
            </MuiThemeProvider>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.categories,
  meta: state.category.meta,
});

export default connect(mapStateToProps, null)(TicketCategoriesTab);
