import { Play, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import album1 from "@/assets/album-1.jpg";

export const MusicPlayer = () => {
  const navigate = useNavigate();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-card/95 backdrop-blur-xl border-t border-border px-6 flex items-center justify-between z-50">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/4">
        <img
          src={album1}
          alt="Album cover"
          className="w-14 h-14 rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/player")}
        />
        <div className="overflow-hidden">
          <h4 className="font-poppins font-semibold text-foreground truncate">
            Lose Yourself
          </h4>
          <p className="text-sm text-muted-foreground truncate">Eminem</p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Heart className="w-5 h-5" />
        </Button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 w-1/2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-110"
          >
            <Play className="w-5 h-5 fill-current" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-muted-foreground">1:23</span>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground">3:45</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/player")}
          className="text-muted-foreground hover:text-foreground"
        >
          <Maximize2 className="w-5 h-5" />
        </Button>
        <Volume2 className="w-5 h-5 text-muted-foreground" />
        <Slider
          defaultValue={[70]}
          max={100}
          step={1}
          className="w-24"
        />
      </div>
    </footer>
  );
};
