import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SongCard } from "@/components/SongCard";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

const featuredSongs: Record<string, any> = {
  "neon dreams": { title: "Neon Dreams", artist: "Electric Vibes", image: album1, duration: "5:26" },
  "cosmic journey": { title: "Cosmic Journey", artist: "Space Odyssey", image: album2, duration: "4:11" },
  "happy": { title: "Good Vibes Only", artist: "Sunshine Collective", image: album3, duration: "3:45" },
  "sad": { title: "Rainy Days", artist: "Melancholy Beats", image: album4, duration: "4:20" },
  "energetic": { title: "Speed of Light", artist: "Pulse Nation", image: album5, duration: "3:30" },
  "calm": { title: "Ocean Breeze", artist: "Peaceful Sounds", image: album6, duration: "5:15" },
  "romantic": { title: "Moonlight Serenade", artist: "Love Notes", image: album1, duration: "4:05" },
  "angry": { title: "Break the Silence", artist: "Rage Machine", image: album2, duration: "3:15" },
  "nostalgic": { title: "Golden Days", artist: "Memory Lane", image: album3, duration: "4:50" },
  "focused": { title: "Deep Work", artist: "Concentration Zone", image: album4, duration: "6:00" },
};

const recommendations = [
  { title: "Midnight City", artist: "Synth Wave", image: album2, duration: "4:30" },
  { title: "Electric Dreams", artist: "Future Pulse", image: album3, duration: "3:55" },
  { title: "Neon Lights", artist: "City Nights", image: album4, duration: "4:15" },
  { title: "Cyber Love", artist: "Digital Hearts", image: album5, duration: "3:40" },
  { title: "Starlight", artist: "Cosmic Vibes", image: album6, duration: "5:10" },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const mood = searchParams.get("mood") || "";
  
  const searchKey = (query || mood).toLowerCase();
  const featuredSong = featuredSongs[searchKey] || featuredSongs["neon dreams"];
  const resultType = mood ? `${mood} Mood` : `"${query}"`;

  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/search")}
        className="gap-2 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </Button>

      {/* Featured Song */}
      <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl p-8 border border-primary/30 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative group">
            <img
              src={featuredSong.image}
              alt={featuredSong.title}
              className="w-64 h-64 rounded-xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:scale-110 transition-transform"
              >
                <Play className="w-8 h-8 fill-current" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <p className="text-sm text-muted-foreground font-inter mb-2">
                Search Result for {resultType}
              </p>
              <h1 className="text-5xl font-montserrat font-bold mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {featuredSong.title}
              </h1>
              <p className="text-2xl text-muted-foreground font-poppins">
                {featuredSong.artist}
              </p>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button className="gap-2 hover:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-current" />
                Play Now
              </Button>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                Add to Library
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-6">
          Recommended based on your search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {recommendations.map((song, idx) => (
            <SongCard key={idx} {...song} />
          ))}
        </div>
      </section>
    </div>
  );
}
