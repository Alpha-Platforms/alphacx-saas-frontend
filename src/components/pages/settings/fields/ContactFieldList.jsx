/* eslint-disable */
import { useState, Fragment } from 'react';
import { ReactComponent as HamburgerSvg } from '../../../../assets/icons/hamburger.svg';
import { ReactComponent as FormMinusSvg } from '../../../../assets/icons/form-minus.svg';
import { ReactComponent as FormMinusNeutralSvg } from '../../../../assets/icons/form-minus-neutral.svg';

function ContactFieldList(props) {
    return (
        <div className="text-center">
            <div className="fieldsWrapper" id="customerFieldWrapper">
                <div className="fieldParent d-flex my-2">
                    <button type="button" className="sort-btn btn no-focus btn-link ps-0 ms-0 move-cursor">
                        <HamburgerSvg />
                    </button>
                    <div className="w-100 d-flex align-items-center justify-content-between ps-4">
                        <span>First Name</span>
                        <span>Required</span>
                    </div>
                    <button
                        type="button"
                        className="deleteFieldBtn btn no-focus btn-link d-flex align-items-center pe-0 me-0"
                    >
                        <FormMinusNeutralSvg />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ContactFieldList;
