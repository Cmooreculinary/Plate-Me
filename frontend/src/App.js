import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Header, 
  Hero, 
  FilterBar, 
  MasonryGrid, 
  QuickStats,
  TrendingWeek,
  DailyTip, 
  NewTechniques, 
  MiseEnPlace, 
  MobileMenu,
  Footer 
} from "./components";

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [activeSkillLevel, setActiveSkillLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(1);

  // Set document title
  useEffect(() => {
    document.title = "Plate Me - Culinary Plating Inspiration & Techniques";
  }, []);

  // Initialize stats from localStorage
  useEffect(() => {
    const favorites = localStorage.getItem('plateme_favorites');
    const favCount = favorites ? JSON.parse(favorites).length : 0;
    setFavoritesCount(favCount);

    const checklist = localStorage.getItem('plateme_checklist');
    const completed = checklist 
      ? JSON.parse(checklist).filter(item => item.checked).length 
      : 1;
    setCompletedCount(completed);
  }, []);

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['dashboard', 'builder', 'techniques', 'station'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSkillLevelChange = (level) => {
    setActiveSkillLevel(level);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleFavoritesChange = (count) => {
    setFavoritesCount(count);
  };

  const handleChecklistChange = (count) => {
    setCompletedCount(count);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white font-body antialiased">
      <Header 
        onSearch={handleSearch} 
        currentSection={currentSection}
        onMenuToggle={() => setMobileMenuOpen(true)}
      />
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentSection={currentSection}
      />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inspiration Feed */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <Hero />
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            activeSkillLevel={activeSkillLevel}
            onSkillLevelChange={handleSkillLevelChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          <MasonryGrid 
            activeFilter={activeFilter}
            searchQuery={searchQuery}
            activeSkillLevel={activeSkillLevel}
            sortBy={sortBy}
            onFavoritesChange={handleFavoritesChange}
          />
        </div>
        
        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <QuickStats 
            favoritesCount={favoritesCount}
            completedCount={completedCount}
          />
          <TrendingWeek />
          <DailyTip />
          <NewTechniques />
          <MiseEnPlace onChecklistChange={handleChecklistChange} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;