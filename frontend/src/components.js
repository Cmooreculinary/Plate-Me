import React, { useState } from "react";

// Image registry for the food plating dashboard
export const IMAGES = {
  hero_bg: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Wykg7nV0bhhOghSW8s8M7oo7SS7IGMU5x_hibNtQb2I1DiAnti0C9qvkoIRtjQ8CK9OUkopfEZ7Ve4Ojm9VB78LKY8gifAilFInIat50PK5yn9y5m6iPDsyDCOwqvdwiWBgELsk8_1C6x9B11izqk86lT0AUzU7k6YlnQ2V6DWhHEsSZ6fPGAvazMmwXWBD3kQGW9LgaPY11EtHE52HvPimum5XD9piOeLZfmqfhHMLuw2CXKnHif7vuOXEai5VD3qYBDJXWZQ47",
  
  // Inspiration cards
  card1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFN7gkw9PRNNIS44Ja0o4L_eCGdv3kINv_uex6aSargrGBeG2soRK3p1uxyxC7Biaqj3ernfBFRalmNVNQJ9I3BE7DJrIrLrp-DI5oFCdWZQ26HjvsEjuOiwxqIdU7PxSdcmmKzk6a2lKv0Ie2TCMck7FINrgBrBpnIlIl6f9YcRoWy8eyAN5fj48_5WkQb_Hs-uswJ-vKJDbp1PABK9c8yENI6wJTfirtii0GKDJK2uf-o5I47dzEGKA5fhawIeWGndG5NWNwkvHa",
  card2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUOnqDAt11UHMtxxfbZVgJ6Z6ApSsBLQiHkjlokgo8aWLskugtBnqD1iTVCLhnc4PYKEyQF6oWdZ7gS0FBiKzm_XQa2fV2ut2TTy5KeJuLkgkBbh6SdYGbgNdnPecnjlM3vDc0TM1o-qrSkYTq28UweEsL-fMBMz4VWEKb8Qc-tre1DzBXuuxxvwtsQfgHJ33mo9w6Q-lkKEHAaouieJv-oENNCdlOIZ-B153KBBXkevBaVNM_s1ed5CzE4qnKeLkibJZoPXJK2Ur0",
  card3: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAVdj7JOsZ33amRj7jeRgKAFp8L4GZhWcN5FoKiFUJkKbm4OstWXPM0CqHCRhPpbuUqwkR65wJ3padeC-thmmUXwOx50Nb-VIQ2rHBMoqXKd6TomrdkrOQ1eY2j7jum35oZjw5N3Azmi-qwu7Ms-M8Uk3vDuPx7tH2NbUteU5XbiAEqWNQ6yu31x0Dc7gQG8D1DrTy6_JJGZaodrFZfqOcSEWgaH0hWWY5ZbVlnFZX0J35xFtsGRF2NO84r2n4gbYeFqbDEl8vrxxA",
  card4: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQnoL3HCPY8zBFm-yjhsm1frdyXx_jK0HN0bswjlGIuOsvmUU32EpyO_bk09buUhfRL-jPbTMId2GZGishLO3bapAdZoH2jIyuP2sM2bf4BmxX4qmKDB1gAem15HVSYJN5BH0pbMh30XTDwFIi1_30CroKTeTEIuJ6un8UfSCeV0rjegPrihYVy1V0IpeL3robIkBz3-wWByAJIEHJuIHMi097taIwpaNBp2EByTQnRG1YDmZxIPkZ4FHJA32I0u07HrYYhkEd4UKl",
  
  // Techniques
  tech1: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-A-lVAzBRTlwxXMdoenHrNl6nNcgFJvjsf9xU1PrKdawdyg3MPpnJUBrf2U2ck0aZVJY2dwPHn1GytZp7nAviMUmE_7BugHQY-jt-gMe-LkQ8VfocqEHXv6EhFGq4PfC9ld_MWgXja1HbE56i2TJIqnQEFXDpv-VSLYjsFt20U2tYBzz-ZmQCQffUiEXQ14Pb8fMi5n-wRsrERhgGQr9_hS5s4Fj9dJ2jIaifQWU51wcSnPfS5QPovT3M7FcrW5xtEBeThqNy3TYu",
  tech2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHlay0tsm5EROYiMQu-M8OKBoN6CZwHfCmXdyqdRHk0cT1i6NIebqbjYswf4aoA9kYAnMVAl8XWn9WPEFxdlCyEuEalTchCfb89ieIfpnn6yNBPhVLNSIKihPNixFhYalmw6A3n6gcV-2r28-NCuaGsp9oLE61dHZg4kaC0Z_Rha4_XjEi4ZuJAURt3x_M0vmQxgXmPVjYEYRtwMjpKeqFVpo_V4-a4CmzdhkOPL7XsFU95aZW94-hJ92QcVh2ClH4AhLcajUPTriB",
  tech3: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0habSKcSyRtc7Co84Wh0yPsGpQfPITXiblkyzbGTiG3TxkDkOekCVZ3ekvJE7FZlbSjE7RPhPqZU7Dye0ijgU0blRFFhAZvPqENJ1D1w0lRuv88J7BZXEIhFy_ZbjcbCYx0ES2zIBvNbxJ7ixAxzx5oerV_RcJzTFFSK5tb4ISk2rRJoOnCEDkQK4QuSachZdajuqn0kpQ8w_iJQeA73mozihB_xfjkv_48OTos7OC8GnYzJ4ydDQ91WLPfbBAh9QFNj8t_q-9Ex",
  
  // Profile avatar
  profile: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEYochnh9haSoonsm7CULSMtb5qi_kBShgg4cqTNSuju6ZDUlsTm2slSYYIhHkj9b6tYk8lL39A0gx2h_MgS0_z8P5HLhUNceVumd3wNWlclSn88dbLPBecP0OopvjozR4zI3D70hRaDyeh5mx7y_G2HbKcERvenh50nX7gOIXnwA10Qy8_Y_VQXBWPbwcF5OnTwub5wI4X6i3DPr_J74x9swnNsrBoiYvJdZn_bQZH_elubqnWIrUUE7gfMgqomDDkBERZ3W08jJs"
};

// Header Component
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid ${
      scrolled ? "border-slate-700" : "border-surface-dark"
    } bg-background-dark px-10 py-3 sticky top-0 z-50 transition-all`}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <div className="size-6 text-primary">
            <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Plate Me</h2>
        </div>
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-white text-sm font-bold leading-normal border-b-2 border-primary" href="#dashboard">
            Dashboard
          </a>
          <a className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#builder">
            Plate Builder
          </a>
          <a className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#techniques">
            Techniques
          </a>
          <a className="text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#station">
            Station Setup
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <label className="flex flex-col min-w-40 h-10 max-w-64 hidden sm:flex">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-dark group focus-within:ring-2 focus-within:ring-primary">
            <div className="text-slate-400 flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent text-white focus:outline-0 focus:ring-0 border-none h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Search plates..."
            />
          </div>
        </label>
        <button
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/50 hover:ring-primary transition-all"
          style={{ backgroundImage: `url(${IMAGES.profile})` }}
          aria-label="Chef profile"
        />
      </div>
    </header>
  );
};

// Hero Section
export const Hero = () => {
  return (
    <div className="rounded-xl overflow-hidden relative">
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
        <button className="z-10 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide hover:bg-white hover:text-black transition-colors shadow-lg shadow-primary/20">
          Explore Techniques
        </button>
      </div>
    </div>
  );
};

// Filter Bar
export const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Styles", icon: "apps" },
    { id: "fine", label: "Fine Dining", icon: "room_service" },
    { id: "buffet", label: "Buffet", icon: "storefront" },
    { id: "street", label: "Street Food", icon: "kebab_dining" },
    { id: "vegan", label: "Vegan", icon: "eco" }
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
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
  );
};

// Inspiration Card
const InspirationCard = ({ image, title, level, description, views, aspectRatio = "4/5" }) => {
  const levelColors = {
    Advanced: "bg-primary/20 text-primary",
    Intermediate: "bg-blue-500/20 text-blue-400",
    Beginner: "bg-green-500/20 text-green-400",
    Expert: "bg-purple-500/20 text-purple-400"
  };

  return (
    <div className="break-inside-avoid rounded-xl bg-surface-dark border border-slate-800 overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-full p-2 text-white hover:text-primary cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-[20px] block">favorite</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white text-lg font-bold">{title}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${levelColors[level]}`}>
            {level}
          </span>
        </div>
        <p className="text-slate-400 text-sm mb-3">{description}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="material-symbols-outlined text-[16px]">visibility</span>
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};

// Masonry Grid
export const MasonryGrid = () => {
  const cards = [
    {
      image: IMAGES.card1,
      title: "Molecular Gastronomy",
      level: "Advanced",
      description: "Exploring textures with foams and spherification.",
      views: "2.4k",
      aspectRatio: "4/5"
    },
    {
      image: IMAGES.card2,
      title: "Minimalist Scallop",
      level: "Intermediate",
      description: "Focus on negative space and clean lines.",
      views: "850",
      aspectRatio: "1/1"
    },
    {
      image: IMAGES.card3,
      title: "Rustic Presentation",
      level: "Beginner",
      description: "Authentic farm-to-table aesthetic.",
      views: "1.2k",
      aspectRatio: "3/4"
    },
    {
      image: IMAGES.card4,
      title: "Nordic Influence",
      level: "Expert",
      description: "Using foraged ingredients and natural elements.",
      views: "3.1k",
      aspectRatio: "16/9"
    }
  ];

  return (
    <div className="columns-1 md:columns-2 gap-6 space-y-6">
      {cards.map((card, idx) => (
        <InspirationCard key={idx} {...card} />
      ))}
    </div>
  );
};

// Daily Garnish Tip Widget
export const DailyTip = () => {
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
        <a className="inline-flex items-center text-primary text-sm font-bold hover:underline" href="#guide">
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
      image: IMAGES.tech1,
      title: "Tweezer Precision",
      description: "Mastering the art of delicate placement."
    },
    {
      image: IMAGES.tech2,
      title: "Squeeze Bottle Art",
      description: "Create perfect dots, swooshes, and lines."
    },
    {
      image: IMAGES.tech3,
      title: "Smoke Infusion",
      description: "Adding drama and flavor with smoke guns."
    }
  ];

  return (
    <div className="bg-surface-dark border border-slate-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-lg font-bold">New Techniques</h3>
        <a className="text-xs text-slate-400 hover:text-white" href="#all">
          View All
        </a>
      </div>
      <div className="flex flex-col gap-4">
        {techniques.map((tech, idx) => (
          <a key={idx} className="flex gap-4 items-center group" href="#technique">
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
  const [checklist, setChecklist] = useState([
    { id: 1, label: "Sharpen Knives", checked: true },
    { id: 2, label: "Prep Micro-greens", checked: false },
    { id: 3, label: "Fill Squeeze Bottles", checked: false },
    { id: 4, label: "Clean Rim Cloths", checked: false }
  ]);

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="bg-gradient-to-br from-surface-dark to-black border border-slate-800 rounded-xl p-6 text-white">
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
              className="form-checkbox rounded bg-slate-800 border-slate-600 text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className={`group-hover:text-white transition-colors ${item.checked ? 'line-through opacity-50' : ''}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>
      <button className="w-full mt-6 py-2 rounded border border-slate-600 hover:border-primary hover:text-primary text-xs font-bold uppercase tracking-wider transition-colors">
        View Full Setup
      </button>
    </div>
  );
};

// Footer
export const Footer = () => {
  return (
    <footer className="border-t border-surface-dark py-8 px-10 mt-auto bg-background-dark">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">© 2023 Plate Me. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="text-slate-400 text-sm hover:text-primary" href="#privacy">
            Privacy Policy
          </a>
          <a className="text-slate-400 text-sm hover:text-primary" href="#terms">
            Terms of Service
          </a>
          <a className="text-slate-400 text-sm hover:text-primary" href="#support">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};
