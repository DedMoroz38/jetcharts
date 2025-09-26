import { Cell, Pie, PieChart as RechartsPieChart, Tooltip, type PieLabelRenderProps } from 'recharts';
import CustomTooltip from "./CustomTooltip";
import { COLORS, HEIGHT } from './consts/colors';
import type { EnrichedData } from '../../types';

const InnerRadius = 110;
const OuterRadius = 150;
const PIE_WIDTH = 450;

type PieChartProps = {
    enrichedData: EnrichedData;
    totalItems: number;
}

export const PieChart = ({enrichedData, totalItems}: PieChartProps) => {
    return (
        <RechartsPieChart width={PIE_WIDTH} height={HEIGHT}>
        <Pie
          data={enrichedData}
          cx={PIE_WIDTH / 2}
          cy={HEIGHT / 2}
          labelLine={false}
          label={renderValueLabel}
          outerRadius={OuterRadius}
          innerRadius={InnerRadius}
          fill="#8884d8"
          stroke="none"
          paddingAngle={1}
        >
          {enrichedData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
          <text
            x={PIE_WIDTH / 2}
            y={HEIGHT / 2 - 10}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={16}
            fill="#ffffff"
          >
            Total
          </text>
          <text
            x={PIE_WIDTH / 2}
            y={HEIGHT / 2 + 15}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={24}
            fontWeight="bold"
            fill="#ffffff"
          >
            {totalItems}
          </text>
          <Tooltip content={CustomTooltip} />
        </RechartsPieChart>
    )
}

const renderValueLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
    if (midAngle == null || cx == null || cy == null || innerRadius == null || outerRadius == null || value == null) return null;
    const RADIAN = Math.PI / 180;
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {String(value)}
      </text>
    );
  };

export default PieChart;