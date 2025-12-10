
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum GameState {
  IDLE = 'IDLE',
  ACCELERATING = 'ACCELERATING',
  CRUISING = 'CRUISING'
}

export interface VideoItem {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
}

export interface PodModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  stats: {
    maxSpeed: string;
    weight: string;
    propulsion: string;
    levitation: string;
  };
}
