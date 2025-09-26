import type { TooltipContentProps } from "recharts";
import { decodeName } from "../../halpers/decodeName";

const CustomTooltip = ({ payload }: TooltipContentProps<number, string>) => {
    if (payload == null || payload.length === 0) return null;
    
    const data = payload[0].payload;
    const decodedName = decodeName(data.name);
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

export default CustomTooltip;