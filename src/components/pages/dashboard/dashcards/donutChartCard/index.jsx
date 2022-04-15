/* eslint-disable */
import React from 'react';
import '../pieChartCard/pieChartCard.scss';
import { Doughnut } from 'react-chartjs-2';

function DonutChartCard() {
    const data = {
        labels: ['Satisfied', 'Neutral', 'Unsatisfied'],
        datasets: [
            {
                // label: "# of Votes",
                data: [25, 5, 20],
                backgroundColor: ['#6C4181', '#FD7289', '#006298'],
                borderColor: ['#6C4181', '#FD7289', '#006298'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        cutoutPercentage: 50,
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontSize: 250,
            },
        },
    };
    return (
        <div className="pie-chart">
            <Doughnut
                data={data}
                width={175}
                height={175}
                options={{
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'right' },

                    datalabels: {
                        display: true,
                        color: 'white',
                    },
                    tooltips: {
                        backgroundColor: '#5a6e7f',
                    },
                }}
            />
        </div>
    );
}

export default DonutChartCard;
