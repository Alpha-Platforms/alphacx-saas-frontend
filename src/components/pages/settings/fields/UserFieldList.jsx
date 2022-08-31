/* eslint-disable react/prop-types */
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disabled */
import { useState, useEffect } from 'react';
import { capitalize } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoonLoader from 'react-spinners/MoonLoader';
import { ReactComponent as HamburgerSvg } from '../../../../assets/icons/hamburger.svg';
import { brandKit } from '../../../../helper';

function UserFieldList({ fieldData, editCustomField, deleteCustomField, isLoading }) {
    const [userFields, setUserFields] = useState([]);
    //
    useEffect(() => {
        setUserFields(fieldData);
    }, [fieldData]);

    return (
        <div className="text-center">
            <div className={!isLoading ? `fieldsWrapper` : ''} id="userFieldWrapper">
                {isLoading ? (
                    <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                ) : userFields.length > 0 ? (
                    userFields.map((data) => {
                        return (
                            <div key={data.id} className="fieldParent my-2">
                                <Row className="w-100 ps-4">
                                    <Col xs md={5}>
                                        <div className="text-start">
                                            <button
                                                type="button"
                                                className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor"
                                            >
                                                <HamburgerSvg />
                                            </button>
                                            <span>{capitalize(`${data.field_name}`)}</span>
                                        </div>
                                    </Col>
                                    <Col xs md={4}>
                                        <div className="text-start">
                                            <span>{`${data.field_section}`}</span>
                                        </div>
                                    </Col>
                                    <Col auto>
                                        <div className="d-flex align-items-center justify-content-end">
                                            {data.required ? (
                                                <span className="me-2">Required</span>
                                            ) : (
                                                <span className="me-2">Optional</span>
                                            )}
                                            <Button
                                                onClick={() => editCustomField(data.id)}
                                                className="acx-btn-icon rounded-circle"
                                                type="button"
                                                title="edit"
                                            >
                                                <i className="bi-pencil-square acx-text-alpha-blue-400" title="edit" />
                                            </Button>
                                            <Button
                                                onClick={() => deleteCustomField(data.id)}
                                                className="acx-btn-icon rounded-circle"
                                                type="button"
                                                title="delete"
                                            >
                                                <i className="bi-trash text-danger" title="delete " />
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center pt-5">
                        <p className="">No data found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default UserFieldList;
