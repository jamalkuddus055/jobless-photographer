import { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.35;
        await audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

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
        "A stray tuxedo cat looking up with mesmerizing green eyes that hold secrets of a world hidden right beneath our feet.",
      image: "https://i.imgur.com/hCw7tWM.jpeg",
    },
    {
      title: "Whispers of the Ascent",
      category: "Nature",
      description:
        "Weathered stone steps climbing into a thick canopy of green, where every step feels like a quiet departure from the world.",
      image: "https://i.imgur.com/IBv7FId.jpeg",
    },
    {
      title: "Between the Songs",
      category: "Nature",
      description:
        "A lone musician stands under the drizzle, gently tuning his guitar in the quiet space where music meets silence.",
      image: "https://i.imgur.com/Z1JWMsP.jpeg",
    },
    {
      title: "A Life Well Walked",
      category: "Portrait",
      description:
        "An old man pauses by green fields, resting on his walking stick as he looks at a lifetime of memories.",
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

  if (loading) {
    return (
      <div className="h-screen w-full bg-black text-white flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold">Shutter Man</h1>
        <p className="text-gray-400 mt-2 tracking-[0.3em]">
          loading memories...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="h-screen flex items-center justify-center relative">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="hero"
        />

        <div className="relative text-center px-6">
          <h1 className="text-6xl font-bold mb-4">
            _jobless_photographer
          </h1>
          <p className="text-gray-300">
            Shutter Man • emotions through lens
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo)}
              className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:scale-[1.02] transition"
            >
              <img
                src={photo.image}
                loading="lazy"
                className="w-full h-72 object-cover"
                alt={photo.title}
              />

              <div className="p-4">
                <h3 className="font-semibold">{photo.title}</h3>
                <p className="text-sm text-gray-400">
                  {photo.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image}
              className="w-full rounded-xl mb-4"
              alt=""
            />
            <h2 className="text-2xl font-bold mb-2">
              {selectedPhoto.title}
            </h2>
            <p className="text-gray-300">
              {selectedPhoto.description}
            </p>
          </div>
        </div>
      )}

      {/* MUSIC BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-full hover:bg-white hover:text-black transition"
        >
          {playing ? "⏸️" : "🎧"}
        </button>

        <audio ref={audioRef} loop>
          <source src="/music.mp3" type="audio/mpeg" />
        </audio>
      </div>

    </div>
  );
}