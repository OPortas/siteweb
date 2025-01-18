export interface MenuItem {
  id: string;
  nameEN: string;
  namePT: string;
  descriptionEN: string;
  descriptionPT: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts';
  dietary?: Array<'V' | 'GF' | 'DF' | 'N'>;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: {
    en: string;
    pt: string;
  };
  date: string;
  image?: string;
}

export type Language = 'en' | 'pt';