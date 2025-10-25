import { User, Music, Clock, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const topArtists = [
  { name: "Eminem", plays: "1.2K", image: album1 },
  { name: "Various Artists", plays: "856", image: album2 },
  { name: "EDM Collective", plays: "654", image: album3 },
];

const topTracks = [
  { title: "Lose Yourself", artist: "Eminem", plays: 142 },
  { title: "Mockingbird", artist: "Eminem", plays: 128 },
  { title: "Chill Waves", artist: "Various Artists", plays: 96 },
  { title: "Energy Boost", artist: "EDM Hits", plays: 84 },
];

const listeningJourney = [
  { milestone: "First Track", date: "Jan 2024", description: "Started with Hip-Hop" },
  { milestone: "50 Tracks", date: "Feb 2024", description: "Discovered Lo-Fi" },
  { milestone: "100 Tracks", date: "Mar 2024", description: "Expanded to EDM" },
];

export default function Profile() {
  return (
    <div className="space-y-8 pb-32 animate-slide-up">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl p-8 border border-primary/30">
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            <User className="w-16 h-16" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-montserrat font-bold mb-2">Vansh</h1>
            <p className="text-muted-foreground font-inter mb-4">
              Music enthusiast • Hip-Hop lover
            </p>
            <div className="flex gap-8 mb-4">
              <div>
                <p className="text-2xl font-montserrat font-bold text-primary">142</p>
                <p className="text-sm text-muted-foreground">Tracks Played</p>
              </div>
              <div>
                <p className="text-2xl font-montserrat font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Playlists</p>
              </div>
              <div>
                <p className="text-2xl font-montserrat font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(168,85,247,0.4)] font-poppins font-semibold">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* AI Mood Profile */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h2 className="text-2xl font-montserrat font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Your Music Personality
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-4xl font-montserrat font-bold text-primary mb-2">
              Optimistic Dreamer
            </p>
            <p className="text-muted-foreground font-inter">
              You prefer energetic tracks in the morning and chill vibes in the evening.
              Your listening pattern shows a love for storytelling in music.
            </p>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-poppins">Hip-Hop</span>
                <span className="text-sm text-primary">65%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-poppins">Lo-Fi</span>
                <span className="text-sm text-primary">25%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[25%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-poppins">EDM</span>
                <span className="text-sm text-primary">10%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[10%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Artists */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4 flex items-center gap-2">
          <Music className="w-6 h-6 text-primary" />
          Top Artists
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topArtists.map((artist, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{artist.plays} plays</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Tracks */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary" />
          Most Played Tracks
        </h2>
        <div className="space-y-2">
          {topTracks.map((track, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-card rounded-xl p-4 hover:bg-secondary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30"
            >
              <span className="text-2xl font-montserrat font-bold text-primary w-8">
                {idx + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-poppins font-semibold">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.artist}</p>
              </div>
              <span className="text-sm text-muted-foreground">{track.plays} plays</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listening Journey */}
      <section>
        <h2 className="text-2xl font-montserrat font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Your Listening Journey
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
          <div className="space-y-6">
            {listeningJourney.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  <span className="text-sm font-montserrat font-bold">{idx + 1}</span>
                </div>
                <div className="flex-1 bg-card rounded-xl p-4 border border-border">
                  <h3 className="font-poppins font-semibold text-lg">{item.milestone}</h3>
                  <p className="text-sm text-primary mb-1">{item.date}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
