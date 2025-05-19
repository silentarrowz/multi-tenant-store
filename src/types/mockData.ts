export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Tenant {
  id: number;
  name: string;
  logo: string;
  slug: string;
  products: Product[];  
}