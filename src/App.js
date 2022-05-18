import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Agents from "./components/Agents";

const App = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        agentCall();
    }, []);

    const agentCall = async () => {
        try {
            let response = await axios.get(
                `https://valorant-api.com/v1/agents?isPlayableCharacter=true`
            );
            console.log(response.data);
            setAgents(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(agents);

    const agentList = agents.map((agent, key) => {
        return (
            <li key={key}>
                <img src={agent.displayIcon} alt="agent" />
                <p>{agent.displayName}</p>
            </li>
        );
    });

    return (
        <div className="App">
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/agents"
                        element={<Agents agents={agentList} />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;
