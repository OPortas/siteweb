import { useLanguage } from '../contexts/LanguageContext';
import { Star } from 'lucide-react';
import type { Review } from '../types';
import { useEffect, useRef } from 'react';

const reviews: Review[] = [
  {
    id: '1',
    author: 'M. Santos',
    rating: 5,
    content: {
      en: "The best traditional Portuguese food I've had in Lisbon! The staff was incredibly welcoming and the atmosphere is perfect.",
      pt: 'A melhor comida tradicional portuguesa que já comi em Lisboa! A equipa foi incrivelmente acolhedora e a atmosfera é perfeita.'
    },
    date: '2024-02-15'
  },
  {
    id: '2',
    author: 'J. Smith',
    rating: 5,
    content: {
      en: 'An authentic Portuguese experience. The codfish was exceptional and the wine selection is impressive.',
      pt: 'Uma experiência portuguesa autêntica. O bacalhau estava excepcional e a seleção de vinhos é impressionante.'
    },
    date: '2024-02-10'
  },
  {
    id: '3',
    author: 'A. Oliveira',
    rating: 5,
    content: {
      en: 'Beautiful restaurant with amazing food. The doors add such a unique touch to the ambiance.',
      pt: 'Restaurante lindo com comida incrível. As portas dão um toque único ao ambiente.'
    },
    date: '2024-02-05'
  }
];

export function Reviews() {
  const { language } = useLanguage();
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reviews = document.querySelectorAll('.review-card');
    reviews.forEach((review) => observer.observe(review));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-secondary-100" id="reviews">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-primary"></div>
            <h2 className="text-4xl font-serif mx-6">
              {language === 'en' ? 'What Our Guests Say' : 'O Que Dizem Os Nossos Clientes'}
            </h2>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <div className="flex justify-center items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary animate-scale" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8" ref={reviewsRef}>
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className="review-card bg-white rounded-lg shadow-md p-6 opacity-0 hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 transition-transform duration-300 hover:translate-x-1">
                {language === 'en' ? review.content.en : review.content.pt}
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold">{review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}