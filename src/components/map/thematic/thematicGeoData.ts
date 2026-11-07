export interface DistrictSvgGeo {
  id: string;
  name: string;
  kode: string;
  d: string;
  centroid: { x: number; y: number };
  badgePos: { x: number; y: number };
  anchorSide: 'left' | 'right';
  cardIndex: number;
  cardAnchor: { x: number; y: number };
}

export const DISTRICT_SVG_GEOS: DistrictSvgGeo[] = [
  // --- SISI KIRI (WEST / SOUTH-WEST: 5 KECAMATAN) ---
  {
    id: 'kwarran-cinere',
    name: 'Cinere',
    kode: '09.22.08',
    d: 'M 290,65 L 360,55 L 390,95 L 380,145 L 340,160 L 285,130 Z',
    centroid: { x: 340, y: 110 },
    badgePos: { x: 340, y: 110 },
    anchorSide: 'left',
    cardIndex: 0,
    cardAnchor: { x: 235, y: 80 },
  },
  {
    id: 'kwarran-limo',
    name: 'Limo',
    kode: '09.22.11',
    d: 'M 340,160 L 380,145 L 420,185 L 405,250 L 345,245 L 315,195 Z',
    centroid: { x: 365, y: 200 },
    badgePos: { x: 365, y: 200 },
    anchorSide: 'left',
    cardIndex: 1,
    cardAnchor: { x: 235, y: 195 },
  },
  {
    id: 'kwarran-bojongsari',
    name: 'Bojongsari',
    kode: '09.22.10',
    d: 'M 255,270 L 325,255 L 350,305 L 335,385 L 265,395 L 235,325 Z',
    centroid: { x: 295, y: 325 },
    badgePos: { x: 295, y: 325 },
    anchorSide: 'left',
    cardIndex: 2,
    cardAnchor: { x: 235, y: 310 },
  },
  {
    id: 'kwarran-sawangan',
    name: 'Sawangan',
    kode: '09.22.05',
    d: 'M 325,255 L 390,260 L 415,350 L 390,440 L 330,445 L 335,385 L 350,305 Z',
    centroid: { x: 365, y: 355 },
    badgePos: { x: 365, y: 355 },
    anchorSide: 'left',
    cardIndex: 3,
    cardAnchor: { x: 235, y: 425 },
  },
  {
    id: 'kwarran-cipayung',
    name: 'Cipayung',
    kode: '09.22.09',
    d: 'M 390,440 L 440,430 L 485,475 L 470,575 L 400,580 L 370,515 Z',
    centroid: { x: 425, y: 505 },
    badgePos: { x: 425, y: 505 },
    anchorSide: 'left',
    cardIndex: 4,
    cardAnchor: { x: 235, y: 540 },
  },

  // --- SISI KANAN (CENTRAL / EAST: 6 KECAMATAN) ---
  {
    id: 'kwarran-beji',
    name: 'Beji',
    kode: '09.22.04',
    d: 'M 390,95 L 475,85 L 505,145 L 485,215 L 420,185 L 380,145 Z',
    centroid: { x: 450, y: 150 },
    badgePos: { x: 450, y: 150 },
    anchorSide: 'right',
    cardIndex: 0,
    cardAnchor: { x: 705, y: 65 },
  },
  {
    id: 'kwarran-cimanggis',
    name: 'Cimanggis',
    kode: '09.22.03',
    d: 'M 475,85 L 595,75 L 635,145 L 610,235 L 525,225 L 505,145 Z',
    centroid: { x: 555, y: 155 },
    badgePos: { x: 555, y: 155 },
    anchorSide: 'right',
    cardIndex: 1,
    cardAnchor: { x: 705, y: 165 },
  },
  {
    id: 'kwarran-pancoran-mas',
    name: 'Pancoran Mas',
    kode: '09.22.01',
    d: 'M 420,185 L 485,215 L 505,290 L 470,360 L 405,345 L 390,260 Z',
    centroid: { x: 450, y: 275 },
    badgePos: { x: 450, y: 275 },
    anchorSide: 'right',
    cardIndex: 2,
    cardAnchor: { x: 705, y: 265 },
  },
  {
    id: 'kwarran-sukmajaya',
    name: 'Sukmajaya',
    kode: '09.22.02',
    d: 'M 505,225 L 610,235 L 615,315 L 555,365 L 505,335 L 505,290 Z',
    centroid: { x: 550, y: 290 },
    badgePos: { x: 550, y: 290 },
    anchorSide: 'right',
    cardIndex: 3,
    cardAnchor: { x: 705, y: 365 },
  },
  {
    id: 'kwarran-cilodong',
    name: 'Cilodong',
    kode: '09.22.07',
    d: 'M 470,360 L 555,365 L 595,415 L 575,495 L 485,475 L 440,430 Z',
    centroid: { x: 520, y: 425 },
    badgePos: { x: 520, y: 425 },
    anchorSide: 'right',
    cardIndex: 4,
    cardAnchor: { x: 705, y: 465 },
  },
  {
    id: 'kwarran-tapos',
    name: 'Tapos',
    kode: '09.22.06',
    d: 'M 610,235 L 705,255 L 730,375 L 675,535 L 575,495 L 595,415 L 615,315 Z',
    centroid: { x: 645, y: 395 },
    badgePos: { x: 645, y: 395 },
    anchorSide: 'right',
    cardIndex: 5,
    cardAnchor: { x: 705, y: 565 },
  },
];
