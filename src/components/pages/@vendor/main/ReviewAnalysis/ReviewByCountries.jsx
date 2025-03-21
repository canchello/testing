"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-google-charts").then((mod) => mod.Chart), {
  ssr: false,
});

const ReviewsByCountry = () => {
  const totalCustomers = 17850;

  const countries = [
    ["Country", "Percentage"],
    ["United States", 23],
    ["China", 20],
    ["United Kingdom", 18],
    ["Netherlands", 13],
    ["Australia", 11],
    ["Saudi Arabia", 9],
    ["United Arab Emirates", 8],
    ["Indonesia", 4],
  ];

  const chartOptions = {
    backgroundColor: "#f9fafb",
    datalessRegionColor: "#f0f0f0",
    defaultColor: "#c9c9c9",
    colorAxis: { colors: ["#ff6b6b", "#1d3557"] },
    legend: "none",
    tooltip: { isHtml: true },
    region: "world",
    resolution: "countries",
    displayMode: "regions",
    enableRegionInteractivity: true,
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">Reviews by Country</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Chart chartType="GeoChart" width="100%" height="400px" data={countries} options={chartOptions} />
        </div>
        <div className="w-full md:w-2/6">
          <h3 className="text-2xl font-semibold">Total Customers</h3>
          <p className="text-4xl font-bold text-primary my-2">{totalCustomers}</p>
          <ul>
            {countries.slice(1).map(([country, percentage], index) => (
              <li key={index} className="flex justify-between items-center py-1">
                <span className="text-gray-700">{country}</span>
                <span className="font-semibold">{percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewsByCountry;


// // components/ReviewsByCountry.js
// import { Chart } from "react-google-charts";

// const ReviewsByCountry = () => {
//   const totalCustomers = 17850;

//   // Country data with custom colors
//   const countries = [
//     ["Country", "Percentage", { role: "style" }],
//     ["United States", 23],
//     ["China", 20],
//     ["United Kingdom", 18],
//     ["Netherlands", 13],
//     ["Australia", 11],
//     ["Saudi Arabia", 9],
//     ["United Arab Emirates", 8],
//     ["Indonesia", 4],
//   ];

//   const chartOptions = {
//     backgroundColor: "#f9fafb",
//     datalessRegionColor: "#f0f0f0",
//     defaultColor: "#c9c9c9",
//     colorAxis: null, // Disable gradient coloring
//     legend: "none",
//     tooltip: { isHtml: true },
//     region: "world",
//     resolution: "countries",
//     displayMode: "regions", // Ensure region display for individual colors
//     enableRegionInteractivity: true,
//   };

//   return (
//     <div className="">
//       <h2 className="text-xl font-bold mb-4">Reviews by Country</h2>
//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Map Section */}
//         <div className="flex-1">
//           <Chart
//             chartType="GeoChart"
//             width="100%"
//             height="400px"
//             data={countries}
//             options={chartOptions}
//           />
//         </div>

//         {/* Data Section */}
//         <div className="w-full md:w-2/6">
//           <h3 className="text-2xl font-semibold">Total Customers</h3>
//           <p className="text-4xl font-bold text-primary my-2">{totalCustomers}</p>
//           <ul>
//             {countries.slice(1).map(([country, percentage, color], index) => (
//               <li key={index} className="flex justify-between items-center py-1">
//                 <div className="flex items-center gap-2">
//                   {/* <span
//                     className="w-4 h-4 rounded-full"
//                     style={{ backgroundColor: color }}
//                   ></span> */}
//                   <span className="text-gray-700">{country}</span>
//                 </div>
//                 <span className="font-semibold">{percentage}%</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewsByCountry;

