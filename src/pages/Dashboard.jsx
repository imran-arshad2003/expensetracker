import { useState, useEffect } from "react";

function Dashboard() {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [expenses, setexpenses] = useState([]);

  useEffect(()=>{
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setexpenses(savedExpenses);
  },[])

  const onSubmitHandle = (e) => {
    e.preventDefault();
    
    const newExpense = {
      price, description, type, date: Date.now(),
      
    };
localStorage.setItem("expenses", JSON.stringify([...expenses,newExpense]));
    setexpenses([...expenses,newExpense])

    

    // optional reset
    setPrice("");
    setDescription("");
    setType("");
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
        <h2 className="my-10 font-bold">Recent Entreis</h2>
        {expenses.slice(-5).reverse().map((expenses, index)=>(
          <div key={index} className="border-b border-gray-300 py-2">
         <p>Price: {expenses.price}</p>
          <p>Description: {expenses.description}</p>
          <p>Type: {expenses.type}</p>
          <p>Date: {new Date(expenses.date).toLocaleString("en-GB")}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;