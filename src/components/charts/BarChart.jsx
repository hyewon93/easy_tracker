import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 4000],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)',
                'rgb(255, 99, 132)'
                ],
                borderWidth: 1
            },
            {
                label: 'My First Dataset2',
                data: [65, 59, 80, 81, 56, 2245.19],
                backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                'rgb(54, 162, 235)',
                'rgb(54, 162, 235)',
                'rgb(54, 162, 235)',
                'rgb(54, 162, 235)',
                'rgb(54, 162, 235)',
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        plugins: {
          legend: {
            display: false,
          }
        }
      };

    return (
        <Bar type="bar" data={data} options={options} />
    )
}

export default BarChart