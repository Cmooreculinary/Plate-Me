import React, { useState, useEffect } from "react";

// Image registry for the food plating dashboard
export const IMAGES = {
  hero_bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Wykg7nV0bhhOghSW8s8M7oo7SS7IGMU5x_hibNtQb2I1DiAnti0C9qvkoIRtjQ8CK9OUkopfEZ7Ve4Ojm9VB78LKY8gifAilFInIat50PK5yn9y5m6iPDsyDCOwqvdwiWBgELsk8_1C6x9B11izqk86lT0AUzU7k6YlnQ2V6DWhHEsSZ6fPGAvazMmwXWBD3kQGW9LgaPY11EtHE52HvPimum5XD9piOeLZfmqfhHMLuw2CXKnHif7vuOXEai5VD3qYBDJXWZQ47",
  
  // Original inspiration cards
  card1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFN7gkw9PRNNIS44Ja0o4L_eCGdv3kINv_uex6aSargrGBeG2soRK3p1uxyxC7Biaqj3ernfBFRalmNVNQJ9I3BE7DJrIrLrp-DI5oFCdWZQ26HjvsEjuOiwxqIdU7PxSdcmmKzk6a2lKv0Ie2TCMck7FINrgBrBpnIlIl6f9YcRoWy8eyAN5fj48_5WkQb_Hs-uswJ-vKJDbp1PABK9c8yENI6wJTfirtii0GKDJK2uf-o5I47dzEGKA5fhawIeWGndG5NWNwkvHa",
  card2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUOnqDAt11UHMtxxfbZVgJ6Z6ApSsBLQiHkjlokgo8aWLskugtBnqD1iTVCLhnc4PYKEyQF6oWdZ7gS0FBiKzm_XQa2fV2ut2TTy5KeJuLkgkBbh6SdYGbgNdnPecnjlM3vDc0TM1o-qrSkYTq28UweEsL-fMBMz4VWEKb8Qc-tre1DzBXuuxxvwtsQfgHJ33mo9w6Q-lkKEHAaouieJv-oENNCdlOIZ-B153KBBXkevBaVNM_s1ed5CzE4qnKeLkibJZoPXJK2Ur0",
  card3: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAVdj7JOsZ33amRj7jeRgKAFp8L4GZhWcN5FoKiFUJkKbm4OstWXPM0CqHCRhPpbuUqwkR65wJ3padeC-thmmUXwOx50Nb-VIQ2rHBMoqXKd6TomrdkrOQ1eY2j7jum35oZjw5N3Azmi-qwu7Ms-M8Uk3vDuPx7tH2NbUteU5XbiAEqWNQ6yu31x0Dc7gQG8D1DrTy6_JJGZaodrFZfqOcSEWgaH0hWWY5ZbVlnFZX0J35xFtsGRF2NO84r2n4gbYeFqbDEl8vrxxA",
  card4: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQnoL3HCPY8zBFm-yjhsm1frdyXx_jK0HN0bswjlGIuOsvmUU32EpyO_bk09buUhfRL-jPbTMId2GZGishLO3bapAdZoH2jIyuP2sM2bf4BmxX4qmKDB1gAem15HVSYJN5BH0pbMh30XTDwFIi1_30CroKTeTEIuJ6un8UfSCeV0rjegPrihYVy1V0IpeL3robIkBz3-wWByAJIEHJuIHMi097taIwpaNBp2EByTQnRG1YDmZxIPkZ4FHJA32I0u07HrYYhkEd4UKl",
  
  // Fine Dining
  fine1: "https://images.unsplash.com/photo-1698434939525-dd584e446a29?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcGxhdGluZ3xlbnwwfHx8fDE3NzMyNjQzMzJ8MA&ixlib=rb-4.1.0&q=85",
  fine2: "https://images.unsplash.com/photo-1761095596757-db038313df59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxmaW5lJTIwZGluaW5nJTIwcGxhdGluZ3xlbnwwfHx8fDE3NzMyNjQzMzJ8MA&ixlib=rb-4.1.0&q=85",
  
  // Buffet
  buffet1: "https://images.unsplash.com/photo-1769638913569-40fc740b44f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwxfHxidWZmZXQlMjBmb29kJTIwZGlzcGxheXxlbnwwfHx8fDE3NzMyNjQzMzh8MA&ixlib=rb-4.1.0&q=85",
  buffet2: "https://images.unsplash.com/photo-1770385802383-ef02bd943338?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MTJ8MHwxfHNlYXJjaHwyfHxidWZmZXQlMjBmb29kJTIwZGlzcGxheXxlbnwwfHx8fDE3NzMyNjQzMzh8MA&ixlib=rb-4.1.0&q=85",
  
  // Street Food
  street1: "https://images.unsplash.com/photo-1648437595587-e6a8b0cdf1f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwcGxhdGluZ3xlbnwwfHx8fDE3NzMyNjQzNDd8MA&ixlib=rb-4.1.0&q=85",
  street2: "https://images.unsplash.com/photo-1560717845-968823efbee1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxzdHJlZXQlMjBmb29kJTIwcGxhdGluZ3xlbnwwfHx8fDE3NzMyNjQzNDd8MA&ixlib=rb-4.1.0&q=85",
  
  // Vegan
  vegan1: "https://images.unsplash.com/photo-1673912401829-6495e87f3b9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHx2ZWdhbiUyMHBsYXRpbmd8ZW58MHx8fHwxNzczMjY0MzUyfDA&ixlib=rb-4.1.0&q=85",
  
  // Molecular Gastronomy
  molecular1: "https://images.unsplash.com/photo-1598214928052-185e72192688?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxtb2xlY3VsYXIlMjBnYXN0cm9ub215fGVufDB8fHx8MTc3MzI2NDM1OXww&ixlib=rb-4.1.0&q=85",
  molecular2: "https://images.unsplash.com/photo-1710261924580-e513dba07a6c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxtb2xlY3VsYXIlMjBnYXN0cm9ub215fGVufDB8fHx8MTc3MzI2NDM1OXww&ixlib=rb-4.1.0&q=85",
  
  // Rustic
  rustic1: "https://images.unsplash.com/photo-1763297104069-41bf64564c86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjBmb29kJTIwcHJlc2VudGF0aW9ufGVufDB8fHx8MTc3MzI2NDM2OHww&ixlib=rb-4.1.0&q=85",
  rustic2: "https://images.unsplash.com/photo-1772864463642-42c789ab5dbd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwzfHxydXN0aWMlMjBmb29kJTIwcHJlc2VudGF0aW9ufGVufDB8fHx8MTc3MzI2NDM2OHww&ixlib=rb-4.1.0&q=85",
  
  // Minimalist
  minimal1: "https://images.unsplash.com/photo-1673663095536-4d8a5a1fb930?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MHx8fHwxNzczMjY0Mzc5fDA&ixlib=rb-4.1.0&q=85",
  minimal2: "https://images.unsplash.com/photo-1673663095512-b188c4604a5a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MHx8fHwxNzczMjY0Mzc5fDA&ixlib=rb-4.1.0&q=85",
  
  // Desserts
  dessert1: "https://images.unsplash.com/photo-1761138785146-7b5ad15851b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZGVzc2VydCUyMHBsYXRpbmd8ZW58MHx8fHwxNzczMjY0Mzg5fDA&ixlib=rb-4.1.0&q=85",
  dessert2: "https://images.unsplash.com/photo-1759277513461-41fde7d24083?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwyfHxnb3VybWV0JTIwZGVzc2VydCUyMHBsYXRpbmd8ZW58MHx8fHwxNzczMjY0Mzg5fDA&ixlib=rb-4.1.0&q=85",
  
  // Techniques
  tech1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-A-lVAzBRTlwxXMdoenHrNl6nNcgFJvjsf9xU1PrKdawdyg3MPpnJUBrf2U2ck0aZVJY2dwPHn1GytZp7nAviMUmE_7BugHQY-jt-gMe-LkQ8VfocqEHXv6EhFGq4PfC9ld_MWgXja1HbE56i2TJIqnQEFXDpv-VSLYjsFt20U2tYBzz-ZmQCQffUiEXQ14Pb8fMi5n-wRsrERhgGQr9_hS5s4Fj9dJ2jIaifQWU51wcSnPfS5QPovT3M7FcrW5xtEBeThqNy3TYu",
  tech2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHlay0tsm5EROYiMQu-M8OKBoN6CZwHfCmXdyqdRHk0cT1i6NIebqbjYswf4aoA9kYAnMVAl8XWn9WPEFxdlCyEuEalTchCfb89ieIfpnn6yNBPhVLNSIKihPNixFhYalmw6A3n6gcV-2r28-NCuaGsp9oLE61dHZg4kaC0Z_Rha4_XjEi4ZuJAURt3x_M0vmQxgXmPVjYEYRtwMjpKeqFVpo_V4-a4CmzdhkOPL7XsFU95aZW94-hJ92QcVh2ClH4AhLcajUPTriB",
  tech3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0habSKcSyRtc7Co84Wh0yPsGpQfPITXiblkyzbGTiG3TxkDkOekCVZ3ekvJE7FZlbSjE7RPhPqZU7Dye0ijgU0blRFFhAZvPqENJ1D1w0lRuv88J7BZXEIhFy_ZbjcbCYx0ES2zIBvNbxJ7ixAxzx5oerV_RcJzTFFSK5tb4ISk2rRJoOnCEDkQK4QuSachZdajuqn0kpQ8w_iJQeA73mozihB_xfjkv_48OTos7OC8GnYzJ4ydDQ91WLPfbBAh9QFNj8t_q-9Ex",
  
  // Profile avatar
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEYochnh9haSoonsm7CULSMtb5qi_kBShgg4cqTNSuju6ZDUlsTm2slSYYIhHkj9b6tYk8lL39A0gx2h_MgS0_z8P5HLhUNceVumd3wNWlclSn88dbLPBecP0OopvjozR4zI3D70hRaDyeh5mx7y_G2HbKcERvenh50nX7gOIXnwA10Qy8_Y_VQXBWPbwcF5OnTwub5wI4X6i3DPr_J74x9swnNsrBoiYvJdZn_bQZH_elubqnWIrUUE7gfMgqomDDkBERZ3W08jJs"
};

// All inspiration cards data
const ALL_CARDS = [
  // Original cards
  {
    id: 1,
    image: IMAGES.card1,
    title: "Molecular Gastronomy",
    level: "Advanced",
    category: "fine",
    description: "Exploring textures with foams and spherification.",
    views: "2.4k",
    aspectRatio: "4/5"
  },
  {
    id: 2,
    image: IMAGES.card2,
    title: "Minimalist Scallop",
    level: "Intermediate",
    category: "fine",
    description: "Focus on negative space and clean lines.",
    views: "850",
    aspectRatio: "1/1"
  },
  {
    id: 3,
    image: IMAGES.card3,
    title: "Rustic Presentation",
    level: "Beginner",
    category: "buffet",
    description: "Authentic farm-to-table aesthetic.",
    views: "1.2k",
    aspectRatio: "3/4"
  },
  {
    id: 4,
    image: IMAGES.card4,
    title: "Nordic Influence",
    level: "Expert",
    category: "vegan",
    description: "Using foraged ingredients and natural elements.",
    views: "3.1k",
    aspectRatio: "16/9"
  },
  // Fine Dining
  {
    id: 5,
    image: IMAGES.fine1,
    title: "Scallop Crudo",
    level: "Expert",
    category: "fine",
    description: "Delicate raw scallop with citrus and microgreens.",
    views: "4.2k",
    aspectRatio: "1/1"
  },
  {
    id: 6,
    image: IMAGES.fine2,
    title: "Gourmet Shrimp",
    level: "Advanced",
    category: "fine",
    description: "Sophisticated shrimp appetizer with artistic plating.",
    views: "3.8k",
    aspectRatio: "4/3"
  },
  // Buffet
  {
    id: 7,
    image: IMAGES.buffet1,
    title: "Buffet Spread",
    level: "Intermediate",
    category: "buffet",
    description: "Professional buffet display with variety.",
    views: "5.1k",
    aspectRatio: "16/9"
  },
  {
    id: 8,
    image: IMAGES.buffet2,
    title: "Market Display",
    level: "Beginner",
    category: "buffet",
    description: "Organized food presentation for catering.",
    views: "2.9k",
    aspectRatio: "4/3"
  },
  // Street Food
  {
    id: 9,
    image: IMAGES.street1,
    title: "Street Tacos",
    level: "Beginner",
    category: "street",
    description: "Vibrant tacos with fresh garnishes and lime.",
    views: "6.7k",
    aspectRatio: "1/1"
  },
  {
    id: 10,
    image: IMAGES.street2,
    title: "Colorful Fish Plate",
    level: "Intermediate",
    category: "street",
    description: "Street-style fish with artistic vegetable arrangement.",
    views: "4.5k",
    aspectRatio: "4/5"
  },
  // Vegan
  {
    id: 11,
    image: IMAGES.vegan1,
    title: "Plant-Based Bowl",
    level: "Intermediate",
    category: "vegan",
    description: "Colorful vegan bowl with seasonal vegetables.",
    views: "5.3k",
    aspectRatio: "1/1"
  },
  // Molecular Gastronomy
  {
    id: 12,
    image: IMAGES.molecular1,
    title: "Strawberry Spheres",
    level: "Expert",
    category: "fine",
    description: "Modern molecular technique with fruit spherification.",
    views: "7.2k",
    aspectRatio: "3/4"
  },
  {
    id: 13,
    image: IMAGES.molecular2,
    title: "Foam & Gel",
    level: "Advanced",
    category: "fine",
    description: "Innovative textures using molecular gastronomy.",
    views: "6.1k",
    aspectRatio: "4/5"
  },
  // Rustic
  {
    id: 14,
    image: IMAGES.rustic1,
    title: "Roasted Vegetables",
    level: "Beginner",
    category: "buffet",
    description: "Simple rustic presentation with roasted carrots.",
    views: "3.4k",
    aspectRatio: "4/3"
  },
  {
    id: 15,
    image: IMAGES.rustic2,
    title: "Artisan Bread",
    level: "Beginner",
    category: "buffet",
    description: "Rustic bread presentation on wooden board.",
    views: "2.8k",
    aspectRatio: "16/9"
  },
  // Minimalist
  {
    id: 16,
    image: IMAGES.minimal1,
    title: "Clean Lines",
    level: "Advanced",
    category: "fine",
    description: "Minimalist plating with precise vegetable arrangement.",
    views: "4.9k",
    aspectRatio: "1/1"
  },
  {
    id: 17,
    image: IMAGES.minimal2,
    title: "White Space",
    level: "Intermediate",
    category: "fine",
    description: "Elegant minimalist composition with negative space.",
    views: "3.7k",
    aspectRatio: "4/5"
  },
  // Desserts
  {
    id: 18,
    image: IMAGES.dessert1,
    title: "Chocolate Elegance",
    level: "Expert",
    category: "fine",
    description: "Gourmet chocolate dessert with berries and gold leaf.",
    views: "8.1k",
    aspectRatio: "3/4"
  },
  {
    id: 19,
    image: IMAGES.dessert2,
    title: "Pastry Art",
    level: "Advanced",
    category: "fine",
    description: "Delicate pastry with green topping and edible flowers.",
    views: "5.6k",
    aspectRatio: "1/1"
  }
];

// Smooth scroll utility
const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Mobile Menu Component
export const MobileMenu = ({ isOpen, onClose, currentSection }) => {
  if (!isOpen) return null;

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-surface-dark border-l border-slate-700 p-6 animate-slide-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-primary">
          <span className="material-symbols-outlined">close</span>
        </button>
        <nav className="flex flex-col gap-6 mt-12">
          <a 
            className={`text-base font-medium hover:text-primary transition-colors ${
              currentSection === 'dashboard' ? 'text-primary font-bold' : 'text-white'
            }`}
            href="#dashboard"
            onClick={(e) => handleNavClick(e, 'dashboard')}
          >
            Dashboard
          </a>
          <a 
            className={`text-base font-medium hover:text-primary transition-colors ${
              currentSection === 'builder' ? 'text-primary font-bold' : 'text-white'
            }`}
            href="#builder"
            onClick={(e) => handleNavClick(e, 'builder')}
          >
            Plate Builder
          </a>
          <a 
            className={`text-base font-medium hover:text-primary transition-colors ${
              currentSection === 'techniques' ? 'text-primary font-bold' : 'text-white'
            }`}
            href="#techniques"
            onClick={(e) => handleNavClick(e, 'techniques')}
          >
            Techniques
          </a>
          <a 
            className={`text-base font-medium hover:text-primary transition-colors ${
              currentSection === 'station' ? 'text-primary font-bold' : 'text-white'
            }`}
            href="#station"
            onClick={(e) => handleNavClick(e, 'station')}
          >
            Station Setup
          </a>
        </nav>
      </div>
    </div>
  );
};

// Header Component
export const Header = ({ onSearch, currentSection, onMenuToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    smoothScrollTo(sectionId);
  };

  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid ${
      scrolled ? "border-slate-700" : "border-surface-dark"
    } bg-background-dark px-6 md:px-10 py-3 sticky top-0 z-50 transition-all`}>
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-4 text-white hover:opacity-80 transition-opacity"
        >
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Plate Me</h2>
        </button>
        <nav className="hidden md:flex items-center gap-9">
          <a 
            className={`text-sm font-medium leading-normal hover:text-primary transition-colors ${
              currentSection === 'dashboard' ? 'text-white font-bold border-b-2 border-primary' : 'text-slate-400'
            }`}
            href="#dashboard"
            onClick={(e) => handleNavClick(e, 'dashboard')}
          >
            Dashboard
          </a>
          <a 
            className={`text-sm font-medium leading-normal hover:text-primary transition-colors ${
              currentSection === 'builder' ? 'text-white font-bold border-b-2 border-primary' : 'text-slate-400'
            }`}
            href="#builder"
            onClick={(e) => handleNavClick(e, 'builder')}
          >
            Plate Builder
          </a>
          <a 
            className={`text-sm font-medium leading-normal hover:text-primary transition-colors ${
              currentSection === 'techniques' ? 'text-white font-bold border-b-2 border-primary' : 'text-slate-400'
            }`}
            href="#techniques"
            onClick={(e) => handleNavClick(e, 'techniques')}
          >
            Techniques
          </a>
          <a 
            className={`text-sm font-medium leading-normal hover:text-primary transition-colors ${
              currentSection === 'station' ? 'text-white font-bold border-b-2 border-primary' : 'text-slate-400'
            }`}
            href="#station"
            onClick={(e) => handleNavClick(e, 'station')}
          >
            Station Setup
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <label className="flex flex-col min-w-40 h-10 max-w-64 hidden sm:flex">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-dark group focus-within:ring-2 focus-within:ring-primary">
            <div className="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Search plates..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </label>
        <button
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/50 hover:ring-primary transition-all"
          style={{ backgroundImage: `url(${IMAGES.profile})` }}
          aria-label="Chef profile"
          onClick={() => alert('Profile menu coming soon!')}
        />
        <button
          onClick={onMenuToggle}
          className="md:hidden text-white hover:text-primary transition-colors"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
      </div>
    </header>
  );
};

// Hero Section
export const Hero = () => {
  const handleExploreClick = () => {
    smoothScrollTo('techniques');
  };

  return (
    <div id="dashboard" className="rounded-xl overflow-hidden relative">
      <div
        className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 relative group"
        style={{ backgroundImage: `url(${IMAGES.hero_bg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-0"></div>
        <div className="flex flex-col gap-3 text-center z-10 max-w-2xl">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl drop-shadow-lg">
            Elevate Your Plating
          </h1>
          <p className="text-slate-200 text-lg font-medium leading-relaxed drop-shadow-md">
            Discover the art of presentation with daily inspiration and techniques from Michelin-starred chefs.
          </p>
        </div>
        <button 
          onClick={handleExploreClick}
          className="z-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide hover:bg-white hover:text-black transition-colors shadow-lg shadow-primary/20"
        >
          Explore Techniques
        </button>
      </div>
    </div>
  );
};

// Filter Bar with Skill Level and Sort
export const FilterBar = ({ activeFilter, onFilterChange, activeSkillLevel, onSkillLevelChange, sortBy, onSortChange }) => {
  const filters = [
    { id: "all", label: "All Styles", icon: "apps" },
    { id: "fine", label: "Fine Dining", icon: "room_service" },
    { id: "buffet", label: "Buffet", icon: "storefront" },
    { id: "street", label: "Street Food", icon: "kebab_dining" },
    { id: "vegan", label: "Vegan", icon: "eco" }
  ];

  const skillLevels = ["All Levels", "Beginner", "Intermediate", "Advanced", "Expert"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "skill", label: "By Skill Level" }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Style Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all ${
              activeFilter === filter.id
                ? "bg-primary text-background-dark shadow-lg shadow-primary/10"
                : "bg-surface-dark hover:bg-slate-700 text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{filter.icon}</span>
            <p className="text-sm font-medium">{filter.label}</p>
          </button>
        ))}
      </div>

      {/* Skill Level & Sort Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Skill:</span>
          <select
            value={activeSkillLevel}
            onChange={(e) => onSkillLevelChange(e.target.value)}
            className="bg-surface-dark text-white text-sm rounded-lg px-3 py-2 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            {skillLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-surface-dark text-white text-sm rounded-lg px-3 py-2 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

// Inspiration Card
const InspirationCard = ({ card, isFavorited, onToggleFavorite }) => {
  const levelColors = {
    Advanced: "bg-primary/20 text-primary",
    Intermediate: "bg-blue-500/20 text-blue-400",
    Beginner: "bg-green-500/20 text-green-400",
    Expert: "bg-purple-500/20 text-purple-400"
  };

  return (
    <div className="break-inside-avoid rounded-xl bg-surface-dark border border-slate-800 overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: card.aspectRatio }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${card.image})` }}
        />
        <button
          onClick={() => onToggleFavorite(card.id)}
          className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full p-2 text-white hover:text-primary cursor-pointer transition-colors"
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={`material-symbols-outlined text-[20px] block ${isFavorited ? 'fill-current' : ''}`}>
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white text-lg font-bold">{card.title}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${levelColors[card.level]}`}>
            {card.level}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-3">{card.description}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>{card.views} views</span>
        </div>
      </div>
    </div>
  );
};

// Masonry Grid
export const MasonryGrid = ({ activeFilter, searchQuery, activeSkillLevel, sortBy, onFavoritesChange }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('plateme_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (onFavoritesChange) {
      onFavoritesChange(favorites.length);
    }
  }, [favorites, onFavoritesChange]);

  const toggleFavorite = (cardId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId];
      localStorage.setItem('plateme_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Filter cards based on active filter, search query, and skill level
  let filteredCards = ALL_CARDS.filter(card => {
    const matchesFilter = activeFilter === 'all' || card.category === activeFilter;
    const matchesSearch = !searchQuery || 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkillLevel = activeSkillLevel === 'All Levels' || card.level === activeSkillLevel;
    return matchesFilter && matchesSearch && matchesSkillLevel;
  });

  // Sort cards
  if (sortBy === 'popular') {
    filteredCards = [...filteredCards].sort((a, b) => {
      const aViews = parseFloat(a.views.replace('k', '')) * 1000;
      const bViews = parseFloat(b.views.replace('k', '')) * 1000;
      return bViews - aViews;
    });
  } else if (sortBy === 'newest') {
    filteredCards = [...filteredCards].reverse();
  } else if (sortBy === 'skill') {
    const skillOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
    filteredCards = [...filteredCards].sort((a, b) => skillOrder[a.level] - skillOrder[b.level]);
  }

  return (
    <div className="columns-1 md:columns-2 gap-6 space-y-6">
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => (
          <InspirationCard 
            key={card.id} 
            card={card}
            isFavorited={favorites.includes(card.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12 bg-surface-dark rounded-xl border border-slate-800">
          <span className="material-symbols-outlined text-6xl text-slate-600 mb-4 block">search_off</span>
          <p className="text-slate-400 text-lg font-semibold">No plates found matching your criteria.</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters, skill level, or search query.</p>
        </div>
      )}
    </div>
  );
};

// Quick Stats Widget
export const QuickStats = ({ favoritesCount, completedCount }) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-surface-dark border border-primary/20 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">insights</span>
        <h3 className="text-white text-lg font-bold">Your Progress</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-black text-primary">{favoritesCount}</div>
          <div className="text-xs text-slate-400 mt-1">Favorites</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-primary">{completedCount}/4</div>
          <div className="text-xs text-slate-400 mt-1">Tasks Done</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-primary">19</div>
          <div className="text-xs text-slate-400 mt-1">Techniques</div>
        </div>
      </div>
    </div>
  );
};

// Trending This Week Widget
export const TrendingWeek = () => {
  const trending = [
    { title: "Chocolate Elegance", views: "8.1k", trend: "+24%" },
    { title: "Nordic Influence", views: "3.1k", trend: "+18%" },
    { title: "Strawberry Spheres", views: "7.2k", trend: "+15%" }
  ];

  return (
    <div className="bg-surface-dark border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">trending_up</span>
        <h3 className="text-white text-lg font-bold">Trending This Week</h3>
      </div>
      <div className="space-y-3">
        {trending.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="text-primary font-bold text-lg">#{idx + 1}</div>
              <div>
                <div className="text-white text-sm font-semibold">{item.title}</div>
                <div className="text-slate-500 text-xs">{item.views} views</div>
              </div>
            </div>
            <div className="text-green-400 text-xs font-bold">{item.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Daily Garnish Tip Widget
export const DailyTip = () => {
  const handleReadGuide = (e) => {
    e.preventDefault();
    alert('Full garnish guide coming soon! This will open a detailed tutorial on micro-herb placement techniques.');
  };

  return (
    <div className="bg-surface-dark border border-slate-800 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-[120px] text-primary -rotate-12">local_florist</span>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-primary mb-3">
          <span className="material-symbols-outlined text-xl">lightbulb</span>
          <h4 className="text-sm font-bold uppercase tracking-wider">Daily Garnish Tip</h4>
        </div>
        <h3 className="text-white text-xl font-bold mb-2">Micro-Herb Placement</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Instead of scattering, try clustering your micro-herbs in odd numbers (3 or 5) to create focal points on the plate.
        </p>
        <a 
          className="inline-flex items-center text-primary text-sm font-bold hover:underline cursor-pointer" 
          href="#guide"
          onClick={handleReadGuide}
        >
          Read full guide <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
        </a>
      </div>
    </div>
  );
};

// New Techniques List
export const NewTechniques = () => {
  const techniques = [
    {
      id: 1,
      image: IMAGES.tech1,
      title: "Tweezer Precision",
      description: "Mastering the art of delicate placement."
    },
    {
      id: 2,
      image: IMAGES.tech2,
      title: "Squeeze Bottle Art",
      description: "Create perfect dots, swooshes, and lines."
    },
    {
      id: 3,
      image: IMAGES.tech3,
      title: "Smoke Infusion",
      description: "Adding drama and flavor with smoke guns."
    }
  ];

  const handleViewAll = (e) => {
    e.preventDefault();
    smoothScrollTo('techniques');
  };

  const handleTechniqueClick = (e, technique) => {
    e.preventDefault();
    alert(`${technique.title} tutorial coming soon! This will open a detailed video and step-by-step guide.`);
  };

  return (
    <div id="techniques" className="bg-surface-dark border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-bold">New Techniques</h3>
        <a 
          className="text-xs text-slate-400 hover:text-white cursor-pointer" 
          href="#all"
          onClick={handleViewAll}
        >
          View All
        </a>
      </div>
      <div className="flex flex-col gap-4">
        {techniques.map((tech) => (
          <a 
            key={tech.id} 
            className="flex gap-4 items-center group cursor-pointer" 
            href="#technique"
            onClick={(e) => handleTechniqueClick(e, tech)}
          >
            <div
              className="size-14 rounded-lg bg-cover bg-center shrink-0 border border-slate-700 group-hover:border-primary transition-colors"
              style={{ backgroundImage: `url(${tech.image})` }}
            />
            <div className="flex flex-col">
              <h4 className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                {tech.title}
              </h4>
              <p className="text-slate-400 text-xs mt-1">{tech.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Mise en Place Checklist
export const MiseEnPlace = () => {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem('plateme_checklist');
    return saved ? JSON.parse(saved) : [
      { id: 1, label: "Sharpen Knives", checked: true },
      { id: 2, label: "Prep Micro-greens", checked: false },
      { id: 3, label: "Fill Squeeze Bottles", checked: false },
      { id: 4, label: "Clean Rim Cloths", checked: false }
    ];
  });

  const toggleCheck = (id) => {
    setChecklist(prev => {
      const updated = prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      localStorage.setItem('plateme_checklist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleViewFullSetup = () => {
    smoothScrollTo('station');
  };

  return (
    <div id="station" className="bg-gradient-to-br from-surface-dark to-black border border-slate-800 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary">checklist</span>
        <h3 className="text-lg font-bold">Mise en Place</h3>
      </div>
      <div className="space-y-3">
        {checklist.map((item) => (
          <label key={item.id} className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer group">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(item.id)}
              className="form-checkbox rounded bg-slate-800 border-slate-600 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
            />
            <span className={`group-hover:text-white transition-colors ${item.checked ? 'line-through opacity-50' : ''}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
      <button 
        onClick={handleViewFullSetup}
        className="w-full mt-6 py-2 rounded border border-slate-600 hover:border-primary hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors"
      >
        View Full Setup
      </button>
    </div>
  );
};

// Placeholder sections for navigation
export const PlateBuilder = () => (
  <div id="builder" className="min-h-screen flex items-center justify-center">
    <div className="text-center max-w-2xl mx-auto p-8">
      <span className="material-symbols-outlined text-primary text-6xl mb-4 block">restaurant</span>
      <h2 className="text-white text-3xl font-bold mb-4">Plate Builder Tool</h2>
      <p className="text-slate-400 text-lg mb-6">
        Design your perfect plate with our interactive builder. Drag and drop ingredients, adjust portions, and visualize your creation.
      </p>
      <button className="bg-primary text-background-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors">
        Coming Soon
      </button>
    </div>
  </div>
);

// Footer
export const Footer = () => {
  const handleFooterLink = (e, linkName) => {
    e.preventDefault();
    alert(`${linkName} page coming soon!`);
  };

  return (
    <footer className="border-t border-surface-dark py-8 px-10 mt-auto bg-background-dark">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">© 2023 Plate Me. All rights reserved.</p>
        <div className="flex gap-6">
          <a 
            className="text-slate-400 text-sm hover:text-primary cursor-pointer" 
            href="#privacy"
            onClick={(e) => handleFooterLink(e, 'Privacy Policy')}
          >
            Privacy Policy
          </a>
          <a 
            className="text-slate-400 text-sm hover:text-primary cursor-pointer" 
            href="#terms"
            onClick={(e) => handleFooterLink(e, 'Terms of Service')}
          >
            Terms of Service
          </a>
          <a 
            className="text-slate-400 text-sm hover:text-primary cursor-pointer" 
            href="#support"
            onClick={(e) => handleFooterLink(e, 'Support')}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};
