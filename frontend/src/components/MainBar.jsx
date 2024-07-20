import "../styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import News from "../pages/News";
import Performance from "../pages/Performance";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";
import Support from "../pages/Support";
import SideBar from "./SideBar";

function MainBar() {
    return (
            <div className="App">
                <SideBar/>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/news" element={<News/>} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Routes>
            </div>
    );
}

export default MainBar;