import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";

const OverallRating = () => {
  const [timeRange, setTimeRange] = useState("This Week");

  // Rating data for the gauge
  const ratingData = [
    { name: "Rating", value: 4.6 },
    { name: "Remaining", value: 5 - 4.6 },
  ];

  // Colors for the gauge
  const COLORS = ["#86efac", "#f3f4f6"];

  // Detailed ratings
  const detailedRatings = [
    { category: "Facilities", score: 4.4 },
    { category: "Cleanliness", score: 4.4 },
    { category: "Services", score: 4.6 },
    { category: "Comfort", score: 4.8 },
    { category: "Food and Dining", score: 4.5 },
  ];

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Overall Rating</h2>
        <button className="btn btn-outline btn-sm">{timeRange}</button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Gauge Chart */}
        <div className="space-y-2">
          <div className="relative">
            <ResponsiveContainer width={180} height={150}>
              <PieChart>
                <Pie
                  data={ratingData}
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  cornerRadius={0}
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className="text-xl font-bold">4.6/5</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>

          {/* Impression */}
          <div className="flex flex-col items-center text-center md:text-left bg-custom-orange rounded-lg">
            <p className="text-lg font-bold">Impressive</p>
            <p className="text-sm text-gray-500">from 2,546 reviews</p>
          </div>
        </div>

        {/* Detailed Ratings */}
        <div className="flex-1 space-y-2">
          {detailedRatings.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between gap-2">
                <span className="text-sm text-gray-700">{item.category}</span>
                <span className="text-sm text-gray-700 ml-2">{item.score}</span>
              </div>
              <progress
                className="progress progress-success"
                value={item.score}
                max={5}
              ></progress>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverallRating;
