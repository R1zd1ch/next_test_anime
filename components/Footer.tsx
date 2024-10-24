'use client';
import Link from 'next/link';
import Image from 'next/legacy/image';
import Icon from '../assets/images/5.jpg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white py-10 px-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Секция о компании */}
          <div className="flex justify-center">
            <div>
              <div className="flex items-center gap-4 py-auto mb-4">
                <Image src={Icon} width={75} height={75} alt="Logo" className="rounded-full" />
                <h3 className="text-3xl font-semibold">AnimeXD</h3>
              </div>
              <p className="text-gray-400">
                AnimeXD - это ваш источник для всего, что связано с аниме. Смотрите последние
                выпуски, читайте новости и изучайте жанры.
              </p>
            </div>
          </div>

          {/* Секция навигации */}
          <div className="flex justify-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">Навигация</h3>
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link href="/anime/catalog" className="hover:underline">
                      Каталог
                    </Link>
                  </li>
                  <li>
                    <Link href="/anime/genres" className="hover:underline">
                      Жанры
                    </Link>
                  </li>
                  <li>
                    <Link href="/anime/schedule" className="hover:underline">
                      Расписание
                    </Link>
                  </li>
                  <li>
                    <Link href="/anime/franchises" className="hover:underline">
                      Франшизы
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:underline">
                      Профиль
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Секция социальных сетей */}
          <div className="flex justify-center">
            <div className="md:col-span-1 md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Следите за нами</h3>
              <div className="flex space-x-4">
                <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
                  <FaFacebook className="text-2xl hover:text-gray-500" />
                </Link>
                <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                  <FaTwitter className="text-2xl hover:text-gray-500" />
                </Link>
                <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
                  <FaInstagram className="text-2xl hover:text-gray-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} AnimeXD. Весь материал на сайте представлен
            исключительно для домашнего ознакомительного просмотра.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
