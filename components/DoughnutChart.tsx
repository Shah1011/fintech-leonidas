'use client';

import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
const data = {
    datasets: [
        {
            label: 'Banks',
            data: [12500, 34000, 25000],
            backgroundColor: ['#0747B6', '#2265d8', '#2f91fa']
        }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
}
  return (
    <Doughnut 
        data={data} 
        options={{
            cutout: '80%',
            plugins: {
                legend: {
                    display: false
                }
            }
        }}
    />
  )
}

export default DoughnutChart