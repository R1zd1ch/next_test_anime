'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../assets/images/5.jpg';
import NavLink from './NavLink';
import { Menu } from '@headlessui/react';
import Search from './Search';
import SearchResults from './SearchResults';

const navItems = [
  { href: '/anime/catalog', label: 'Каталог' },
  { href: '/anime/genres', label: 'Жанры' },
  { href: '/anime/schedule', label: 'Расписание' },
  { href: '/anime/franchises', label: 'Франшизы' },
  { href: '/profile', label: 'Профиль' },
];

const Header: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // Реф для контейнера поиска

  // Обработчик кликов вне контейнера с результатами поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false); // Закрываем результаты поиска при клике вне области
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative border-gray-700 flex justify-between bg-neutral-950 px-4 lg:px-10 py-4 rounded-lg items-center w-full">
      {/* Логотип и название */}
      <div className="flex items-center text-white space-x-2">
        <Link href="/" passHref>
          <div className="flex items-center">
            <Image src={Icon} width={50} height={50} alt="Logo" className="rounded-3xl" />
            <div className="py-2 px-3 text-xl lg:text-3xl">AnimeXD</div>
          </div>
        </Link>
      </div>

      <div ref={containerRef} className="flex pl-12 pr-3">
        <Search onFocus={() => setIsFocused(true)} />
        <div onClick={() => setIsFocused(false)}>
          <SearchResults isFocused={isFocused} />
        </div>
      </div>

      {/* Бургер-меню для мобильных устройств */}
      <div className="lg:hidden relative">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="text-white" aria-label="Toggle navigation">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </Menu.Button>

              {/* Мобильное меню - отображаем под бургер-иконкой */}
              <Menu.Items
                className={`absolute top-full right-1 w-38 bg-neutral-950 p-4 rounded-lg shadow-lg
                  transform transition-all duration-300 ease-in-out z-50
                  ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
              >
                <div className="flex flex-col gap-4 text-white">
                  {navItems.map((item) => (
                    <Menu.Item key={item.href}>
                      {({ active }) => (
                        <div className={`${active ? 'bg-neutral-800' : ''} p-2 rounded-md`}>
                          <NavLink href={item.href} label={item.label} />
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </>
          )}
        </Menu>
      </div>

      {/* Навигация для больших экранов */}
      <div className="hidden lg:flex gap-7 text-white">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default Header;
