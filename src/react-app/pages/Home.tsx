import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

// Local image imports
import thaisaHeroImg from "@/assets/images/Thaisa hero.JPEG";
import advsHistoriaImg from "@/assets/images/advs historia.JPEG";
import dsc00145 from "@/assets/images/DSC00145.jpg";
import dsc08850 from "@/assets/images/DSC08850.jpg";
import dsc08866 from "@/assets/images/DSC08866.jpg";
import logoFullSvg from "@/assets/images/logo-full.svg";

const WHATSAPP_URL = "https://wa.me/5521920015586";

const ASSETS = {
  logoNav: logoFullSvg,
  logoHero: logoFullSvg,
  logoAdvDark: logoFullSvg,
  thaisaHero: thaisaHeroImg,
  advsHistoria: advsHistoriaImg,
  thaisaCasual: dsc00145,
  thaisaProfissional: dsc08850,
  trabalhando: dsc08866,
};

// CSS Variables as constants
const COLORS = {
  preto: "#111110",
  c1: "#1c1917",
  c2: "#292524",
  cT: "#78716c",
  cL: "#d6d3d1",
  stone: "#f5f5f4",
  vinho: "#6b2737",
  verde: "#25D366",
  verde2: "#1ebe59",
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden [&_h1]:font-[inherit] [&_h2]:font-[inherit] [&_h3]:font-[inherit] [&_h4]:font-[inherit] [&_h5]:font-[inherit] [&_h6]:font-[inherit]" style={{ background: COLORS.stone, color: COLORS.preto, fontFamily: "'Inter', sans-serif" }}>
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* WhatsApp floating button */}
      <WhatsAppFloat />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <MarqueeSection />
        <EscritorioSection />
        <ServicosSection />
        <DepoimentosSection />
        <ComoFuncionaSection />
        <ContatoSection />
      </main>
      
      <Footer />
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[9999] w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
      style={{ 
        background: COLORS.verde,
        animation: "wppp 2.8s ease-in-out infinite"
      }}
      aria-label="WhatsApp"
    >
      <Icon icon="ri:whatsapp-fill" width={26} className="text-white" />
      <style>{`
        @keyframes wppp {
          0%, 100% { box-shadow: 0 4px 18px rgba(37,211,102,.4); }
          50% { box-shadow: 0 4px 32px rgba(37,211,102,.65); }
        }
      `}</style>
    </a>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    
    handleScroll();
    checkMobile();
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[800] transition-all duration-400"
        style={{
          padding: isScrolled ? "1rem 3rem" : "1.4rem 3rem",
          background: isScrolled ? "rgba(17,17,16,.93)" : "transparent",
          backdropFilter: isScrolled ? "blur(14px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,.06)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
          <a href="#hero" className="flex-shrink-0">
            <img src={ASSETS.logoNav} alt="thaisaadv." className="h-[62px] w-auto" style={{ filter: "invert(1)" }} />
          </a>

          {/* Desktop nav links */}
          {!isMobile && (
            <div className="flex items-center gap-9">
              {[
                { href: "#escritorio", label: "O Escritório" },
                { href: "#servicos", label: "Serviços" },
                { href: "#como-funciona", label: "Como Funciona" },
                { href: "#contato", label: "Contato" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium tracking-[0.04em] text-white/55 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {!isMobile && (
              <a
                href="/app/login"
                className="text-[0.68rem] font-medium tracking-[0.06em] text-white/55 px-3.5 py-2 border border-white/[0.18] hover:border-white/50 hover:text-white transition-all duration-200"
              >
                Área do Cliente
              </a>
            )}
            {!isMobile && (
              <a
                href="/admin/login"
                className="text-[0.68rem] font-medium tracking-[0.06em] px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200"
                style={{ background: "#fff", color: COLORS.preto }}
              >
                <Icon icon="solar:lock-keyhole-minimalistic-linear" width={12} />
                Área Restrita
              </a>
            )}
            {isMobile && (
              <a
                href="/app/login"
                className="text-[0.68rem] font-medium tracking-[0.06em] px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200"
                style={{ background: "#fff", color: COLORS.preto }}
              >
                <Icon icon="solar:user-linear" width={12} />
                Área do Cliente
              </a>
            )}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="ml-2 bg-transparent border-none cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-linear" width={24} className="text-white" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 z-[850] flex flex-col items-center justify-center gap-10 transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ background: "rgba(17,17,16,.98)" }}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 bg-transparent border-none cursor-pointer z-10"
        >
          <Icon icon="solar:close-circle-linear" width={30} className="text-white/60 hover:text-white transition-colors" />
        </button>
        {[
          { href: "#escritorio", label: "O Escritório" },
          { href: "#servicos", label: "Serviços" },
          { href: "#como-funciona", label: "Como Funciona" },
          { href: "#contato", label: "Contato" },
          { href: "/blog", label: "Blog" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="text-3xl font-light text-white/80"
          >
            {item.label}
          </a>
        ))}
        <div className="flex flex-col items-center gap-4 mt-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white flex items-center gap-2"
            style={{ background: COLORS.verde }}
          >
            <Icon icon="ri:whatsapp-fill" width={16} />
            WhatsApp
          </a>
          <a
            href="/admin/login"
            className="px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white/70 flex items-center gap-2 border border-white/20 hover:border-white/50 hover:text-white transition-all"
          >
            <Icon icon="solar:lock-keyhole-minimalistic-linear" width={14} />
            Área Restrita
          </a>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <img
        src={ASSETS.thaisaProfissional}
        alt="Thaisa Saloto de Oliveira"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 25%" }}
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.4) 55%, rgba(0,0,0,.15) 100%)" }}
      />

      {/* Scroll indicator left - desktop only */}
      {!isMobile && (
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[2]">
          <span 
            className="text-[0.58rem] font-light tracking-[0.28em] text-white/30 uppercase"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            SCROLL
          </span>
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,.3), transparent)" }} />
        </div>
      )}

      {/* Indicator right - desktop only */}
      {!isMobile && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[2]">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.3))" }} />
          <span 
            className="text-[0.58rem] font-light tracking-[0.28em] text-white/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Rio de Janeiro
          </span>
        </div>
      )}

      {/* Desktop content */}
      {!isMobile && (
        <div className="absolute left-0 right-0 bottom-[7.5rem] flex flex-col items-center z-[2] px-32">
          <p className="text-[0.62rem] font-semibold text-white/65 tracking-[0.3em] uppercase mb-10">
            Advocacia especializada em precatórios
          </p>
          <img 
            src={ASSETS.logoHero} 
            alt="thaisaadv." 
            className="w-[min(480px,55vw)] h-auto mb-2.5"
            style={{ filter: "invert(1)" }}
          />
          <div className="w-9 h-px bg-white/25 mb-3" />
          <p className="text-[0.92rem] font-normal leading-[1.65] max-w-[460px] mb-10 text-center" style={{ color: "rgba(255,255,255,.82)" }}>
            Transformamos precatórios em <strong className="font-bold" style={{ color: "#fff" }}>liberdade financeira</strong> para famílias em todo o Brasil.
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white transition-colors duration-250"
              style={{ background: COLORS.verde }}
              onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.verde2)}
              onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.verde)}
            >
              <Icon icon="ri:whatsapp-fill" width={16} />
              Falar no WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.72rem] font-normal tracking-[0.08em] uppercase text-white border border-white/30 hover:bg-white/[0.07] hover:border-white/60 transition-all duration-250"
            >
              Ver serviços
            </a>
          </div>
        </div>
      )}

      {/* Mobile content */}
      {isMobile && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[2] p-8 text-center">
          <img 
            src={ASSETS.logoHero} 
            alt="thaisaadv." 
            className="w-[min(340px,80vw)] h-auto mb-6"
            style={{ filter: "invert(1)" }}
          />
          <p className="text-[0.62rem] text-white/45 tracking-[0.25em] uppercase mb-8">
            Advocacia especializada em precatórios
          </p>
          <div className="flex gap-2.5 flex-wrap justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-[0.66rem] font-semibold tracking-[0.08em] uppercase text-white"
              style={{ background: COLORS.verde }}
            >
              <Icon icon="ri:whatsapp-fill" width={14} />
              WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 px-5 py-3 text-[0.66rem] font-normal tracking-[0.08em] uppercase text-white border border-white/30"
            >
              Serviços
            </a>
          </div>
        </div>
      )}

      {/* Bottom info - desktop only */}
      {!isMobile && (
        <div 
          className="absolute bottom-8 left-28 right-24 flex justify-between items-center z-[3] pt-3.5"
          style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}
        >
          <span className="text-[0.6rem] text-white/60 tracking-[0.08em]">Atendimento em todo o Brasil</span>
          <span className="text-[0.6rem] text-white/45 tracking-[0.08em]">© 2025 thaisaadv.</span>
        </div>
      )}
    </section>
  );
}

function MarqueeSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const marqueeItems = [
    "Precatórios Federais", "Inventário Judicial", "Inventário Extrajudicial",
    "Direito Sucessório", "Habilitação de Herdeiros", "Negociação de Ativos Judiciais", "ITCMD"
  ];

  // Create enough duplicates for seamless infinite loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems];

  return (
    <div className="border-t border-b border-[#e7e5e4] py-3 bg-white overflow-hidden">
      <div className="marquee-container relative flex">
        <div 
          className="marquee-content flex whitespace-nowrap items-center gap-9"
          style={{ 
            animation: `marqueeScroll ${isMobile ? '20s' : '40s'} linear infinite`
          }}
        >
          {duplicatedItems.map((item, i) => (
            <span key={i} className="flex items-center gap-9">
              <span 
                className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
                style={{ color: COLORS.cT }}
              >
                {item}
              </span>
              <span className="text-[0.8rem]" style={{ color: COLORS.vinho }}>·</span>
            </span>
          ))}
        </div>
        <div 
          className="marquee-content flex whitespace-nowrap items-center gap-9"
          style={{ 
            animation: `marqueeScroll ${isMobile ? '20s' : '40s'} linear infinite`
          }}
        >
          {duplicatedItems.map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-9">
              <span 
                className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase"
                style={{ color: COLORS.cT }}
              >
                {item}
              </span>
              <span className="text-[0.8rem]" style={{ color: COLORS.vinho }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-container {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </div>
  );
}

function EscritorioSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="escritorio" className="py-32 px-8" style={{ background: COLORS.stone }}>
      <div className="max-w-[1280px] mx-auto">
        <div 
          className="grid gap-28 items-center"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
        >
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden group" style={{ aspectRatio: "3/4" }}>
              <img 
                src={ASSETS.thaisaHero} 
                alt="Thaisa Saloto de Oliveira" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "top" }}
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Icon icon="solar:user-circle-linear" width={48} className="text-white/70" />
              </div>
            </div>
            
            {/* OAB badge */}
            <div 
              className="absolute -bottom-5 -right-5 px-6 py-4"
              style={{ background: COLORS.preto }}
            >
              <p className="text-[0.56rem] font-bold text-white/35 tracking-[0.15em] uppercase mb-0.5">OAB / RJ</p>
              <p className="text-[0.95rem] font-light text-white tracking-[0.06em]">204.291</p>
            </div>
            
            {/* Decorative border */}
            <div 
              className="absolute -top-4 -left-4 w-[46px] h-[46px] -z-10"
              style={{ border: `1px solid ${COLORS.cL}` }}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-0.5 h-[13px]" style={{ background: COLORS.vinho }} />
              <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase" style={{ color: COLORS.vinho }}>
                O Escritório
              </span>
            </div>
            
            <h2 
              className="text-[clamp(1.9rem,3.2vw,2.8rem)] font-light leading-tight mb-7"
              style={{ color: COLORS.preto }}
            >
              Transformando precatórios<br />
              <strong className="font-semibold">em liberdade financeira.</strong>
            </h2>
            
            <p className="text-[0.93rem] font-light leading-[1.9] mb-5" style={{ color: "#57534e" }}>
              Muitas famílias possuem valores significativos em precatórios e simplesmente não sabem disso, ou não sabem como agir. Foi exatamente essa percepção que nos motivou a construir algo diferente.
            </p>
            <p className="text-[0.93rem] font-light leading-[1.9] mb-9" style={{ color: "#57534e" }}>
              Com mais de <strong className="font-semibold" style={{ color: COLORS.preto }}>5 anos dedicados exclusivamente</strong> a essa área, dominamos estratégias, mapeamos entendimentos de magistrados e procuradores e desenvolvemos caminhos que reduzem custos e aceleram o recebimento.
            </p>
            
            {/* Quote */}
            <div className="pl-5 mb-10" style={{ borderLeft: `2px solid ${COLORS.cL}` }}>
              <p className="text-[0.87rem] italic leading-[1.8] mb-2.5" style={{ color: "#57534e" }}>
                "Você tem um direito. Nós sabemos como garantir que ele chegue até você."
              </p>
              <p className="text-[0.7rem] font-semibold" style={{ color: COLORS.preto }}>Thaisa Saloto de Oliveira</p>
              <p className="text-[0.66rem]" style={{ color: "#a8a29e" }}>Advogada | OAB/RJ 204.291</p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 flex-wrap">
              <div>
                <p className="text-[2.1rem] font-light leading-none" style={{ color: COLORS.preto }}>5+</p>
                <p className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase mt-1" style={{ color: COLORS.cT }}>Anos de especialidade</p>
              </div>
              <div className="w-px" style={{ background: "#e7e5e4" }} />
              <div>
                <p className="text-[2.1rem] font-light leading-none" style={{ color: COLORS.preto }}>100%</p>
                <p className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase mt-1" style={{ color: COLORS.cT }}>Foco em precatórios</p>
              </div>
              <div className="w-px" style={{ background: "#e7e5e4" }} />
              <div>
                <p className="text-[2.1rem] font-light leading-none" style={{ color: COLORS.preto }}>BR</p>
                <p className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase mt-1" style={{ color: COLORS.cT }}>Atendimento nacional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team block */}
        <div 
          className="mt-24 grid gap-px"
          style={{ 
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
            background: "#e7e5e4"
          }}
        >
          <div 
            className="p-14 flex flex-col justify-end"
            style={{ background: COLORS.preto }}
          >
            <h3 className="text-[1.4rem] font-light text-white leading-snug mb-4">
              Um time preparado para atender famílias<br />
              <strong className="font-semibold">em todo o Brasil.</strong>
            </h3>
            <p className="text-[0.83rem] text-white/40 font-light leading-[1.8]">
              Do início ao fim do processo, com atenção, estratégia e resultado.
            </p>
          </div>
          <div className="relative overflow-hidden min-h-[360px] group">
            <img 
              src={ASSETS.advsHistoria} 
              alt="Equipe thaisaadv." 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: "center top" }}
            />
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Icon icon="solar:users-group-two-rounded-linear" width={48} className="text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicosSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const servicos = [
    { icon: "solar:document-text-linear", title: "Inventário Judicial", desc: "Assessoria completa para inventário judicial de precatórios com estratégias que reduzem custos e prazo.", tags: "Abertura · Habilitação · Encerramento" },
    { icon: "solar:clipboard-check-linear", title: "Inventário Extrajudicial", desc: "Processamento em cartório quando possível, mais rápido e com menor custo para a família.", tags: "Cartório · ITCMD · Partilha" },
    { icon: "solar:users-group-two-rounded-linear", title: "Localização de Herdeiros", desc: "Pesquisa e localização de herdeiros em lugar incerto, certidões e regularização documental.", tags: "Nascimento · Casamento · Óbito" },
    { icon: "solar:hand-money-linear", title: "Negociação de Precatórios", desc: "Parceria com os maiores fundos de investimento para garantir a melhor oferta pelo seu ativo.", tags: "Avaliação · Oferta · Recebimento" },
    { icon: "solar:target-linear", title: "Pesquisa de Processos", desc: "Identificamos processos judiciais com valores a receber que famílias desconhecem existir.", tags: "Mapeamento · ITCMD · Apuração" },
  ];

  return (
    <section id="servicos" className="py-32 px-8" style={{ background: COLORS.preto }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <div>
            <p className="text-[0.62rem] font-bold text-white/25 tracking-[0.2em] uppercase mb-3">ATUAÇÃO</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-light text-white">
              Como podemos <strong className="font-semibold">te ajudar</strong>
            </h2>
          </div>
        </div>

        {/* Services grid */}
        <div 
          className="grid gap-px"
          style={{ 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            background: "rgba(255,255,255,.07)"
          }}
        >
          {servicos.map((s, i) => (
            <div 
              key={i}
              className="p-8 border border-transparent hover:border-white/[0.18] hover:bg-white/[0.03] transition-all duration-300 group"
              style={{ background: COLORS.preto }}
            >
              <Icon 
                icon={s.icon} 
                width={32} 
                className="text-white/30 group-hover:text-white/75 transition-colors duration-300 mb-6"
              />
              <h3 className="text-[0.95rem] font-semibold text-white mb-2.5">{s.title}</h3>
              <p className="text-[0.83rem] text-white/40 font-light leading-[1.75] mb-3">{s.desc}</p>
              <p className="text-[0.68rem] text-white/20">{s.tags}</p>
            </div>
          ))}
          
          {/* CTA card */}
          <div 
            className="p-8 flex flex-col justify-between transition-colors duration-300 bg-white hover:bg-[#f5f5f4]"
          >
            <div>
              <h3 className="text-[0.95rem] font-semibold mb-3" style={{ color: COLORS.preto }}>Tem um precatório?</h3>
              <p className="text-[0.83rem] font-light leading-[1.75]" style={{ color: "#57534e" }}>
                Fale com nosso time e descubra o que é possível fazer pelo seu caso.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.08em] uppercase text-white transition-colors duration-250"
              style={{ background: COLORS.verde }}
            >
              <Icon icon="ri:whatsapp-fill" width={14} />
              Falar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DepoimentosSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-32 px-8 border-t border-[#e7e5e4]" style={{ background: COLORS.stone }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-0.5 h-[13px]" style={{ background: COLORS.vinho }} />
              <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase" style={{ color: COLORS.vinho }}>
                Depoimentos
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-light" style={{ color: COLORS.preto }}>
              Vozes dos nossos <strong className="font-semibold">clientes</strong>
            </h2>
          </div>
          <a 
            href="#" 
            className="text-[0.73rem] font-medium flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-200"
            style={{ color: "#57534e" }}
          >
            Ver no Instagram <Icon icon="solar:arrow-right-up-linear" width={14} />
          </a>
        </div>

        {/* Cards */}
        <div 
          className="grid gap-px"
          style={{ 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            background: "#e7e5e4"
          }}
        >
          {/* Testimonial 1 */}
          <div className="bg-white p-9">
            <div className="relative overflow-hidden w-full mb-5 group" style={{ aspectRatio: "4/3" }}>
              <img 
                src={ASSETS.thaisaCasual}
                alt="Thaisa no escritório" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center top" }}
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Icon icon="solar:chat-round-dots-linear" width={36} className="text-white/80" />
              </div>
            </div>
            <div className="flex gap-0.5 mb-3.5">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} icon="solar:star-bold" width={11} style={{ color: COLORS.vinho }} />
              ))}
            </div>
            <p className="text-[0.87rem] italic leading-[1.75] mb-5 font-light" style={{ color: "#57534e" }}>
              "Não sabíamos que tínhamos esse direito. A equipe cuidou de tudo com agilidade e recebemos o que era nosso."
            </p>
            <div className="flex items-center gap-3">
              <div 
                className="w-[26px] h-[26px] flex items-center justify-center text-[0.72rem] font-semibold text-white flex-shrink-0"
                style={{ background: COLORS.preto }}
              >
                F
              </div>
              <div>
                <p className="text-[0.74rem] font-semibold" style={{ color: COLORS.preto }}>Família Santos</p>
                <p className="text-[0.66rem]" style={{ color: "#a8a29e" }}>São Paulo, SP</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-9">
            <div className="relative overflow-hidden w-full mb-5 group" style={{ aspectRatio: "4/3" }}>
              <img 
                src={ASSETS.thaisaProfissional}
                alt="Thaisa profissional" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Icon icon="solar:chat-round-dots-linear" width={36} className="text-white/80" />
              </div>
            </div>
            <div className="flex gap-0.5 mb-3.5">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} icon="solar:star-bold" width={11} style={{ color: COLORS.vinho }} />
              ))}
            </div>
            <p className="text-[0.87rem] italic leading-[1.75] mb-5 font-light" style={{ color: "#57534e" }}>
              "O processo parecia impossível. Com o time da Thaisa, tudo foi conduzido com clareza e segurança do começo ao fim."
            </p>
            <div className="flex items-center gap-3">
              <div 
                className="w-[26px] h-[26px] flex items-center justify-center text-[0.72rem] font-semibold text-white flex-shrink-0"
                style={{ background: COLORS.preto }}
              >
                F
              </div>
              <div>
                <p className="text-[0.74rem] font-semibold" style={{ color: COLORS.preto }}>Família Rodrigues</p>
                <p className="text-[0.66rem]" style={{ color: "#a8a29e" }}>Rio de Janeiro, RJ</p>
              </div>
            </div>
          </div>

          {/* CTA card */}
          <div className="p-9 flex flex-col justify-between" style={{ background: COLORS.preto }}>
            <div className="opacity-[0.07]">
              <Icon icon="solar:scale-bold" width={70} className="text-white" />
            </div>
            <div className="mt-8">
              <p className="text-[1.3rem] font-light text-white leading-snug mb-4">
                Cada família carrega<br />
                <em className="opacity-40">uma história diferente.</em>
              </p>
              <p className="text-[0.82rem] text-white/[0.38] font-light leading-relaxed mb-7">
                Mas todas têm algo em comum: o alívio quando resolvem algo que parecia impossível.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-white/60 border border-white/[0.14] hover:border-white/40 hover:text-white transition-all duration-250"
              >
                <Icon icon="brandico:instagram" width={13} />
                Ver no Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComoFuncionaSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const steps = [
    { icon: "solar:chat-round-dots-linear", title: "Análise inicial", desc: "Avaliamos gratuitamente seu caso e identificamos as melhores estratégias disponíveis." },
    { icon: "solar:target-linear", title: "Reunião estratégica", desc: "Debatemos estratégias e apresentamos a proposta de honorários com total transparência." },
    { icon: "solar:document-text-linear", title: "Início jurídico", desc: "Assinatura dos documentos e início imediato das atividades pelo time especializado." },
    { icon: "solar:hand-money-linear", title: "Recebimento", desc: "Atuação contínua até o efetivo recebimento dos valores. Você não fica sozinho.", highlight: true },
  ];

  return (
    <section id="como-funciona" className="py-32 px-8" style={{ background: COLORS.c1 }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
            <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase" style={{ color: COLORS.vinho }}>
              Processo
            </span>
            <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
          </div>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-light text-white">
            Como <strong className="font-semibold">funciona</strong>
          </h2>
        </div>

        {/* Steps */}
        <div 
          className="grid gap-px"
          style={{ 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            background: "rgba(255,255,255,.05)"
          }}
        >
          {steps.map((step, i) => (
            <div 
              key={i}
              className="p-9 transition-all duration-300"
              style={{ 
                background: step.highlight ? COLORS.c2 : COLORS.c1,
                borderTop: step.highlight ? `2px solid ${COLORS.vinho}` : "2px solid transparent"
              }}
              onMouseEnter={(e) => {
                if (!step.highlight) e.currentTarget.style.borderTopColor = "rgba(255,255,255,.15)";
              }}
              onMouseLeave={(e) => {
                if (!step.highlight) e.currentTarget.style.borderTopColor = "transparent";
              }}
            >
              <span 
                className="text-[0.6rem] font-bold tracking-[0.15em] block mb-5"
                style={{ color: step.highlight ? COLORS.vinho : "rgba(255,255,255,.18)" }}
              >
                0{i + 1}
              </span>
              <Icon 
                icon={step.icon} 
                width={28} 
                className="mb-5 block"
                style={{ color: step.highlight ? COLORS.vinho : "rgba(255,255,255,.25)", opacity: step.highlight ? 0.6 : 1 }}
              />
              <h4 className="text-[0.9rem] font-semibold text-white mb-2.5">{step.title}</h4>
              <p className="text-[0.8rem] text-white/[0.38] font-light leading-[1.75]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div 
          className="mt-px p-6 flex items-center gap-4"
          style={{ background: COLORS.c2 }}
        >
          <Icon icon="solar:shield-check-linear" width={18} className="text-white/[0.18] flex-shrink-0" />
          <p className="text-[0.78rem] text-white/[0.32] font-light leading-relaxed">
            Você tem a tranquilidade de contar com um time dedicado cuidando de tudo por você, do início ao recebimento.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContatoSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ nome: "", telefone: "", tipo: "", mensagem: "" });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Me chamo *${formData.nome || "não informado"}*.\nTelefone: ${formData.telefone || "não informado"}\nSituação: *${formData.tipo || "não informado"}*\n${formData.mensagem ? "Mensagem: " + formData.mensagem : ""}`;
    window.open(`https://wa.me/5521920015586?text=${encodeURIComponent(text)}`, "_blank");
  };

  const tipoOptions = ["Sou herdeiro", "Sou beneficiário", "Tenho dúvidas"];

  return (
    <section id="contato" style={{ background: COLORS.preto }}>
      <div 
        className="max-w-[1280px] mx-auto grid"
        style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
      >
        {/* Left side - Image */}
        <div className="relative overflow-hidden min-h-[640px]">
          <img 
            src={ASSETS.trabalhando} 
            alt="Thaisa trabalhando" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "grayscale(15%)" }}
          />
          <div 
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(17,17,16,.93) 30%, rgba(17,17,16,.35) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <div className="mb-7 opacity-10">
              <Icon icon="solar:scale-bold" width={56} className="text-white" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-0.5 h-[13px]" style={{ background: COLORS.vinho }} />
              <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-white/30">
                Fale Conosco
              </span>
            </div>
            <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-light text-white mb-4">
              Tem dúvidas sobre<br />
              <strong className="font-semibold">o seu precatório?</strong>
            </h2>
            <p className="text-[0.83rem] text-white/[0.42] font-light leading-[1.8] mb-8 max-w-[360px]">
              Fale com nosso time e agende uma reunião sem compromisso. Todas as informações são tratadas com absoluta confidencialidade, em conformidade com a LGPD.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white"
              style={{ background: COLORS.verde }}
            >
              <Icon icon="ri:whatsapp-fill" width={16} />
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-12 md:p-20" style={{ background: COLORS.stone }}>
          <h3 className="text-[1.35rem] font-light mb-1.5" style={{ color: COLORS.preto }}>Consulta gratuita</h3>
          <p className="text-[0.78rem] font-light mb-10" style={{ color: COLORS.cT }}>
            Preencha abaixo. Vamos continuar a conversa pelo WhatsApp.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: COLORS.cT }}>
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-transparent border-0 border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-black"
                  style={{ borderColor: COLORS.cL, color: COLORS.preto }}
                  required
                />
              </div>
              <div>
                <label className="block text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: COLORS.cT }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(21) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="w-full bg-transparent border-0 border-b py-3 text-sm outline-none transition-colors duration-300 focus:border-black"
                  style={{ borderColor: COLORS.cL, color: COLORS.preto }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-3" style={{ color: COLORS.cT }}>
                Tipo de caso
              </label>
              <div className="flex flex-wrap gap-2">
                {tipoOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, tipo: opt })}
                    className="px-4 py-1.5 text-[0.7rem] border cursor-pointer transition-all duration-200 select-none"
                    style={{
                      borderColor: formData.tipo === opt ? COLORS.preto : COLORS.cL,
                      background: formData.tipo === opt ? COLORS.preto : "transparent",
                      color: formData.tipo === opt ? "#fff" : "#57534e",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[0.58rem] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: COLORS.cT }}>
                Mensagem
              </label>
              <textarea
                placeholder="Descreva brevemente sua situação..."
                rows={3}
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className="w-full bg-transparent border-0 border-b py-3 text-sm outline-none resize-none transition-colors duration-300 focus:border-black"
                style={{ borderColor: COLORS.cL, color: COLORS.preto }}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white"
              style={{ background: COLORS.verde }}
            >
              <Icon icon="ri:whatsapp-fill" width={17} />
              Enviar pelo WhatsApp
            </button>
            
            <p className="text-[0.64rem] text-center leading-snug" style={{ color: "#a8a29e" }}>
              Seus dados são protegidos pela LGPD (Lei n. 13.709/2018)
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <footer className="bg-white border-t border-[#e7e5e4] pt-20 px-8">
      <div className="max-w-[1280px] mx-auto">
        <div 
          className="grid gap-16 mb-16"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "2.2fr 1fr 1fr 1.3fr" }}
        >
          {/* Brand */}
          <div>
            <img src={ASSETS.logoAdvDark} alt="thaisaadv." className="h-12 w-auto block mb-5" />
            <p className="text-[0.78rem] font-light leading-[1.85] max-w-[270px] mb-5" style={{ color: COLORS.cT }}>
              Advocacia especializada em precatórios. Transformando direitos esquecidos em liberdade financeira para famílias em todo o Brasil.
            </p>
            <p className="text-[0.72rem] font-semibold mb-1" style={{ color: COLORS.c2 }}>CNPJ: 55.682.583/0001-70</p>
            <p className="text-[0.67rem]" style={{ color: "#a8a29e" }}>OAB/RJ 204.291 | Thaisa Saloto de Oliveira</p>
            
            <div className="flex gap-4 mt-7">
              <a href="#" className="w-10 h-10 border flex items-center justify-center transition-all duration-250 hover:border-black/40 hover:bg-black/[0.04]" style={{ borderColor: "rgba(0,0,0,.15)" }}>
                <Icon icon="brandico:instagram" width={20} style={{ color: "#57534e" }} />
              </a>
              <a href="#" className="w-10 h-10 border flex items-center justify-center transition-all duration-250 hover:border-black/40 hover:bg-black/[0.04]" style={{ borderColor: "rgba(0,0,0,.15)" }}>
                <Icon icon="brandico:linkedin" width={20} style={{ color: "#57534e" }} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border flex items-center justify-center transition-all duration-250 hover:border-[#25D366]/60" style={{ borderColor: "rgba(37,211,102,.35)" }}>
                <Icon icon="ri:whatsapp-fill" width={20} style={{ color: COLORS.verde }} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: COLORS.preto }}>Serviços</h6>
            <ul className="flex flex-col gap-3">
              {["Para Herdeiros", "Para Beneficiários", "Como Funciona", "O Escritório"].map((item) => (
                <li key={item}>
                  <a 
                    href="#servicos" 
                    className="text-[0.78rem] font-light transition-colors duration-200 hover:text-black"
                    style={{ color: COLORS.cT }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Access */}
          <div>
            <h6 className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: COLORS.preto }}>Acesso e Legal</h6>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/app/login" className="text-[0.78rem] font-light flex items-center gap-1.5 transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>
                  <Icon icon="solar:user-circle-linear" width={13} />
                  Área do Cliente
                </a>
              </li>
              <li><a href="#" className="text-[0.78rem] font-light transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>Política de Privacidade</a></li>
              <li><a href="#" className="text-[0.78rem] font-light transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>Termos de Uso</a></li>
              <li><a href="#" className="text-[0.78rem] font-light transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>LGPD</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h6 className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: COLORS.preto }}>Contato</h6>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2.5">
                <Icon icon="solar:map-point-linear" width={14} className="flex-shrink-0 mt-0.5" style={{ color: "#a8a29e" }} />
                <span className="text-[0.76rem] font-light leading-relaxed" style={{ color: COLORS.cT }}>
                  Av. Rio Branco, 53, sala 801<br />Centro, Rio de Janeiro, RJ
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="ri:whatsapp-fill" width={14} className="flex-shrink-0" style={{ color: COLORS.verde }} />
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[0.76rem] font-light transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>
                  (21) 92001-5586
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon icon="solar:letter-linear" width={14} className="flex-shrink-0" style={{ color: "#a8a29e" }} />
                <a href="mailto:contato@thaisaadv.com.br" className="text-[0.76rem] font-light transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>
                  contato@thaisaadv.com.br
                </a>
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 px-4 py-2.5 text-[0.66rem] font-semibold tracking-[0.08em] uppercase text-white"
              style={{ background: COLORS.verde }}
            >
              <Icon icon="ri:whatsapp-fill" width={13} />
              Fale conosco
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#f5f5f4] py-7 flex justify-between items-center flex-wrap gap-4">
          <p className="text-[0.63rem] tracking-[0.04em]" style={{ color: "#a8a29e" }}>
            2025 THAISAADV. TODOS OS DIREITOS RESERVADOS.
          </p>
          <p className="text-[0.63rem] tracking-[0.04em]" style={{ color: "#a8a29e" }}>
            RIO DE JANEIRO, BRASIL
          </p>
        </div>
      </div>
    </footer>
  );
}
