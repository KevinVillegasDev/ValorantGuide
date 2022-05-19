import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Agents from "./components/Agents";
import Weapons from "./components/Weapons";

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

    const agentList = agents.map((agent, key) => {
        return (
            <li key={key}>
                <img src={agent.displayIcon} alt="agent" />
                <p>Name: {agent.displayName}</p>
                <p>{agent.description}</p>
                <p>Role: {agent.role.displayName}</p>
                <p></p>
                <p>
                    Abilities: {agent.abilities[0].displayName}{" "}
                    {agent.abilities[1].displayName}{" "}
                    {agent.abilities[2].displayName}{" "}
                    {agent.abilities[3].displayName}
                </p>
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
                    <Route path="/weapons" element={<Weapons />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
