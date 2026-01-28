function History() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const clearAll = () => {
    if (confirm("Are you sure to delete it?")) {
      localStorage.removeItem("expenses");
      window.location.reload();
    }
  };

  return (
    <div>
      <h1 className="font-bold">History</h1>

      <button onClick={clearAll}>
        Clear all
      </button>

      {[...expenses].reverse().map((expense, index) => (
        <div key={index} className="border-b border-gray-300 py-2">
          <p>Price: {expense.price}</p>
          <p>Description: {expense.description}</p>
          <p>Type: {expense.type}</p>
          <p>Date: {new Date(expense.date).toLocaleString("en-US")}</p>
        </div>
      ))}
    </div>
  );
}

export default History;
