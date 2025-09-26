import { Bar, BarChart as RechartsBarChart, Cell, Rectangle, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { COLORS, HEIGHT } from './consts/colors';
import type { EnrichedData } from '../../types';

const BAR_WIDTH = 450;

type BarChartProps = {
    enrichedData: EnrichedData;
}

const BarChart = ({enrichedData}: BarChartProps) => {
    return (
        <RechartsBarChart width={BAR_WIDTH} height={HEIGHT} data={enrichedData}>
          <XAxis 
            dataKey="name" 
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: '#ffffff', fontSize: 12 }} stroke="#6B7280" />
          <Tooltip content={CustomTooltip} />
          <Bar dataKey="value" activeBar={<Rectangle stroke="white" />}>
            {enrichedData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </RechartsBarChart>
    )
}

export default BarChart;