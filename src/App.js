import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        test();
    }, []);

    const test = async () => {
        try {
            let response = await axios.get(
                `https://valorant-api.com/v1/agents`
            );
            console.log(response.data);
            setAgents(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(agents);

    return (
        <div>
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
