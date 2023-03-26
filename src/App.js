import "./App.css";
import { useState, useEffect } from "react";
import React from "react";

function App() {
  //Player Position
  const [left, setLeft] = useState(10);
  const [vert, setVert] = useState(-40);
  //BULLETS: bx = bullet x coordinate, projectilePos = bullet y coordinate
  //Bullet 1
  const [view, setView] = useState("none");
  const [bx, setBx] = useState(null);
  const [projectilePos, setProjectilePos] = useState(null);
  //Bullet 2
  const [view2, setView2] = useState("none");
  const [bx2, setBx2] = useState(null);
  const [projectilePos2, setProjectilePos2] = useState(null);
  //Bullet 3
  const [view3, setView3] = useState("none");
  const [bx3, setBx3] = useState(null);
  const [projectilePos3, setProjectilePos3] = useState(null);
  //Out Of Ammo Text and Count
  const [inventory, setInventory] = useState("");
  const [counter, setCounter] = useState(0);
  //separate shootProjectile function for each bullet
  const shootProjectile = () => {
    setProjectilePos(vert - 250);
    setBx(left - 13);
    setView("inline-block");
  };

  const shootProjectile2 = () => {
    setProjectilePos2(vert - 250);
    setBx2(left - 13);
    setView2("inline-block");
  };

  const shootProjectile3 = () => {
    setProjectilePos3(vert - 250);
    setBx3(left - 13);
    setView3("inline-block");
  };

  //Separate useEffects for each bullet
  //Didn't know if I could put all 3 in the same instance

  useEffect(() => {
    const interval = setInterval(() => {
      if (projectilePos > -670) {
        setProjectilePos(projectilePos - 10);
      } else if (projectilePos === -670) {
        setView("none");
        setCounter(2);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [projectilePos]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      if (projectilePos2 > -690) {
        setProjectilePos2(projectilePos2 - 10);
      } else if (projectilePos2 === -690) {
        setView2("none");
        setCounter(2);
      }
    }, 100);
    return () => clearInterval(interval2);
  }, [projectilePos2]);

  useEffect(() => {
    const interval3 = setInterval(() => {
      if (projectilePos3 > -710) {
        setProjectilePos3(projectilePos3 - 10);
      } else if (projectilePos3 === -710) {
        setView3("none");
        setCounter(2);
      }
    }, 100);
    return () => clearInterval(interval3);
  }, [projectilePos3]);
  //useEffect for Ammo Count
  useEffect(() => {
    console.log(counter);
    if (counter === 3) {
      setInventory(" Out of Ammo");
    } else if (counter === 2) {
      setInventory("");
    }
  });

  //This function handles all the actual controls
  function handleKeyPress(e) {
    var key = e.key;
    //"d","a","s","w" keys are for the ship direction
    if (key === "d") {
      if (left === 150) {
        setLeft(150);
      } else if (left < 150) {
        setLeft(left + 20);
      }
    } else if (key === "a") {
      if (left === -150) {
        setLeft(-150);
      } else if (left > -150) {
        setLeft(left - 20);
      }
    } else if (key === "s") {
      if (vert === -40) {
        setVert(-40);
      } else if (vert < -40) {
        setVert(vert + 20);
      }
    } else if (key === "w") {
      if (vert === -480) {
        setVert(-480);
      } else if (vert < 480) {
        setVert(vert - 20);
      }
      // "f" is for all projectile firing
    } else if (key === "f") {
      if (view === "none") {
        shootProjectile();
        setCounter(counter + 1);
      } else if (view === "inline-block") {
        if (view2 === "none") {
          shootProjectile2();
          setCounter(counter + 1);
        } else if (view2 === "inline-block") {
          if (view3 === "none") {
            shootProjectile3();
            setCounter(counter + 1);
          } else {
          }
        }
      }
    }
  }

  //I had to use button objects for everything to make them move? Idk

  return (
    <div className="Dapp" onKeyPress={(e) => handleKeyPress(e)}>
      <h1>Space Invaders</h1>

      <div className="board">
        <h4 className="inventory">{inventory}</h4>
        {/* button with className "mover" is the space ship */}
        <button
          onKeyPress={(e) => handleKeyPress(e)}
          className="mover"
          style={{
            translate: left + "px" + " " + vert + "px",

            height: "150px",
            width: "150px",
          }}
        ></button>
        <br />
        {/* remaining buttons are the 3 projectiles */}
        <button
          onKeyPress={(e) => handleKeyPress(e)}
          className="bullet"
          style={{
            translate: bx + "px" + " " + projectilePos + "px",
            display: view,
            height: "150px",
            width: "125px",
          }}
        ></button>
        <br />
        <button
          onKeyPress={(e) => handleKeyPress(e)}
          className="bullet"
          style={{
            translate: bx2 + "px" + " " + projectilePos2 + "px",
            display: view2,
            height: "150px",
            width: "125px",
          }}
        ></button>
        <br />
        <button
          onKeyPress={(e) => handleKeyPress(e)}
          className="bullet"
          style={{
            translate: bx3 + "px" + " " + projectilePos3 + "px",
            display: view3,
            height: "150px",
            width: "125px",
          }}
        ></button>
      </div>
    </div>
  );
}

export default App;
