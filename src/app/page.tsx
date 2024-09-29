'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';
import Link from 'next/link';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

// Определение типа для продукта
interface Product {
  name: string;
  income: number;
}

// Определение типа для пользователя
interface User {
  username: string;
  avatar_url: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);  // Массив продуктов с типом Product
  const [totalIncome, setTotalIncome] = useState<number>(0);  // Общий доход с типом number
  const [user, setUser] = useState<User | null>(null);  // Информация о пользователе

  useEffect(() => {
    // Запрос к бэкенду для получения данных продуктов
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8000/api/products/income');
        const data: Product[] = await response.json();

        // Суммируем общий доход
        const total = data.reduce((sum: number, product: Product) => sum + product.income, 0);
        setTotalIncome(total);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка при получении данных с сервера:", error);
      }
    }

    // Запрос к бэкенду для получения данных пользователя
    async function fetchUser() {
      try {
        const response = await fetch('http://localhost:8000/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Токен авторизации
          },
        });
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    }

    fetchProducts();
    fetchUser();
  }, []);  // Запрос выполняется один раз при загрузке страницы

  // Данные для диаграммы
  const pieData = {
    labels: products.map(product => product.name),
    datasets: [
      {
        data: products.map(product => product.income),
        backgroundColor: ['#E71D36', '#3423A6', '#7D83FF'],  // Цвета продуктов
        hoverBackgroundColor: ['#E71D36', '#3423A6', '#7D83FF'],
        borderWidth: 0,
        borderRadius: 0,
        spacing: 0, 
        cutout: '80%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-6"> 
      <div className="mb-4 p-4 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg flex items-center space-x-4">
        {user ? (
          <>
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={60}
              height={60}
              className="rounded-full object-cover border-2 border-[#725ac1] shadow-[0_0_15px_3px_rgba(114,90,193,0.6)]" 
            />
            <h1 className="text-xl font-semibold text-shadow-sm">{user.username}</h1>
          </>
        ) : (
          <p>Загрузка пользователя...</p>
        )}
      </div>

      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-[#353535] to-[#4a4a4a] p-6 rounded-xl shadow-lg mb-4">
        <div className="flex flex-col justify-center items-start text-left space-y-2 w-1/2">
          <p className="text-3xl font-bold text-shadow-sm">{totalIncome}₽</p>
          <p className="text-gray-400 text-shadow-sm">Balance</p>
          <ul className="space-y-2">
            {products.map((product, index) => (
              <li key={index} className="text-sm flex items-center text-shadow-sm">
                <span className={`inline-block w-3 h-3 mr-2 rounded-full`} style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}></span>
                {product.name} {product.income}₽
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <Doughnut data={pieData} options={options} />
        </div>
      </div>

      {/* Блок с кнопками функций */}
      <div className="p-6 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-shadow-sm">Автоматизация</h2>
        <div className="space-y-4">
          <div>
            <Link href="/templates" className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
              Шаблоны
            </Link>
            <p className="text-sm text-[#A5A5A5] mt-2 text-shadow-sm text-center">
              (Создавайте преднастроенные шаблоны для документов и операций, чтобы ускорить и упростить повседневные задачи.)
            </p>
          </div>
          <div>
            <Link href="/tasks" className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
              Регулярные задачи
            </Link>
            <p className="text-sm text-[#A5A5A5] mt-2 text-shadow-sm text-center">
              (Автоматизируйте регулярные операции, такие как начисление зарплаты и расчеты налогов, чтобы сократить количество ручных процессов.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
