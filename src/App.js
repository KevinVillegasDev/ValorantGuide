import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Agents from "./components/Agents";
import Weapons from "./components/Weapons";
import About from "./components/About";

const App = () => {
    const [agents, setAgents] = useState([]);
    const [input, setInput] = useState("");
    const [toggleInfo, setToggleInfo] = useState("none");

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

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let agentList = [...agents];
        let filteredAgents = agentList.filter((agent) => {
            return input.toLowerCase() === agent.displayName.toLowerCase();
        });
        setAgents(filteredAgents);
        setInput("");
    };

    const clear = () => {
        agentCall();
    };

    const toggleClick = () => {
        if (toggleInfo === "none") {
            setToggleInfo("unset");
        } else if (toggleInfo === "unset") {
            setToggleInfo("none");
        }
    };

    const agentList = agents.map((agent, key) => {
        return (
            <li key={key}>
                <img
                    id={agent.displayName}
                    src={agent.displayIcon}
                    alt="agent"
                    onClick={toggleClick}
                />
                <div style={{ display: toggleInfo }}>
                    <p>Name: {agent.displayName}</p>
                    <p>{agent.description}</p>
                    <p>Role: {agent.role.displayName}</p>

                    <p>
                        Abilities: {agent.abilities[0].displayName}{" "}
                        {agent.abilities[1].displayName}{" "}
                        {agent.abilities[2].displayName}{" "}
                        {agent.abilities[3].displayName}
                    </p>
                </div>
            </li>
        );
    });

    return (
        <div className="App">
            <NavBar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/agents"
                        element={
                            <Agents
                                agents={agentList}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                input={input}
                                clear={clear}
                            />
                        }
                    />
                    <Route
                        path="/weapons"
                        element={
                            <Weapons
                                toggleInfo={toggleInfo}
                                toggleClick={toggleClick}
                            />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;
