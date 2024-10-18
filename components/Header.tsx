'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../assets/images/5.jpg';
import NavLink from './NavLink';
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
    <div className="border-gray-700 flex justify-between bg-neutral-950 px-4 lg:px-10 py-4 rounded-lg items-center w-full">
      {/* Логотип и название */}
      <div className="flex flex-row gap-2">
        <div className="navbar-start">
          <Link href="/" passHref>
            <div className="flex items-center cursor-pointer">
              <Image src={Icon} width={50} height={50} alt="Logo" className="rounded-full" />
              <span className="ml-2 text-xl lg:text-3xl">AnimeXD</span>
            </div>
          </Link>
        </div>

        <div ref={containerRef} className="flex pl-12 pr-3">
          <Search onFocus={() => setIsFocused(true)} />
          <div onClick={() => setIsFocused(false)}>
            <SearchResults isFocused={isFocused} />
          </div>
        </div>
      </div>
      {/* Меню для мобильных устройств */}
      <div className="lg:hidden z-50 relative">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-square">
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral-900 rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
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
