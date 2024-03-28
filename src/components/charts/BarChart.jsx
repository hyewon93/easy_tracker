import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
    
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