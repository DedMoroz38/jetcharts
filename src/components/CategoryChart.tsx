import { useState } from 'react';
import { Bar, BarChart, Cell, Pie, PieChart, type PieLabelRenderProps, Rectangle, Tooltip, type TooltipContentProps, XAxis, YAxis } from 'recharts';
import pieChartIcon from '../assets/pie-chart-.svg';
import barChartIcon from '../assets/bar-chart.svg';

interface CategoryChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#58e054', '#382c7e', '#fc0b67', '#01c4f4', '#fc7f1d', '#0e7bf9'];
const InnerRadius = 110;
const OuterRadius = 150;
const PIE_WIDTH = 450;
const BAR_WIDTH = 450;
const HEIGHT = 350;


const IconButton = ({ 
  icon, 
  isActive, 
  onClick, 
  alt 
}: { 
  icon: string; 
  isActive: boolean; 
  onClick: () => void; 
  alt: string; 
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-[#58e054] shadow-md'
        : 'bg-secondary hover:bg-gray-700'
    }`}
  >
    <img 
      src={icon} 
      alt={alt}
      className="w-5 h-5"
      style={{
        filter: isActive 
          ? 'brightness(0) invert(1)'
          : 'brightness(0) invert(0.7)'
      }}
    />
  </button>
);

const CategoryChart = ({ data }: CategoryChartProps) => {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const totalItems = data.reduce((sum, item) => sum + item.value, 0);
  
  const enrichedData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <PieChart width={PIE_WIDTH} height={HEIGHT}>
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
        </PieChart>
      );
    } else {
      return (
        <BarChart width={BAR_WIDTH} height={HEIGHT} data={enrichedData}>
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
        </BarChart>
      );
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="absolute top-[-55px] left-0 z-10 flex gap-2">
        <IconButton
          icon={pieChartIcon}
          isActive={chartType === 'pie'}
          onClick={() => setChartType('pie')}
          alt="Pie Chart"
        />
        <IconButton
          icon={barChartIcon}
          isActive={chartType === 'bar'}
          onClick={() => setChartType('bar')}
          alt="Bar Chart"
        />
      </div>

      <div>
        {renderChart()}
      </div>
      
      <div className="scrollbar scrollbar-thumb-gray-600 scrollbar-track-secondary w-full max-w-md mt-4 max-h-[300px] overflow-y-auto space-y-3 pr-2">
        {enrichedData.map((item, index) => {
          const decodedName = item.name.replace(/&amp;/g, '&');
          const basePercentage = (item.value / totalItems) * 100;
          
          const averagePercentage = 100 / enrichedData.length;
          const minVisiblePercentage = 15; 
          const scalingFactor = averagePercentage < minVisiblePercentage 
            ? minVisiblePercentage / averagePercentage 
            : 1;
          
          const scaledPercentage = Math.min(basePercentage * scalingFactor, 100);
          
          return (
            <div key={`legend-${index}`} className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-sm pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium truncate">{decodedName}</span>
                  <div className="w-px bg-border self-stretch"></div>
                  <span className="text-white font-semibold">{basePercentage.toFixed(1)}%</span>
                </div>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${scaledPercentage}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CustomTooltip = ({ payload }: TooltipContentProps<number, string>) => {
  if (payload == null || payload.length === 0) return null;
  
  const data = payload[0].payload;
  const decodedName = data.name.replace(/&amp;/g, '&');
  const value = data.value;
  const fill = data.fill || payload[0].fill;

  return (
    <div className="bg-secondary/80 backdrop-blur-md border border-border p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center pb-4">
        <span className="font-medium text-white max-w-[200px] leading-none">{decodedName}</span>
        <div 
          className="w-4 h-4 rounded ml-4"
          style={{ backgroundColor: fill }}
        />
      </div>
      <div className="h-px bg-border self-stretch"></div>
      <div className="mt-4 text-sm text-white">
        Value: {value}
      </div>
    </div>
  );
};

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


export default CategoryChart;


