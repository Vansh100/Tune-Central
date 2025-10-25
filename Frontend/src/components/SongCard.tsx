import { Play, Heart, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SongCardProps {
  title: string;
  artist: string;
  image: string;
  duration?: string;
  className?: string;
}

export const SongCard = ({ title, artist, image, duration, className }: SongCardProps) => {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl p-4 transition-all duration-300 hover:bg-secondary cursor-pointer border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <Play className="w-5 h-5 fill-current" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-poppins font-semibold text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
        {duration && (
          <p className="text-xs text-muted-foreground">{duration}</p>
        )}
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
