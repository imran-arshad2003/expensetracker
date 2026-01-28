function History() {
  return (
    <div>
      <h1 className="font-bold">History</h1>
      {JSON.parse(localStorage.getItem("expenses")) && JSON.parse(localStorage.getItem("expenses")).reverse().map((expenses,index)=>(
        <div key={index} className="border-b border-gray-300 py-2">
          <p>Price: {expenses.price}</p>
          <p>Description: {expenses.description}</p>
          <p>Type: {expenses.type}</p>
          <p>Date: {new Date(expenses.date).toLocaleString("en-US")}</p>
        </div>
      ))}
    </div>
  );
}

export default History;
