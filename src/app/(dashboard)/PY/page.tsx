'use client';

import { useState } from 'react';

interface Employee {
  name: string;
  salary: number;
  taxes: number;
  contributions: number;
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    { name: 'Иван Иванов', salary: 60000, taxes: 9000, contributions: 4000 },
    { name: 'Мария Петрова', salary: 75000, taxes: 12000, contributions: 5000 },
    { name: 'Сергей Сидоров', salary: 50000, taxes: 7500, contributions: 3500 },
  ]);

  const handleEdit = (index: number) => {
    // Логика для редактирования данных сотрудника
  };

  const handleDelete = (index: number) => {
    setEmployees((prevEmployees) => prevEmployees.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-[100px] overflow-y-auto">
      
      {/* Заголовок страницы */}
      <div className="w-full text-center md:text-left mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#725ac1] to-[#8977df] text-transparent bg-clip-text">
          Расчет заработной платы
        </h1>
      </div>
      <hr className="border-t border-[#725ac1] mb-4" />

      {/* Ввод данных о сотрудниках */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Ввод данных о сотрудниках</h2>
        <div className="space-y-3">
          {employees.map((employee, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-[#2b2b2b] rounded-md hover:bg-[#4a4a4a] transition-colors"
            >
              <div>
                <p className="text-sm font-semibold">{employee.name}</p>
                <p className="text-xs text-gray-400">Зарплата: {employee.salary.toLocaleString()} ₽</p>
                <p className="text-xs text-gray-400">Налоги: {employee.taxes.toLocaleString()} ₽</p>
                <p className="text-xs text-gray-400">Взносы: {employee.contributions.toLocaleString()} ₽</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 text-xs hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Добавить сотрудника
          </button>
          <button className="w-full mt-2 py-2 px-5 text-blue-500 font-semibold hover:underline">
            <a href="/employees">Перейти к полному списку сотрудников</a>
          </button>
        </div>
      </div>

      {/* Формирование платежных ведомостей и расчетных листков */}
      <div className="p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Формирование платежных ведомостей и расчетных листков</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Сформировать платежную ведомость
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Сформировать расчетные листки
          </button>
        </div>
      </div>
    </div>
  );
}
