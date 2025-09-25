import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DifficultyChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const DifficultyChart = ({ data }: DifficultyChartProps) => {
  const totalItems = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        innerRadius={120}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
        stroke="none"
        paddingAngle={2}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text
        x={200}
        y={200 - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={16}
        fill="#ffffff"
      >
        Total
      </text>
      <text
        x={200}
        y={200 + 15}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fontWeight="bold"
        fill="#ffffff"
      >
        {totalItems}
      </text>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default DifficultyChart;
