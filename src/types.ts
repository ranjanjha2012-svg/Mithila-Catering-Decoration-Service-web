export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TiffinPlan {
  name: string;
  price: string;
  features: string[];
  color: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
