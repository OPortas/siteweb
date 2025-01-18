import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import sanityClient from "../Lib/sanityClient.jsx";

export function Specialities() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    // Fetch dish images from Sanity
    sanityClient
      .fetch(
        `*[_type == "dishImages"]{
          images[]{
            "url": asset->url,
            caption,
            altText
          }
        }`
      )
      .then((data) => setSpecialities(data[0]?.images || []))
      .catch((error) =>
        console.error("Error fetching specialities from Sanity:", error)
      );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = document.querySelectorAll(".speciality-image");
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [specialities]);

  return (
    <section className="py-20 bg-white" id="specialities" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-center mb-12 animate-fade-in">
          <div className="h-px w-12 bg-primary"></div>
          <h2 className="text-4xl font-serif text-center mx-6">
            {language === "en"
              ? "Our Specialities"
              : "As Nossas Especialidades"}
          </h2>
          <div className="h-px w-12 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {specialities.map((item, index) => (
            <div
              key={index}
              className="group relative speciality-image opacity-0"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
                <img
                  src={item.url}
                  alt={item.altText || ""}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    index === 3 ? "scale-125" : ""
                  }`}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl">
                <p className="absolute bottom-4 left-4 text-white text-lg font-serif">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
