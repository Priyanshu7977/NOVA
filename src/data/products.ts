export type SportCategory =
  | 'ALL'
  | 'RUNNING'
  | 'BASKETBALL'
  | 'FOOTBALL'
  | 'BADMINTON'
  | 'TRAINING'
  | 'LIFESTYLE'
  | 'TENNIS'
  | 'MENS'
  | 'WOMENS'
  | 'KIDS';

export interface ProductColorway {
  id: string;
  name: string;
  hex: string;
  upperColor: string;
  soleColor: string;
  accentColor: string;
  tagline: string;
}

export interface Product {
  id: string;
  number: string;
  name: string;
  brand: 'Nova';
  tagline: string;
  price: number; // in INR
  category: 'RUNNING' | 'BASKETBALL' | 'FOOTBALL' | 'TRAINING' | 'LIFESTYLE' | 'TENNIS';
  sport: 'Running' | 'Basketball' | 'Football' | 'Badminton & Court' | 'Training' | 'Lifestyle' | 'Tennis';
  gender: "Men's" | "Women's" | 'Unisex';
  sizes: string[];
  image: string;
  productUrl: string; // official Nova India link
  badge?: string;
  reviewsCount: number;
  rating: number;
  featuredInScene?: 1 | 2 | 3; // Scene 1: Football, Scene 2: Badminton, Scene 3: Running
  description: string;
  specs: {
    weight: string;
    drop: string;
    energyReturn: string;
    cushioning: string;
    surface: string;
    keyTech: string;
  };
  colorways: ProductColorway[];
  defaultColorway: ProductColorway;
}

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. SCENE 3 FEATURED: NOVA ALPHAFLY 3
  // ==========================================
  {
    id: 'nike-alphafly-3',
    number: '01',
    name: 'Nova Alphafly 3',
    brand: 'Nova',
    tagline: 'Marathon Velocity System',
    price: 22795,
    category: 'RUNNING',
    sport: 'Running',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11', 'UK 12'],
    image: '/models/nike-alphafly-3.png',
    productUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
    badge: 'SCENE 03 HERO',
    reviewsCount: 428,
    rating: 5.0,
    featuredInScene: 3,
    description:
      'Fine-tuned for marathon speed. Dual forefoot Air Zoom units, full-length carbon-fiber Flyplate, and heel-to-toe ZoomX foam provide unmatched energy return.',
    specs: {
      weight: '218g (UK 9)',
      drop: '8mm',
      energyReturn: '89.4%',
      cushioning: 'Maximal ZoomX',
      surface: 'Road & Track',
      keyTech: 'Dual Air Zoom Pods + Full Carbon Flyplate',
    },
    colorways: [
      {
        id: 'volt',
        name: 'Electric Volt / Black',
        hex: '#16a34a',
        upperColor: '#16a34a',
        soleColor: '#ffffff',
        accentColor: '#22c55e',
        tagline: 'High-Visibility Velocity',
      },
      {
        id: 'proto',
        name: 'Proto White / Clear Jade',
        hex: '#f8fafc',
        upperColor: '#f8fafc',
        soleColor: '#ffffff',
        accentColor: '#06b6d4',
        tagline: 'Prototype Lab Edition',
      },
      {
        id: 'crimson',
        name: 'Total Orange / Crimson',
        hex: '#ea580c',
        upperColor: '#ea580c',
        soleColor: '#ffffff',
        accentColor: '#ef4444',
        tagline: 'Thermal Energy Series',
      },
    ],
    defaultColorway: {
      id: 'volt',
      name: 'Electric Volt / Black',
      hex: '#16a34a',
      upperColor: '#16a34a',
      soleColor: '#ffffff',
      accentColor: '#22c55e',
      tagline: 'High-Visibility Velocity',
    },
  },

  // ==========================================
  // 2. SCENE 1 FEATURED: NOVA MERCURIAL SUPERFLY 10 ELITE
  // ==========================================
  {
    id: 'nike-mercurial-superfly-10',
    number: '02',
    name: 'Nova Mercurial Superfly 10 Elite',
    brand: 'Nova',
    tagline: 'Explosive Football Speed & Touch',
    price: 24995,
    category: 'FOOTBALL',
    sport: 'Football',
    gender: "Men's",
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 10.5', 'UK 11'],
    image: '/models/nike-mercurial.png',
    productUrl: 'https://nova-x.com/w/football-shoes-1gdj0zy7ok',
    badge: 'SCENE 01 HERO',
    reviewsCount: 312,
    rating: 5.0,
    featuredInScene: 1,
    description:
      'Engineered with a 3/4-length Air Zoom unit in the plate for explosive acceleration on firm ground. Gripknit upper provides exceptional touch at top speed.',
    specs: {
      weight: '194g (UK 9)',
      drop: '4mm',
      energyReturn: '92.1%',
      cushioning: '3/4 Air Zoom Plate',
      surface: 'Firm Ground (FG)',
      keyTech: 'Nova Gripknit + Tri-Star Stud Trajectory',
    },
    colorways: [
      {
        id: 'mercurial-volt',
        name: 'Glacier Blue / Volt',
        hex: '#0ea5e9',
        upperColor: '#0ea5e9',
        soleColor: '#16a34a',
        accentColor: '#22c55e',
        tagline: 'Tournament Launch Edition',
      },
      {
        id: 'mercurial-black',
        name: 'Blackout / Deep Chrome',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#09090b',
        accentColor: '#38bdf8',
        tagline: 'Stealth Aerodynamic Edition',
      },
    ],
    defaultColorway: {
      id: 'mercurial-volt',
      name: 'Glacier Blue / Volt',
      hex: '#0ea5e9',
      upperColor: '#0ea5e9',
      soleColor: '#16a34a',
      accentColor: '#22c55e',
      tagline: 'Tournament Launch Edition',
    },
  },

  // ==========================================
  // 3. SCENE 2 FEATURED: NOVA COURT AIR ZOOM VAPOR PRO 2
  // ==========================================
  {
    id: 'nike-vapor-pro-2',
    number: '03',
    name: 'Nova Court Air Zoom Vapor Pro 2',
    brand: 'Nova',
    tagline: 'Agile Badminton & Hard Court Friction Control',
    price: 10795,
    category: 'TENNIS',
    sport: 'Badminton & Court',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    image: '/models/nike-vapor-pro.png',
    productUrl: 'https://nova-x.com/w/tennis-shoes-5e1x6zy7ok',
    badge: 'SCENE 02 HERO',
    reviewsCount: 264,
    rating: 4.9,
    featuredInScene: 2,
    description:
      'Low-profile court design engineered for rapid directional cuts, quick lunges, and powerful jump smashes. Forefoot Zoom Air unit provides explosive spring.',
    specs: {
      weight: '345g (UK 9)',
      drop: '6mm',
      energyReturn: '85.2%',
      cushioning: 'Forefoot Air Zoom',
      surface: 'Indoor Court & Hard Court',
      keyTech: 'Lateral Full-Length Foot Frame + Herringbone Traction',
    },
    colorways: [
      {
        id: 'court-white',
        name: 'White / Game Royal',
        hex: '#ffffff',
        upperColor: '#ffffff',
        soleColor: '#1e3a8a',
        accentColor: '#2563eb',
        tagline: 'Pro Tour Court Edition',
      },
      {
        id: 'court-volt',
        name: 'Volt Surge / Obsidian',
        hex: '#16a34a',
        upperColor: '#16a34a',
        soleColor: '#111827',
        accentColor: '#22c55e',
        tagline: 'High-Impact Court Dynamics',
      },
    ],
    defaultColorway: {
      id: 'court-white',
      name: 'White / Game Royal',
      hex: '#ffffff',
      upperColor: '#ffffff',
      soleColor: '#1e3a8a',
      accentColor: '#2563eb',
      tagline: 'Pro Tour Court Edition',
    },
  },

  // ==========================================
  // 4. NOVA VAPORFLY 3
  // ==========================================
  {
    id: 'nike-vaporfly-3',
    number: '04',
    name: 'Nova Vaporfly 3',
    brand: 'Nova',
    tagline: 'Leader of the Marathon Pack',
    price: 20695,
    category: 'RUNNING',
    sport: 'Running',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 8.5', 'UK 9', 'UK 9.5', 'UK 10', 'UK 11'],
    image: '/models/nike-vaporfly-3.png',
    productUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
    badge: 'POPULAR',
    reviewsCount: 388,
    rating: 5.0,
    description:
      'Catch-me-if-you-can speed for road racers. Built with resilient ZoomX foam and a full-length carbon-fiber Flyplate for seamless transition and propulsion.',
    specs: {
      weight: '198g (UK 9)',
      drop: '8mm',
      energyReturn: '88.9%',
      cushioning: 'Maximal ZoomX',
      surface: 'Road Racing',
      keyTech: 'Flyknit Upper + Spoon Carbon Plate',
    },
    colorways: [
      {
        id: 'vapor-pink',
        name: 'Hyper Pink / Laser Orange',
        hex: '#ec4899',
        upperColor: '#ec4899',
        soleColor: '#ffffff',
        accentColor: '#ea580c',
        tagline: 'Championship Racer',
      },
      {
        id: 'vapor-white',
        name: 'Sail / Deep Royal',
        hex: '#f8fafc',
        upperColor: '#f8fafc',
        soleColor: '#ffffff',
        accentColor: '#1e40af',
        tagline: 'Heritage Blueprint',
      },
    ],
    defaultColorway: {
      id: 'vapor-pink',
      name: 'Hyper Pink / Laser Orange',
      hex: '#ec4899',
      upperColor: '#ec4899',
      soleColor: '#ffffff',
      accentColor: '#ea580c',
      tagline: 'Championship Racer',
    },
  },

  // ==========================================
  // 5. NOVA G.T. CUT 3
  // ==========================================
  {
    id: 'nike-gt-cut-3',
    number: '05',
    name: 'Nova G.T. Cut 3',
    brand: 'Nova',
    tagline: 'High-Traction Multi-Directional Separation',
    price: 17495,
    category: 'BASKETBALL',
    sport: 'Basketball',
    gender: "Men's",
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    image: '/models/nike-gt-cut-3.png',
    productUrl: 'https://nova-x.com/w/basketball-shoes-3glsmzy7ok',
    badge: 'NEW DROP',
    reviewsCount: 194,
    rating: 4.9,
    description:
      'First basketball shoe equipped with full-length ZoomX foam for lightning-quick step-back separation and zero drag on indoor hardwood.',
    specs: {
      weight: '368g (UK 9)',
      drop: '6mm',
      energyReturn: '88.5%',
      cushioning: 'Full-Length ZoomX',
      surface: 'Indoor Hardwood',
      keyTech: 'Flywire Lockdown Cables + Modified Herringbone',
    },
    colorways: [
      {
        id: 'gt-summit',
        name: 'Summit White / Picante Red',
        hex: '#ffffff',
        upperColor: '#ffffff',
        soleColor: '#ef4444',
        accentColor: '#dc2626',
        tagline: 'Fast Break Specialist',
      },
      {
        id: 'gt-black',
        name: 'Black / Metallic Silver',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#ffffff',
        accentColor: '#94a3b8',
        tagline: 'Midnight Hardwood',
      },
    ],
    defaultColorway: {
      id: 'gt-summit',
      name: 'Summit White / Picante Red',
      hex: '#ffffff',
      upperColor: '#ffffff',
      soleColor: '#ef4444',
      accentColor: '#dc2626',
      tagline: 'Fast Break Specialist',
    },
  },

  // ==========================================
  // 6. NOVA PEGASUS 41
  // ==========================================
  {
    id: 'nike-pegasus-41',
    number: '06',
    name: 'Nova Pegasus 41',
    brand: 'Nova',
    tagline: 'The Reliable Workhorse With Wings',
    price: 11895,
    category: 'RUNNING',
    sport: 'Running',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 6.5', 'UK 7', 'UK 7.5', 'UK 8', 'UK 8.5', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    image: '/models/nike-pegasus-41.png',
    productUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
    badge: 'DAILY RUNNER',
    reviewsCount: 540,
    rating: 4.9,
    description:
      'Upgraded with brand-new ReactX foam for 13% more energy return. Dual Air Zoom units in the forefoot and heel deliver a plush, springy daily ride.',
    specs: {
      weight: '281g (UK 9)',
      drop: '10mm',
      energyReturn: '84.0%',
      cushioning: 'ReactX + Dual Air Zoom',
      surface: 'Road & Pavement',
      keyTech: 'Engineered Mesh + Waffle Outsole',
    },
    colorways: [
      {
        id: 'peg-white',
        name: 'White / Pure Platinum / Volt',
        hex: '#f8fafc',
        upperColor: '#f8fafc',
        soleColor: '#ffffff',
        accentColor: '#16a34a',
        tagline: 'Everyday Sprint',
      },
      {
        id: 'peg-blue',
        name: 'Racer Blue / Total Orange',
        hex: '#1e40af',
        upperColor: '#1e40af',
        soleColor: '#ffffff',
        accentColor: '#ea580c',
        tagline: 'Morning Miles Edition',
      },
    ],
    defaultColorway: {
      id: 'peg-white',
      name: 'White / Pure Platinum / Volt',
      hex: '#f8fafc',
      upperColor: '#f8fafc',
      soleColor: '#ffffff',
      accentColor: '#16a34a',
      tagline: 'Everyday Sprint',
    },
  },

  // ==========================================
  // 7. NOVA METCON 9
  // ==========================================
  {
    id: 'nike-metcon-9',
    number: '07',
    name: 'Nova Metcon 9',
    brand: 'Nova',
    tagline: 'The Gold Standard of Strength Training',
    price: 12795,
    category: 'TRAINING',
    sport: 'Training',
    gender: "Men's",
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    image: '/models/nike-metcon-9.png',
    productUrl: 'https://nova-x.com/w/training-gym-shoes-58jtozy7ok',
    badge: 'GYM & LIFTING',
    reviewsCount: 220,
    rating: 4.8,
    description:
      'Larger Hyperlift plate in the heel and extended rubber rope wrap. Delivers uncompromising stability for heavy squats, deadlifts, and high-intensity interval training.',
    specs: {
      weight: '378g (UK 9)',
      drop: '4mm',
      energyReturn: '80.5%',
      cushioning: 'Dual-Density Foam',
      surface: 'Gym, Turf & Rubber Mats',
      keyTech: 'Hyperlift Stability Plate + Extended Rope Wrap',
    },
    colorways: [
      {
        id: 'metcon-grey',
        name: 'Smoke Grey / Flat Pewter',
        hex: '#64748b',
        upperColor: '#64748b',
        soleColor: '#18181b',
        accentColor: '#e2e8f0',
        tagline: 'Heavy Load Foundation',
      },
      {
        id: 'metcon-black',
        name: 'Black / Anthracite / White',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#ffffff',
        accentColor: '#f8fafc',
        tagline: 'Stealth Iron',
      },
    ],
    defaultColorway: {
      id: 'metcon-grey',
      name: 'Smoke Grey / Flat Pewter',
      hex: '#64748b',
      upperColor: '#64748b',
      soleColor: '#18181b',
      accentColor: '#e2e8f0',
      tagline: 'Heavy Load Foundation',
    },
  },

  // ==========================================
  // 8. NOVA DUNK LOW RETRO
  // ==========================================
  {
    id: 'nike-dunk-low',
    number: '08',
    name: 'Nova Dunk Low Retro',
    brand: 'Nova',
    tagline: 'Classic 80s Hardwood Icon',
    price: 8295,
    category: 'LIFESTYLE',
    sport: 'Lifestyle',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    image: '/models/nike-dunk-low.png',
    productUrl: 'https://nova-x.com/w/lifestyle-shoes-13jrmzy7ok',
    badge: 'ICONIC',
    reviewsCount: 680,
    rating: 4.9,
    description:
      'Created for the court and adopted by the streets. Premium leather upper with clean 2-tone panel overlays, padded collar, and classic pivot circle rubber cupsole.',
    specs: {
      weight: '390g (UK 9)',
      drop: '0mm (Flat Cupsole)',
      energyReturn: '78.0%',
      cushioning: 'Soft Foam Midsole',
      surface: 'Street & Lifestyle',
      keyTech: 'Perforated Toe Vamp + Rubber Cupsole',
    },
    colorways: [
      {
        id: 'dunk-green',
        name: 'Pine Green / White',
        hex: '#16a34a',
        upperColor: '#16a34a',
        soleColor: '#ffffff',
        accentColor: '#22c55e',
        tagline: 'Classic Varsity Green',
      },
      {
        id: 'dunk-panda',
        name: 'White / Black (Panda)',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#ffffff',
        accentColor: '#ffffff',
        tagline: 'Everyday Monochrome',
      },
    ],
    defaultColorway: {
      id: 'dunk-green',
      name: 'Pine Green / White',
      hex: '#16a34a',
      upperColor: '#16a34a',
      soleColor: '#ffffff',
      accentColor: '#22c55e',
      tagline: 'Classic Varsity Green',
    },
  },

  // ==========================================
  // 9. NOVA AIR FORCE 1 '07
  // ==========================================
  {
    id: 'nike-air-force-1',
    number: '09',
    name: "Nova Air Force 1 '07",
    brand: 'Nova',
    tagline: 'The Legend of Clean Triple White',
    price: 7495,
    category: 'LIFESTYLE',
    sport: 'Lifestyle',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    image: '/models/nike-air-force-1.png',
    productUrl: 'https://nova-x.com/w/lifestyle-shoes-13jrmzy7ok',
    badge: 'TIMELESS',
    reviewsCount: 840,
    rating: 5.0,
    description:
      'Crisp leather edges, clean stitching, and encapsulated Nova Air cushioning that revolutionized basketball and streetwear culture worldwide.',
    specs: {
      weight: '420g (UK 9)',
      drop: '0mm (Air Cupsole)',
      energyReturn: '80.0%',
      cushioning: 'Encapsulated Nova Air',
      surface: 'Street & Lifestyle',
      keyTech: 'Encapsulated Air-Sole Unit + Solid Rubber Outsole',
    },
    colorways: [
      {
        id: 'af1-white',
        name: 'Triple White',
        hex: '#ffffff',
        upperColor: '#ffffff',
        soleColor: '#ffffff',
        accentColor: '#e2e8f0',
        tagline: 'Pristine Monolithic White',
      },
      {
        id: 'af1-black',
        name: 'Triple Black',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#18181b',
        accentColor: '#09090b',
        tagline: 'Midnight Stealth',
      },
    ],
    defaultColorway: {
      id: 'af1-white',
      name: 'Triple White',
      hex: '#ffffff',
      upperColor: '#ffffff',
      soleColor: '#ffffff',
      accentColor: '#e2e8f0',
      tagline: 'Pristine Monolithic White',
    },
  },

  // ==========================================
  // 10. NOVA INVINCIBLE 3
  // ==========================================
  {
    id: 'nike-invincible-3',
    number: '10',
    name: 'Nova Invincible 3',
    brand: 'Nova',
    tagline: 'Max-Cushion Long Distance Recovery',
    price: 16995,
    category: 'RUNNING',
    sport: 'Running',
    gender: 'Unisex',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    image: '/models/nike-invincible-3.png',
    productUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
    badge: 'MAX CUSHION',
    reviewsCount: 310,
    rating: 4.9,
    description:
      'Highest level of comfort to keep you on your feet. Massive rocker-shaped ZoomX foam cushioning absorbs impact shock and propels your next recovery run.',
    specs: {
      weight: '310g (UK 9)',
      drop: '9mm',
      energyReturn: '87.2%',
      cushioning: 'Maximal Ultra-Plush ZoomX',
      surface: 'Road & Long Distance',
      keyTech: 'Wider Midsole Base + Engineered Flyknit',
    },
    colorways: [
      {
        id: 'invincible-white',
        name: 'White / Baltic Blue',
        hex: '#f8fafc',
        upperColor: '#f8fafc',
        soleColor: '#ffffff',
        accentColor: '#0284c7',
        tagline: 'Cloud Cushioning Series',
      },
    ],
    defaultColorway: {
      id: 'invincible-white',
      name: 'White / Baltic Blue',
      hex: '#f8fafc',
      upperColor: '#f8fafc',
      soleColor: '#ffffff',
      accentColor: '#0284c7',
      tagline: 'Cloud Cushioning Series',
    },
  },
];

export const LIMITED_EDITION_PRODUCT = PRODUCTS[0];
