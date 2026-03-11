import React, { useState, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Header, 
  Hero, 
  FilterBar, 
  MasonryGrid, 
  DailyTip, 
  NewTechniques, 
  MiseEnPlace, 
  PlateBuilder,
  Footer 
} from "./components";

function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState("dashboard");

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

  return (
    <div className="min-h-screen bg-background-dark text-white font-body antialiased">
      <Header 
        onSearch={handleSearch} 
        currentSection={currentSection}
      />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inspiration Feed */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <Hero />
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
          <MasonryGrid 
            activeFilter={activeFilter}
            searchQuery={searchQuery}
          />
        </div>
        
        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <DailyTip />
          <NewTechniques />
          <MiseEnPlace />
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