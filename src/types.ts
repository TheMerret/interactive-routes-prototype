export interface Waypoint {
  id: number;
  location: string;
  instruction: string;
  question: string;
  type: 'open' | 'choice';
  options: string[] | null;
  answer: string;
  fact: string;
}

export interface Route {
  id: string;
  title: string;
  city: string;
  distance: string;
  duration: string;
  points: number;
  start: string;
  end: string;
  tags: string[];
  description: string;
  image: string;
  waypoints: Waypoint[];
}
