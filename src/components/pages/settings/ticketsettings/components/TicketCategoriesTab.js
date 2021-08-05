import {useState} from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import {ReactComponent as DeleteGreySvg} from '../../../../../assets/icons/Delete-grey.svg'
import {ReactComponent as EditGreySvg} from '../../../../../assets/icons/Edit-grey.svg';
import {ReactComponent as DeleteWhiteSvg} from '../../../../../assets/icons/Delete-white.svg';
import {connect} from 'react-redux';

const TicketCategoriesTab = ({categories, meta}) => {
    const [changingRow, setChangingRow] = useState(false);

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

    return (
        <div className="ticket-cat-tab">
            <div className="tct-left">
                <form className="tl-form">
                    <div>
                        <div class="form-group mt-3 tl-col align-items-center">
                            <label class="f-14 d-inline" htmlFor="form-description">Category:</label>
                            <input type="text" class="form-control form-control" id="category"/>
                        </div>
                        <div class="form-group mt-4 tl-col align-items-center">
                            <label class="f-14 d-inline" htmlFor="form-description">Parent Category:</label>
                            <select
                                name="parent-category"
                                id="parentCategory"
                                className="form-select"
                                aria-label="parent category">
                                <option selected></option>
                                <option value="cherry-picking">--</option>
                                <option value="efficient">--</option>
                            </select>
                        </div>
                        <div class="form-group mt-4 tl-col">
                            <label class="f-14 d-inline" htmlFor="form-description">Description:</label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control ct-description"></textarea>
                        </div>
                    </div>
                    <div className="my-3 mt-4 text-end"><btn className="btn btn-sm bg-at-blue-light px-3">Add New Category</btn></div>
                </form>
            </div>
            <div className="tct-right position-relative">
            <btn className="tr-delete-btn btn btn-sm bg-at-blue-light px-2"><span style={{ transform: 'scale(0.9)' }} className="d-inline-block"><DeleteWhiteSvg/></span> Delete</btn>
            <div id="alphacxMTable" className="mb-3 acx-user-table acx-category-table">
                    {(categories && !changingRow) && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {
                                [
                                    {
                                        title: 'Category',
                                        field: 'category',
                                        width: '10%'
                                    }, {
                                        title: 'Parent Category',
                                        field: 'parentCategory'
                                    }, {
                                        title: 'Description',
                                        field: 'description'
                                    }, {
                                        title: '',
                                        field: 'action',
                                        render: rowDate => (<div className="" style={{ width: '3rem' }}>
                                                <span className="me-2"><EditGreySvg/></span>
                                                <span><DeleteGreySvg/></span>
                                            </div>)
                                    }
                                ]
                            }
                            data = {categories.map(({name}) => ({
                                category: name,
                                parentCategory: 'complaint',
                                description: 'Lorem ipsum dolor sit amet...'
                            }))
                            }
                            options = {{
                                search: false,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: 10,
                                headerStyle: {
                                    // backgroundColor: '#f8f9fa'
                                },
                                rowStyle: {
                                    backgroundColor: '#f8f9fa'
                                }
                                // filtering: true
                            }}
                            components={{ 
                                // Pagination: AlphacxMTPagination
                            }}
                        />
                    </MuiThemeProvider>}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    categories: state.category.categories,
    meta: state.category.meta
})

export default connect(mapStateToProps, null)(TicketCategoriesTab);