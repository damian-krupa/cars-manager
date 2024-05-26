import { useState, useEffect } from "react";
import AddCar from "./AddCar";

const CarsManager = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    debugger;
    console.warn("fetch cars");
    fetch("http://localhost:3000/cars")
      .then((r) => r.json())
      .then((json) => {
        setCars(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSellCar = (id) => {
    fetch(`http://localhost:3000/cars/${id}`, { method: "DELETE" })
      .then(() =>
        setCars((prevState) => prevState.filter((car) => car.id !== id)),
      )
      .catch((error) => {
        console.error("Error selling car:", error);
      });
  };

  const handleAddCar = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
  };

  return (
    <>
      <AddCar onAdd={handleAddCar} />
      <div>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              <strong>{`${car.brand} ${car.name} - ${car.engine.type}, ${car.engine.hp} KM`}</strong>
              <button onClick={() => handleSellCar(car.id)}>Sprzedany</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CarsManager;
