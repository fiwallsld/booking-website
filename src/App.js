import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/loginPage";
import UserProvider from "./store/userContext";
import Transaction from "./pages/transaction/Transaction";
import ErrorEl from "./pages/error/ErrorEl";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index={true} element={<Home />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:hotelId" element={<Hotel />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="*" element={<ErrorEl />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
