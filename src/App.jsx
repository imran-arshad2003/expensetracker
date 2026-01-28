import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-slate-900 text-white w-60 p-4">
        <aside>
          <h1 className="text-2xl font-bold mb-6">Expense Tracker</h1>

          <ul className="text-xl space-y-4">
            <li>
              <Link
                to="/"
                className="block hover:bg-indigo-500 rounded-md py-2 px-2"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/history"
                className="block hover:bg-indigo-500 rounded-md py-2 px-2"
              >
                History
              </Link>
            </li>

            <li className="hover:bg-indigo-500 rounded-md py-2 px-2 cursor-pointer">
              <Link to="/analytics">
              Analytics
              </Link>
            </li>
          </ul>
        </aside>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes key={location.pathname} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History/>} />
          <Route path="/analytics" element={<Analytics/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
