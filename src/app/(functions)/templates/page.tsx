'use client';

import Link from 'next/link';

const templates = [
  {
    category: 'Шаблоны отчетности',
    route: '/templates/reporting',  
    items: [
      { name: 'Налоговая декларация УСН', description: 'Автоматическое заполнение декларации на основе введенных данных.' },
      { name: 'Расчет по страховым взносам', description: 'Расчет страховых взносов для организаций и ИП.' },
      { name: 'Форма 6-НДФЛ', description: 'Отчет по удержанному налогу на доходы физических лиц.' },
      { name: 'Форма 4-ФСС', description: 'Расчет и отчет по взносам в Фонд социального страхования.' },
      { name: 'Единый расчет по страховым взносам', description: 'Объединенная форма отчета по взносам в ПФР, ФОМС и ФСС.' }
    ],
  },
  {
    category: 'Шаблоны платежных документов',
    route: '/templates/payment-docs',  
    items: [
      { name: 'Платежное поручение', description: 'Автоматическое создание платежных поручений для перечисления налогов и взносов.' },
      { name: 'Кассовые ордера', description: 'Приходные и расходные кассовые ордера для учета движения наличных средств.' },
      { name: 'Шаблон квитанции на оплату', description: 'Для отправки клиентам или покупателям.' }
    ],
  },
  {
    category: 'Шаблоны первичных бухгалтерских документов',
    route: '/templates/accounting-docs',  
    items: [
      { name: 'Счета на оплату', description: 'Для формирования и выставления счетов клиентам.' },
      { name: 'Акты выполненных работ/услуг', description: 'Создание актов на основании оказанных услуг или выполненных работ.' },
      { name: 'Товарные накладные (ТОРГ-12)', description: 'Для оформления отгрузки товаров покупателям.' },
      { name: 'УПД', description: 'Универсальный передаточный документ для бухгалтерского и налогового учета.' },
      { name: 'Счета-фактуры', description: 'Шаблоны для выставления и получения счетов-фактур.' }
    ],
  },
  {
    category: 'Шаблоны договоров',
    route: '/templates/contracts',  
    items: [
      { name: 'Договор поставки', description: 'Шаблон договора для оформления отношений с поставщиками.' },
      { name: 'Договор аренды', description: 'Шаблон договора для сдачи или аренды помещений или оборудования.' },
      { name: 'Трудовые договоры', description: 'Для оформления отношений с сотрудниками.' }
    ],
  },
];

export default function Templates() {
  return (
    <div className="min-h-screen bg-[#19191a] text-[#E6E8E6] p-4 pb-16">
      {templates.map((category) => (
        <div key={category.category} className="mb-12">
          <h2 className="text-2xl font-semibold text-[#8a6fe2] mb-4">{category.category}</h2>
          <ul className="space-y-4">
            {category.items.map((item) => (
              <li key={item.name} className="p-4 bg-gradient-to-r from-[#3a3a3a] to-[#4a4a4a] shadow-md rounded-lg hover:bg-[#4a4a4a] transition">
                <Link href={category.route}> 
                  <div className="block cursor-pointer">
                    <h3 className="text-xl font-semibold text-[#8a6fe2]">{item.name}</h3>
                    <p className="mt-2 text-gray-400">{item.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
