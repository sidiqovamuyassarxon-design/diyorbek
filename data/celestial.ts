export type CelestialBody = {
  id: string;
  name: string;
  type: "Planet" | "Star" | "Moon";
  subtitle: string;
  description: string;
  distance: string;
  diameter: string;
  temperature: string;
  color: string;
  radius: number;
  orbit: number;
};

export const bodies: CelestialBody[] = [
  {
    id: "earth", name: "Earth", type: "Planet", subtitle: "Our home",
    description: "A temperate rocky world with liquid-water oceans and a protective atmosphere.",
    distance: "1 AU from the Sun", diameter: "12,742 km", temperature: "15°C average",
    color: "#3d9dff", radius: 0.24, orbit: 2.0
  },
  {
    id: "mars", name: "Mars", type: "Planet", subtitle: "The red planet",
    description: "A cold desert world with ancient river valleys, enormous volcanoes and polar ice.",
    distance: "1.52 AU from the Sun", diameter: "6,779 km", temperature: "-65°C average",
    color: "#d87952", radius: 0.18, orbit: 2.8
  },
  {
    id: "jupiter", name: "Jupiter", type: "Planet", subtitle: "Gas giant",
    description: "The largest planet in our Solar System, known for its banded clouds and Great Red Spot.",
    distance: "5.20 AU from the Sun", diameter: "139,820 km", temperature: "-110°C cloud tops",
    color: "#d7a879", radius: 0.42, orbit: 4.0
  },
  {
    id: "saturn", name: "Saturn", type: "Planet", subtitle: "The ringed giant",
    description: "A gas giant surrounded by a spectacular system of icy rings.",
    distance: "9.58 AU from the Sun", diameter: "116,460 km", temperature: "-140°C cloud tops",
    color: "#d8c18e", radius: 0.35, orbit: 5.2
  },
  {
    id: "neptune", name: "Neptune", type: "Planet", subtitle: "Ice giant",
    description: "A distant blue ice giant with supersonic winds and a dynamic atmosphere.",
    distance: "30.07 AU from the Sun", diameter: "49,244 km", temperature: "-200°C average",
    color: "#477bff", radius: 0.29, orbit: 6.4
  }
];

export const galaxyStats = [
  { value: "100B+", label: "Stars" },
  { value: "1,000+", label: "Known planets nearby" },
  { value: "8", label: "Solar System planets" },
  { value: "1", label: "Cosmic home" }
];
