export interface NikeProductColorway {
  id: string;
  name: string;
  hex: string;
  upperColor: string;
  soleColor: string;
  accentColor: string;
  tagline: string;
}

export interface NikeUniverseData {
  id: string;
  index: number;
  anchor: string;
  sceneRoom: string;
  title: string;
  category: string;
  subtitle: string;
  introText: string;
  highlightTitle: string;
  highlightDescription: string;
  knowHowTitle: string;
  knowHowDescription: string;
  knowHowDescription2?: string;
  interactionType: 'pump' | 'rotate' | 'explode' | 'draw' | 'hold' | 'timeline';
  interactionLabel: string;
  interactionInstruction: string;
  productName: string;
  realImageUrl: string;
  priceINR: number;
  priceUSD: number;
  productUrl: string;
  collectionUrl: string;
  specs: {
    weight: string;
    cushioning: string;
    energyReturn: string;
    keyTech: string;
    stackHeight?: string;
    drop?: string;
    surface?: string;
    athleteTestimonial?: string;
  };
  explodedLayers: {
    name: string;
    description: string;
    material: string;
  }[];
  colorways: NikeProductColorway[];
  accentColor: string;
  fogColor: string;
  pastelBg: string;
  bgContrastColor: string; // High-contrast atmosphere color
  themeColor: string;
}

export const NIKE_UNIVERSES: NikeUniverseData[] = [
  // ==========================================
  // UNIVERSE 01: AIR MAX DN (DYNAMIC AIR)
  // High-Contrast Sky Twilight & Deep Royal
  // ==========================================
  {
    id: 'air-max-dn',
    index: 1,
    anchor: 'air-max-dn',
    sceneRoom: 'CTRL_ROOM_01_Tunnel',
    title: 'AIR MAX DN',
    category: 'DYNAMIC AIR REVOLUTION',
    subtitle: 'Air Max Dn : The Next Era of Responsive Air',
    introText:
      "The art of metamorphosis is at the core of Nike's design DNA. With the Air Max Dn, air ceases to be static—transforming into a dynamic fluid system that shifts in real time with every human stride.",
    highlightTitle: 'DYNAMIC AIR DUAL-PRESSURE UNIT',
    highlightDescription:
      'Engineered with two distinct pressurized air chambers comprising four cylindrical tubes. The rear chambers are pressurized to 15 PSI, while the front chambers sit at 5 PSI, creating seamless kinetic energy transfer from heel strike to toe-off.',
    knowHowTitle: 'BIOMECHANICAL FLUIDIC ENGINEERING',
    knowHowDescription:
      'Born from thousands of hours at the Nike Sports Research Lab (NSRL), the Air Max Dn introduces haptic secondary compression. As you step, air actively flows between tubes, delivering a sensation of infinite rebound and floating transition.',
    knowHowDescription2:
      'The multi-layered tactile mesh upper features siliconized aerodynamic print contours, fusing futuristic sculptural aesthetics with high-durability breathability.',
    interactionType: 'pump',
    interactionLabel: 'Press & Pump Air',
    interactionInstruction: 'Click or hold to trigger a sonic shockwave, pump the Dynamic Air pods and launch a 3D gravity kick!',
    productName: 'Nike Air Max Dn',
    realImageUrl: '/images/shoes/air-max-dn.png',
    priceINR: 14995,
    priceUSD: 160,
    productUrl: 'https://www.nike.in/w?q=air%20max%20dn',
    collectionUrl: 'https://www.nike.in/w/air-max-shoes-a6d8hzy7ok',
    specs: {
      weight: '345g (UK 8.5)',
      cushioning: 'Dynamic Air 4-Tube System (15 PSI / 5 PSI)',
      energyReturn: '86.5%',
      keyTech: 'Dynamic Air Dual-Chamber Unit + Multi-Layer Haptic Mesh',
      drop: '10mm',
      athleteTestimonial: '"It feels like the air is alive underneath your feet, pushing you forward with zero lag." — Nike Lab Tester',
    },
    explodedLayers: [
      {
        name: 'Haptic 3D Tactile Mesh Upper',
        description: 'Siliconized secondary micro-ribs create adaptive structure without added weight.',
        material: 'Engineered High-Tensile Mesh & TPU Overlays',
      },
      {
        name: 'Phylon Midsole Carrier',
        description: 'Sculpted lightweight foam cradle stabilizing the foot during lateral shifts.',
        material: 'Injected Low-Density Phylon Foam',
      },
      {
        name: 'Dynamic Air 4-Tube Unit',
        description: 'Dual-chamber pressurized tubes with interconnected fluid air channels.',
        material: 'Recycled TPU Membrane with Nitrogen Gas Blend',
      },
      {
        name: 'Waffle-Derived Traction Outsole',
        description: 'Segmented rubber traction pads providing instant grip across urban terrain.',
        material: 'High-Abrasion Carbon Rubber',
      },
    ],
    colorways: [
      {
        id: 'all-night',
        name: 'All Night Black / Deep Royal / Light Crimson',
        hex: '#1e1b4b',
        upperColor: '#0f172a',
        soleColor: '#3b82f6',
        accentColor: '#ef4444',
        tagline: 'Dark Matter Resonance',
      },
      {
        id: 'volt-glow',
        name: 'Volt / Solar Flare / Anthracite',
        hex: '#84cc16',
        upperColor: '#18181b',
        soleColor: '#84cc16',
        accentColor: '#a3e635',
        tagline: 'High-Frequency Luminescence',
      },
      {
        id: 'sail-pure',
        name: 'Sail / Coconut Milk / Metallic Silver',
        hex: '#f5f5f4',
        upperColor: '#fafaf9',
        soleColor: '#e7e5e4',
        accentColor: '#94a3b8',
        tagline: 'Pristine Monolith',
      },
    ],
    accentColor: '#0284c7',
    fogColor: '#bfdbfe',
    pastelBg: '#dbeafe',
    bgContrastColor: '#dbeafe', // Crisp Electric Sky Blue
    themeColor: '#0369a1',
  },

  // ==========================================
  // UNIVERSE 02: PEGASUS 41 (THE WORKHORSE)
  // High-Contrast Electric Volt Sage & Mint
  // ==========================================
  {
    id: 'pegasus-41',
    index: 2,
    anchor: 'pegasus-41',
    sceneRoom: 'CTRL_ROOM_02_Tunnel',
    title: 'PEGASUS 41',
    category: 'THE ICONIC WORKHORSE',
    subtitle: 'Pegasus 41 : The Metamorphosis of Daily Velocity',
    introText:
      'For over four decades, the Pegasus has been the trusted heartbeat of global running. In its 41st evolution, Nike introduces ReactX foam—a revolutionary compound engineered for superior bounce and environmental harmony.',
    highlightTitle: 'REACTX FOAM + DUAL ZOOM AIR',
    highlightDescription:
      'The Pegasus 41 debuts full-length ReactX foam, delivering 13% more energy return than standard React foam while slashing carbon emissions by 43%. Paired with forefoot and heel Zoom Air units for a snappy ride.',
    knowHowTitle: 'CIRCULAR ENGINEERED MESH ARCHITECTURE',
    knowHowDescription:
      'Developed through microscopic thermal scans of marathoners in motion, the circular-knit upper features strategic ventilation zones along the toe box and midfoot, paired with a plush padded collar that locks down the Achilles.',
    knowHowDescription2:
      'The signature waffle-inspired outsole is updated with segmented flex grooves, ensuring butter-smooth transitions on road, track, or trail.',
    interactionType: 'rotate',
    interactionLabel: 'Rotate 360°',
    interactionInstruction: 'Drag horizontally or click to trigger an explosive sonic ripple and 360° orbital flip.',
    productName: 'Nike Pegasus 41',
    realImageUrl: '/images/shoes/pegasus-41.png',
    priceINR: 11895,
    priceUSD: 140,
    productUrl: 'https://www.nike.in/w?q=pegasus%2041',
    collectionUrl: 'https://www.nike.in/w/running-shoes-37v7jzy7ok',
    specs: {
      weight: '281g (UK 8.5)',
      cushioning: 'ReactX Foam + Forefoot & Heel Zoom Air Units',
      energyReturn: '78.2%',
      keyTech: 'ReactX Low-Carbon Foam + Dual Air Zoom Units + Engineered Mesh',
      drop: '10mm',
      athleteTestimonial: '"The Pegasus is my daily sanctuary. It eats miles effortlessly day in and day out." — Global Distance Athlete',
    },
    explodedLayers: [
      {
        name: 'Single-Layer Engineered Mesh Upper',
        description: 'Micro-perforated yarn architecture enhancing breathability across high-heat zones.',
        material: '100% Recycled Polyester Mesh',
      },
      {
        name: 'Forefoot Air Zoom Unit',
        description: 'Tightly stretched tensile fibers inside pressurized air pod providing instantaneous push-off.',
        material: 'High-Tensile Polyurethane Air Pod',
      },
      {
        name: 'ReactX Sustainable Midsole',
        description: 'Next-generation foam providing 13% greater resilience with 43% lower carbon footprint.',
        material: 'Injection-Molded ReactX Polymer Foam',
      },
      {
        name: 'Heel Air Zoom Unit',
        description: 'Low-profile air chamber absorbing impact shock upon heel landing.',
        material: 'Nike Air Pressurized Capsule',
      },
      {
        name: 'Waffle-Grip Rubber Outsole',
        description: 'Pioneered by Bill Bowerman, modernised with longitudinal flex grooves for fluid gait cycle.',
        material: 'Duralon Blown Rubber Compound',
      },
    ],
    colorways: [
      {
        id: 'electric-volt',
        name: 'Electric Volt / White / Black',
        hex: '#84cc16',
        upperColor: '#84cc16',
        soleColor: '#ffffff',
        accentColor: '#18181b',
        tagline: 'Electrified Stride',
      },
      {
        id: 'triple-white',
        name: 'Summit White / Metallic Silver / Pure Platinum',
        hex: '#f8fafc',
        upperColor: '#ffffff',
        soleColor: '#f1f5f9',
        accentColor: '#64748b',
        tagline: 'Clean Flight',
      },
      {
        id: 'cyber-orange',
        name: 'Total Orange / Black / Cyber Yellow',
        hex: '#f97316',
        upperColor: '#ea580c',
        soleColor: '#18181b',
        accentColor: '#facc15',
        tagline: 'Solar Speed',
      },
    ],
    accentColor: '#65a30d',
    fogColor: '#bbf7d0',
    pastelBg: '#dcfce7',
    bgContrastColor: '#dcfce7', // Fresh High-Contrast Volt Sage
    themeColor: '#4d7c0f',
  },

  // ==========================================
  // UNIVERSE 03: ALPHAFLY 3 (MARATHON VELOCITY)
  // High-Contrast Sunset Rose & Laser Crimson
  // ==========================================
  {
    id: 'alphafly-3',
    index: 3,
    anchor: 'alphafly-3',
    sceneRoom: 'CTRL_ROOM_03_Tunnel',
    title: 'ALPHAFLY 3',
    category: 'MARATHON RECORD-BREAKER',
    subtitle: 'Alphafly 3 : The Science of Sub-Two-Hour Marathon Velocity',
    introText:
      'The pinnacle expression of Nike racing alchemy. Engineered to propel world-class marathoners past human boundaries, the Alphafly 3 combines continuous bottom-loaded carbon plates with dual Zoom Air pods and ultra-light ZoomX foam.',
    highlightTitle: 'CONTINUOUS FLYPLATE + DUAL ZOOM AIR PODS',
    highlightDescription:
      'Featuring a single, continuous full-length carbon fiber Flyplate that stabilizes the entire foot from heel to toe. The wider carbon geometry channels explosive propulsion directly through the dual forefoot Air Zoom units.',
    knowHowTitle: 'ATOMIC WEIGHT REDUCTION & ZOOM-X TUNING',
    knowHowDescription:
      '15% lighter than its predecessor. Nike designers carved away non-essential foam beneath the arch, connecting the heel and forefoot with a continuous ZoomX bottom for seamless transition through the 42.195-kilometer distance.',
    knowHowDescription2:
      'The upper is crafted from Atomknit 3.0, an ultralight spun yarn offering directional containment, zero water retention, and featherweight lockdown over marathon distances.',
    interactionType: 'explode',
    interactionLabel: 'Rotate & Explode Sole',
    interactionInstruction: 'Click or hold to disintegrate the carbon Flyplate, Zoom Air pods, and ZoomX chassis with laser telemetry.',
    productName: 'Nike Alphafly 3',
    realImageUrl: '/images/shoes/alphafly-3.png',
    priceINR: 22795,
    priceUSD: 285,
    productUrl: 'https://www.nike.in/w?q=alphafly%203',
    collectionUrl: 'https://www.nike.in/w/running-shoes-37v7jzy7ok',
    specs: {
      weight: '218g (UK 8.5)',
      cushioning: 'Maximal ZoomX Foam + Dual Forefoot Air Zoom Pods',
      energyReturn: '89.4%',
      keyTech: 'Continuous Carbon Flyplate + Dual Air Zoom Units + Atomknit 3.0',
      drop: '8mm',
      athleteTestimonial: '"It is not just a shoe; it is an aerodynamic extension of your muscle and will." — Eliud Kipchoge',
    },
    explodedLayers: [
      {
        name: 'Atomknit 3.0 Ultralight Upper',
        description: 'Vapor-weave hydrophobic yarn offering razor-thin containment without soaking sweat.',
        material: 'Atomknit 3.0 Spun Filament Yarn',
      },
      {
        name: 'Dual Forefoot Air Zoom Pods',
        description: 'High-pressure air capsules loaded with internal tensile fibers returning explosive rebound.',
        material: 'Pressurized Nike Air Gas Chambers',
      },
      {
        name: 'Continuous Carbon Fiber Flyplate',
        description: 'Wider full-length spoon-shaped carbon plate ensuring rigid propulsion and torsional stability.',
        material: 'Aerospace-Grade Multi-Axial Carbon Fiber',
      },
      {
        name: 'ZoomX Pure PEBA Foam Block',
        description: 'Nike’s lightest, highest energy-return foam formulated from aerospace PEBA polymers.',
        material: 'Autoclaved Polyether Block Amide (PEBA)',
      },
      {
        name: 'Minimalist Traction Pod Outsole',
        description: 'Fine-tuned computational waffle pattern mapped to elite marathon footstrike heatmaps.',
        material: 'Laser-Cut Micro-Groove Rubber',
      },
    ],
    colorways: [
      {
        id: 'proto-white',
        name: 'Proto White / Clear Jade / Bright Crimson',
        hex: '#f8fafc',
        upperColor: '#ffffff',
        soleColor: '#f8fafc',
        accentColor: '#f43f5e',
        tagline: 'Laboratory Prototype Velocity',
      },
      {
        id: 'volt-speed',
        name: 'Volt / Black / Electric Lime',
        hex: '#16a34a',
        upperColor: '#16a34a',
        soleColor: '#ffffff',
        accentColor: '#22c55e',
        tagline: 'High-Visibility Record Breaker',
      },
      {
        id: 'safari-olympic',
        name: 'Safari Print / Total Orange / Black',
        hex: '#ea580c',
        upperColor: '#ea580c',
        soleColor: '#ffffff',
        accentColor: '#18181b',
        tagline: 'Olympic Safari Legacy',
      },
    ],
    accentColor: '#e11d48',
    fogColor: '#fecdd3',
    pastelBg: '#ffe4e6',
    bgContrastColor: '#ffe4e6', // High-Contrast Sunset Rose
    themeColor: '#be123c',
  },

  // ==========================================
  // UNIVERSE 04: MERCURIAL SUPERFLY 10 (PITCH SPEED)
  // High-Contrast Ice Cyan Stadium & Blueprint
  // ==========================================
  {
    id: 'mercurial-superfly',
    index: 4,
    anchor: 'mercurial',
    sceneRoom: 'CTRL_ROOM_04_Tunnel',
    title: 'MERCURIAL SUPERFLY 10',
    category: 'EXPLOSIVE FOOTBALL SPEED',
    subtitle: 'Mercurial Superfly 10 : The Art of Football Metamorphosis',
    introText:
      'Speed on the pitch is an alchemy of traction, sensation, and instantaneous acceleration. The Mercurial Superfly 10 integrates a 3/4-length articulated Air Zoom unit with sticky Gripknit for surgical ball control at top speed.',
    highlightTitle: '3/4 ARTICULATED AIR ZOOM + GRIPKNIT',
    highlightDescription:
      'Sitting directly inside the chassis, the football-specific 3/4 Air Zoom unit features flex grooves that bend with every sprint. Gripknit micro-textured yarns coat the striking zone, delivering unmatched feel in wet and dry conditions.',
    knowHowTitle: 'TRI-STAR TRACTION TELEMETRY',
    knowHowDescription:
      'Engineered with computational finite-element analysis, the Tri-Star stud configuration works synergistically with the Zoom plate to dig into firm ground, providing multidirectional braking and instant torque release.',
    knowHowDescription2:
      'The Dynamic Fit collar wraps the ankle in seamless Flyknit yarn, eliminating internal foot slippage while maintaining a weight under 200 grams.',
    interactionType: 'draw',
    interactionLabel: 'Draw Speed Vector',
    interactionInstruction: 'Trace a diagonal cut across the screen to activate hypersonic sprint lines and audio whoosh.',
    productName: 'Nike Mercurial Superfly 10 Elite',
    realImageUrl: '/images/shoes/mercurial-superfly.png',
    priceINR: 24995,
    priceUSD: 295,
    productUrl: 'https://www.nike.in/w?q=mercurial%20superfly',
    collectionUrl: 'https://www.nike.in/w/football-shoes-1gdj0zy7ok',
    specs: {
      weight: '198g (UK 8.5)',
      cushioning: '3/4 Length Football-Specific Air Zoom Cushioning Plate',
      energyReturn: '84.1%',
      keyTech: 'Gripknit Tactile Upper + 3/4 Air Zoom + Tri-Star Stud Matrix',
      surface: 'Firm Ground (FG) Pitch',
      athleteTestimonial: '"When I accelerate, the boot disappears. It is pure instinct and raw explosive speed." — Kylian Mbappé',
    },
    explodedLayers: [
      {
        name: 'Gripknit Molded Tactile Upper',
        description: 'Micro-melted adhesive yarn providing surgical friction against the ball surface.',
        material: 'Gripknit Polymer Coated Filament',
      },
      {
        name: 'Dynamic Fit Seamless Collar',
        description: 'Elasticated ankle wrap providing anatomical lockdown without restricting mobility.',
        material: 'High-Elasticity Circular Flyknit',
      },
      {
        name: '3/4 Articulated Football Air Zoom Plate',
        description: 'Segmented pressure chamber embedded in the nylon chassis for explosive turf push-off.',
        material: 'Pressurized Zoom Air + Pebax Sub-Plate',
      },
      {
        name: 'Tri-Star Speed Stud Matrix',
        description: 'Chevron and tri-star geometric studs engineered for rapid deceleration and lateral cutaways.',
        material: 'Fiberglass Reinforced Polyamide Cleats',
      },
    ],
    colorways: [
      {
        id: 'blueprint-blue',
        name: 'Blueprint Racer Blue / White / Safety Orange',
        hex: '#0284c7',
        upperColor: '#0284c7',
        soleColor: '#f8fafc',
        accentColor: '#ea580c',
        tagline: 'Architectural Blueprint Speed',
      },
      {
        id: 'volt-phantom',
        name: 'Volt / Black / Metallic Gold Coin',
        hex: '#a3e635',
        upperColor: '#a3e635',
        soleColor: '#18181b',
        accentColor: '#eab308',
        tagline: 'Solar Striker Radiance',
      },
      {
        id: 'shadow-black',
        name: 'Black / Dark Smoke Grey / Cyber Crimson',
        hex: '#18181b',
        upperColor: '#18181b',
        soleColor: '#27272a',
        accentColor: '#ef4444',
        tagline: 'Stealth Blackout Dominance',
      },
    ],
    accentColor: '#0284c7',
    fogColor: '#bae6fd',
    pastelBg: '#e0f2fe',
    bgContrastColor: '#e0f2fe', // High-Contrast Electric Cyan
    themeColor: '#0369a1',
  },

  // ==========================================
  // UNIVERSE 05: LEBRON XXI / SABRINA 2 (COURT ALCHEMY)
  // High-Contrast Royal Champagne & Nacre Gold
  // ==========================================
  {
    id: 'court-alchemy',
    index: 5,
    anchor: 'court-alchemy',
    sceneRoom: 'CTRL_ROOM_05_Tunnel',
    title: 'LEBRON XXI & SABRINA 2',
    category: 'COURT ALCHEMY & HIGH-TENSION',
    subtitle: 'Court Alchemy : Sculptural Lockdown and Low-Profile Propulsion',
    introText:
      'Inspired by the natural architecture of an oyster shell protecting a precious pearl, the LeBron XXI and Sabrina 2 bring high-tension 360-degree containment cables together with top-loaded Zoom Turbo cushioning.',
    highlightTitle: '360° ZONAL CABLES + ZOOM TURBO',
    highlightDescription:
      'A dense matrix of high-tensile cables surrounds the foot 360 degrees, anchored to a rigid carbon midfoot shank. When driving toward the basket, the cabling contracts to eliminate rollover while Zoom Turbo delivers instantaneous response.',
    knowHowTitle: 'PEARLESCENT FINISH & SCULPTURAL MOLDING',
    knowHowDescription:
      'Crafted with lustrous dimensional textiles inspired by the nacre of marine pearls. The sculpted foam casing incorporates micro-perforations for heat management and an embroidered swoosh with metallic threading.',
    knowHowDescription2:
      'Paired with low-profile Cushlon 3.0 foam for unmatched court feel and court-mapped herringbone traction for razor-sharp stops.',
    interactionType: 'hold',
    interactionLabel: 'Hold to Activate Tension',
    interactionInstruction: 'Click and hold to tighten the 360° zonal cables with high-voltage glowing arcs and acoustic chime.',
    productName: 'Nike LeBron XXI',
    realImageUrl: '/images/shoes/court-alchemy.png',
    priceINR: 19995,
    priceUSD: 200,
    productUrl: 'https://www.nike.in/w?q=lebron%20xxi',
    collectionUrl: 'https://www.nike.in/w/basketball-shoes-3gl15zy7ok',
    specs: {
      weight: '390g (UK 8.5)',
      cushioning: 'Forefoot Top-Loaded Zoom Turbo + Heel Bottom-Loaded 13mm Zoom Unit',
      energyReturn: '85.7%',
      keyTech: '360° Zonal Flywire Cables + Carbon Midfoot Shank + Cushlon 3.0',
      surface: 'Hardwood & Indoor Court',
      athleteTestimonial: '"It protects my body through 48 minutes of full-contact basketball while keeping me explosive." — LeBron James',
    },
    explodedLayers: [
      {
        name: 'Pearlescent Dimensional Textile Upper',
        description: 'Lustrous multi-layered material inspired by the organic protection of an oyster shell.',
        material: 'Embossed Synthetic Microfiber & Mesh',
      },
      {
        name: '360° Zonal High-Tensile Cabling',
        description: 'Radial Flywire cable grid that cinches under lateral force for absolute containment.',
        material: 'Vectran High-Strength Filament Fibers',
      },
      {
        name: 'Forefoot Zoom Turbo Cushioning',
        description: 'Segmented curved air unit that flexes across multi-directional cutting angles.',
        material: 'Curved High-Pressure Nike Zoom Air',
      },
      {
        name: 'Carbon-Fiber Midfoot Torsional Shank',
        description: 'Rigid composite arch plate preventing twisting and transferring power forward.',
        material: 'Carbon Composite Torsion Plate',
      },
      {
        name: 'Multidirectional Court-Mapped Rubber',
        description: 'Micro-herringbone suction tread engineered for stopping on a dime.',
        material: 'Solid Gum Rubber Compound',
      },
    ],
    colorways: [
      {
        id: 'tahitian-pearl',
        name: 'Tahitian Pearl / Black / Metallic Gold',
        hex: '#3f3f46',
        upperColor: '#27272a',
        soleColor: '#18181b',
        accentColor: '#eab308',
        tagline: 'Lustrous Tahitian Jewel',
      },
      {
        id: 'dragon-pearl',
        name: 'Melon Tint / Light Silver / Total Orange',
        hex: '#fb923c',
        upperColor: '#fb923c',
        soleColor: '#f8fafc',
        accentColor: '#f97316',
        tagline: 'Solar Nacre Iridescence',
      },
      {
        id: 'queen-conch',
        name: 'Washed Coral / Barely Rose / Sea Coral',
        hex: '#f43f5e',
        upperColor: '#fb7185',
        soleColor: '#ffffff',
        accentColor: '#e11d48',
        tagline: 'Organic Marine Mineral',
      },
    ],
    accentColor: '#ca8a04',
    fogColor: '#fde68a',
    pastelBg: '#fef3c7',
    bgContrastColor: '#fef3c7', // High-Contrast Royal Champagne
    themeColor: '#a16207',
  },

  // ==========================================
  // UNIVERSE 06: THE ICONS (HERITAGE EVOLUTION)
  // High-Contrast Warm Terracotta Cream & Amber
  // ==========================================
  {
    id: 'icons-heritage',
    index: 6,
    anchor: 'icons',
    sceneRoom: 'CTRL_ROOM_06_Tunnel',
    title: 'THE ICONS',
    category: 'ARCHITECTURAL PILLARS REBORN',
    subtitle: 'Air Force 1, Dunk Low, Air Max 1 : The Endless Metamorphosis',
    introText:
      'True design icons never stand still. The architectural pillars of Nike—from Bruce Kilgore’s 1982 Air Force 1 to Tinker Hatfield’s 1987 visible Air Max 1 and Peter Moore’s Dunk—continue their modern metamorphosis using sustainable luxury materials.',
    highlightTitle: 'NEXT NATURE & ARCHIVAL CRAFTSMANSHIP',
    highlightDescription:
      'Reconstructed with premium full-grain leathers, recycled Nike Grind accents, and refined stitch-by-stitch tolerances. The timeless proportions remain pure, while interior comfort is upgraded with modern Ortholite and concealed encapsulated Air units.',
    knowHowTitle: 'CULTURAL ANCHOR & ENDLESS INFLUENCE',
    knowHowDescription:
      'Transcendence across sports, hip-hop, skate culture, and high fashion. Each icon has spent decades evolving its material palette without ever compromising the definitive geometry that made it legendary.',
    knowHowDescription2:
      'From court to runway, the clean perforations, cupsole stitching, and iconic pivot circles represent the most recognized footwear silhouettes on Earth.',
    interactionType: 'timeline',
    interactionLabel: 'Hold to Explore Timeline',
    interactionInstruction: 'Click or hold to traverse 40+ years of iconic silhouette transformations with sonic timeline warp.',
    productName: 'Nike Air Force 1 \'07 Next Nature',
    realImageUrl: '/images/shoes/icons-heritage.png',
    priceINR: 9695,
    priceUSD: 115,
    productUrl: 'https://www.nike.in/w?q=air%20force%201',
    collectionUrl: 'https://www.nike.in/w/lifestyle-shoes-13jrmzy7ok',
    specs: {
      weight: '410g (UK 8.5)',
      cushioning: 'Encapsulated Full-Length Nike Air Sole Unit',
      energyReturn: '72.0%',
      keyTech: 'Full-Grain Leather + Stitched Cupsole + Encapsulated Air',
      drop: '10mm',
      surface: 'Streetwear & Hardwood',
      athleteTestimonial: '"The Air Force 1 is an untouchable monument of style and pure street presence." — Nike Archival Curator',
    },
    explodedLayers: [
      {
        name: 'Premium Leather & Perforated Vamp',
        description: 'Supple full-grain leather with precision star perforations for breathability.',
        material: 'Next Nature Sustainable Synthetic & Natural Leather',
      },
      {
        name: 'Encapsulated Full-Length Nike Air Unit',
        description: 'Hidden air chamber within the midsole providing all-day plush cushioning.',
        material: 'Pressurized Polyurethane Gas Capsule',
      },
      {
        name: 'Heavy-Duty Stitched Rubber Cupsole',
        description: 'Classic perimeter sidewall stitching offering permanent bond durability.',
        material: 'Durable Solid Rubber Compound',
      },
      {
        name: 'Original Pivot-Circle Tread Pattern',
        description: 'Pioneered in 1982 for basketball pivot motions on hardwood courts.',
        material: 'Non-Marking Traction Rubber with Nike Grind Flecks',
      },
    ],
    colorways: [
      {
        id: 'triple-white',
        name: 'White / White / Pure Platinum',
        hex: '#f8fafc',
        upperColor: '#ffffff',
        soleColor: '#ffffff',
        accentColor: '#94a3b8',
        tagline: 'The Undisputed Monument',
      },
      {
        id: 'shadow-black',
        name: 'Black / Black / Anthracite',
        hex: '#18181b',
        upperColor: '#09090b',
        soleColor: '#09090b',
        accentColor: '#27272a',
        tagline: 'Triple Black Stealth',
      },
      {
        id: 'vintage-sail',
        name: 'Sail / Gorge Green / Gum Light Brown',
        hex: '#f5f5f4',
        upperColor: '#f5f5f4',
        soleColor: '#15803d',
        accentColor: '#d97706',
        tagline: 'Vintage Varsity Heritage',
      },
    ],
    accentColor: '#d97706',
    fogColor: '#fed7aa',
    pastelBg: '#ffedd5',
    bgContrastColor: '#ffedd5', // High-Contrast Warm Terracotta Cream
    themeColor: '#b45309',
  },
];

// Master Contrast Palette & Typography Color System for all rooms (00 to 07)
export const CONTRAST_ROOM_PALETTES = [
  {
    index: 0,
    bg: '#f4f3ee',
    fog: '#e8e6dc',
    accent: '#0284c7',
    textHeading: '#0f172a',
    textAccent: '#0284c7',
    textMuted: '#475569',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(15, 23, 42, 0.12)',
    buttonBg: '#0f172a',
    buttonText: '#ffffff',
  }, // Room 00: Champagne Alabaster
  {
    index: 1,
    bg: '#dbeafe',
    fog: '#bfdbfe',
    accent: '#0284c7',
    textHeading: '#1e3a8a',
    textAccent: '#0284c7',
    textMuted: '#1e40af',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(30, 58, 138, 0.2)',
    buttonBg: '#1e3a8a',
    buttonText: '#ffffff',
  }, // Room 01: Sky Twilight / Deep Royal
  {
    index: 2,
    bg: '#dcfce7',
    fog: '#bbf7d0',
    accent: '#65a30d',
    textHeading: '#14532d',
    textAccent: '#16a34a',
    textMuted: '#166534',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(20, 83, 45, 0.2)',
    buttonBg: '#14532d',
    buttonText: '#ffffff',
  }, // Room 02: Volt Sage / Forest Pine
  {
    index: 3,
    bg: '#ffe4e6',
    fog: '#fecdd3',
    accent: '#e11d48',
    textHeading: '#881337',
    textAccent: '#e11d48',
    textMuted: '#9f1239',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(136, 19, 55, 0.2)',
    buttonBg: '#881337',
    buttonText: '#ffffff',
  }, // Room 03: Sunset Rose / Deep Crimson
  {
    index: 4,
    bg: '#e0f2fe',
    fog: '#bae6fd',
    accent: '#0284c7',
    textHeading: '#0c4a6e',
    textAccent: '#0284c7',
    textMuted: '#0369a1',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(12, 74, 110, 0.2)',
    buttonBg: '#0c4a6e',
    buttonText: '#ffffff',
  }, // Room 04: Stadium Cyan / Ocean Navy
  {
    index: 5,
    bg: '#fef3c7',
    fog: '#fde68a',
    accent: '#ca8a04',
    textHeading: '#78350f',
    textAccent: '#ca8a04',
    textMuted: '#92400e',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(120, 53, 15, 0.2)',
    buttonBg: '#78350f',
    buttonText: '#ffffff',
  }, // Room 05: Royal Champagne / Deep Amber
  {
    index: 6,
    bg: '#ffedd5',
    fog: '#fed7aa',
    accent: '#d97706',
    textHeading: '#7c2d12',
    textAccent: '#ea580c',
    textMuted: '#9a3412',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(124, 45, 18, 0.2)',
    buttonBg: '#7c2d12',
    buttonText: '#ffffff',
  }, // Room 06: Vintage Terracotta / Russet Umber
  {
    index: 7,
    bg: '#f8fafc',
    fog: '#f1f5f9',
    accent: '#0284c7',
    textHeading: '#0f172a',
    textAccent: '#0284c7',
    textMuted: '#334155',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(15, 23, 42, 0.12)',
    buttonBg: '#0f172a',
    buttonText: '#ffffff',
  }, // Room 07: Pure Porcelain / Jet Slate
];

