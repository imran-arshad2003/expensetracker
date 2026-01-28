import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function Analytics() {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Date filter
  const filteredExpenses = expenses.filter((item) => {
    if (!fromDate || !toDate) return true;
    const itemDate = new Date(item.date);
    return (
      itemDate >= new Date(fromDate) &&
      itemDate <= new Date(toDate)
    );
  });

  // Totals
  let totalIncome = 0;
  let totalExpense = 0;

  filteredExpenses.forEach((item) => {
    if (item.type === "income") {
      totalIncome += Number(item.price);
    } else {
      totalExpense += Number(item.price);
    }
  });

  // Monthly grouping
  const monthlyData = {};

  filteredExpenses.forEach((item) => {
    const month = new Date(item.date).toString().slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (item.type === "income") {
      monthlyData[month].income += Number(item.price);
    } else {
      monthlyData[month].expense += Number(item.price);
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
<p>From:
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border-1 rounded-lg border-gray-500 cursor-pointer"
      /></p>
<p>To:
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border-1 rounded-lg border-gray-500 cursor-pointer my-2 mx-5"
      /></p>

      <p>Total Records: {filteredExpenses.length}</p>
      <p>Total Income: Rs. {totalIncome}</p>
      <p>Total Expense: Rs. {totalExpense}</p>
      <p>Balance: Rs. {totalIncome - totalExpense}</p>

      {/* Bar Chart */}
      <div className="mt-8">
        <BarChart width={600} height={300} data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="green" />
          <Bar dataKey="expense" fill="red" />
        </BarChart>
      </div>
    </>
  );
}

export default Analytics;
