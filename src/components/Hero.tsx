import { useLanguage } from "../contexts/LanguageContext";
import { Clock, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import sanityClient from "../Lib/sanityClient.jsx";

export function Hero() {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [businessHours, setBusinessHours] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch business hours from Sanity
    sanityClient
      .fetch(
        `*[_type == "businessHours" && language == $language]{
          day,
          isClosed,
          openingTime,
          closingTime
        } | order(_createdAt asc)`,
        { language }
      )
      .then((data) => setBusinessHours(data))
      .catch((error) =>
        console.error("Error fetching business hours in Hero:", error)
      );
  }, [language]);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1467003909585-2f8a72700288"
          alt={
            language === "en"
              ? "Portuguese wine and food"
              : "Vinho e comida portuguesa"
          }
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">O PORTAS</h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-100">
            {language === "en"
              ? "Experience authentic Portuguese cuisine in the heart of Lisbon. Where tradition meets contemporary dining, creating unforgettable moments around our table."
              : "Experiencie a autêntica cozinha portuguesa no coração de Lisboa. Onde a tradição encontra a gastronomia contemporânea, criando momentos inesquecíveis à nossa mesa."}
          </p>

          {/* Opening Hours Card */}
          <div
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto mb-16 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-xl text-primary">
                {language === "en" ? "Opening Hours" : ""}
                {language === "pt" ? "Horário" : ""}
              </h2>
            </div>
            <div className="space-y-2 text-gray-100">
              {businessHours.length > 0 ? (
                businessHours.map((hour) => (
                  <p key={hour.day}>
                    {hour.day}:{" "}
                    {hour.isClosed
                      ? language === "en"
                        ? "Closed"
                        : "Fechado"
                      : `${hour.openingTime} - ${hour.closingTime}`}
                  </p>
                ))
              ) : (
                <p>
                  {language === "en"
                    ? "Loading hours..."
                    : "Carregando horários..."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Button */}
        <button
          onClick={handleScrollClick}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white hover:text-primary transition-colors duration-300 animate-bounce"
          aria-label={language === "en" ? "Scroll down" : "Deslizar para baixo"}
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
}
