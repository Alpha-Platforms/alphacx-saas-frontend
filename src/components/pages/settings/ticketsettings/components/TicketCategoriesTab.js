import { useState, useEffect } from "react";
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
import { TablePagination, TablePaginationProps } from "@material-ui/core";
import EditCatModal from './EditCatModal';

const TicketCategoriesTab = ({ categories, meta, isCategoriesLoaded }) => {
  const [changingRow, setChangingRow] = useState(false);

  const [createModalShow, setCreateModalShow] = useState(false);
  const [currentCatInfo, setCurrentCatInfo] = useState(null);
  const [custLoading, setCustLoading] = useState(false);


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

  useEffect(() => {
      setCustLoading(!isCategoriesLoaded);
      if (isCategoriesLoaded) {
          setCustLoading(false);
      }
  }, [isCategoriesLoaded]);



  const mixedCat = [];

  categories.forEach(cat => {

    mixedCat.push({category: cat.name, parentCategory: '', catId: cat.id});

    // if (cat.subCategories.length === 0) {
    //   mixedCat.push({category: cat.name, parentCategory: ''});
    // } else {
    //   cat.subCategories.forEach(c => mixedCat.push({category: c.name, parentCategory: cat.name}));
    // }

  });


  function AlphacxMTPagination(props) {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;
  
    return (
      <TablePagination
        {...tablePaginationProps}
        // @ts-expect-error onChangePage was renamed to onPageChange
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            // @ts-expect-error ActionsComponent is provided by material-table
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={onPageChange}
            />
          );
        }}
      />
    );
  }

  const openModal = function() {
    const {id, name} = this;
    setCurrentCatInfo({id, name});
    setCreateModalShow(true);
  }



  
  return (
    <div className="ticket-cat-tab">
    {custLoading && <div className="cust-table-loader"><ScaleLoader loading={custLoading} color={"#006298"}/></div>}
      
      <div className="tct-right position-relative">
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
                    width: '50%'
                  },
                  // {
                  //   title: "Parent Category",
                  //   field: "parentCategory",
                  // },
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
                          <Dropdown.Item eventKey="1" onClick={openModal.bind({id: rowData.catId, name: rowData.category})}>
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
                  description: "",
                  catId
                }))}

                options={{
                  search: false,
                  selection: true,
                  // exportButton: true,
                  // tableLayout: "auto",
                  // paging: true,
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
                    Pagination: AlphacxMTPagination
                  }
                }
              />
            </MuiThemeProvider>
          )}
        </div>
      </div>
      <EditCatModal createModalShow={createModalShow} setCreateModalShow={setCreateModalShow} currentCatInfo={currentCatInfo} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: state.category.categories,
  meta: state.category.meta,
  isCategoriesLoaded: state.category.isCategoriesLoaded
});

export default connect(mapStateToProps, null)(TicketCategoriesTab);
