/* eslint-disable */
import { useState } from 'react';
import { ReactComponent as TicketEmptySvg } from '../../../../assets/svgicons/tickets-empty.svg';
import EditorBox from '../../../reusables/EditorBox';

function Notes() {
    const [newNote, setNewNote] = useState({ message: '' });

    return (
        <div>
            <div className="text-center mb-5">
                <div>
                    <TicketEmptySvg />
                </div>
                <p className="my-3">You have no note at the moment</p>
            </div>
            <form action="#">
                {/* <div className="mb-3">
                                        <label htmlFor="noteInput" className="form-label">New Note</label>
                                        <textarea className="form-control" id="noteInput"></textarea>
                                    </div> */}
                <div>
                    {/* <label>New Note</label> */}
                    {/* Editor goes here */}
                    <EditorBox text={newNote.message} textParent={newNote} updateText={setNewNote} />
                </div>

                <div className="text-end mt-3">
                    <button type="submit" className="btn btn-sm bg-at-blue-light px-4 rounded-3 hover-op-8">
                        Save Note
                    </button>
                </div>
            </form>

            {/* <!-- notes wrapper --> */}
            <div
                className="overflow-auto mt-5"
                style={{
                    height: '300px',
                }}
            >
                {/* <!-- notes 1 --> */}
                <div className="mb-2 mt-4 border p-4">
                    <div className="d-flex user-initials-sm">
                        <div className="col-auto user-initials blue me-2">JB</div>
                        <div>
                            <div className="mb-1">
                                <h6 className="mb-0">Jerome Bell</h6>
                                <em className="op-7">05-05-2021</em>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus curabitur aenean
                                sodales sed eros lacus amet. Purus molestie dui dolor quis nullam sem et
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--  note 2 --> */}
                <div className="mb-2 mt-4 border p-4">
                    <div className="d-flex user-initials-sm">
                        <div className="col-auto user-initials blue me-2">JB</div>
                        <div>
                            <div className="mb-1">
                                <h6 className="mb-0">Jerome Bell</h6>
                                <em className="op-7">05-05-2021</em>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus curabitur aenean
                                sodales sed eros lacus amet. Purus molestie dui dolor quis nullam sem et
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--  note 3 --> */}
                <div className="mb-2 mt-4 border p-4">
                    <div className="d-flex user-initials-sm">
                        <div className="col-auto user-initials blue me-2">JB</div>
                        <div>
                            <div className="mb-1">
                                <h6 className="mb-0">Jerome Bell</h6>
                                <em className="op-7">05-05-2021</em>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In faucibus curabitur aenean
                                sodales sed eros lacus amet. Purus molestie dui dolor quis nullam sem et
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notes;
