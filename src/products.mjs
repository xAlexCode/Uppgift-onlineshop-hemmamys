/**
 * Skapa en lista med 10 produkter (name, price, rating, category, img) och lägg till dem i DOM:en. Alltså section elementet med id "products" kommer att fyllas med tio divs som representerar produkter. 
 */

const products = [ //Array med produkter till sidan
  {
    id: 1,
    name: 'Sura nappar', 
    price: 19, 
    rating: 4, 
    category: 'surt', 
    img: 'img/Napp.jpg',
    alt: 'En hög med sursockrade nappgodisar'
  },
  {
    id: 2,
    name: 'Ferrero Rocher', 
    price: 99, 
    rating: 3, 
    category: 'choklad', 
    img: 'img/Ferrerorocher.jpg',
    alt: 'Flera Ferrero Rocker praliner som är guldigt inslagna'
  }, 
  {
    id: 3,
    name: 'Bubble Fizz', 
    price: 10, 
    rating: 5, 
    category: 'sött', 
    img: 'img/Bubblefizz.jpg',
    alt: 'Röda och blå Bubble fizz godisar med socker på'
   
  },
  {
    id: 4,
    name: 'Sura persikor', 
    price: 25, 
    rating: 4, 
    category: 'surt', 
    img: 'img/Surapersikor.jpg',
    alt: 'En hög med sursockrade persikogodisar'
  },
  {
    id: 5,
    name: 'Chokladkaka', 
    price: 30, 
    rating: 3, 
    category: 'choklad', 
    img: 'img/Chokladkaka.jpg',
    alt: 'En brun chokladkaka som är bruten i bitar'
  },
  {
    id: 6,
    name: 'Gummibjörnar', 
    price: 14, 
    rating: 1, 
    category: 'sött', 
    img: 'img/Gummibjornar.jpg',
    alt: 'Färglada gummibjörnar i olika smaker'
  },
  {
    id: 7,
    name: 'Kit kat', 
    price: 39, 
    rating: 4, 
    category: 'choklad', 
    img: 'img/Kitkat.jpg',
    alt: 'Uppradade kit kat chokladkakor i röd förpackning'
  },
  {
    id: 8,
    name: 'Klubba', 
    price: 15, 
    rating: 2, 
    category: 'sött', 
    img: 'img/Klubba.jpg',
    alt: 'En hög med färglada klubbor med plast runt'
  },
  {
    id: 9,
    name: 'Sura ormar', 
    price: 18, 
    rating: 4, 
    category: 'surt', 
    img: 'img/Ormar.jpg',
    alt: 'En hög med sursockrade ormar i olika färger'
  },
  { 
    id: 10,
    name: 'M&Ms', 
    price: 23, 
    rating: 5, 
    category: 'choklad', 
    img: 'img/Mms.jpg',
    alt: 'En hög med färgglada M&M chokladlinser'
  },
  {
    id: 11,
    name: 'Sura vingummin', 
    price: 37, 
    rating: 3, 
    category: 'surt', 
    img: 'img/Suravingum.jpg',
    alt: 'En hög med sursockrade vingummin i olika smaker'
  },
  { 
    id: 12,
    name: 'Fruktkaramell', 
    price: 63, 
    rating: 1, 
    category: 'sött', 
    img: 'img/Karameller.jpg',
    alt: 'Färgglada fruktkarameller i mixade smaker'
  },
];

export default products;