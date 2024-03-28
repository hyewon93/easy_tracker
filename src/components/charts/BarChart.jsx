import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {

    const options = {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        }
      };

    return (
        <Bar type="bar" data={data} options={options} width={"auto"} height={"auto"}/>
    )
}

export default BarChart