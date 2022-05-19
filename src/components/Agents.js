const Agents = (props) => {
    return (
        <div>
            <h2>Search for Agent</h2>
            <h3>Click on agent image to bring up info</h3>
            <form onSubmit={props.handleSubmit}>
                <input
                    onChange={props.handleChange}
                    type="text"
                    value={props.input}
                    placeholder="Agent name"
                />
                <input type="submit" value="submit" />
                <button onClick={props.clear}>Clear</button>
            </form>
            <ul className="agents">{props.agents}</ul>
        </div>
    );
};

export default Agents;
