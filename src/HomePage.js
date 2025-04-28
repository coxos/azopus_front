import React, { useState, useEffect } from "react";

function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/calvez/56bec47cb9c97d9999574adc65ef5368/raw/51f01cb2a160748d87dd40eae7d3785272a87355/all.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Azopus Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.alkotasAzonosito}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`https://picsum.photos/400/300?random=${item.alkotasAzonosito}`}
              alt={item.nev}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {item.megjelenitendoNev}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Név:</span> {item.nev}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Azonosító:</span>{" "}
                {item.alkotasAzonosito}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Keletkezés:</span>{" "}
                {new Date(
                  item.keletkezesKezdoIdopontjaInt
                ).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Típus:</span> {item.tipus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
