import { useState, useEffect } from "react";
import AddCar from "./AddCar";
import Car from "./Car";

const CarsManager = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
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

  const handleUpdateCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car)),
    );
  };

  return (
    <>
      <AddCar onAdd={handleAddCar} />
      <div>
        <ul>
          {cars.map((car) => (
            <Car
              key={car.id}
              car={car}
              onDelete={handleSellCar}
              onUpdate={handleUpdateCar}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CarsManager;
