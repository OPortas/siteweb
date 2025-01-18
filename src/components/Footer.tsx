import { Facebook, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";
import sanityClient from "../Lib/sanityClient.jsx";

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  // State pour stocker les horaires
  const [businessHours, setBusinessHours] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "businessHours" && language == $language]{
          day,
          openingTime,
          closingTime
        } | order(_createdAt asc)`,
        { language }
      )
      .then((data) => {
        if (Array.isArray(data)) {
          setBusinessHours(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching business hours:", error));
  }, [language]);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#ccad6b]">
              {language === "en" ? "Contact Us" : "Contacte-nos"}
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+351213460023"
                className="flex items-center hover:text-[#ccad6b] transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                +351 21 346 0023
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-[#ccad6b] transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                R. dos Correeiros 64, 1100-161 Lisboa
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif mb-4 text-[#ccad6b]">
              {language === "en" ? "Opening Hours" : "Horário"}
            </h3>
            <div className="space-y-2">
              {businessHours.length > 0 ? (
                businessHours.map((hour) => (
                  <p key={hour.day}>
                    {hour.day}:{" "}
                    {hour.closed
                      ? language === "en"
                        ? "Closed"
                        : "Fechado"
                      : hour.openingTime && hour.closingTime
                      ? `${hour.openingTime} - ${hour.closingTime}`
                      : language === "en"
                      ? "Closed"
                      : "Fechado"}
                    {console.log(hour)}
                  </p>
                ))
              ) : (
                <p>
                  {language === "en"
                    ? "Failed to load business hours."
                    : "Erreur de chargement des horaires."}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a
              href="https://facebook.com/profile.php?id=100068674700107"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ccad6b] transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          <div className="text-sm text-gray-400">
            © {year} Designed with passion{" "}
            <a href="https://www.gosite-web.com/" target="_blank">
              {" "}
              by GOSITE-WEB.
            </a>{" "}
            {language === "en"
              ? "All rights reserved."
              : "Todos os direitos reservados."}
          </div>
        </div>
      </div>
    </footer>
  );
}
