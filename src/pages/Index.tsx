import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/9bc0fac6-ff4e-4442-b4fc-716d8beb8f5c/files/161de2f8-7456-4b34-96da-e7bd283d094f.jpg";
const INTERIOR_IMG = "https://cdn.ezst.app/projects/9bc0fac6-ff4e-4442-b4fc-716d8beb8f5c/files/cd0db813-b4ab-41cd-bb18-73f5745c22d2.jpg";
const ROAD_IMG = "https://cdn.ezst.app/projects/9bc0fac6-ff4e-4442-b4fc-716d8beb8f5c/files/f1346cdd-fcba-4cda-aa97-6bcc14718599.jpg";

const portfolio = [
  { id: 1, title: "SF-90 STRADALE", category: "Hypercar", year: "2023", img: HERO_IMG, spec: "1000 HP" },
  { id: 2, title: "ROMA SPIDER", category: "Gran Turismo", year: "2023", img: INTERIOR_IMG, spec: "612 HP" },
  { id: 3, title: "PUROSANGUE", category: "Sport Utility", year: "2024", img: ROAD_IMG, spec: "725 HP" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [hovered, setHovered] = useState<number | null>(null);
  const aboutSection = useInView();
  const portfolioSection = useInView(0.1);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById("about");
      const portfolioEl = document.getElementById("portfolio");
      const scroll = window.scrollY + 200;
      if (portfolioEl && scroll >= portfolioEl.offsetTop) setActiveSection("portfolio");
      else if (aboutEl && scroll >= aboutEl.offsetTop) setActiveSection("about");
      else setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white font-body min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
        <div className="flex items-center gap-2">
          <span className="text-[#CC0000] text-2xl">⬡</span>
          <span className="font-display text-xl tracking-widest text-white">FERRARI</span>
        </div>
        <div className="hidden md:flex gap-10">
          {["home", "about", "portfolio"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeSection === s ? "text-[#CC0000]" : "text-white/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="border border-[#CC0000] text-[#CC0000] text-xs tracking-[0.15em] uppercase px-5 py-2 hover:bg-[#CC0000] hover:text-white transition-all duration-300">
          Book a Test Drive
        </button>
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-white/20" />
          <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Est. 1947 · Maranello
          </span>
          <div className="w-px h-20 bg-white/20" />
        </div>

        <div className="relative z-10 px-8 md:px-20 pb-28 max-w-4xl">
          <p className="text-[#CC0000] text-xs tracking-[0.4em] uppercase mb-4 animate-fade-up">
            The Prancing Horse
          </p>
          <h1
            className="font-display text-[clamp(5rem,15vw,14rem)] leading-[0.9] tracking-wide text-white"
            style={{ animation: "fade-up 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            FERRARI
          </h1>
          <div className="h-px bg-[#CC0000] mt-6 mb-8 animate-line-grow w-0" />
          <p className="text-white/60 text-lg font-light max-w-md animate-fade-up-delay2">
            Where engineering meets artistry. Every curve tells a story of speed, passion, and Italian excellence.
          </p>
          <div className="flex gap-4 mt-10 animate-fade-up-delay2">
            <button
              onClick={() => scrollTo("portfolio")}
              className="bg-[#CC0000] text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#aa0000] transition-colors duration-300 flex items-center gap-3"
            >
              Explore Models
              <Icon name="ArrowRight" size={14} />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase px-8 py-4 hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Our Story
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 hidden md:grid grid-cols-4">
          {[["75+", "Years of Racing"], ["240+", "Victories"], ["1947", "Founded"], ["IT", "Maranello"]].map(([val, label]) => (
            <div key={label} className="flex flex-col items-center py-5 border-r border-white/10 last:border-r-0">
              <span className="font-display text-2xl text-[#C8A96E]">{val}</span>
              <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-8 md:px-20">
        <div
          ref={aboutSection.ref}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#CC0000] text-xs tracking-[0.4em] uppercase mb-4">About</p>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-white mb-8">
                BORN FROM<br />
                <span className="text-[#C8A96E]">RACING</span>
              </h2>
              <div className="w-16 h-px bg-[#CC0000] mb-8" />
              <p className="text-white/50 leading-relaxed mb-6 font-light">
                Since 1947, Ferrari has represented the pinnacle of automotive excellence. From the dusty circuits of post-war Italy to the modern Formula One paddock, every model carries the DNA of a champion.
              </p>
              <p className="text-white/50 leading-relaxed font-light">
                Each car is hand-assembled in Maranello by artisans who treat engineering as an art form — blending raw performance with breathtaking Italian design. Not a car. A declaration.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                {[["4,000+", "Craftsmen"], ["90%", "Handbuilt"], ["F1 DNA", "Every Model"], ["Bespoke", "Tailoring"]].map(([val, label]) => (
                  <div key={label} className="border-l border-[#CC0000]/40 pl-4">
                    <div className="font-display text-2xl text-white">{val}</div>
                    <div className="text-white/40 text-xs tracking-[0.15em] uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img src={INTERIOR_IMG} alt="Ferrari Interior" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 border border-[#CC0000]/30 aspect-[16/9] overflow-hidden">
                <img src={ROAD_IMG} alt="Ferrari on road" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute top-6 -right-6 bg-[#CC0000] px-6 py-4 hidden lg:block">
                <div className="font-display text-4xl text-white">SF-90</div>
                <div className="text-white/80 text-[10px] tracking-[0.2em] uppercase">Flagship 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-8 md:px-20">
        <div
          ref={portfolioSection.ref}
          className={`max-w-7xl mx-auto transition-all duration-1000 ${portfolioSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
        >
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#CC0000] text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-white">
                THE<br /><span className="text-[#C8A96E]">COLLECTION</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
              View All Models <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {portfolio.map((car) => (
              <div
                key={car.id}
                className="relative overflow-hidden cursor-pointer bg-[#0A0A0A] group"
                onMouseEnter={() => setHovered(car.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#CC0000] text-[10px] tracking-[0.3em] uppercase">{car.category}</span>
                    <span className="text-white/30 text-[10px] tracking-[0.2em]">{car.year}</span>
                  </div>
                  <h3 className="font-display text-3xl text-white tracking-wide">{car.title}</h3>

                  <div className={`mt-4 flex items-center justify-between transition-all duration-500 ${hovered === car.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <span className="text-[#C8A96E] font-display text-xl">{car.spec}</span>
                    <div className="flex items-center gap-2 text-white/60 text-xs tracking-[0.2em] uppercase">
                      Discover <Icon name="ArrowRight" size={12} />
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 h-px bg-[#CC0000] transition-all duration-500 ${hovered === car.id ? "w-full" : "w-0"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 md:px-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#CC0000] text-xs tracking-[0.4em] uppercase mb-6">Experience</p>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-white mb-10">
            FEEL THE<br /><span className="text-[#C8A96E]">POWER</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto font-light mb-12">
            Schedule a private viewing and test drive at your nearest Ferrari showroom.
          </p>
          <button className="bg-[#CC0000] text-white font-display text-2xl tracking-[0.2em] px-16 py-6 hover:bg-[#aa0000] transition-colors duration-300">
            BOOK NOW
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 md:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#CC0000] text-xl">⬡</span>
          <span className="font-display text-lg tracking-widest">FERRARI</span>
        </div>
        <p className="text-white/20 text-xs tracking-[0.2em]">© 2024 Ferrari N.V. — Maranello, Italy</p>
        <div className="flex gap-6">
          {["Privacy", "Legal", "Dealers"].map((l) => (
            <button key={l} className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-white transition-colors">
              {l}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
