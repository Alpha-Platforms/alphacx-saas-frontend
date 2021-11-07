import {useState, Fragment, useEffect} from 'react';
import { capitalize } from "@material-ui/core";
// 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                    {(ticketFields.length === 0)?
                        <div className="text-center pt-5">
                            <p className="">No data found</p>
                        </div>
                        :
                        ticketFields.map((data) => {
                            return(
                                <div  key={data.id} className="fieldParent my-2">
                                    <Row className="w-100 ps-4">
                                        <Col xs md={5}>
                                            <div className="text-start">
                                                <button
                                                    type="button"
                                                    className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                                                    <HamburgerSvg/>
                                                </button>
                                                <span className="">{capitalize(`${data.field_name}`)}</span>
                                            </div>
                                        </Col>
                                        <Col xs md={4}>
                                            <div className="text-start">
                                                <span className="">{`${data.field_section}`}</span>
                                            </div>
                                        </Col>
                                        <Col auto>
                                            <div className="d-flex align-items-center justify-content-end">
                                                {data.required?
                                                    <span className="me-2">Required</span> 
                                                :
                                                    <span className="me-2">Optional</span>
                                                }
                                                <Button onClick={() => props.editCustomField(data.id)} className="acx-btn-icon rounded-circle" type="button" title="edit">
                                                    <i className="bi-pencil-square acx-text-alpha-blue-400" title="edit"></i> 
                                                </Button>
                                                <Button onClick={() => props.deleteCustomField(data.id)} className="acx-btn-icon rounded-circle" type="button" title="delete">
                                                    <i className="bi-trash text-danger" title="delete "></i> 
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
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