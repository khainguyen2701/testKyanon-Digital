import { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
function ChartName() {
    const [chart, SetChart] = useState([]);
    useEffect(() => {
        async function fetchChart() {
            const request = 'https://303279eb-9283-4ddc-a5e6-bfd69a63b58c.mock.pstmn.io//v1/data';
            const response = await fetch(request);
            const responseJSON = await response.json();
            const { charts } = responseJSON;

            SetChart(charts);
        }
        fetchChart();
    }, [])
    return (
        <div className="chart-container">
            <p className="notes" style={{ marginLeft: 50 }}>Inspections Complete</p>
            <BarChart
                width={500}
                height={341}
                data={chart}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stt" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
        </div>
    )
}
export default ChartName;