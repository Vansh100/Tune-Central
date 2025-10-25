import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, Mic, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SongCard } from "@/components/SongCard";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";

const genres = ["Hip-Hop", "Pop", "Rock", "Electronic", "Jazz", "Classical", "R&B", "Country"];
const moods = ["Happy", "Sad", "Energetic", "Calm", "Romantic", "Angry", "Nostalgic", "Focused"];

const searchResults = [
  { title: "Neon Dreams", artist: "Electric Vibes", image: album1, duration: "5:26" },
  { title: "Cosmic Journey", artist: "Space Odyssey", image: album2, duration: "4:11" },
  { title: "Speed of Light", artist: "Pulse Nation", image: album3, duration: "3:45" },
  { title: "Golden Hour", artist: "Sunset Collective", image: album4, duration: "3:15" },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMoodClick = (mood: string) => {
    navigate(`/search-results?mood=${encodeURIComponent(mood)}`);
  };

  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl py-6 -mx-6 px-6 border-b border-border">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search songs, artists, albums, or moods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg bg-card border-border focus:border-primary rounded-full"
          />
          <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* AI Suggestion */}
      {searchQuery && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <p className="text-sm font-inter">
            Do you mean <span className="text-primary font-semibold">"Rap God by Eminem"</span>?
          </p>
        </div>
      )}

      {/* Discover by Mood */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4">Discover by Mood</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodClick(mood)}
              className="relative overflow-hidden rounded-xl h-32 bg-gradient-to-br from-primary/30 to-purple-500/30 hover:from-primary/40 hover:to-purple-500/40 hover:scale-105 transition-all duration-300 group border border-primary/20 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative h-full flex items-center justify-center">
                <span className="text-xl font-poppins font-semibold">{mood}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Browse by Genre */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4">Browse by Genre</h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              className="px-6 py-2 rounded-full bg-secondary hover:bg-primary/20 border border-border hover:border-primary hover:scale-105 transition-all duration-300 font-poppins font-medium"
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Search Results or Trending */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-montserrat font-bold">
            {searchQuery ? "Search Results" : "Trending Now"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {searchResults.map((song, idx) => (
            <SongCard key={idx} {...song} />
          ))}
        </div>
      </section>

      {/* AI Recommendation */}
      {!searchQuery && (
        <section className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl p-6 border border-primary/30">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-poppins font-semibold mb-2">
                AI Suggestion
              </h3>
              <p className="text-muted-foreground font-inter">
                You've been into Hip-Hop lately. Want to explore some{" "}
                <span className="text-primary font-semibold">Lo-Fi Hip-Hop</span> or{" "}
                <span className="text-primary font-semibold">Jazz Rap</span>?
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
