import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const ReviewStatistics = () => {
  const [timeRange, setTimeRange] = useState("Last 7 Days");

  const data = [
    { date: "12 Jun", Positive: 20000, Negative: 10000 },
    { date: "13 Jun", Positive: 22000, Negative: 12000 },
    { date: "14 Jun", Positive: 21000, Negative: 15000 },
    { date: "15 Jun", Positive: 23000, Negative: 14000 },
    { date: "16 Jun", Positive: 24000, Negative: 13000 },
    { date: "17 Jun", Positive: 25000, Negative: 14000 },
    { date: "18 Jun", Positive: 26000, Negative: 12000 },
  ];

  const handleTimeRangeChange = () => {
    // Placeholder for implementing custom time ranges
    setTimeRange("Custom Range");
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Review Statistics</h2>
        <div>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleTimeRangeChange}
          >
            {timeRange}
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Positive" fill="#86efac" barSize={20} />
          <Bar dataKey="Negative" fill="#fed7aa" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewStatistics;
