'use client';

import {
  CurrencyDollarIcon,
  BriefcaseIcon,
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'IET', href: '/IET', icon: CurrencyDollarIcon },
  { name: 'AM', href: '/AM', icon: BriefcaseIcon },
  { name: 'HOME', href: '/', icon: HomeIcon },
  { name: 'PY', href: '/PY', icon: CreditCardIcon },
  { name: 'RP', href: '/RP', icon: ChartBarIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  // Определяем, если путь соответствует основной странице, то сохраняем подчеркивание
  const shouldHighlight = links.some(link => pathname === link.href);

  return (
    <div className="relative flex justify-around w-full">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'relative z-10 flex items-center justify-center w-full p-2.5 md:p-3 hover:bg-custom-gray-dark transition-all duration-300',
              {
                'text-state-blue': isActive,
                'text-platinum': !isActive,
              }
            )}
          >
            <LinkIcon
              className={clsx(
                'w-8 h-8 md:w-9 md:h-9 transition-all duration-100',
                {
                  'stroke-current filter drop-shadow-[0_0_10px_rgba(0,0,255,0.6)]': isActive,
                }
              )}
            />
          </Link>
        );
      })}

      {shouldHighlight && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-state-blue transition-all duration-300"
          style={{
            transform: `translateX(${links.findIndex(link => link.href === pathname) * 100}%)`,
            width: `${100 / links.length}%`,
          }}
        />
      )}
    </div>
  );
}
