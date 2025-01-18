import { useLanguage } from "../contexts/LanguageContext";
import { useEffect, useState } from "react";
import sanityClient from "../Lib/sanityClient.jsx";

export function About() {
  const { language } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [terraceData, setTerraceData] = useState(null);

  useEffect(() => {
    // Récupération des données "About Us"
    sanityClient
      .fetch(
        `*[_type == "aboutUs"][0]{
          "imageUrl": image.asset->url,
          image {
            altText
          },
          title,
          description
        }`
      )
      .then((data) => setAboutData(data))
      .catch((error) =>
        console.error("Error fetching About Us data from Sanity:", error)
      );

    // Récupération des données "Our Terrace"
    sanityClient
      .fetch(
        `*[_type == "ourTerrace"][0]{
          "imageUrl": image.asset->url,
          image {
            altText
          },
          description
        }`
      )
      .then((data) => setTerraceData(data))
      .catch((error) =>
        console.error("Error fetching Our Terrace data from Sanity:", error)
      );
  }, []);

  if (!aboutData || !terraceData) {
    return (
      <section className="py-20 bg-white" id="about">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <p>{language === "en" ? "Loading..." : "Carregando..."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-12 bg-primary"></div>
          <h2 className="text-4xl font-serif text-center mx-6">
            {language === "en" ? "Our Story" : "A Nossa História"}
          </h2>
          <div className="h-px w-12 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={aboutData.imageUrl}
              alt={aboutData.image?.altText || ""}
              className="w-full h-[400px] object-cover scale-115 transform origin-center"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-primary">
              {language === "en" ? aboutData.title.en : aboutData.title.pt}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language === "en"
                ? aboutData.description.en
                : aboutData.description.pt}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-secondary-100 py-20 mt-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-8 bg-primary"></div>
            <h3 className="text-2xl font-serif text-primary mx-4">
              {language === "en" ? "Our Terrace" : "A Nossa Esplanada"}
            </h3>
            <div className="h-px w-8 bg-primary"></div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            {language === "en"
              ? terraceData.description.en
              : terraceData.description.pt}
          </p>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={terraceData.imageUrl}
              alt={terraceData.image?.altText || ""}
              className="w-full h-[300px] object-cover scale-120 transform origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
