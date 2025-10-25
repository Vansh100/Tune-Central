import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MusicPlayer } from "./MusicPlayer";

export const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-inter">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
      <MusicPlayer />
    </div>
  );
};
