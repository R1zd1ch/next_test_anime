// import AnimeCard from './CatalogCard';
// import CatalogInputSearch from './CatalogInputSearch';

// export default function AnimeCatalog() {
//   // Данные каталога аниме
//   const animeList = [
//     {
//       title: 'Naruto',
//       imageUrl: 'https://example.com/naruto.jpg',
//       description: 'A young ninja strives to become the strongest and protect his village.',
//     },
//     {
//       title: 'Attack on Titan',
//       imageUrl: 'https://example.com/attack_on_titan.jpg',
//       description: 'Humanity fights for survival against giant humanoid creatures.',
//     },
//     {
//       title: 'My Hero Academia',
//       imageUrl: 'https://example.com/my_hero_academia.jpg',
//       description:
//         'In a world where most people have superpowers, a boy without powers dreams to become a hero.',
//     },
//     // Добавьте больше аниме здесь
//   ];

//   return (
//     <div className="mt-6 mx-4 md:mx-0 lg:mx-0 min-h-screen">
//       <header className="text-left py-6 bg-neutral-900 text-neutral-200">
//         <h1 className="text-2xl font-bold">Каталог Аниме</h1>
//         <h1 className="text-neutral-500">Самые свежие релизы</h1>
//       </header>
//       <div className="mb-6	">
//         <CatalogInputSearch></CatalogInputSearch>
//       </div>
//       <div className="mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {animeList.map((anime, index) => (
//             <AnimeCard
//               key={index}
//               title={anime.title}
//               imageUrl={anime.imageUrl}
//               description={anime.description}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
