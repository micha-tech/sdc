"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const services = [
  [
    "01",
    "Discovery & Strategy",
    "Position the product before producing the content.",
    [
      "Audience research",
      "Competitor analysis",
      "Market positioning",
      "Campaign strategy",
    ],
  ],
  [
    "02",
    "Creative Direction",
    "A distinct visual language built to travel.",
    [
      "Campaign concepts",
      "Art direction",
      "Content pillars",
      "Creative guidelines",
    ],
  ],
  [
    "03",
    "Social Media Content",
    "A consistent system for showing up with purpose.",
    ["Social graphics", "Carousels", "Product stories", "Infographics"],
  ],
  [
    "04",
    "Video & Motion",
    "Movement that demonstrates, explains and converts.",
    ["Product walkthroughs", "Social reels", "Launch videos", "Short-form ads"],
  ],
  [
    "05",
    "Campaign Development",
    "Every asset aligned around one sharp objective.",
    [
      "Messaging",
      "Content production",
      "Promotional assets",
      "Conversion direction",
    ],
  ],
  [
    "06",
    "Paid Advertising Creative",
    "Multiple angles, designed to learn quickly.",
    [
      "Creative variations",
      "Product ads",
      "Promotional ads",
      "Retargeting creative",
    ],
  ],
  [
    "07",
    "Content Strategy",
    "Educate, build trust, showcase, engage and convert.",
    [
      "Editorial direction",
      "Content architecture",
      "Proof stories",
      "Conversion content",
    ],
  ],
  [
    "08",
    "Landing Page Support",
    "Turn attention into an intuitive next step.",
    ["Page audits", "Wireframes", "UI/UX design", "CTA optimization"],
  ],
  [
    "09",
    "Marketing Management",
    "Plan, coordinate, measure and improve.",
    ["Scheduling", "Campaign coordination", "Monitoring", "Monthly review"],
  ],
] as const;
const packages = [
  {
    roman: "I",
    name: "Starter",
    tag: "Product visibility",
    intro:
      "For early-stage products building their first consistent marketing presence.",
    items: [
      "Product & audience discovery",
      "Marketing and creative direction",
      "12 social designs / month",
      "2 motion / video assets",
      "4 promotional creatives",
      "Monthly performance review",
    ],
  },
  {
    roman: "II",
    name: "Growth",
    tag: "Product growth",
    intro: "For products ready to grow awareness, leads and sales.",
    items: [
      "Full audience & competitor research",
      "Positioning and campaign strategy",
      "16–20 social assets / month",
      "4–6 motion / video assets",
      "6–8 advertising creatives",
      "Monthly strategy consultation",
    ],
    featured: true,
  },
  {
    roman: "III",
    name: "Scale",
    tag: "Full partnership",
    intro:
      "For established products that want an external creative and marketing team.",
    items: [
      "Full strategy & campaign planning",
      "20+ social assets / month",
      "6–8 motion / video assets",
      "8–12 advertising creatives",
      "Launch campaigns & landing pages",
      "Priority support & analytics",
    ],
  },
];
function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Signature DC Design Agency">
      <Image
        src="/signature-dc-logo-safe.png"
        width={1160}
        height={415}
        alt="Signature DC Design Agency"
        priority
      />
    </a>
  );
}
function BriefDialog({
  label = "Start a Brief",
  packageName = "",
}: {
  label?: string;
  packageName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className="pill pill-primary">
        {label}
        <ArrowDownRight size={17} />
      </DialogTrigger>
      <DialogContent className="brief-dialog">
        <DialogHeader>
          <span className="kicker">Project enquiry</span>
          <DialogTitle>Tell us what you’re building.</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            location.href = `mailto:hello@signaturedc.co?subject=New%20Signature%20DC%20brief&body=${encodeURIComponent(
              Array.from(f.entries())
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n"),
            )}`;
          }}
          className="brief-form"
        >
          <label>
            Name
            <input name="Name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input
              name="Email"
              type="email"
              required
              placeholder="you@company.com"
            />
          </label>
          <label>
            Package
            <select name="Package" defaultValue={packageName}>
              <option value="">Not sure yet</option>
              <option>Starter</option>
              <option>Growth</option>
              <option>Scale</option>
            </select>
          </label>
          <label className="wide">
            Tell us about your product and goals
            <textarea
              name="Brief"
              required
              placeholder="What are you building, who is it for, and what does success look like?"
            />
          </label>
          <button className="pill pill-primary wide">
            Prepare email <ArrowRight size={17} />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false),
    [openService, setOpenService] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));

    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--scroll",
        `${available > 0 ? (scrollY / available) * 100 : 0}%`,
      );
      document.body.classList.toggle("scrolled", scrollY > 40);
    };
    updateScroll();
    addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <main
      id="top"
      onPointerMove={(event) => {
        event.currentTarget.style.setProperty("--mx", `${event.clientX}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY}px`);
      }}
    >
      <div className="scroll-progress" />
      <header className="nav">
        <Brand />
        <nav className={menu ? "nav-links open" : "nav-links"}>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#packages">Packages</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <a className="text-link" href="mailto:hello@signaturedc.co">
            Book a call
          </a>
          <BriefDialog />
          <button
            className="menu-btn"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <section className="hero page-pad">
        <div className="hero-grid" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-kicker">
          <span>Independent creative partner</span>
          <span>Lagos · Working worldwide</span>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit-ring">
            <span>DC</span>
            <i>Strategy · Creative · Growth ·</i>
          </div>
          <div className="float-card fc-one">
            <b>01</b>
            <span>Find the sharp position.</span>
          </div>
          <div className="float-card fc-two">
            <b>↗</b>
            <span>Build what moves people.</span>
          </div>
          <div className="float-card fc-three">
            <Sparkles />
            <span>Make the product felt.</span>
          </div>
        </div>
        <h1 className="hero-title">
          <span>
            Make it <em>easy.</em>
          </span>
          <span>
            Make an <strong>impact.</strong>
          </span>
          <span>
            Win more <mark>customers.</mark>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            We build the strategy, creative system, and campaigns that turn your
            digital product into a brand people <b>discover, trust, and buy.</b>
          </p>
          <div className="hero-cta">
            <BriefDialog />
            <a className="pill pill-ghost" href="#services">
              Explore our work <ArrowDownRight size={17} />
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>
            01—09 <small>disciplines</small>
          </span>
          <span>
            03 <small>engagement tiers</small>
          </span>
          <span>
            06 <small>steps to scale</small>
          </span>
        </div>
      </section>
      <div className="marquee" aria-label="Signature DC capabilities">
        <div>
          <span>Strategy</span>
          <i>✦</i>
          <span>Campaigns</span>
          <i>✦</i>
          <span>Creative Direction</span>
          <i>✦</i>
          <span>Motion</span>
          <i>✦</i>
          <span>Digital Products</span>
          <i>✦</i>
          <span>Strategy</span>
          <i>✦</i>
          <span>Campaigns</span>
          <i>✦</i>
          <span>Creative Direction</span>
          <i>✦</i>
          <span>Motion</span>
          <i>✦</i>
          <span>Digital Products</span>
          <i>✦</i>
        </div>
      </div>
      <section className="manifesto page-pad" data-reveal>
        <div className="manifesto-stamp" aria-hidden="true">
          S/01
        </div>
        <span className="kicker light">Our point of view</span>
        <p>
          Digital convenience is the new <span>customer service.</span>
        </p>
        <div className="manifesto-note">
          <Sparkles /> Beautiful content is only the beginning. We start with
          your product, your audience, and a real position.
        </div>
      </section>
      <section id="services" className="services page-pad" data-reveal>
        <div className="section-lead">
          <span className="kicker">The scope of work</span>
          <h2>
            Nine disciplines.
            <br />
            <span>One campaign system.</span>
          </h2>
          <p>
            From the first discovery call to the ad creative running next month.
            Open each discipline to see how the system fits together.
          </p>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <article
              key={s[0]}
              className={
                openService === i ? "service-row active" : "service-row"
              }
            >
              <button
                onClick={() => setOpenService(openService === i ? -1 : i)}
              >
                <span className="service-num">{s[0]}</span>
                <span className="service-title">{s[1]}</span>
                <span className="service-summary">{s[2]}</span>
                <span className="service-toggle">
                  {openService === i ? <X /> : <ArrowDownRight />}
                </span>
              </button>
              <div className="service-detail">
                <p>{s[2]}</p>
                <div>
                  {s[3].map((x) => (
                    <span key={x}>
                      <Check /> {x}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="process" className="process page-pad" data-reveal>
        <div className="process-sun" aria-hidden="true">
          06
        </div>
        <div className="process-head">
          <span className="kicker light">How we move</span>
          <h2>
            Understand, then build.
            <br />
            <i>Never the other way around.</i>
          </h2>
        </div>
        <div className="process-track">
          {[
            ["01", "Discover"],
            ["02", "Strategize"],
            ["03", "Create"],
            ["04", "Launch"],
            ["05", "Measure"],
            ["06", "Optimize"],
          ].map((x, i) => (
            <div className="process-step" key={x[0]}>
              <span>{x[0]}</span>
              <b>{x[1]}</b>
              {i < 5 && <ArrowRight />}
            </div>
          ))}
        </div>
      </section>
      <section id="packages" className="packages-section page-pad" data-reveal>
        <div className="section-lead">
          <span className="kicker">Ways to work together</span>
          <h2>
            Choose your
            <br />
            <span>growth rhythm.</span>
          </h2>
          <p>
            Every tier begins with discovery. What scales is content volume,
            campaign ambition, and how closely we sit beside your team.
          </p>
        </div>
        <div className="package-grid">
          {packages.map((p) => (
            <article
              className={p.featured ? "package-card featured" : "package-card"}
              key={p.name}
            >
              {p.featured && <div className="popular">Most popular</div>}
              <div className="package-top">
                <span>{p.roman}</span>
                <ArrowDownRight />
              </div>
              <h3>{p.name}</h3>
              <b className="package-tag">{p.tag}</b>
              <p>{p.intro}</p>
              <ul>
                {p.items.map((x) => (
                  <li key={x}>
                    <Check /> {x}
                  </li>
                ))}
              </ul>
              <BriefDialog
                label={`Start with ${p.name}`}
                packageName={p.name}
              />
            </article>
          ))}
        </div>
        <div className="engagement-note">
          <span>Growth & Scale</span>
          <b>Three months minimum.</b>
          <p>
            Enough runway to understand → build → launch → learn → optimize →
            scale.
          </p>
        </div>
      </section>
      <section className="addons page-pad" data-reveal>
        <span className="kicker">Optional services</span>
        <h2>Add what the brief calls for.</h2>
        <div className="addon-grid">
          {[
            ["Brand & Design", "Identity · Guidelines · UI/UX · Pitch decks"],
            ["Digital", "Landing pages · Websites · Email design"],
            ["Marketing", "Paid media · Copywriting · SEO · Social"],
            ["Video", "Product animation · Explainers · Editing"],
          ].map((a, i) => (
            <div key={a[0]}>
              <span>0{i + 1}</span>
              <h3>{a[0]}</h3>
              <p>{a[1]}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="contact" className="contact page-pad" data-reveal>
        <div className="contact-copy">
          <span className="kicker light">Ready when you are</span>
          <h2>
            Let’s build
            <br />
            something that
            <br />
            <i>grows.</i>
          </h2>
          <p>
            Your product deserves more than beautiful content. It needs a
            marketing system that reaches the right people and moves them to
            act.
          </p>
          <BriefDialog />
        </div>
        <div className="contact-card">
          <span className="contact-orbit">
            <Sparkles />
          </span>
          <h3>Prefer to start small?</h3>
          <p>Send a few lines and we’ll reply directly.</p>
          <a href="mailto:hello@signaturedc.co">
            hello@signaturedc.co <ArrowDownRight />
          </a>
          <div className="availability">
            <i /> Taking on new projects
          </div>
        </div>
      </section>
      <footer className="footer page-pad">
        <Brand />
        <p>Digital Product Marketing & Creative Partner</p>
        <div>
          <a href="#services">Services</a>
          <a href="#packages">Packages</a>
          <a href="mailto:hello@signaturedc.co">Email</a>
        </div>
        <small>© 2026 Signature DC</small>
      </footer>
    </main>
  );
}
