export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: string;  // ← only change
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
}

export interface CartItem extends Product {
  quantity: number;
}
