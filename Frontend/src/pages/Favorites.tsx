import { useState } from "react";
import { SongCard } from "@/components/SongCard";
import { Heart } from "lucide-react";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

const tabs = ["Songs", "Artists", "Albums", "Playlists"];

const favorites = [
  { title: "Neon Dreams", artist: "Electric Vibes", image: album1, duration: "5:26", mood: "Energetic" },
  { title: "Cosmic Journey", artist: "Space Odyssey", image: album2, duration: "4:11", mood: "Dreamy" },
  { title: "Speed of Light", artist: "Pulse Nation", image: album3, duration: "3:45", mood: "Intense" },
  { title: "Golden Hour", artist: "Sunset Collective", image: album4, duration: "3:15", mood: "Calm" },
  { title: "Night City", artist: "Cyber Dreams", image: album5, duration: "3:42", mood: "Dark" },
  { title: "Paradise Waves", artist: "Tropical Beats", image: album6, duration: "4:20", mood: "Happy" },
];

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("Songs");

  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 animate-slide-up">
        <div className="p-4 bg-gradient-to-br from-primary to-purple-500 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-pulse-glow">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <div>
          <h1 className="text-4xl font-montserrat font-bold mb-2">Your Favorites</h1>
          <p className="text-muted-foreground font-inter">
            {favorites.length} tracks you love
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-poppins font-medium transition-all duration-300 relative hover:scale-105 ${
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl p-6 border border-primary/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <h3 className="text-lg font-poppins font-semibold mb-2">
          Liked by You, Loved by Others
        </h3>
        <p className="text-muted-foreground font-inter mb-4">
          Based on your favorites, we recommend these similar tracks:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.slice(0, 4).map((song, idx) => (
            <SongCard key={idx} {...song} />
          ))}
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {favorites.map((song, idx) => (
          <div key={idx} className="relative">
            <SongCard {...song} />
            <div className="absolute top-2 left-2 px-2 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-poppins font-medium">
              {song.mood}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no favorites) */}
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-6 bg-primary/10 rounded-full mb-4 animate-pulse-glow">
            <Heart className="w-16 h-16 text-primary" />
          </div>
          <h3 className="text-2xl font-poppins font-semibold mb-2">
            Start adding what you love 💜
          </h3>
          <p className="text-muted-foreground font-inter">
            Your favorite tracks will appear here
          </p>
        </div>
      )}
    </div>
  );
}
