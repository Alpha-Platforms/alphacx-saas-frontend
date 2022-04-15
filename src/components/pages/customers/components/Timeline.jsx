/* eslint-disable */
import { Link } from 'react-router-dom';

function Timeline() {
    return (
        <div>
            <h5>How do I get a refund for my order?</h5>
            <ul className="timeline-tree">
                <li>
                    <div>
                        <span>01-05-2021, 12.00 AM</span>
                    </div>
                    <div>
                        <p>
                            <Link to="#">Olamide Adeleke</Link>&nbsp;changed ticket status from In progress to Closed
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <span>01-05-2021, 12.00 AM</span>
                    </div>
                    <div>
                        <p>
                            <Link to="#">Olamide Adeleke</Link>&nbsp;changed priorrity from medium to high
                        </p>
                    </div>
                </li>
                <li>
                    <div>
                        <span>01-05-2021, 12.00 AM</span>
                    </div>
                    <div>
                        <p>
                            <Link to="#">Adekule Olagunju</Link>&nbsp;dropped a note
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Timeline;
