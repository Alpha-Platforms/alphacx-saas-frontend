import {useState, Fragment, useEffect} from 'react';
import { capitalize } from "@material-ui/core";
// 
import {ReactComponent as HamburgerSvg} from '../../../../assets/icons/hamburger.svg';

const TicketFieldList = (props) => {
    const [ticketFields, setTicketFields] = useState([]);
    // 
    useEffect(() =>{
        setTicketFields(props.fieldData);
    }, [props.fieldData])

    return (
        <Fragment>
            <div className="text-center">
                <div className="fieldsWrapper" id="ticketFieldWrapper">
                    {(ticketFields.length == 0)?
                        <div className="text-center pt-5">
                            <p className="">No data found</p>
                        </div>
                        :
                        ticketFields.map((data) => {
                            return(
                                <div className="fieldParent d-flex my-2">
                                    <button
                                        type="button"
                                        className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                        <HamburgerSvg/>
                                    </button>
                                    <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                                        <span>{capitalize(`${data.field_name}`)}</span>
                                        <span className="d-flex align-items-center justify-content-between">
                                            <span className="me-2">Required</span>
                                            {data.required?
                                                <i className="bi-check-circle text-success" title="required"></i> 
                                            :
                                                <i className="bi-dash-circle text-muted" title="not required"></i> 
                                            }
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    );
}
export default TicketFieldList;