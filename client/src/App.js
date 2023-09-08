import Auth from "./components/Auth";
import {
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Profit from "./components/Profit";

function App() {
  const [walletAddress, setWalletAddress] = useState('')
  const adminWallet = "0x30bAa9d76B9ebB56eb4ab88747B7347b8095e964"
  console.log(walletAddress)
  return (
    <div className="App">
      <Navbar setWalletAddress={setWalletAddress} adminWallet={adminWallet} />

      <Routes>
        <Route path={"/"} element={<Auth />} />
        <Route path="/admin-dashboard" element={walletAddress === adminWallet? <Dashboard />: walletAddress === ""? <Auth />:<Error />} />
        <Route path={'/profit'} element={<Profit />} />
      </Routes>
    </div>
  );
}

export default App;
