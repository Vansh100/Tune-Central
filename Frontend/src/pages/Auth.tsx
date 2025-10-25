import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logoSoundwave from "@/assets/logo-soundwave.png";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    if (email && password) {
      toast.success(`Welcome${isLogin ? ' back' : ''}! Redirecting...`);
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden dark">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background dark:from-primary/20">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/20 blur-3xl animate-float"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-card/50 backdrop-blur-xl rounded-2xl p-8 shadow-elevated border border-border/50 animate-scale-in">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={logoSoundwave}
              alt="Tune Central"
              className="w-20 h-20 mb-4"
            />
            <h1 className="text-3xl font-montserrat font-bold text-primary">
              Tune Central
            </h1>
            <p className="text-muted-foreground mt-2 font-inter">
              {isLogin ? "Welcome back!" : "Join the experience"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-poppins">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-poppins">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-border focus:border-primary transition-colors"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground font-poppins">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-poppins font-semibold shadow-lg transition-all duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          {/* Alternative Login Options */}
          <div className="mt-6 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="font-poppins border-border hover:bg-secondary">
                Google
              </Button>
              <Button variant="outline" className="font-poppins border-border hover:bg-secondary">
                Apple
              </Button>
            </div>
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-inter"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-primary font-semibold underline">
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-primary hover:underline font-inter">
                Forgot Password?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
