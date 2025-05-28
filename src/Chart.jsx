// // src/components/Chart.jsx
// import React from 'react';
// import { SparklineChart } from './SparklineCharts'; // Ensure the import path is correct

// const Chart = ({ coin }) => {
//   return (
//     <div style={{ padding: 20 }}>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
//         <div style={{ width: 80 }}>{coin.supply} {coin.name}</div>
//         <div style={{ flex: 1, height: 40 }}>
//           <SparklineChart data={coin.chart.map((val) => ({ value: val }))} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chart;