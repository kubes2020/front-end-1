import React, { useState } from "react";
import { Home } from "./components/Home";
import { Route, Link, useHistory } from "react-router-dom";
import AddPlants from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import PlantCard from "./components/PlantCard";
import SignUp from "./components/SignUp";
import EditPlant from "./components/EditPlant";
import { PlantContext } from "./components/contexts/PlantContext";
import Settings from "./components/Settings";
import styled from "styled-components";
import "./App.css";

const NavLink = styled(Link)`
  text-decoration: none;
  /* padding: 0.3%; */
  color: rgba(0, 0, 0, 0.9);
  margin: 0.3% 2%;
  font-size: 1rem;
  border-radius: 6px;
  justify-content: center;
  display: inline-flex;
  font-family: Raleway;
  &:hover {
    color: white;
    background-color: rgb(25, 132, 25);
    transition: all 0.4s ease-in-out;
  }
  @media (max-width: 550px) {
    font-size: 2rem;
    display: block;
  }
`;

function App() {
  const history = useHistory();
  const [plantId, setPlantId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    history.push("/");
  };

  let loginLinks;

  if (isLoggedIn) {
    loginLinks = (
      <span>
        <NavLink to="/settings">User Settings</NavLink>
        <NavLink to="/plantcard">View My Plants</NavLink>
        <NavLink to="/addplants">Add Plants</NavLink>
        <NavLink to="/" onClick={handleLogOut}>
          Logout
        </NavLink>
      </span>
    );
  } else {
    loginLinks = <NavLink to="/login">Login</NavLink>;
  }

  return (
    <div className="App">
      <div className="main-nav">
        <NavLink to="/">Home</NavLink>
        {loginLinks}
      </div>
      <PlantContext.Provider value={{ plantId, setPlantId }}>
        <Route exact path="/" component={Home}></Route>
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/signup"
          render={(props) => (
            <SignUp {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        ></Route>
        <PrivateRoute exact path="/addplants" component={AddPlants} />
        <PrivateRoute exact path="/plantcard" component={PlantCard} />
        <PrivateRoute exact path="/editplant" component={EditPlant} />
        <PrivateRoute exact path="/settings" component={Settings} />
      </PlantContext.Provider>
    </div>
  );
}

export default App;
