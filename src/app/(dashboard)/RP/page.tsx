'use client';

export default function ReportingPage() {
  const currentIncome = 150000; // Пример текущего дохода за месяц
  const currentExpenses = 50000; // Пример уже произведенных расходов
  const expectedExpenses = 30000; // Пример ожидаемых расходов
  const salaryExpenses = 40000; // Пример ожидаемых расходов на зарплату
  const finalIncome = currentIncome - currentExpenses - expectedExpenses - salaryExpenses; // Конечный доход

  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-[100px] overflow-y-auto">
      
      {/* Заголовок страницы */}
      <div className="w-full text-center md:text-left mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#725ac1] to-[#8977df] text-transparent bg-clip-text">
          Формирование отчетности
        </h1>
      </div>
      <hr className="border-t border-[#725ac1] mb-4" />

      {/* Блок с текущим доходом и расходами */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Финансовые данные за текущий месяц</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Текущий доход:</span>
            <span className="font-bold">{currentIncome.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Произведенные расходы:</span>
            <span className="font-bold">{currentExpenses.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Ожидаемые расходы:</span>
            <span className="font-bold">{expectedExpenses.toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Расходы на зарплату:</span>
            <span className="font-bold">{salaryExpenses.toLocaleString()} ₽</span>
          </div>
          <hr className="border-t border-gray-600 my-2" />
          <div className="flex justify-between text-sm">
            <span>Конечный доход:</span>
            <span className="font-bold text-[#7D83FF]">{finalIncome.toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

      {/* Подготовка налоговой декларации по УСН */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Подготовка налоговой декларации по УСН</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Начать подготовку декларации
          </button>
        </div>
      </div>

      {/* Формирование бухгалтерской отчетности */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Формирование бухгалтерской отчетности</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Начать формирование отчетности
          </button>
        </div>
      </div>

      {/* Сдача отчетности в электронном виде */}
      <div className="p-3 bg-gradient-to-r from-[#353535] to-[#4a4a4a] rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-center md:text-left">Сдача отчетности в электронном виде</h2>
        <div className="space-y-3">
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Подготовить отчетность к сдаче
          </button>
          <button className="w-full py-2 px-5 bg-gradient-to-r from-[#725ac1] to-[#8977df] text-[#E6E8E6] font-semibold rounded-lg transition-colors shadow-lg hover:shadow-[#725ac1]/40 hover:shadow-lg hover:bg-[#5d48a3]">
            Отправить отчетность
          </button>
        </div>
      </div>
    </div>
  );
}
