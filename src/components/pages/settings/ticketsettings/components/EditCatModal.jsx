/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { updateCategory, getPaginatedCategories } from '../../../../../reduxstore/actions/categoryActions';

// eslint-disable-next-line no-shadow
function EditCatModal({ createModalShow, setCreateModalShow, currentCatInfo, updateCategory, getPaginatedCategories }) {
    const [modalInputs, setModalInputs] = useState({ id: '', catname: '' });
    const [editingCat, setEditingCat] = useState(false);

    useEffect(() => {
        if (createModalShow && currentCatInfo) {
            setModalInputs((prev) => ({
                ...prev,
                id: currentCatInfo?.id,
                catname: currentCatInfo?.name,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createModalShow]);

    const handleModalHide = () => {
        setCreateModalShow(false);
    };

    const handleModalInput = (e) => {
        const { name, value } = e.target;

        setModalInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCatUpdate = () => {
        const { id, catname } = modalInputs;
        setEditingCat(true);

        updateCategory(
            { id, name: catname },
            () => {
                NotificationManager.success('Category updated successfully', 'Success');
                getPaginatedCategories(50, 1);
                setCreateModalShow(false);
                setEditingCat(false);
            },
            () => {
                NotificationManager.error('Something went wrong', 'Error');
                setEditingCat(false);
            },
        );
    };

    return (
        <Modal
            open={createModalShow}
            onClose={handleModalHide}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            <div className="saveTicketWrapModal p-4 pb-1 mb-0">
                <p className="fs-5 mb-3">Edit Category</p>
                <form className="needs-validation mb-4" noValidate onSubmit={(e) => e.preventDefault()}>
                    <div className="mt-2">
                        <label htmlFor="firstname" className="form-label">
                            Category
                        </label>
                        <input
                            type="text"
                            name="catname"
                            id="catname"
                            className="form-control"
                            value={modalInputs.catname}
                            onChange={handleModalInput}
                        />
                    </div>

                    <div className="mt-4 text-end">
                        <button
                            type="button"
                            className="btn bg-at-blue-light  py-1 px-4"
                            disabled={editingCat}
                            onClick={handleCatUpdate}
                        >
                            {editingCat ? 'Editing...' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default connect(null, { updateCategory, getPaginatedCategories })(EditCatModal);
