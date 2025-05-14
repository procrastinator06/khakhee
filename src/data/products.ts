import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tactical Assault Jacket',
    slug: 'tactical-assault-jacket',
    description: 'Durable, weather-resistant tactical jacket for all missions.',
    longDescription: 'The Tactical Assault Jacket is engineered for maximum durability and protection in harsh conditions. Made from ripstop nylon with a water-repellent coating, it features multiple utility pockets, reinforced elbows, and adjustable cuffs. Ideal for serious operators.',
    price: 149.99,
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Olive Green', 'Coyote Brown'],
    image: 'https://placehold.co/600x800.png?text=Jacket',
    images: [
        'https://placehold.co/600x800.png?text=Jacket+Front',
        'https://placehold.co/600x800.png?text=Jacket+Back',
        'https://placehold.co/600x800.png?text=Jacket+Detail'
    ],
    rating: 4.5,
    stock: 50,
  },
  {
    id: '2',
    name: 'Stealth Combat Pants',
    slug: 'stealth-combat-pants',
    description: 'Lightweight and flexible pants with ample storage.',
    longDescription: 'Designed for agility and comfort, the Stealth Combat Pants offer a modern fit with articulated knees for enhanced mobility. Constructed from a stretch-poly-cotton blend, these pants feature 10 strategically placed pockets for all your essential gear. Teflon finish for stain and soil resistance.',
    price: 89.99,
    category: 'Pants',
    sizes: ['28W/30L', '30W/30L', '32W/32L', '34W/32L', '36W/34L'],
    colors: ['Dark Grey', 'Ranger Green', 'Khaki'],
    image: 'https://placehold.co/600x800.png?text=Pants',
    rating: 4.8,
    stock: 75,
  },
  {
    id: '3',
    name: 'Urban Operator Boots',
    slug: 'urban-operator-boots',
    description: 'High-performance boots for urban environments.',
    longDescription: 'The Urban Operator Boots provide exceptional support and traction on various surfaces. Featuring a breathable membrane, cushioned insole, and a rugged outsole, these boots are built for long-lasting comfort and performance during demanding urban operations.',
    price: 129.99,
    category: 'Boots',
    sizes: ['8', '9', '10', '11', '12', '13'],
    colors: ['Black', 'Tan'],
    image: 'https://placehold.co/600x800.png?text=Boots',
    rating: 4.2,
    stock: 30,
  },
  {
    id: '4',
    name: 'Recon MOLLE Vest',
    slug: 'recon-molle-vest',
    description: 'Modular tactical vest with MOLLE webbing.',
    longDescription: 'The Recon MOLLE Vest offers a customizable platform for your tactical loadout. Constructed from heavy-duty Cordura nylon, it features extensive MOLLE webbing for attaching pouches and accessories, adjustable shoulder and waist straps, and an emergency drag handle.',
    price: 99.50,
    category: 'Vests',
    sizes: ['One Size Fits Most'],
    colors: ['Black', 'Olive Drab'],
    image: 'https://placehold.co/600x800.png?text=Vest',
    rating: 4.6,
    stock: 40,
  },
  {
    id: '5',
    name: 'Tactical Utility Gloves',
    slug: 'tactical-utility-gloves',
    description: 'Protect your hands with these versatile tactical gloves.',
    longDescription: 'These Tactical Utility Gloves offer excellent dexterity and protection. Made with synthetic leather palms and breathable stretch fabric on the back, they feature reinforced knuckles and touchscreen compatibility on thumb and index finger.',
    price: 34.99,
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Coyote'],
    image: 'https://placehold.co/600x800.png?text=Gloves',
    rating: 4.3,
    stock: 100,
  },
  {
    id: '6',
    name: 'All-Weather Poncho',
    slug: 'all-weather-poncho',
    description: 'Lightweight, waterproof poncho for unpredictable conditions.',
    longDescription: 'Stay dry and concealed with our All-Weather Poncho. Made from durable, waterproof ripstop polyester, it features grommeted corners for use as a shelter, and snap closures along the sides. Packs down small for easy carry.',
    price: 45.00,
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Woodland Camo', 'Olive Green'],
    image: 'https://placehold.co/600x800.png?text=Poncho',
    rating: 4.0,
    stock: 60,
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
}

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
}
