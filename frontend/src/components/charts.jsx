import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ---- Static Data ----
const visitsData = [
  { month: "Jan", visits: 40 },
  { month: "Feb", visits: 55 },
  { month: "Mar", visits: 70 },
  { month: "Apr", visits: 60 },
  { month: "May", visits: 90 },
];

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3200 },
  { month: "Mar", revenue: 4500 },
  { month: "Apr", revenue: 5000 },
  { month: "May", revenue: 6000 },
];

const patientTypeData = [
  { name: "Inpatients", value: 400 },
  { name: "Outpatients", value: 300 },
  { name: "Emergency", value: 200 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

function Charts() {
  return (
    <div >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Line Chart - Patient Visits */}
        <div className="bg-white rounded-lg shadow hover:shadow-lg p-2 transition">
          <h2 className=" font-semibold mb-2">Monthly Patient Visits</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visitsData}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Revenue */}
        <div className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="revenue"
                fill="#10b981"
                barSize={35}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Another Line Chart - Example for Appointments */}
        <div className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={visitsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Patient Types */}
        <div className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition flex flex-col">
          <h2 className="font-semibold mb-2">Patient Types</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={patientTypeData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {patientTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Charts;
