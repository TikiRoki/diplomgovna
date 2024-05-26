"use client";

import Carousel from "@/components/Carusel";
import axios from "axios";
import { useState } from "react";

const images = ["/2.jpg", "/1.jpg", "/3.jpg", "/5.jpg", "/4.jpg"];

export default function Home() {
  const [data, setData] = useState({
    location: "",
    type: 0,
    floor: 0,
    rooms: "",
    area: 0,
  });
  const [cost, setCost] = useState(null);

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
    const [longitude, latitude] = await getCoordinates();
    // const result = await axios
    //   .get(
    //     `/api/getCost?floor=${data.floor}&rooms=${data.floor}&area=${data.area}&type=${data.type}&lat=${latitude}&lon=${longitude}`
    //   )
    //   .then((res) => res.data);

    // setCost(result.cost);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Carousel images={images} />
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-96 z-10">
        <h1 className="text-2xl font-bold mb-6">Оценка стоимости дома</h1>
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
          {/* <button onClick={getCoordinates}>Получить координаты</button>
          {coordinates && (
            <div>
              <p>Широта: {coordinates.latitude}</p>
              <p>Долгота: {coordinates.longitude}</p>
            </div>
          )} */}
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
        {cost && <div className=" ">{cost}</div>}
      </div>
    </div>
  );
}
