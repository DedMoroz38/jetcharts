import { useState } from 'react';
import { barChartIcon, pieChartIcon } from '../../assets';
import IconButton from './IconButton';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { COLORS } from './consts/colors';
import DataListItem from './DataListItem';
import type { Data, EnrichedData } from '../../types';

type CategoryChartProps = {
  data: Data;
}


const CategoryChart = ({ data }: CategoryChartProps) => {
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const totalItems = data.reduce((sum, item) => sum + item.value, 0);
  
  const enrichedData: EnrichedData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <PieChart enrichedData={enrichedData} totalItems={totalItems} />
      );
    } else {
      return (
        <BarChart enrichedData={enrichedData} />
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
        {enrichedData.map((item, index) => (
          <DataListItem key={index} item={item} totalItems={totalItems} enrichedData={enrichedData} index={index} />
        ))}
      </div>
    </div>
  );
};


export default CategoryChart;


