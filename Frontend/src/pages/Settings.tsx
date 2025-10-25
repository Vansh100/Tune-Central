import { User, Lock, Bell, Music, Sparkles, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const settingsSections = [
  {
    title: "Account Settings",
    icon: User,
    fields: [
      { label: "Email", type: "email", value: "vansh@tunecentral.com" },
      { label: "Username", type: "text", value: "vansh_music" },
    ],
  },
  {
    title: "Playback Quality",
    icon: Music,
    options: [
      { label: "Auto (Recommended)", value: "auto" },
      { label: "High Quality", value: "high" },
      { label: "Lossless", value: "lossless" },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/auth"), 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 animate-slide-up">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-montserrat font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground font-inter">
          Customize your Tune Central experience
        </p>
      </div>

      {/* Account Settings */}
      <section className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-poppins font-semibold">Account Settings</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-poppins mb-2">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="vansh@tunecentral.com"
              className="bg-background/50"
            />
          </div>
          <div>
            <Label htmlFor="username" className="font-poppins mb-2">Username</Label>
            <Input
              id="username"
              type="text"
              defaultValue="vansh_music"
              className="bg-background/50"
            />
          </div>
          <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 font-poppins">
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </div>
      </section>

      {/* Playback Quality */}
      <section className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Music className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-poppins font-semibold">Playback Quality</h2>
        </div>
        <Separator />
        <div className="space-y-3">
          {["Auto (Recommended)", "High Quality", "Lossless"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
            >
              <input type="radio" name="quality" className="text-primary" defaultChecked={option === "Auto (Recommended)"} />
              <span className="font-poppins">{option}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-poppins font-semibold">Notifications</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          {[
            { label: "New Releases", description: "Get notified about new music from your favorite artists" },
            { label: "Weekly Summaries", description: "Receive your weekly listening report" },
            { label: "AI Recommendations", description: "Get personalized music suggestions" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <p className="font-poppins font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </section>

      {/* AI Personalization */}
      <section className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-poppins font-semibold">AI Personalization</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-poppins font-medium">Enable AI Recommendations</p>
              <p className="text-sm text-muted-foreground">Let AI suggest music based on your taste</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-poppins font-medium">Mood Detection</p>
              <p className="text-sm text-muted-foreground">Automatically detect your listening mood</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 font-poppins">
            Reset Recommendations
          </Button>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-card rounded-2xl p-6 border border-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl font-poppins font-semibold">Privacy</h2>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-poppins font-medium">Private Mode</p>
              <p className="text-sm text-muted-foreground">Hide your listening activity from others</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-poppins font-medium">Share Profile</p>
              <p className="text-sm text-muted-foreground">Allow others to see your public playlists</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <Button className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(168,85,247,0.4)] font-poppins font-semibold text-lg py-6 animate-pulse-glow">
        Save Changes
      </Button>

      {/* Logout Button */}
      <Button 
        onClick={handleLogout}
        variant="outline" 
        className="w-full border-destructive/50 text-destructive hover:bg-destructive hover:text-white font-poppins font-semibold text-lg py-6 transition-all duration-300 group"
      >
        <LogOut className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
        Log Out
      </Button>
    </div>
  );
}
