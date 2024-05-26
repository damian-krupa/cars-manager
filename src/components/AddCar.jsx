import { useState } from "react";

// eslint-disable-next-line react/prop-types
function AddCar({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    engineType: "",
    hp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = {
      name: formData.name,
      brand: formData.brand,
      engine: {
        type: formData.engineType,
        hp: parseInt(formData.hp),
      },
    };

    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd(data); // Aktualizuj stan w komponencie nadrzędnym
        setFormData({
          name: "",
          brand: "",
          engineType: "",
          hp: "",
        });
      })
      .catch((error) => {
        console.error("Error adding car:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nazwa: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Marka: </label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Silnik: </label>
        <input
          type="text"
          name="engineType"
          value={formData.engineType}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Moc (KM): </label>
        <input
          type="number"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Dodaj samochód</button>
    </form>
  );
}

export default AddCar;
