import { useState } from "react";

function Car({ car, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: car.name,
    brand: car.brand,
    engineType: car.engine.type,
    hp: car.engine.hp,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: car.name,
      brand: car.brand,
      engineType: car.engine.type,
      hp: car.engine.hp,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const { name, brand, engineType, hp } = formData;
    if ([name, brand, engineType, hp].some((field) => !field)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const updatedCar = {
      ...car,
      name: formData.name,
      brand: formData.brand,
      engine: {
        type: formData.engineType,
        hp: parseInt(formData.hp),
      },
    };

    fetch(`http://localhost:3000/cars/${car.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating car:", error);
      });
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div>
            <label>Nazwa: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Marka: </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Silnik: </label>
            <input
              type="text"
              name="engineType"
              value={formData.engineType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Moc (hp): </label>
            <input
              type="number"
              name="hp"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Zapisz</button>
          <button type="button" onClick={handleCancel}>
            Anuluj
          </button>
        </form>
      ) : (
        <div>
          <strong>{car.name}</strong> - {car.brand}, {car.engine.type},{" "}
          {car.engine.hp} HP
          <button onClick={handleEdit}>Edytuj</button>
          <button onClick={() => onDelete(car.id)}>Sprzedany</button>
        </div>
      )}
    </li>
  );
}

export default Car;
