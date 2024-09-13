'use client';

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

export default function HomePage() {
  const user = {
    name: 'Иван Иванов',
    imageUrl: '/no-profile-picture-15257.png', 
  };

  const income = 120000;

  const pieData = {
    labels: ['Profit', 'Attached', 'Free'],
    datasets: [
      {
        data: [560, 280, 4000],
        backgroundColor: ['#E71D36', '#3423A6', '#7D83FF'],
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
        <Image
          src={user.imageUrl}
          alt={user.name}
          width={60}
          height={60}
          className="rounded-full object-cover border-2 border-[#725ac1] shadow-[0_0_15px_3px_rgba(114,90,193,0.6)]" 
        />
        <h1 className="text-xl font-semibold text-shadow-sm">{user.name}</h1>
      </div>

      
      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-[#353535] to-[#4a4a4a] p-6 rounded-xl shadow-lg mb-4">
        <div className="flex flex-col justify-center items-start text-left space-y-2 w-1/2">
          <p className="text-3xl font-bold text-shadow-sm">{income}₽</p>
          <p className="text-gray-400 text-shadow-sm">Balance</p>
          <ul className="space-y-2">
            <li className="text-sm flex items-center text-shadow-sm">
              <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#E71D36]"></span>
              Продукт1 50.000₽
            </li>
            <li className="text-sm flex items-center text-shadow-sm">
              <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#3423A6]"></span>
              Продукт2 35.000₽
            </li>
            <li className="text-sm flex items-center text-shadow-sm">
              <span className="inline-block w-3 h-3 mr-2 rounded-full bg-[#7D83FF]"></span>
              Продукт3 35.000₽
            </li>
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
