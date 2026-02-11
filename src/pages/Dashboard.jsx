import { useState, useEffect } from "react";

function Dashboard() {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(), // unique id
      price,
      description,
      type,
      date: Date.now(),
    };

    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Reset fields
    setPrice("");
    setDescription("");
    setType("");
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div>
      <h1 className="font-bold text-center text-3xl mb-8">
        Add New Expense
      </h1>

      <form onSubmit={onSubmitHandle}>
        <div className="flex flex-col items-center space-y-6">
          <input
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-indigo-500 rounded-md py-2 px-4 w-96 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-indigo-500 rounded-md py-2 px-4 w-96 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-indigo-500 rounded-md py-2 px-4 w-96 text-center bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button className="bg-indigo-500 rounded-md py-2 px-4 w-96 text-center cursor-pointer text-white">
            Submit
          </button>
        </div>
      </form>

      <div>
        <h2 className="my-10 font-bold">Recent Entries</h2>

        {expenses.length === 0 && (
          <p className="text-gray-500">No entries yet.</p>
        )}

        {expenses
          .slice(-5)
          .reverse()
          .map((expense) => (
            <div
              key={expense.id}
              className="border-b border-gray-300 py-2"
            >
              <p>Price: {expense.price}</p>
              <p>Description: {expense.description}</p>
              <p>Type: {expense.type}</p>
              <p>
                Date:{" "}
                {new Date(expense.date).toLocaleString("en-GB")}
              </p>

              <button
                onClick={() => handleDelete(expense.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
