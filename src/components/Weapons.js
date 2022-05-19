import axios from "axios";
import { useEffect, useState } from "react";

const Weapons = (props) => {
    const [input, setInput] = useState("");
    const [weapons, setWeapons] = useState([]);

    useEffect(() => {
        weaponReq();
    }, []);

    const weaponReq = async () => {
        try {
            let response = await axios.get(
                `https://valorant-api.com/v1/weapons`
            );
            console.log(response.data);
            setWeapons(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const weaponList = weapons.map((weapon, key) => {
        return (
            <li key={key}>
                <img
                    className="wep"
                    src={weapon.displayIcon}
                    alt="weap"
                    onClick={props.toggleClick}
                />
                <div style={{ display: props.toggleInfo }}>
                    <p>Name: {weapon.displayName}</p>
                    {weapon.weaponStats && (
                        <p>
                            Fire Rate: {weapon.weaponStats.fireRate}{" "}
                            rounds/second
                        </p>
                    )}
                    {weapon.weaponStats && (
                        <p>
                            Magazine Size: {weapon.weaponStats.magazineSize}{" "}
                            rounds
                        </p>
                    )}
                    {weapon.weaponStats && (
                        <p>
                            Reload Time: {weapon.weaponStats.reloadTimeSeconds}{" "}
                            seconds
                        </p>
                    )}
                </div>
            </li>
        );
    });

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let wepList = [...weapons];
        let filteredWeapons = wepList.filter((weapon) => {
            return input.toLowerCase() === weapon.displayName.toLowerCase();
        });
        console.log(wepList);
        setWeapons(filteredWeapons);
        setInput("");
    };

    const clear = () => {
        weaponReq();
    };

    return (
        <div>
            <h2>Search for Weapon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    value={input}
                    placeholder="Weapon name"
                />
                <input type="submit" value="submit" />
                <button onClick={clear}>Clear</button>
            </form>
            <ul className="weapons">{weaponList}</ul>
        </div>
    );
};

export default Weapons;
