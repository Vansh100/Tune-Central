import { Home, Search, Library, Heart, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Search", icon: Search, href: "/search" },
  { name: "Library", icon: Library, href: "/library" },
  { name: "Favorites", icon: Heart, href: "/favorites" },
  { name: "Profile", icon: User, href: "/profile" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-montserrat font-bold text-primary">
          Tune Central
        </h1>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                isActive
                  ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                />
                <span className="font-poppins font-medium">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
