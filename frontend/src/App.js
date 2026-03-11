import React from "react";
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
  Footer 
} from "./components";

function Dashboard() {
  return (
    <div className="min-h-screen bg-background-dark text-white font-body antialiased">
      <Header />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inspiration Feed */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <Hero />
          <FilterBar />
          <MasonryGrid />
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