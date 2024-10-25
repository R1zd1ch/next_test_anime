'use client';
/* eslint-disable */
import Link from 'next/link';
import Image from 'next/legacy/image';
import React, { useState, useEffect } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import { searchAnime } from '@/services/searchAnime';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;
const INITIAL_LIMIT = 4;

const SearchResults = ({ isFocused }: { isFocused: boolean }) => {
  const { searchTerm, results, setResults, loading, setLoading } = useSearchStore();
  const [showMore, setShowMore] = useState(false);
  const visibleResults = showMore ? results : results.slice(0, INITIAL_LIMIT);

  useEffect(() => {
    const delayBounceFn = setTimeout(() => {
      if (searchTerm) {
        getAnime(searchTerm);
        setShowMore(false);
      }
      if (searchTerm.length < 1) {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayBounceFn);
  }, [searchTerm]);

  const getAnime = async (term: string) => {
    setLoading(true);
    try {
      const res = await searchAnime(term);
      setResults(res);
    } catch (err) {
      console.error('Ошибка при поиске', err);
    }
    setLoading(false);
  };

  const renderSkeletons = () => (
    <ul>
      {Array.from({ length: INITIAL_LIMIT }).map((_, index) => (
        <li key={index} className="p-4 flex flex-row items-center">
          <Skeleton width={125} height={125} className="rounded-lg" />
          <div className="ml-4 flex-1">
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={15} className="mt-2" />
            <Skeleton width="80%" height={15} className="mt-2" />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {isFocused && (
        <div className="z-10 absolute mt-2 w-5/6 lg:w-1/2 bg-neutral-900 text-white rounded-lg shadow-lg top-16 left-1/2 transform -translate-x-1/2 lg:left-1/3 lg:transform lg:-translate-x-1/3 transition-all duration-300 ease-in-out max-h-[75%] overflow-y-auto">
          {loading ? (
            renderSkeletons()
          ) : (
            <>
              <ul>
                {results.map((anime: any) => (
                  <Link
                    href={`/anime/title/${anime.id}`}
                    key={anime.id}
                    className="p-4 hover:bg-neutral-800 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer flex flex-row items-center rounded-lg "
                  >
                    <div className="flex-shrink-0 relative w-24 h-36">
                      {' '}
                      {/* Указываем ширину и высоту */}
                      <Image
                        className="rounded-lg shadow-lg object-cover"
                        src={`${IMAGE_URL}${anime.poster.optimized.src}`}
                        alt={anime.name.main}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={`${IMAGE_URL}${anime.poster.optimized.src}`}
                      />
                    </div>

                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{anime.name.main}</h3>
                      <p className="text-sm text-gray-400">
                        {anime.year} — {anime.type.description}
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-2">{anime.description}</p>
                    </div>
                  </Link>
                ))}
              </ul>

              {/* Кнопка "Ещё" */}
              {/* {results.length > INITIAL_LIMIT && !showMore && (
                <div className="flex justify-end p-4">
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-sm font-medium text-blue-500 hover:text-blue-400"
                  >
                    Ещё
                  </button>
                </div>
              )} */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
