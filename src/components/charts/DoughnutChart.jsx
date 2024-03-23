import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = ({data}) => {

    const Options = {};

    return (
        <Doughnut type="doughnut" data={data} options={Options} />
    )
}
