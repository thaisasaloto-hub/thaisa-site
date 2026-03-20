import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { blogPosts, formatDate } from "@/data/blog-posts";

const WHATSAPP_URL = "https://wa.me/5521920015586";

const ASSETS = {
  logoNav: "https://019cd0f6-f51e-7b5e-a89c-b03d79843f0e.mochausercontent.com/logo-adv-transparente-4.png",
  logoAdvDark: "https://019cd0f6-f51e-7b5e-a89c-b03d79843f0e.mochausercontent.com/1.png",
};

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

export default function Blog() {
  return (
    <div className="min-h-screen overflow-x-hidden [&_h1]:font-[inherit] [&_h2]:font-[inherit] [&_h3]:font-[inherit] [&_h4]:font-[inherit] [&_h5]:font-[inherit] [&_h6]:font-[inherit]" style={{ background: COLORS.stone, color: COLORS.preto, fontFamily: "'Inter', sans-serif" }}>
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
      
      <WhatsAppFloat />
      <Navbar />
      
      <main>
        <HeroSection />
        <PostsSection />
        <CTASection />
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
          background: "rgba(17,17,16,.93)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-6">
          <Link to="/" className="flex-shrink-0">
            <img src={ASSETS.logoNav} alt="thaisaadv." className="h-[62px] w-auto" />
          </Link>

          {!isMobile && (
            <div className="flex items-center gap-9">
              {[
                { href: "/#escritorio", label: "O Escritório" },
                { href: "/#servicos", label: "Serviços" },
                { href: "/#como-funciona", label: "Como Funciona" },
                { href: "/#contato", label: "Contato" },
                { href: "/blog", label: "Blog", active: true },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs font-medium tracking-[0.04em] transition-colors duration-200"
                  style={{ color: item.active ? "#fff" : "rgba(255,255,255,.55)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {!isMobile && (
              <Link
                to="/#contato"
                className="text-[0.68rem] font-medium tracking-[0.06em] text-white/55 px-3.5 py-2 border border-white/[0.18] hover:border-white/50 hover:text-white transition-all duration-200"
              >
                Área do Cliente
              </Link>
            )}
            {!isMobile && (
              <Link
                to="/admin/login"
                className="text-[0.68rem] font-medium tracking-[0.06em] px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200"
                style={{ background: "#fff", color: COLORS.preto }}
              >
                <Icon icon="solar:lock-keyhole-minimalistic-linear" width={12} />
                Área Restrita
              </Link>
            )}
            {isMobile && (
              <Link
                to="/#contato"
                className="text-[0.68rem] font-medium tracking-[0.06em] px-3.5 py-2 flex items-center gap-1.5 transition-colors duration-200"
                style={{ background: "#fff", color: COLORS.preto }}
              >
                <Icon icon="solar:user-linear" width={12} />
                Área do Cliente
              </Link>
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
          { href: "/#escritorio", label: "O Escritório" },
          { href: "/#servicos", label: "Serviços" },
          { href: "/#como-funciona", label: "Como Funciona" },
          { href: "/#contato", label: "Contato" },
          { href: "/blog", label: "Blog" },
        ].map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={closeMenu}
            className="text-3xl font-light text-white/80"
          >
            {item.label}
          </Link>
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
          <Link
            to="/admin/login"
            className="px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white/70 flex items-center gap-2 border border-white/20 hover:border-white/50 hover:text-white transition-all"
          >
            <Icon icon="solar:lock-keyhole-minimalistic-linear" width={14} />
            Área Restrita
          </Link>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <section className="pt-40 pb-20 px-8" style={{ background: COLORS.preto }}>
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
          <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase" style={{ color: COLORS.vinho }}>
            Artigos
          </span>
          <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
        </div>
        <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-light text-white mb-4">
          Nosso <strong className="font-semibold">Blog</strong>
        </h1>
        <p className="text-[0.95rem] text-white/45 font-light max-w-[500px] mx-auto">
          Artigos e informações sobre precatórios, habilitação de herdeiros e seus direitos
        </p>
      </div>
    </section>
  );
}

function PostsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-24 px-8" style={{ background: COLORS.stone }}>
      <div className="max-w-[1280px] mx-auto">
        <div 
          className="grid gap-px"
          style={{ 
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            background: "#e7e5e4"
          }}
        >
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white p-9 transition-all duration-300 hover:bg-[#fafaf9] group"
            >
              {/* Category */}
              <span 
                className="inline-block text-[0.58rem] font-bold tracking-[0.15em] uppercase mb-5"
                style={{ color: COLORS.vinho }}
              >
                {post.category}
              </span>

              {/* Title */}
              <h2 
                className="text-[1.1rem] font-semibold leading-snug mb-3 transition-colors duration-300 group-hover:text-[#6b2737]"
                style={{ color: COLORS.preto }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p 
                className="text-[0.83rem] font-light leading-[1.75] mb-5 line-clamp-3"
                style={{ color: COLORS.cT }}
              >
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[0.68rem] mb-6" style={{ color: "#a8a29e" }}>
                <div className="flex items-center gap-1.5">
                  <Icon icon="solar:calendar-linear" width={13} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon icon="solar:clock-circle-linear" width={13} />
                  <span>{post.readTime} de leitura</span>
                </div>
              </div>

              {/* Link */}
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition-all duration-300 group/link"
                style={{ color: COLORS.preto }}
              >
                <span>Ler artigo</span>
                <Icon 
                  icon="solar:arrow-right-linear" 
                  width={14} 
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-8" style={{ background: COLORS.c1 }}>
      <div className="max-w-[680px] mx-auto text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
          <span className="text-[0.62rem] font-bold tracking-[0.2em] uppercase" style={{ color: COLORS.vinho }}>
            Precisa de ajuda?
          </span>
          <div className="w-[18px] h-px" style={{ background: COLORS.vinho }} />
        </div>
        <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-light text-white mb-3">
          Tem dúvidas sobre <strong className="font-semibold">seu caso?</strong>
        </h2>
        <p className="text-[0.88rem] text-white/40 font-light mb-9">
          Entre em contato conosco e receba orientação especializada
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-white transition-colors duration-250"
          style={{ background: COLORS.verde }}
        >
          <Icon icon="ri:whatsapp-fill" width={17} />
          Fale conosco no WhatsApp
        </a>
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
            <img src={ASSETS.logoAdvDark} alt="thaisaadv." className="h-10 w-auto block mb-5" />
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
                  <Link 
                    to="/#servicos" 
                    className="text-[0.78rem] font-light transition-colors duration-200 hover:text-black"
                    style={{ color: COLORS.cT }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Access */}
          <div>
            <h6 className="text-[0.6rem] font-bold tracking-[0.16em] uppercase mb-5" style={{ color: COLORS.preto }}>Acesso e Legal</h6>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/#contato" className="text-[0.78rem] font-light flex items-center gap-1.5 transition-colors duration-200 hover:text-black" style={{ color: COLORS.cT }}>
                  <Icon icon="solar:user-circle-linear" width={13} />
                  Área do Cliente
                </Link>
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
