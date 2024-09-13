'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function IncomeExpensePage() {
  const [activeTab, setActiveTab] = useState('income');

  // Пример данных для диаграмм
  const incomeData = {
    labels: ['Продукт 1', 'Продукт 2', 'Продукт 3'],
    datasets: [
      {
        label: 'Доходы',
        data: [30000, 50000, 40000],
        backgroundColor: ['#E71D36', '#3423A6', '#7D83FF'],
        borderWidth: 0,
      },
    ],
  };

  const expenseData = {
    labels: ['Операция 1', 'Операция 2', 'Операция 3'],
    datasets: [
      {
        label: 'Расходы',
        data: [20000, 15000, 25000],
        backgroundColor: ['#725ac1', '#53a0fd', '#4bc0c0'],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-[100px] overflow-y-auto">
      
      {/* Заголовок страницы */}
      <div className="w-full text-center md:text-left mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#725ac1] to-[#8977df] text-transparent bg-clip-text">
          Учет доходов и расходов
        </h1>
      </div>
      <hr className="border-t border-[#725ac1] mb-4" />

      {/* Переключение между доходами и расходами */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setActiveTab('income')}
            className={`py-2 px-4 font-semibold ${activeTab === 'income' ? 'text-[#7D83FF] border-b-2 border-[#7D83FF]' : 'text-gray-400'}`}
          >
            Доходы
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-2 px-4 font-semibold ${activeTab === 'expenses' ? 'text-[#7D83FF] border-b-2 border-[#7D83FF]' : 'text-gray-400'}`}
          >
            Расходы
          </button>
        </div>
        {activeTab === 'income' ? (
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <Bar data={incomeData} options={barOptions} />
            </div>
            <ul className="w-full md:w-1/2 mt-4 md:mt-0 space-y-2 text-sm text-gray-400">
              <li>Продукт 1: 30,000 ₽</li>
              <li>Продукт 2: 50,000 ₽</li>
              <li>Продукт 3: 40,000 ₽</li>
            </ul>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2">
              <Bar data={expenseData} options={barOptions} />
            </div>
            <ul className="w-full md:w-1/2 mt-4 md:mt-0 space-y-2 text-sm text-gray-400">
              <li>Операция 1: 20,000 ₽</li>
              <li>Операция 2: 15,000 ₽</li>
              <li>Операция 3: 25,000 ₽</li>
            </ul>
          </div>
        )}
      </div>

      {/* Формирование налоговой декларации */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Формирование налоговой декларации</h2>
        <p className="text-sm mb-3 text-center md:text-left text-gray-400">
          Автоматический расчет налоговой базы и формирование декларации.
        </p>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Начать формирование декларации
          </button>
        </div>
      </div>

      {/* Учет банковских и кассовых операций */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Учет банковских и кассовых операций</h2>
        <p className="text-sm mb-3 text-center md:text-left text-gray-400">
          Отражение всех денежных поступлений и выплат, включая расчеты с контрагентами.
        </p>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Вести учет банковских операций
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Вести учет кассовых операций
          </button>
        </div>
      </div>

      {/* Учет расчетов с контрагентами */}
      <div className="p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Учет расчетов с контрагентами</h2>
        <p className="text-sm mb-3 text-center md:text-left text-gray-400">
          Формирование актов выполненных работ, счетов-фактур, реестров.
        </p>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Формировать акты выполненных работ
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Формировать счета-фактуры
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Формировать реестры
          </button>
        </div>
      </div>
    </div>
  );
}
