import type { Data, EnrichedData } from "../../types";
import { COLORS } from "./consts/colors";

const DataListItem = ({item, totalItems, enrichedData, index}: {item: Data[0], totalItems: number, enrichedData: EnrichedData, index: number}) => {
    const decodedName = item.name.replace(/&amp;/g, '&');
          const basePercentage = (item.value / totalItems) * 100;
          
          const averagePercentage = 100 / enrichedData.length;
          const minVisiblePercentage = 15; 
          const scalingFactor = averagePercentage < minVisiblePercentage 
            ? minVisiblePercentage / averagePercentage 
            : 1;
          
          const scaledPercentage = Math.min(basePercentage * scalingFactor, 100);
          
          return (
            <div key={index} className="flex flex-col gap-1">
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
        )
    }
export default DataListItem;