import { Plus, Music, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";
import album4 from "@/assets/album-4.jpg";
import album5 from "@/assets/album-5.jpg";
import album6 from "@/assets/album-6.jpg";

const playlists = [
  { name: "Electric Dreams", tracks: 42, image: album1, duration: "2h 15m" },
  { name: "Cosmic Vibes", tracks: 28, image: album2, duration: "1h 45m" },
  { name: "Speed Energy", tracks: 35, image: album3, duration: "2h 08m" },
  { name: "Sunset Chill", tracks: 19, image: album4, duration: "1h 12m" },
  { name: "Night Drive", tracks: 31, image: album5, duration: "1h 58m" },
  { name: "Beach Paradise", tracks: 24, image: album6, duration: "1h 32m" },
];

const stats = [
  { label: "Total Tracks", value: "120" },
  { label: "Hours Listened", value: "14h" },
  { label: "Top Genre", value: "Hip-Hop" },
];

export default function Library() {
  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-montserrat font-bold mb-2">Your Library</h1>
          <p className="text-muted-foreground font-inter">
            All your music in one place
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] font-poppins font-semibold transition-all duration-300">
          <Plus className="w-5 h-5 mr-2" />
          Create Playlist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-sm text-muted-foreground font-inter mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-montserrat font-bold text-primary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Smart Playlist Suggestion */}
      <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl p-6 border border-primary/30 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-poppins font-semibold mb-2">
              AI Smart Playlist
            </h3>
            <p className="text-muted-foreground font-inter mb-4">
              We've created a weekly playlist based on your listening trends. 
              You've listened to <span className="text-primary font-semibold">14 hours</span> this week — mostly Hip-Hop.
            </p>
            <Button className="bg-primary/20 hover:bg-primary/30 hover:scale-105 text-primary border border-primary/50 font-poppins transition-all duration-300">
              Listen Now
            </Button>
          </div>
        </div>
      </div>

      {/* Playlists Grid */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4">Your Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-xl p-4 hover:bg-secondary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1"
            >
              <div className="relative mb-4">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </div>
              <h3 className="font-poppins font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {playlist.name}
              </h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  {playlist.tracks} tracks
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {playlist.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums Section */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[album1, album2, album3, album1, album2, album3].map((album, idx) => (
            <div
              key={idx}
              className="group bg-card rounded-xl p-4 hover:bg-secondary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30"
            >
              <img
                src={album}
                alt="Album"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h3 className="font-poppins font-semibold text-sm truncate group-hover:text-primary transition-colors">
                Album {idx + 1}
              </h3>
              <p className="text-xs text-muted-foreground truncate">Artist Name</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
