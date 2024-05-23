import Carousel from "@/components/Carusel";

const images = ["/2.jpg", "/1.jpg", "/3.jpg"];

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Carousel images={images} />
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-96 z-10">
        <h1 className="text-2xl font-bold mb-6">Оценка стоимости дома</h1>
        <form>
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
            >
              <option value="Панельный">Панельный</option>
              <option value="Монолитный">Монолитный</option>
              <option value="Кирпичный">Кирпичный</option>
              <option value="Блочный">Блочный</option>
              <option value="Деревянный">Деревянный</option>
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
              type="text"
              id="floor"
              name="floor"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите этаж"
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
              type="text"
              id="area"
              name="area"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Введите площадь"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Оценить стоимость
          </button>
        </form>
      </div>
    </div>
  );
}
