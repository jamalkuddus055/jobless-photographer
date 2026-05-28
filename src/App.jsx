import { useMemo, useState } from "react";

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const photos = [
    {
      title: "Inferno Wings",
      category: "Nature",
      description:
        "A spark of fire resting in a sea of green, whispering that beauty is often found in the quietest corners of the wild.",
      image: "https://i.imgur.com/uiBKHU8.jpeg",
    },
    {
      title: "Echoes of the Everyday",
      category: "Portrait",
      description:
        "Framed by the blurred chaos of a busy stall, a quiet moment of absolute focus cuts right through the noise.",
      image: "https://i.imgur.com/zlRSnqD.jpeg",
    },
    {
      title: "Whispers of Devotion",
      category: "Street",
      description:
        "A garland of red and white woven from promises, hanging gently in the shade like a love letter left for the world to find.",
      image: "https://i.imgur.com/CduagT4.jpeg",
    },
    {
      title: "Traces of Time",
      category: "Street",
      description:
        "An old man steps through a weathered doorway, carrying the quiet, unseen heavy stories of a lifetime built brick by brick.",
      image: "https://i.imgur.com/BE4wMIC.jpeg",
    },
    {
      title: "A Corner of Yesterday",
      category: "Street",
      description:
        "The dim glow of a red cooler and familiar signs seen through a dashboard, like a half-remembered childhood memory fading into the evening light.",
      image: "https://i.imgur.com/YVsv1i3.jpeg",
    },
    {
      title: "Emeralds in the Dust",
      category: "Fauna",
      description:
        "A stray tuxedo cat looking up with mesmerizing, glowing green eyes that hold secrets of a world hidden right beneath our feet.",
      image: "https://i.imgur.com/hCw7tWM.jpeg",
    },
    {
      title: "Whispers of the Ascent",
      category: "Nature",
      description:
        "Weathered stone steps climbing into a thick canopy of green, where every step feels like a quiet departure from the rest of the world.",
      image: "https://i.imgur.com/IBv7FId.jpeg",
    },
    {
      title: "Between the Songs",
      category: "Nature",
      description:
        "A lone musician stands under the drizzle, gently tuning his guitar in the quiet space where the music stops and the world begins.",
      image: "https://i.imgur.com/Z1JWMsP.jpeg",
    },
    {
      title: "A Life Well Walked",
      category: "Portrait",
      description:
        "An old man pauses by the green fields, his hand resting on his walking stick as he looks out over the land that has witnessed every step of his journey.",
      image: "https://i.imgur.com/cL0lSof.jpeg",
    },
  ];

  const categories = useMemo(() => {
    return ["All", ...new Set(photos.map((p) => p.category))];
  }, []);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HERO */}
      <section className="relative h-[80vh] sm:h-screen flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="hero"
        />

        <div className="relative text-center px-4 sm:px-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
            _jobless_photographer
          </h1>

          <p className="text-gray-300 mb-8 text-sm sm:text-base">
            A teenage photographer capturing emotions, silence, light, and stories people ignore.
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="px-4 sm:px-6 py-16 sm:py-20 max-w-7xl mx-auto w-full">

        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10">
          Selected Photographs
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition"
            >
              
              {/* 🔥 LAZY LOADING ADDED HERE */}
              <img
                src={photo.image}
                loading="lazy"
                decoding="async"
                className="h-64 sm:h-80 w-full object-cover"
                alt={photo.title}
              />

              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {photo.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm mt-2">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-4xl w-full bg-black border border-white/20 rounded-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl mb-6"
              alt=""
            />

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {selectedPhoto.title}
            </h2>

            <p className="text-gray-300 text-sm sm:text-base mb-6">
              {selectedPhoto.description}
            </p>

            <button
              onClick={() => setSelectedPhoto(null)}
              className="bg-white text-black px-6 py-2 rounded-xl w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-white/10 mt-20 px-4">
        <p className="text-gray-400 text-sm">
          _jobless_photographer • Built with React + Tailwind
        </p>
      </footer>

    </div>
  );
}