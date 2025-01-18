import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { MenuItem } from '../types';

const menuItems: MenuItem[] = [
  {
    id: '1',
    nameEN: 'Octopus Salad',
    namePT: 'Salada de Polvo',
    descriptionEN: 'Tender octopus with olive oil, garlic, fresh herbs and bell peppers',
    descriptionPT: 'Polvo tenro com azeite, alho, ervas aromáticas e pimentos',
    price: 14.50,
    category: 'starters',
    dietary: ['GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'
  },
  {
    id: '2',
    nameEN: 'Codfish Cakes',
    namePT: 'Pastéis de Bacalhau',
    descriptionEN: 'Traditional Portuguese codfish cakes with parsley and onion',
    descriptionPT: 'Pastéis de bacalhau tradicionais com salsa e cebola',
    price: 9.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1621841957884-1210fe19b6d3'
  },
  {
    id: '3',
    nameEN: 'Grilled Sea Bass',
    namePT: 'Robalo Grelhado',
    descriptionEN: 'Fresh sea bass grilled with olive oil, garlic and herbs, served with roasted vegetables',
    descriptionPT: 'Robalo fresco grelhado com azeite, alho e ervas, servido com legumes assados',
    price: 24.50,
    category: 'mains',
    dietary: ['GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369'
  },
  {
    id: '4',
    nameEN: 'Bacalhau à Brás',
    namePT: 'Bacalhau à Brás',
    descriptionEN: 'Shredded codfish with onions, straw potatoes, eggs, and parsley',
    descriptionPT: 'Bacalhau desfiado com cebolas, batata palha, ovos e salsa',
    price: 22.50,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1599321955726-e048426594af'
  },
  {
    id: '5',
    nameEN: 'Grilled Octopus',
    namePT: 'Polvo à Lagareiro',
    descriptionEN: 'Grilled octopus with olive oil, garlic, and roasted potatoes',
    descriptionPT: 'Polvo grelhado com azeite, alho e batatas assadas',
    price: 26.50,
    category: 'mains',
    dietary: ['GF', 'DF'],
    image: 'https://images.unsplash.com/photo-1599321955726-e048426594af'
  },
  {
    id: '6',
    nameEN: 'Pastel de Nata',
    namePT: 'Pastel de Nata',
    descriptionEN: 'Traditional Portuguese custard tart with cinnamon',
    descriptionPT: 'Pastel de nata tradicional português com canela',
    price: 3.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1577057994894-7e3f4a1f6f46'
  },
  {
    id: '7',
    nameEN: 'Orange Roll',
    namePT: 'Torta de Laranja',
    descriptionEN: 'Soft orange-flavored roll with orange zest',
    descriptionPT: 'Torta macia com sabor a laranja e raspa de laranja',
    price: 4.50,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814'
  }
];

type Category = 'starters' | 'mains' | 'desserts';

export function Menu() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>('starters');

  const categories: { id: Category; labelEN: string; labelPT: string }[] = [
    { id: 'starters', labelEN: 'Starters', labelPT: 'Entradas' },
    { id: 'mains', labelEN: 'Main Courses', labelPT: 'Pratos Principais' },
    { id: 'desserts', labelEN: 'Desserts', labelPT: 'Sobremesas' }
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 px-4 bg-secondary-100" id="menu">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-serif text-center mb-12">
          {language === 'en' ? 'Our Menu' : 'A Nossa Ementa'}
        </h2>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-colors font-serif text-lg ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-secondary-200'
              }`}
            >
              {language === 'en' ? category.labelEN : category.labelPT}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={language === 'en' ? item.nameEN : item.namePT}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif">
                    {language === 'en' ? item.nameEN : item.namePT}
                  </h3>
                  <span className="text-lg font-semibold text-primary">
                    €{item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {language === 'en' ? item.descriptionEN : item.descriptionPT}
                </p>
                {item.dietary && (
                  <div className="flex flex-wrap gap-2">
                    {item.dietary.map(diet => (
                      <span 
                        key={diet}
                        className="inline-block px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-500"
                        title={diet === 'GF' 
                          ? (language === 'en' ? 'Gluten Free' : 'Sem Glúten')
                          : (language === 'en' ? 'Dairy Free' : 'Sem Lactose')
                        }
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}