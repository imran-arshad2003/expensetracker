import { useState, useEffect } from "react";

function History() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses =
      JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">History</h1>

      {expenses.length === 0 && (
        <p className="text-gray-500">No history available.</p>
      )}

      {[...expenses] // prevent mutation
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
              {new Date(expense.date).toLocaleString("en-US")}
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
  );
}

export default History;
