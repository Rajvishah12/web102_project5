import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

function IndexLineChart({data, metric, title}) {
  return (
    <div>
    <h4>{title}</h4>
    <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={data}>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <XAxis dataKey="datetime"/>
      <YAxis width="auto"/>
      <Line type="monotone" dataKey={metric} stroke="#8884d8" />
    </LineChart>
    </div>
  );
}

export default IndexLineChart;