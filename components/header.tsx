import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageSquare, Cloud, Image, FileText } from "lucide-react";
import { useMemo } from "react";
import clsx from "clsx";

interface HeaderProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

export function Header({ setActivePage, activePage }: HeaderProps) {
  const navItems = useMemo(
    () => [
      { name: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
      { name: "Chatbot", icon: MessageSquare, page: "chatbot" },
      { name: "Weather", icon: Cloud, page: "weather" },
      { name: "Image Processing", icon: Image, page: "imageProcessing" },
      { name: "Reports", icon: FileText, page: "reportGeneration" },
      { name: "Crop Recommendation", icon: FileText, page: "CropRecommendation" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md dark:bg-gray-900 dark:border-gray-700">
    <div className="w-full max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4">
      {/* Logo */}
      <a href="/" className="hidden md:flex items-center space-x-10 font-bold text-xl text-gray-900 dark:text-white">
        AgriBrain 2.0
      </a>
  
      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        {navItems.map(({ name, icon: Icon, page }) => (
          <Button
            key={page}
            variant={activePage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setActivePage(page)}
            aria-current={activePage === page ? "page" : undefined}
            className={clsx(
              "flex items-center space-x-2 px-3 py-2 transition-all",
              activePage === page
                ? "border-primary bg-primary text-white dark:bg-blue-500 dark:border-blue-500"
                : "border-gray-300 hover:bg-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
            )}
          >
            <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-colors group-hover:text-primary dark:group-hover:text-blue-400" />
            <span className="hidden sm:inline">{name}</span>
          </Button>
        ))}
      </nav>
  
      {/* Mode Toggle */}
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </div>
  </header>
  



  );
}
