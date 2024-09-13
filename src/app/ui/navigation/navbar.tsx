import Link from 'next/link';
import NavLinks from './nav-links';

export default function NavBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-custom-gray flex justify-around items-center p-4 z-50 rounded-t-lg shadow-lg">
      <NavLinks /> {/* Использование компонента NavLinks */}
    </div>
  );
}
