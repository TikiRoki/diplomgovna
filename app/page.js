"use client";

import Carousel from "@/components/Carusel";
import axios from "axios";
import { useState } from "react";
//const [loading, setLoading] = useState(false);
const images = ["/2.jpg", "/1.jpg", "/3.jpg", "/5.jpg", "/4.jpg"];

export default function Home() {
  const [data, setData] = useState({
    location: "",
    type: 0,
    floor: 0,
    rooms: 0,
    area: 0,
  });
  const [cost, setCost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getCoordinates = async () => {
    const res = await axios
      .get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=8dc80735-00fd-410b-b3cb-68820c597f08&format=json&geocode=${data.location}`
      )
      .then((res) => res.data);

    console.log(res);

    return res.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
      " "
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const [longitude, latitude] = await getCoordinates();
      const result = await axios
        .get(
          `/api/getCost?floor=${data.floor}&rooms=${data.rooms}&area=${data.area}&type=${data.type}&lat=${latitude}&lon=${longitude}`
        )
        .then((res) => res.data);
  
      setCost(result.cost);
    } catch (error) {
      console.error("Error fetching cost:", error);
    } finally {
      setLoading(false);
    }
  };//Открыть модальное окно 
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Fixed Carousel Background */}
      <div className="fixed inset-0 z-0">
        <Carousel images={images} />
      </div>

      {/* Overlay for content */}
      <div className="relative z-10 flex flex-col min-h-screen bg-opacity-60 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">
              <img src="/LOGO.png" alt="Logo" className="h-10 w-30 inline-block" />
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:underline">Главная</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">О нас</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Контакты</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 justify-center items-center">
          <div className="relative w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="z-50 flex flex-col md:flex-row w-full max-w-4xl h-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:block md:w-1/2">
                  <img
                    className="object-cover w-full h-full"
                    src="./FON.jpg"
                    alt="FON"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8">
                  <h1 className="text-2xl font-bold mb-6">Оценка стоимости жилья</h1>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="location"
                    >
                      Расположение
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Введите расположение"
                      value={data.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="type"
                    >
                      Тип дома
                    </label>
                    <select
                      id="type"
                      name="type"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.type}
                      onChange={handleChange}
                    >
                      <option value={0}>Панельный</option>
                      <option value={1}>Монолитный</option>
                      <option value={2}>Кирпичный</option>
                      <option value={3}>Блочный</option>
                      <option value={4}>Деревянный</option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 transform -translate-y-2/2 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.59 7.41L10 11.83l4.41-4.42L16 8.83l-6 6-6-6z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="floor"
                    >
                      Этаж
                    </label>
                    <input
                      type="number"
                      id="floor"
                      name="floor"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Введите этаж"
                      value={data.floor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="rooms"
                    >
                      Количество комнат
                    </label>
                    <select
                      id="rooms"
                      name="rooms"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.rooms}
                      onChange={handleChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 transform -translate-y-2/2 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.59 7.41L10 11.83l4.41-4.42L16 8.83l-6 6-6-6z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="area"
                    >
                      Площадь
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Введите площадь"
                      value={data.area}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleSubmit}
                    >
                      Оценить стоимость
                    </button>
                  </div>
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Примерная стоимость жилья</h2>
                        <p className="mb-6">{cost} рублей</p>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={closeModal}
                        >
                          Закрыть
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Ваш сайт. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
