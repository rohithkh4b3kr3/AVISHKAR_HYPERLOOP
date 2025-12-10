
import { NavItem, Feature, VideoItem, PodModel } from './types';
import { Zap, Magnet, Wind, Box, FileText, Database } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Media', href: '/media' },
  { label: 'Pod', href: '/pod' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Research', href: '/research' },
  { label: 'Partners', href: '#partners' },
  { label: 'Blog', href: '#blog' },
  { label: 'Team', href: '#team' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Ticket Calculator', href: '#calculator' },
];

export const FEATURES: Feature[] = [
  {
    title: "Linear Induction Motor",
    description: "Contactless propulsion allowing for high acceleration and minimal friction.",
    icon: "Zap"
  },
  {
    title: "Magnetic Levitation",
    description: "Electro-dynamic suspension ensures a smooth, stable ride at supersonic speeds.",
    icon: "Magnet"
  },
  {
    title: "Vacuum Tube",
    description: "Near-vacuum environment eliminates air resistance, unlocking max efficiency.",
    icon: "Wind"
  },
  {
    title: "Autonomous Control",
    description: "AI-driven navigation systems for millisecond-precision braking and acceleration.",
    icon: "Cpu"
  }
];

export const INFRASTRUCTURE_DATA = [
  {
    id: 1,
    title: "Vacuum Pumps",
    description: "High-capacity rotary vane pumps maintain 0.001 atm pressure throughout the tube network.",
    stats: "99.9% Air Removal"
  },
  {
    id: 2,
    title: "Expansion Joints",
    description: "Advanced thermal expansion handling systems accommodating temperature variations of 50°C.",
    stats: "+/- 50cm Flex"
  },
  {
    id: 3,
    title: "Concrete Pylons",
    description: "Reinforced earthquake-resistant pillars spaced 30m apart to minimize land footprint.",
    stats: "Richter 8.0 Rated"
  },
  {
    id: 4,
    title: "Solar Cladding",
    description: "Top-mounted solar panels provide 100% of operational energy for the vacuum systems.",
    stats: "1.2 MW Output"
  }
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=1000&auto=format&fit=crop",
    title: "Vacuum Testing",
    category: "R&D"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000&auto=format&fit=crop",
    title: "Propulsion Systems",
    category: "Engineering"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1535378437321-29e904b3dd43?q=80&w=1000&auto=format&fit=crop",
    title: "Tube Infrastructure",
    category: "Site"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580983218765-f663bec07b37?q=80&w=1000&auto=format&fit=crop",
    title: "Control Center",
    category: "Operations"
  }
];

export const VIDEO_STACK: VideoItem[] = [
  {
    id: 1,
    title: "Propulsion Test Alpha",
    category: "TESTING",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    duration: "02:14"
  },
  {
    id: 2,
    title: "Pod Aerodynamics",
    category: "SIMULATION",
    thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop",
    duration: "01:45"
  },
  {
    id: 3,
    title: "Vacuum Tube Construction",
    category: "INFRASTRUCTURE",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    duration: "03:30"
  },
  {
    id: 4,
    title: "Team Interview: Systems",
    category: "CULTURE",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    duration: "04:15"
  },
  {
    id: 5,
    title: "European Hyperloop Week",
    category: "EVENTS",
    thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    duration: "05:00"
  }
];

// export const POD_MODELS: PodModel[] = [
//   {
//     id: 'p1',
//     name: 'AVISHKAR 1.0',
//     tagline: 'THE PROTOTYPE',
//     description: 'The genesis of our journey. Built in 2019, this pod successfully demonstrated the core feasibility of linear induction propulsion on a sub-scale track, securing top honors at the SpaceX Hyperloop Pod Competition.',
//     image: 'https://images.unsplash.com/photo-1581093583449-ed2521344db5?q=80&w=2500&auto=format&fit=crop', // Industrial mechanical look
//     stats: {
//       maxSpeed: '120 KM/H',
//       weight: '250 KG',
//       propulsion: 'Single-Sided LIM',
//       levitation: 'Wheeled (Gen 1)'
//     }
//   },
//   {
//     id: 'p2',
//     name: 'GARUDA',
//     tagline: 'CURRENT GENERATION',
//     description: 'Our current champion. Garuda features a lightweight carbon-fiber chassis and a custom-designed double-sided linear induction motor. It is engineered for high-speed stability and rapid braking.',
//     image: 'https://images.unsplash.com/photo-1535970793482-07de93762dc4?q=80&w=2500&auto=format&fit=crop', // Sleek carbon fiber look
//     stats: {
//       maxSpeed: '463 KM/H',
//       weight: '180 KG',
//       propulsion: 'Double-Sided LIM',
//       levitation: 'Electro-Dynamic'
//     }
//   },
//   {
//     id: 'p3',
//     name: 'AGNI',
//     tagline: 'FUTURE CONCEPT',
//     description: 'The future of intercity travel. Agni is designed for the vacuum tube environment, targeting Mach 1.0 speeds. It integrates passenger life-support systems and fully autonomous navigation.',
//     image: 'https://images.unsplash.com/photo-1532976695276-80540d57fd3a?q=80&w=2500&auto=format&fit=crop', // Futuristic concept art
//     stats: {
//       maxSpeed: '1200 KM/H',
//       weight: '2200 KG',
//       propulsion: 'Superconducting Maglev',
//       levitation: 'Active Magnetic'
//     }
//   }
// ];

export const AVISHKAR_INFO = `Avishkar Hyperloop is a student team from IIT Madras, working on developing a scalable Hyperloop system. The team is competing in global competitions to prove the viability of this fifth mode of transport.`;

export const PARTNER_LOGOS = [
  { id: 1, name: 'Google Cloud', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/2560px-Google_Cloud_logo.svg.png' },
  { id: 2, name: 'Ansys', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ansys_Inc._Logo_2008.png/1200px-Ansys_Inc._Logo_2008.png' },
  { id: 3, name: 'Altium', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Altium_Logo_2017.svg/2560px-Altium_Logo_2017.svg.png' },
  { id: 4, name: 'Swagelok', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Swagelok_logo.svg/2560px-Swagelok_logo.svg.png' },
  { id: 5, name: 'MathWorks', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Matlab_Logo.png/1200px-Matlab_Logo.png' },
  { id: 6, name: 'SolidWorks', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/SolidWorks_Logo.png/1200px-SolidWorks_Logo.png' },
  { id: 7, name: 'Keysight', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Keysight_Technologies_Logo.svg/2560px-Keysight_Technologies_Logo.svg.png' },
  { id: 8, name: 'Maxon', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Maxon_Motor_AG_logo.svg/2560px-Maxon_Motor_AG_logo.svg.png' },
];

export const RESEARCH_AREAS = [
  {
    id: 1,
    title: 'Aerodynamics',
    description: 'Computational Fluid Dynamics (CFD) analysis of pod geometry in transonic regimes to minimize drag coefficient and shockwave formation.',
    icon: Wind
  },
  {
    id: 2,
    title: 'Levitation Systems',
    description: 'Development of Electro-Dynamic Suspension (EDS) using Halbach arrays for stable, passive levitation at high velocities.',
    icon: Magnet
  },
  {
    id: 3,
    title: 'Propulsion',
    description: 'Design of double-sided Linear Induction Motors (LIM) optimized for vacuum environments and high-frequency switching.',
    icon: Zap
  },
  {
    id: 4,
    title: 'Structures',
    description: 'Finite Element Analysis (FEA) of carbon fiber monocoque chassis to ensure structural integrity under 10G loads.',
    icon: Box
  }
];

export const PUBLICATIONS = [
  {
    id: 1,
    title: "Optimization of Linear Induction Motor for Hyperloop Applications",
    year: "2023",
    abstract: "A comparative study of single-sided vs double-sided LIM topologies focusing on end-effects and thermal dissipation in vacuum.",
    link: "#"
  },
  {
    id: 2,
    title: "Passive Magnetic Levitation Stability Analysis",
    year: "2022",
    abstract: "Investigating the 6-DOF dynamics of a Halbach array-based suspension system at subsonic speeds.",
    link: "#"
  },
  {
    id: 3,
    title: "CFD Simulation of Pods in Low-Pressure Tubes",
    year: "2021",
    abstract: "Analyzing the Kantrowitz limit and aerodynamic drag reduction techniques for tube-based transport.",
    link: "#"
  }
];

export const LAB_FACILITIES = [
  {
    id: 1,
    name: "Vacuum Chamber",
    description: "A 3-meter diameter chamber capable of simulating pressures down to 0.001 atm for component testing.",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Winding Lab",
    description: "Dedicated facility for precision winding of linear motor stators and electromagnetic coils.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Control Center",
    description: "Real-time telemetry station for monitoring pod subsystems and track conditions during runs.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
  }
];


// src/Constants.ts
export const POD_MODELS = [
  {
    id: 1,
    name: "POD V1",
    modelUrl: "/models/pod-v1.glb",
    image: "/images/pod-v1.jpg",
    description:
      "Our first-generation prototype focusing on aerodynamic stability and low-friction levitation.",
    stats: {
      maxSpeed: "220 km/h",
      weight: "145 kg",
      propulsion: "Magnetic Linear Drive",
      levitation: "Hybrid Air-Cushion System",
    },
  },
  {
    id: 2,
    name: "POD V2",
    modelUrl: "/models/pod-v2.glb",
    image: "/images/pod-v2.jpg",
    description:
      "Second-generation prototype with improved structural integrity and optimized aerodynamics.",
    stats: {
      maxSpeed: "310 km/h",
      weight: "137 kg",
      propulsion: "Enhanced Linear Motor",
      levitation: "EML-Based System",
    },
  }
];
