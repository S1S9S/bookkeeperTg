'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Определение интерфейса для актива
interface Asset {
  name: string;
  months_left: number;
  value: number;
  monthly_depreciation?: number; // Это поле может использоваться для амортизации
}

export default function AssetsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalValue, setTotalValue] = useState(0); // Общая стоимость активов
  const [depreciableCount, setDepreciableCount] = useState(0); // Количество амортизируемых активов
  const [expiringAssets, setExpiringAssets] = useState<Asset[]>([]); // Активы с истекающим сроком
  const [amortizationData, setAmortizationData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Амортизация (тыс. ₽)',
        data: [] as number[],
        fill: false,
        borderColor: '#725ac1',
        tension: 0.1,
      },
    ],
  });

  // Запрос к API для получения данных
  useEffect(() => {
    async function fetchAssetsData() {
      try {
        // Общая стоимость активов
        const valueResponse = await fetch('http://localhost:8000/api/assets/total-value');
        const valueData = await valueResponse.json();
        setTotalValue(valueData.total_value);

        // Количество амортизируемых активов
        const countResponse = await fetch('http://localhost:8000/api/assets/depreciable-count');
        const countData = await countResponse.json();
        setDepreciableCount(countData.depreciable_count);

        // Активы с истекающим сроком
        const expiringResponse = await fetch('http://localhost:8000/api/assets/expiring');
        const expiringData: Asset[] = await expiringResponse.json();
        setExpiringAssets(expiringData);

        // Данные для графика амортизации
        const amortizationResponse = await fetch('http://localhost:8000/api/assets/amortization');
        const amortizationData: Asset[] = await amortizationResponse.json();
        setAmortizationData({
          labels: amortizationData.map((asset) => asset.name),
          datasets: [
            {
              label: 'Амортизация (тыс. ₽)',
              data: amortizationData.map((asset) => asset.monthly_depreciation || 0),
              fill: false,
              borderColor: '#725ac1',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }

    fetchAssetsData();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-[100px] overflow-y-auto">
      <div className="w-full text-center md:text-left mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#725ac1] to-[#8977df] text-transparent bg-clip-text">
          Учет основных средств и нематериальных активов
        </h1>
      </div>
      <hr className="border-t border-[#725ac1] mb-4" />

      {/* Блок с ключевыми показателями */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg grid grid-cols-1 gap-3 text-center">
        <div>
          <h2 className="text-md font-semibold">Общая стоимость активов</h2>
          <p className="text-xl font-bold mt-1">{totalValue} тыс. ₽</p>
        </div>
        <div>
          <h2 className="text-md font-semibold">Количество амортизируемых активов</h2>
          <p className="text-xl font-bold mt-1">{depreciableCount} активов</p>
        </div>
        <div>
          <h2
            className="text-md font-semibold flex items-center justify-center md:justify-start cursor-pointer"
            onClick={handleToggle}
          >
            Активы с истекающим сроком:
            {isOpen ? (
              <ChevronUpIcon className="w-5 h-5 ml-2 text-[#725ac1]" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 ml-2 text-[#725ac1]" />
            )}
          </h2>
          {isOpen && (
            <div className="mt-3 p-3 bg-[#2b2b2b] rounded-lg shadow-md">
              {expiringAssets.map((asset, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-[#3a3a3a] rounded-md mb-2 hover:bg-[#4a4a4a] transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold">{asset.name}</p>
                    <p className="text-xs text-gray-400">Осталось месяцев: {asset.months_left}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{asset.value} тыс. ₽</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-500 text-xs hover:underline">
                      Редактировать
                    </button>
                    <button className="text-red-500 text-xs hover:underline">
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full text-blue-500 text-sm hover:underline mt-2">
                Перейти к полному списку
              </button>
            </div>
          )}
        </div>
      </div>

      {/* График амортизации */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Амортизация по месяцам</h2>
        <div className="w-full h-64">
          <Line data={amortizationData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Функциональные кнопки */}
      <div className="p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Доступные функции</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Ввод нового основного средства
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Начисление амортизации
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Формирование отчетности
          </button>
        </div>
      </div>
    </div>
  );
}
