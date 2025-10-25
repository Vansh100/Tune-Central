import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Heart, MoreVertical, Volume2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import album1 from "@/assets/album-1.jpg";

const queue = [
  { title: "Neon Dreams", artist: "Electric Vibes", duration: "5:26" },
  { title: "Cosmic Journey", artist: "Space Odyssey", duration: "3:31" },
  { title: "Speed of Light", artist: "Pulse Nation", duration: "4:50" },
  { title: "Golden Hour", artist: "Sunset Collective", duration: "3:45" },
];

export default function Player() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(33);
  const [volume, setVolume] = useState(70);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="hover:bg-secondary"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Playing from</p>
          <p className="font-poppins font-semibold">Your Daily Mix</p>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-secondary">
          <MoreVertical className="w-6 h-6" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 max-w-2xl mx-auto w-full">
        {/* Album Art */}
        <div className="relative w-full max-w-md aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
          <img
            src={album1}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Song Info */}
        <div className="w-full mb-8 text-center animate-slide-up">
          <h1 className="text-4xl font-montserrat font-bold mb-2">Neon Dreams</h1>
          <p className="text-xl text-muted-foreground">Electric Vibes</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary hover:text-foreground transition-all hover:scale-110"
          >
            <Shuffle className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary hover:text-foreground transition-all hover:scale-110"
          >
            <SkipBack className="w-7 h-7" />
          </Button>
          <Button
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary hover:text-foreground transition-all hover:scale-110"
          >
            <SkipForward className="w-7 h-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary hover:text-foreground transition-all hover:scale-110"
          >
            <Repeat className="w-5 h-5" />
          </Button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-between w-full max-w-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsLiked(!isLiked)}
            className={`hover:bg-secondary ${isLiked ? "text-primary" : ""}`}
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
          </Button>

          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="w-24"
            />
          </div>
        </div>
      </div>

      {/* Queue Section */}
      <div className="border-t border-border bg-card/50 backdrop-blur-lg">
        <div className="max-w-2xl mx-auto px-8 py-6">
          <h2 className="text-lg font-poppins font-semibold mb-4">Up Next</h2>
          <div className="space-y-2">
            {queue.map((song, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  <Play className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-poppins font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-sm text-muted-foreground">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
