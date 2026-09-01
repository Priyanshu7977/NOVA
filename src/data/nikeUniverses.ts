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
  // ==========================================
  {
    id: 'air-max-dn',
    index: 1,
    anchor: 'air-max-dn',
    sceneRoom: 'CTRL_ROOM_01_Tunnel',
    title: 'AIR MAX DN',
    category: 'DYNAMIC AIR REVOLUTION',
    subtitle: 'Dynamic Dual-Pressure Air System',
    introText: 'Next-gen 4-tube fluidic Air pods shifting pressure in real-time with every human stride.',
    highlightTitle: 'DYNAMIC 4-TUBE AIR PODS',
    highlightDescription: 'Dual-chamber unit pressurized at 15 PSI (rear) & 5 PSI (front) for effortless heel-to-toe kinetic flow.',
    knowHowTitle: 'FLUIDIC DYNAMICS',
    knowHowDescription: 'Active nitrogen air channels compress dynamically to provide infinite rebound and zero-lag transition.',
    interactionType: 'pump',
    interactionLabel: 'Press & Pump Air',
    interactionInstruction: 'Click or hold to pump the Air pods and unleash a 3D gravity kick.',
    productName: 'Nova Air Max Dn',
    realImageUrl: '/images/shoes/air-max-dn.png',
    priceINR: 14995,
    priceUSD: 160,
    productUrl: 'https://nova-x.com/w?q=air%20max%20dn',
    collectionUrl: 'https://nova-x.com/w/air-max-shoes-a6d8hzy7ok',
    specs: {
      weight: '345g (UK 8.5)',
      cushioning: 'Dynamic Air 4-Tube System (15 PSI / 5 PSI)',
      energyReturn: '86.5%',
      keyTech: 'Dynamic Air Dual-Chamber Unit + Multi-Layer Haptic Mesh',
      drop: '10mm',
      athleteTestimonial: '"It feels like the air is alive underneath your feet, pushing you forward with zero lag." — Nova Lab Tester',
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
    bgContrastColor: '#dbeafe',
    themeColor: '#0369a1',
  },

  // ==========================================
  // UNIVERSE 02: PEGASUS 41 (THE WORKHORSE)
  // ==========================================
  {
    id: 'pegasus-41',
    index: 2,
    anchor: 'pegasus-41',
    sceneRoom: 'CTRL_ROOM_02_Tunnel',
    title: 'PEGASUS 41',
    category: 'THE ICONIC WORKHORSE',
    subtitle: 'Daily Velocity & Responsive Energy',
    introText: 'Full-length ReactX foam delivers 13% greater energy return with a snappy, resilient ride.',
    highlightTitle: 'REACTX FOAM + DUAL ZOOM AIR',
    highlightDescription: 'Low-carbon ReactX foam paired with forefoot and heel Air Zoom pods for cushioned propulsion.',
    knowHowTitle: 'CIRCULAR-KNIT MESH',
    knowHowDescription: 'Engineered zonal ventilation for featherweight breathability and locked-in heel stability.',
    interactionType: 'rotate',
    interactionLabel: 'Rotate 360°',
    interactionInstruction: 'Drag or click to trigger an orbital 360° flip.',
    productName: 'Nova Pegasus 41',
    realImageUrl: '/images/shoes/pegasus-41.png',
    priceINR: 11895,
    priceUSD: 140,
    productUrl: 'https://nova-x.com/w?q=pegasus%2041',
    collectionUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
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
        material: 'Nova Air Pressurized Capsule',
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
    bgContrastColor: '#dcfce7',
    themeColor: '#4d7c0f',
  },

  // ==========================================
  // UNIVERSE 03: ALPHAFLY 3 (MARATHON VELOCITY)
  // ==========================================
  {
    id: 'alphafly-3',
    index: 3,
    anchor: 'alphafly-3',
    sceneRoom: 'CTRL_ROOM_03_Tunnel',
    title: 'ALPHAFLY 3',
    category: 'MARATHON RECORD-BREAKER',
    subtitle: 'Marathon World-Record Engineering',
    introText: 'Ultra-light marathon racing weapon with dual Air Zoom pods and full-length carbon Flyplate.',
    highlightTitle: 'CONTINUOUS CARBON FLYPLATE',
    highlightDescription: 'Wider spoon-shaped carbon plate channeling maximum energy return through dual forefoot Zoom pods.',
    knowHowTitle: 'ATOMKNIT 3.0 UPPER',
    knowHowDescription: 'Hydrophobic filament yarn offering razor-thin lockdown with zero water absorption over 42.2 km.',
    interactionType: 'explode',
    interactionLabel: 'Rotate & Explode Sole',
    interactionInstruction: 'Click or hold to trigger hypersonic launch velocity.',
    productName: 'Nova Alphafly 3',
    realImageUrl: '/images/shoes/alphafly-3.png',
    priceINR: 22795,
    priceUSD: 285,
    productUrl: 'https://nova-x.com/w?q=alphafly%203',
    collectionUrl: 'https://nova-x.com/w/running-shoes-37v7jzy7ok',
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
        material: 'Pressurized Nova Air Gas Chambers',
      },
      {
        name: 'Continuous Carbon Fiber Flyplate',
        description: 'Wider full-length spoon-shaped carbon plate ensuring rigid propulsion and torsional stability.',
        material: 'Aerospace-Grade Multi-Axial Carbon Fiber',
      },
      {
        name: 'ZoomX Pure PEBA Foam Block',
        description: 'Nova’s lightest, highest energy-return foam formulated from aerospace PEBA polymers.',
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
    bgContrastColor: '#ffe4e6',
    themeColor: '#be123c',
  },

  // ==========================================
  // UNIVERSE 04: MERCURIAL SUPERFLY 10 (PITCH SPEED)
  // ==========================================
  {
    id: 'mercurial-superfly',
    index: 4,
    anchor: 'mercurial',
    sceneRoom: 'CTRL_ROOM_04_Tunnel',
    title: 'MERCURIAL SUPERFLY 10',
    category: 'EXPLOSIVE FOOTBALL SPEED',
    subtitle: 'Explosive On-Pitch Football Speed',
    introText: '3/4-length articulated Air Zoom football unit with sticky Gripknit for surgical ball control.',
    highlightTitle: '3/4 AIR ZOOM + GRIPKNIT',
    highlightDescription: 'Segmented pitch-specific Zoom plate paired with micro-textured Gripknit upper for instant acceleration.',
    knowHowTitle: 'TRI-STAR TRACTION',
    knowHowDescription: 'Chevron stud geometry delivering multidirectional bite and lightning-fast cuts on firm ground.',
    interactionType: 'draw',
    interactionLabel: 'Draw Speed Vector',
    interactionInstruction: 'Trace or click to engage stadium floodlights and pitch mode.',
    productName: 'Nova Mercurial Superfly 10 Elite',
    realImageUrl: '/images/shoes/mercurial-superfly.png',
    priceINR: 24995,
    priceUSD: 295,
    productUrl: 'https://nova-x.com/w?q=mercurial%20superfly',
    collectionUrl: 'https://nova-x.com/w/football-shoes-1gdj0zy7ok',
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
    bgContrastColor: '#e0f2fe',
    themeColor: '#0369a1',
  },

  // ==========================================
  // UNIVERSE 05: LEBRON XXI / SABRINA 2 (COURT ALCHEMY)
  // ==========================================
  {
    id: 'court-alchemy',
    index: 5,
    anchor: 'court-alchemy',
    sceneRoom: 'CTRL_ROOM_05_Tunnel',
    title: 'LEBRON XXI & SABRINA 2',
    category: 'COURT ALCHEMY & HIGH-TENSION',
    subtitle: "King's Court Explosive Power & Air",
    introText: 'Low-profile court powerhouse designed for explosive force, impact defense, and 360° containment.',
    highlightTitle: '360° CABLE LOCKDOWN + ZOOM TURBO',
    highlightDescription: 'High-tensile Flywire cabling anchored to a rigid carbon shank with curved forefoot Zoom Turbo.',
    knowHowTitle: 'PEARLESCENT SHIELD',
    knowHowDescription: 'Layered dimensional shell inspired by marine nacre, providing elite lateral defense and stability.',
    interactionType: 'hold',
    interactionLabel: 'Hold to Activate Tension',
    interactionInstruction: 'Click and hold to tighten the 360° zonal cables.',
    productName: 'Nova LeBron XXI',
    realImageUrl: '/images/shoes/court-alchemy.png',
    priceINR: 19995,
    priceUSD: 200,
    productUrl: 'https://nova-x.com/w?q=lebron%20xxi',
    collectionUrl: 'https://nova-x.com/w/basketball-shoes-3gl15zy7ok',
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
        material: 'Curved High-Pressure Nova Zoom Air',
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
    bgContrastColor: '#fef3c7',
    themeColor: '#a16207',
  },

  // ==========================================
  // UNIVERSE 06: THE ICONS (HERITAGE EVOLUTION)
  // ==========================================
  {
    id: 'icons-heritage',
    index: 6,
    anchor: 'icons',
    sceneRoom: 'CTRL_ROOM_06_Tunnel',
    title: 'THE ICONS',
    category: 'ARCHITECTURAL PILLARS REBORN',
    subtitle: 'Timeless Hardwood & Street Legacy',
    introText: 'The undisputed monument of style crafted with full-grain leather and encapsulated Air cushioning.',
    highlightTitle: 'FULL-GRAIN LEATHER + ENCAPSULATED AIR',
    highlightDescription: 'Stitched perimeter cupsole with hidden full-length Air capsule for durable all-day comfort.',
    knowHowTitle: 'HERITAGE PIVOT TREAD',
    knowHowDescription: 'Authentic 1982 hardwood pivot-circle outsole engineered with sustainable Nova Grind flecks.',
    interactionType: 'timeline',
    interactionLabel: 'Hold to Explore Timeline',
    interactionInstruction: 'Click or hold to explore four decades of archive legacy.',
    productName: 'Nova Air Force 1 \'07 Next Nature',
    realImageUrl: '/images/shoes/icons-heritage.png',
    priceINR: 9695,
    priceUSD: 115,
    productUrl: 'https://nova-x.com/w?q=air%20force%201',
    collectionUrl: 'https://nova-x.com/w/lifestyle-shoes-13jrmzy7ok',
    specs: {
      weight: '410g (UK 8.5)',
      cushioning: 'Encapsulated Full-Length Nova Air Sole Unit',
      energyReturn: '72.0%',
      keyTech: 'Full-Grain Leather + Stitched Cupsole + Encapsulated Air',
      drop: '10mm',
      surface: 'Streetwear & Hardwood',
      athleteTestimonial: '"The Air Force 1 is an untouchable monument of style and pure street presence." — Nova Archival Curator',
    },
    explodedLayers: [
      {
        name: 'Premium Leather & Perforated Vamp',
        description: 'Supple full-grain leather with precision star perforations for breathability.',
        material: 'Next Nature Sustainable Synthetic & Natural Leather',
      },
      {
        name: 'Encapsulated Full-Length Nova Air Unit',
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
        material: 'Non-Marking Traction Rubber with Nova Grind Flecks',
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
    bgContrastColor: '#ffedd5',
    themeColor: '#b45309',
  },
];

// Master Contrast Palette & Typography Color System for all rooms (00 to 07)
export const CONTRAST_ROOM_PALETTES = [
  {
    index: 0,
    name: 'Intro Porcelain Sky',
    bg: '#f4f3ee',
    fog: '#e8e6dc',
    textHeading: '#0f172a',
    textMuted: '#334155',
    textAccent: '#0284c7',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(15, 23, 42, 0.15)',
    buttonBg: '#0f172a',
    buttonText: '#ffffff',
  },
  {
    index: 1,
    name: 'Air Max Dn Electric Sky',
    bg: '#dbeafe',
    fog: '#bfdbfe',
    textHeading: '#1e3a8a',
    textMuted: '#1e40af',
    textAccent: '#1d4ed8',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(30, 58, 138, 0.2)',
    buttonBg: '#1e3a8a',
    buttonText: '#ffffff',
  },
  {
    index: 2,
    name: 'Pegasus 41 Electric Volt Sage',
    bg: '#dcfce7',
    fog: '#bbf7d0',
    textHeading: '#14532d',
    textMuted: '#166534',
    textAccent: '#15803d',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(20, 83, 45, 0.2)',
    buttonBg: '#14532d',
    buttonText: '#ffffff',
  },
  {
    index: 3,
    name: 'Alphafly 3 Sunset Crimson Rose',
    bg: '#ffe4e6',
    fog: '#fecdd3',
    textHeading: '#881337',
    textMuted: '#9f1239',
    textAccent: '#be123c',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(136, 19, 55, 0.2)',
    buttonBg: '#881337',
    buttonText: '#ffffff',
  },
  {
    index: 4,
    name: 'Mercurial Superfly Ice Cyan',
    bg: '#e0f2fe',
    fog: '#bae6fd',
    textHeading: '#0c4a6e',
    textMuted: '#0369a1',
    textAccent: '#0284c7',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(12, 74, 110, 0.2)',
    buttonBg: '#0c4a6e',
    buttonText: '#ffffff',
  },
  {
    index: 5,
    name: 'LeBron XXI Royal Champagne',
    bg: '#fef3c7',
    fog: '#fde68a',
    textHeading: '#78350f',
    textMuted: '#92400e',
    textAccent: '#b45309',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(120, 53, 15, 0.2)',
    buttonBg: '#78350f',
    buttonText: '#ffffff',
  },
  {
    index: 6,
    name: 'The Icons Terracotta Cream',
    bg: '#ffedd5',
    fog: '#fed7aa',
    textHeading: '#7c2d12',
    textMuted: '#9a3412',
    textAccent: '#c2410c',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(124, 45, 18, 0.2)',
    buttonBg: '#7c2d12',
    buttonText: '#ffffff',
  },
  {
    index: 7,
    name: 'Outro Platinum Alabaster',
    bg: '#f8fafc',
    fog: '#e2e8f0',
    textHeading: '#0f172a',
    textMuted: '#334155',
    textAccent: '#0284c7',
    badgeBg: 'rgba(255, 255, 255, 0.95)',
    badgeBorder: 'rgba(15, 23, 42, 0.15)',
    buttonBg: '#0f172a',
    buttonText: '#ffffff',
  },
];
