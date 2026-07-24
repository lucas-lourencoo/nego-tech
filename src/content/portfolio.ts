export type Locale = "en" | "pt";

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  skills: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type UseItem = {
  name: string;
  description: string;
  href?: string;
};

export type UseCategory = {
  title: string;
  items: UseItem[];
};

export type ProjectItem = {
  name: string;
  description: string;
  category: string;
  href: string;
};

export type ProjectGroup = {
  title: string;
  items: ProjectItem[];
};

export type ProjectCatalogue = {
  title: string;
  introduction: string;
  featuredTitle: string;
  archiveTitle: string;
  featured: ProjectItem[];
  groups: ProjectGroup[];
};

export type AboutSegment = {
  text: string;
  highlight?: boolean;
};

export type SocialMetric = {
  label: string;
  value: string;
  href: string;
};

export type MediaVideo = {
  id: string;
  title: string;
  views: string;
};

export type MediaKitContent = {
  eyebrow: string;
  title: string;
  introduction: string;
  audienceTitle: string;
  audience: SocialMetric[];
  highlight: { value: string; label: string };
  videosTitle: string;
  videos: MediaVideo[];
  linksTitle: string;
};

export type PortfolioContent = {
  locale: Locale;
  nav: {
    about: string;
    projects: string;
    uses: string;
    "media-kit": string;
    contact: string;
  };
  hero: {
    kicker: string;
    title: string;
    description: string;
    primaryCta: string;
    aboutCta: string;
  };
  widgets: {
    github: {
      title: string;
      contribution: string;
      contributions: string;
      less: string;
      more: string;
      unavailable: string;
    };
    weather: {
      title: string;
      loading: string;
      unavailable: string;
      attribution: string;
      conditions: {
        clear: string;
        cloudy: string;
        fog: string;
        drizzle: string;
        rain: string;
        snow: string;
        storm: string;
      };
    };
  };
  labels: {
    experience: string;
    experienceDescription: string;
    career: string;
    aboutTitle: string;
    usesTitle: string;
    usesIntroduction: string;
    current: string;
    about: string;
    contact: string;
    education: string;
    languages: string;
    capabilities: string;
    contactTitle: string;
    contactDescription: string;
    linkedinCta: string;
    footer: string;
  };
  experiences: Experience[];
  education: Education[];
  languages: string[];
  capabilities: string[];
  about: AboutSegment[][];
  uses: UseCategory[];
  projects: ProjectCatalogue;
  mediaKit: MediaKitContent;
  socialLinks: SocialLink[];
};

export const locales: Locale[] = ["en", "pt"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const content: Record<Locale, PortfolioContent> = {
  en: {
    locale: "en",
    nav: {
      about: "About",
      projects: "Projects",
      uses: "Uses",
      "media-kit": "Media Kit",
      contact: "Contact",
    },
    hero: {
      kicker: "Software Engineer · Full Stack · AI-powered products",
      title: "Lucas Lourenço",
      description: "Building thoughtful software for complex products.",
      primaryCta: "Connect on LinkedIn",
      aboutCta: "More about me",
    },
    widgets: {
      github: {
        title: "GitHub activity",
        contribution: "contribution in the last year",
        contributions: "contributions in the last year",
        less: "Less",
        more: "More",
        unavailable: "Activity is taking a short break.",
      },
      weather: {
        title: "Local weather",
        loading: "Looking outside…",
        unavailable: "The forecast wandered off.",
        attribution: "Weather by Open-Meteo",
        conditions: {
          clear: "Clear",
          cloudy: "Cloudy",
          fog: "Foggy",
          drizzle: "Drizzle",
          rain: "Rain",
          snow: "Snow",
          storm: "Storm",
        },
      },
    },
    labels: {
      experience: "Experience",
      experienceDescription:
        "From interface systems to full-stack platforms and AI workflows.",
      career: "Career",
      aboutTitle: "Hey, I’m Lucas Lourenço.",
      usesTitle: "Tools. Apps. Gear.",
      usesIntroduction:
        "A living list of the hardware, software, and services that shape how I work every day.",
      current: "Current",
      about: "About",
      contact: "Contact",
      education: "Education",
      languages: "Languages",
      capabilities: "Core capabilities",
      contactTitle: "Let’s build something useful.",
      contactDescription:
        "I’m interested in international software engineering roles and product-minded teams working on meaningful problems.",
      linkedinCta: "Start a conversation on LinkedIn",
      footer: "Designed and built by Lucas Lourenço.",
    },
    experiences: [
      {
        company: "Connectabil",
        role: "Full Stack Developer",
        period: "May 2025 — Present",
        summary:
          "Building full-stack features and AI-powered recruiting workflows across a modern HR-tech ecosystem.",
        skills: ["React", "Next.js", "NestJS", "GraphQL", "PostgreSQL", "AI"],
      },
      {
        company: "DFCom Software House",
        role: "Full Stack Developer",
        period: "Jun 2024 — May 2025",
        summary:
          "Led technical decisions, reusable component architecture, API integrations, mentoring, and full-stack delivery for client products.",
        skills: [
          "Technical leadership",
          "React",
          "Node.js",
          "APIs",
          "Mentoring",
        ],
      },
      {
        company: "dotkon · Amaggi",
        role: "Front-end Developer",
        period: "Sep 2022 — Oct 2023",
        summary:
          "Developed and migrated agribusiness applications, geospatial interfaces, and a reusable design system.",
        skills: ["React", "Next.js", "Leaflet", "Storybook", "Jest"],
      },
      {
        company: "Ministério Atos de Justiça",
        role: "Systems Developer",
        period: "Oct 2020 — Sep 2022",
        summary:
          "Created institutional platforms, event experiences, and real-time operational workflows from the ground up.",
        skills: ["Next.js", "Node.js", "WebSockets", "Automation"],
      },
      {
        company: "Ciarama Máquinas John Deere",
        role: "IT Assistant",
        period: "Aug 2019 — Jun 2020",
        summary:
          "Developed an internal label-printing tool and supported users and core business systems.",
        skills: ["Internal tools", "TOTVS", "IT operations"],
      },
    ],
    education: [
      {
        degree: "B.Sc. in Information Systems",
        school: "Estácio",
        period: "2022 — 2025",
      },
      {
        degree: "Information Systems",
        school: "Federal University of Mato Grosso do Sul",
        period: "2020 — 2022",
      },
      {
        degree: "Technical Degree in Information Technology",
        school: "IFMS",
        period: "2016 — 2019",
      },
    ],
    languages: [
      "Portuguese · Native",
      "Spanish · Advanced",
      "English · Intermediate",
    ],
    capabilities: [
      "Product engineering",
      "Full-stack architecture",
      "AI agents & RAG",
      "Design systems",
      "Technical leadership",
      "Developer mentoring",
    ],
    about: [
      [
        { text: "I am a " },
        { text: "Software Engineer", highlight: true },
        { text: " with " },
        { text: "6+ years of experience", highlight: true },
        { text: " building " },
        { text: "scalable web applications" },
        { text: " and " },
        { text: "digital products" },
        {
          text: " across HR tech, software consulting, agribusiness, and institutional systems.",
        },
      ],
      [
        { text: "My core stack includes " },
        { text: "TypeScript, React, Next.js", highlight: true },
        { text: ", " },
        {
          text: "Node.js, NestJS, GraphQL, REST APIs, PostgreSQL, and WebSockets",
          highlight: true,
        },
        { text: ". I have experience working across the " },
        { text: "full software development lifecycle" },
        {
          text: ", from understanding business requirements and designing application architecture to implementing, testing, monitoring, and maintaining production features.",
        },
      ],
    ],
    uses: [
      {
        title: "Desk",
        items: [
          {
            name: "MacBook Pro 14-inch",
            description: "Fast, compact, and handles everything I throw at it.",
            href: "https://www.apple.com/macbook-pro/",
          },
          {
            name: "AOC 144Hz Monitor",
            description: "Once you go 144Hz, it’s hard to go back.",
            href: "https://aoc.com/",
          },
          {
            name: "Logitech M190",
            description: "Simple, comfy, and gets the job done.",
            href: "https://www.logitech.com/products/mice/m190-wireless-mouse.html",
          },
          {
            name: "Gaming chair",
            description: "My back’s loyal sidekick.",
          },
          {
            name: "Redragon Zeus X",
            description: "For calls, focus, and loud playlists.",
            href: "https://redragonshop.com/",
          },
        ],
      },
      {
        title: "Coding",
        items: [
          {
            name: "Visual Studio Code",
            description: "Home is where the command palette is.",
            href: "https://code.visualstudio.com/",
          },
          {
            name: "Min Dark",
            description: "Clean, quiet, and easy on the eyes.",
            href: "https://marketplace.visualstudio.com/items?itemName=miguelsolorio.min-theme",
          },
          {
            name: "JetBrains Mono",
            description: "Great letters. Even better ligatures.",
            href: "https://www.jetbrains.com/lp/mono/",
          },
          {
            name: "iTerm2",
            description: "Where half the work actually happens.",
            href: "https://iterm2.com/",
          },
          {
            name: "Fish shell",
            description: "Autocomplete that feels like magic.",
            href: "https://fishshell.com/",
          },
        ],
      },
      {
        title: "Apps",
        items: [
          {
            name: "Discord",
            description: "Communities, friends, and a little chaos.",
            href: "https://discord.com/",
          },
          {
            name: "Google Workspace",
            description: "Email, docs, meetings — the whole package.",
            href: "https://workspace.google.com/",
          },
          {
            name: "Notion",
            description: "Where ideas go before becoming code.",
            href: "https://www.notion.com/",
          },
          {
            name: "Figma",
            description: "The bridge between pixels and components.",
            href: "https://www.figma.com/",
          },
          {
            name: "Pencil",
            description: "From rough idea to interface, fast.",
            href: "https://www.pencil.dev/",
          },
        ],
      },
      {
        title: "Services & AI",
        items: [
          {
            name: "GitHub",
            description: "Where my code lives and occasionally behaves.",
            href: "https://github.com/lucas-lourencoo",
          },
          {
            name: "Vercel",
            description: "Push, deploy, done.",
            href: "https://vercel.com/",
          },
          {
            name: "Docker",
            description: "Because “works on my machine” isn’t enough.",
            href: "https://www.docker.com/",
          },
          {
            name: "ChatGPT",
            description: "My always-available brainstorming buddy.",
            href: "https://chatgpt.com/",
          },
          {
            name: "Claude",
            description: "Great for big contexts and careful thinking.",
            href: "https://claude.ai/",
          },
          {
            name: "Codex",
            description: "The coding teammate who never gets tired.",
            href: "https://openai.com/codex/",
          },
          {
            name: "NotebookLM",
            description: "Makes a pile of sources feel manageable.",
            href: "https://notebooklm.google.com/",
          },
        ],
      },
    ],
    projects: {
      title: "Build. Ship. Repeat.",
      introduction:
        "A selection of products, open-source experiments, and client work I have brought to life.",
      featuredTitle: "Featured Projects",
      archiveTitle: "Selected Projects",
      featured: [
        {
          name: "Fast Copy",
          description:
            "A minimal browser extension for copying the current URL with a shortcut.",
          category: "Browser extension",
          href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
        },
        {
          name: "Upload AI",
          description:
            "An AI workflow that transcribes videos and turns them into useful content.",
          category: "AI product",
          href: "https://github.com/lucas-lourencoo/upload-ai-web",
        },
        {
          name: "Cor de Verano",
          description:
            "A polished digital storefront for a Brazilian fashion brand.",
          category: "Client work",
          href: "https://www.cordeverano.com.br/",
        },
        {
          name: "Fazendas do Brasil",
          description:
            "A digital experience built for discovering rural properties across Brazil.",
          category: "Client work",
          href: "https://www.fazendasdobrasil.com.br/",
        },
      ],
      groups: [
        {
          title: "Products & Open Source",
          items: [
            {
              name: "Fast Copy",
              description: "Minimal browser extension for copying URLs faster.",
              category: "Browser extension",
              href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
            },
            {
              name: "Upload AI",
              description:
                "AI-assisted video transcription and content generation.",
              category: "AI product",
              href: "https://github.com/lucas-lourencoo/upload-ai-web",
            },
            {
              name: "Ignite Call",
              description:
                "A scheduling experience for sharing availability and booking time.",
              category: "Web app",
              href: "https://ignite-call-chi-eight.vercel.app",
            },
            {
              name: "Nego Tech",
              description: "The open-source code behind this portfolio.",
              category: "Portfolio",
              href: "https://github.com/lucas-lourencoo/nego-tech",
            },
            {
              name: "Ecoleta",
              description:
                "A platform connecting people with recyclable waste collection points.",
              category: "Web app",
              href: "https://github.com/lucas-lourencoo/nlw-ecoleta",
            },
          ],
        },
        {
          title: "Client Work",
          items: [
            {
              name: "Cor de Verano",
              description: "Fashion e-commerce experience.",
              category: "Commerce",
              href: "https://www.cordeverano.com.br/",
            },
            {
              name: "Dual Serviços",
              description: "Institutional service company website.",
              category: "Website",
              href: "https://www.dualservicosterceirizados.com.br/",
            },
            {
              name: "AGF Garantidora",
              description:
                "Institutional platform for financial guarantees.",
              category: "Website",
              href: "https://www.agfgarantidora.com.br/",
            },
            {
              name: "Juventude UP",
              description: "Digital home for a youth community.",
              category: "Community",
              href: "https://www.juventudeup.com.br/",
            },
            {
              name: "Viamaq",
              description:
                "Product and company website for agricultural machinery.",
              category: "Website",
              href: "https://viamaqtratores.com.br/",
            },
            {
              name: "Fazendas do Brasil",
              description: "Rural property discovery experience.",
              category: "Marketplace",
              href: "https://www.fazendasdobrasil.com.br/",
            },
            {
              name: "IEDUCAA",
              description: "Digital presence for an education initiative.",
              category: "Education",
              href: "https://www.ieducaa.org/",
            },
            {
              name: "Israel Profético",
              description: "Content platform for a faith-based project.",
              category: "Content",
              href: "https://www.israelprofetico.com.br/",
            },
            {
              name: "Missão Paraguai",
              description: "Mission project website and information hub.",
              category: "Nonprofit",
              href: "https://missaoparaguai.com.br/",
            },
          ],
        },
      ],
    },
    mediaKit: {
      eyebrow: "Creator profile",
      title: "Media Kit",
      introduction:
        "Technology, music, faith, and everyday life — told through honest content and real experiences.",
      audienceTitle: "Audience",
      audience: [
        {
          label: "Instagram",
          value: "1.3K+ followers",
          href: "https://www.instagram.com/lucas_lourencoo_/",
        },
        {
          label: "YouTube",
          value: "300+ subscribers",
          href: "https://www.youtube.com/@lucas_lourenco",
        },
        {
          label: "LinkedIn",
          value: "600+ connections",
          href: "https://www.linkedin.com/in/lucas-lourenco2802/",
        },
        {
          label: "GitHub",
          value: "100+ stars",
          href: "https://github.com/lucas-lourencoo",
        },
      ],
      highlight: {
        value: "10K+",
        label: "views on the most popular video",
      },
      videosTitle: "Popular videos",
      videos: [
        {
          id: "Uoy01i8ilN4",
          title: "Papai Não Dorme | Lucas Lourenço",
          views: "9.6K views",
        },
        {
          id: "qfb0hzn4MGA",
          title: "Estou Só | Lucas Lourenço",
          views: "3.9K views",
        },
        {
          id: "VO6n-ksqwkQ",
          title: "Vou Ficar Aqui | Lucas Lourenço",
          views: "2.8K views",
        },
        {
          id: "00KAxC_NesQ",
          title: "A Voz Que Eu Amo | Lucas Lourenço",
          views: "2.4K views",
        },
      ],
      linksTitle: "Find me online",
    },
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/lucas-lourenco2802/",
      },
      { label: "GitHub", href: "https://github.com/lucas-lourencoo" },
      { label: "Email", href: "mailto:lucascelestiano@gmail.com" },
    ],
  },
  pt: {
    locale: "pt",
    nav: {
      about: "Sobre",
      projects: "Projetos",
      uses: "Uses",
      "media-kit": "Media Kit",
      contact: "Contato",
    },
    hero: {
      kicker: "Engenheiro de Software · Full Stack · Produtos com IA",
      title: "Lucas Lourenço",
      description: "Construindo software cuidadoso para produtos complexos.",
      primaryCta: "Conectar no LinkedIn",
      aboutCta: "Saiba mais",
    },
    widgets: {
      github: {
        title: "Atividade no GitHub",
        contribution: "contribuição no último ano",
        contributions: "contribuições no último ano",
        less: "Menos",
        more: "Mais",
        unavailable: "A atividade tirou uma pausa rápida.",
      },
      weather: {
        title: "Clima local",
        loading: "Olhando pela janela…",
        unavailable: "A previsão saiu para passear.",
        attribution: "Clima por Open-Meteo",
        conditions: {
          clear: "Céu limpo",
          cloudy: "Nublado",
          fog: "Neblina",
          drizzle: "Garoa",
          rain: "Chuva",
          snow: "Neve",
          storm: "Tempestade",
        },
      },
    },
    labels: {
      experience: "Experiência",
      experienceDescription:
        "De sistemas de interface a plataformas full-stack e fluxos com IA.",
      career: "Carreira",
      aboutTitle: "Oi, eu sou o Lucas Lourenço.",
      usesTitle: "Ferramentas. Apps. Equipamentos.",
      usesIntroduction:
        "Uma lista viva do hardware, software e dos serviços que fazem parte do meu trabalho todos os dias.",
      current: "Atual",
      about: "Sobre",
      contact: "Contato",
      education: "Formação",
      languages: "Idiomas",
      capabilities: "Competências centrais",
      contactTitle: "Vamos construir algo útil.",
      contactDescription:
        "Tenho interesse em posições internacionais de engenharia de software e times orientados a produto trabalhando em problemas relevantes.",
      linkedinCta: "Iniciar conversa no LinkedIn",
      footer: "Design e desenvolvimento por Lucas Lourenço.",
    },
    experiences: [
      {
        company: "Connectabil",
        role: "Desenvolvedor Full Stack",
        period: "Mai 2025 — Presente",
        summary:
          "Desenvolvimento de funcionalidades full-stack e fluxos de recrutamento com IA em um ecossistema moderno de HR tech.",
        skills: ["React", "Next.js", "NestJS", "GraphQL", "PostgreSQL", "IA"],
      },
      {
        company: "DFCom Software House",
        role: "Desenvolvedor Full Stack",
        period: "Jun 2024 — Mai 2025",
        summary:
          "Liderança de decisões técnicas, arquitetura de componentes, integrações, mentoria e entregas full-stack.",
        skills: ["Liderança técnica", "React", "Node.js", "APIs", "Mentoria"],
      },
      {
        company: "dotkon · Amaggi",
        role: "Desenvolvedor Front-end",
        period: "Set 2022 — Out 2023",
        summary:
          "Desenvolvimento e migração de aplicações para agronegócio, interfaces geoespaciais e um design system reutilizável.",
        skills: ["React", "Next.js", "Leaflet", "Storybook", "Jest"],
      },
      {
        company: "Ministério Atos de Justiça",
        role: "Programador de Sistemas",
        period: "Out 2020 — Set 2022",
        summary:
          "Criação de plataformas institucionais, experiências para eventos e fluxos operacionais em tempo real.",
        skills: ["Next.js", "Node.js", "WebSockets", "Automação"],
      },
      {
        company: "Ciarama Máquinas John Deere",
        role: "Assistente de TI",
        period: "Ago 2019 — Jun 2020",
        summary:
          "Desenvolvimento de uma ferramenta interna para etiquetas e suporte a usuários e sistemas de negócio.",
        skills: ["Ferramentas internas", "TOTVS", "Operações de TI"],
      },
    ],
    education: [
      {
        degree: "Bacharelado em Sistemas de Informação",
        school: "Estácio",
        period: "2022 — 2025",
      },
      {
        degree: "Sistemas de Informação",
        school: "Universidade Federal de Mato Grosso do Sul",
        period: "2020 — 2022",
      },
      {
        degree: "Técnico em Informática",
        school: "IFMS",
        period: "2016 — 2019",
      },
    ],
    languages: [
      "Português · Nativo",
      "Espanhol · Avançado",
      "Inglês · Intermediário",
    ],
    capabilities: [
      "Engenharia de produto",
      "Arquitetura full-stack",
      "Agentes de IA e RAG",
      "Design systems",
      "Liderança técnica",
      "Mentoria de desenvolvedores",
    ],
    about: [
      [
        { text: "Sou " },
        { text: "engenheiro de software", highlight: true },
        { text: " em " },
        { text: "Campo Grande, Brasil", highlight: true },
        { text: ". Trabalho em todo o " },
        { text: "ciclo do produto", highlight: true },
        { text: ": entendimento do problema, desenho da " },
        { text: "arquitetura", highlight: true },
        { text: ", entrega da " },
        { text: "interface e do backend", highlight: true },
        { text: " e evolução do que chega à " },
        { text: "produção", highlight: true },
        { text: "." },
      ],
      [
        { text: "Meu melhor trabalho acontece no encontro entre " },
        { text: "engenharia", highlight: true },
        { text: ", " },
        { text: "visão de produto", highlight: true },
        { text: " e " },
        { text: "design de interação cuidadoso", highlight: true },
        { text: "." },
      ],
    ],
    uses: [
      {
        title: "Setup",
        items: [
          {
            name: "MacBook Pro de 14 polegadas",
            description: "Rápido, compacto e aguenta tudo que eu invento.",
            href: "https://www.apple.com/macbook-pro/",
          },
          {
            name: "Monitor AOC 144Hz",
            description: "Depois dos 144Hz, é difícil voltar atrás.",
            href: "https://aoc.com/",
          },
          {
            name: "Logitech M190",
            description: "Simples, confortável e resolve tudo.",
            href: "https://www.logitech.com/products/mice/m190-wireless-mouse.html",
          },
          {
            name: "Cadeira gamer",
            description: "A fiel escudeira das minhas costas.",
          },
          {
            name: "Redragon Zeus X",
            description: "Para calls, foco e música alta.",
            href: "https://redragonshop.com/",
          },
        ],
      },
      {
        title: "Desenvolvimento",
        items: [
          {
            name: "Visual Studio Code",
            description: "Meu segundo lar, basicamente.",
            href: "https://code.visualstudio.com/",
          },
          {
            name: "Min Dark",
            description: "Limpo, discreto e confortável para os olhos.",
            href: "https://marketplace.visualstudio.com/items?itemName=miguelsolorio.min-theme",
          },
          {
            name: "JetBrains Mono",
            description: "Letras bonitas e ligaduras melhores ainda.",
            href: "https://www.jetbrains.com/lp/mono/",
          },
          {
            name: "iTerm2",
            description: "Onde metade do trabalho realmente acontece.",
            href: "https://iterm2.com/",
          },
          {
            name: "Fish shell",
            description: "Autocomplete que parece mágica.",
            href: "https://fishshell.com/",
          },
        ],
      },
      {
        title: "Aplicativos",
        items: [
          {
            name: "Discord",
            description: "Comunidades, amigos e um pouco de caos.",
            href: "https://discord.com/",
          },
          {
            name: "Google Workspace",
            description: "E-mail, docs, reuniões — o pacote completo.",
            href: "https://workspace.google.com/",
          },
          {
            name: "Notion",
            description: "Onde as ideias ficam antes de virarem código.",
            href: "https://www.notion.com/",
          },
          {
            name: "Figma",
            description: "A ponte entre pixels e componentes.",
            href: "https://www.figma.com/",
          },
          {
            name: "Pencil",
            description: "Da ideia solta para uma interface, rapidinho.",
            href: "https://www.pencil.dev/",
          },
        ],
      },
      {
        title: "Serviços e IA",
        items: [
          {
            name: "GitHub",
            description: "Onde meu código mora e às vezes se comporta.",
            href: "https://github.com/lucas-lourencoo",
          },
          {
            name: "Vercel",
            description: "Push, deploy e pronto.",
            href: "https://vercel.com/",
          },
          {
            name: "Docker",
            description: "Porque “na minha máquina funciona” não basta.",
            href: "https://www.docker.com/",
          },
          {
            name: "ChatGPT",
            description: "Meu parceiro de brainstorming sempre disponível.",
            href: "https://chatgpt.com/",
          },
          {
            name: "Claude",
            description: "Ótimo para contextos enormes e pensar com calma.",
            href: "https://claude.ai/",
          },
          {
            name: "Codex",
            description: "O parceiro de código que nunca fica cansado.",
            href: "https://openai.com/codex/",
          },
          {
            name: "NotebookLM",
            description: "Transforma uma pilha de fontes em algo útil.",
            href: "https://notebooklm.google.com/",
          },
        ],
      },
    ],
    projects: {
      title: "Criar. Publicar. Evoluir.",
      introduction:
        "Uma seleção de produtos, experimentos open source e trabalhos para clientes que tirei do papel.",
      featuredTitle: "Projetos em destaque",
      archiveTitle: "Projetos selecionados",
      featured: [
        {
          name: "Fast Copy",
          description:
            "Uma extensão minimalista para copiar a URL atual usando um atalho.",
          category: "Extensão de navegador",
          href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
        },
        {
          name: "Upload AI",
          description:
            "Um fluxo com IA que transcreve vídeos e os transforma em conteúdo útil.",
          category: "Produto com IA",
          href: "https://github.com/lucas-lourencoo/upload-ai-web",
        },
        {
          name: "Cor de Verano",
          description:
            "Uma vitrine digital refinada para uma marca brasileira de moda.",
          category: "Trabalho para cliente",
          href: "https://www.cordeverano.com.br/",
        },
        {
          name: "Fazendas do Brasil",
          description:
            "Uma experiência digital para descobrir propriedades rurais pelo Brasil.",
          category: "Trabalho para cliente",
          href: "https://www.fazendasdobrasil.com.br/",
        },
      ],
      groups: [
        {
          title: "Produtos e Open Source",
          items: [
            {
              name: "Fast Copy",
              description: "Extensão minimalista para copiar URLs mais rápido.",
              category: "Extensão",
              href: "https://chromewebstore.google.com/detail/bbbgfepehfgaopbfeccedcmcfijofbfn",
            },
            {
              name: "Upload AI",
              description:
                "Transcrição de vídeo e geração de conteúdo assistidas por IA.",
              category: "Produto com IA",
              href: "https://github.com/lucas-lourencoo/upload-ai-web",
            },
            {
              name: "Ignite Call",
              description:
                "Experiência de agenda para compartilhar horários e marcar conversas.",
              category: "Aplicação web",
              href: "https://ignite-call-chi-eight.vercel.app",
            },
            {
              name: "Nego Tech",
              description: "O código open source por trás deste portfólio.",
              category: "Portfólio",
              href: "https://github.com/lucas-lourencoo/nego-tech",
            },
            {
              name: "Ecoleta",
              description:
                "Plataforma que conecta pessoas a pontos de coleta de recicláveis.",
              category: "Aplicação web",
              href: "https://github.com/lucas-lourencoo/nlw-ecoleta",
            },
          ],
        },
        {
          title: "Trabalhos para clientes",
          items: [
            {
              name: "Cor de Verano",
              description: "Experiência de e-commerce de moda.",
              category: "Comércio",
              href: "https://www.cordeverano.com.br/",
            },
            {
              name: "Dual Serviços",
              description: "Site institucional para uma empresa de serviços.",
              category: "Site",
              href: "https://www.dualservicosterceirizados.com.br/",
            },
            {
              name: "AGF Garantidora",
              description:
                "Plataforma institucional para garantias financeiras.",
              category: "Site",
              href: "https://www.agfgarantidora.com.br/",
            },
            {
              name: "Juventude UP",
              description: "Casa digital para uma comunidade de jovens.",
              category: "Comunidade",
              href: "https://www.juventudeup.com.br/",
            },
            {
              name: "Viamaq",
              description:
                "Site de produtos e da empresa de máquinas agrícolas.",
              category: "Site",
              href: "https://viamaqtratores.com.br/",
            },
            {
              name: "Fazendas do Brasil",
              description:
                "Experiência para descoberta de propriedades rurais.",
              category: "Marketplace",
              href: "https://www.fazendasdobrasil.com.br/",
            },
            {
              name: "IEDUCAA",
              description: "Presença digital para uma iniciativa de educação.",
              category: "Educação",
              href: "https://www.ieducaa.org/",
            },
            {
              name: "Israel Profético",
              description: "Plataforma de conteúdo para um projeto cristão.",
              category: "Conteúdo",
              href: "https://www.israelprofetico.com.br/",
            },
            {
              name: "Missão Paraguai",
              description:
                "Site e central de informações de um projeto missionário.",
              category: "Terceiro setor",
              href: "https://missaoparaguai.com.br/",
            },
          ],
        },
      ],
    },
    mediaKit: {
      eyebrow: "Perfil de criador",
      title: "Media Kit",
      introduction:
        "Tecnologia, música, fé e vida real — contadas por meio de conteúdo honesto e experiências de verdade.",
      audienceTitle: "Audiência",
      audience: [
        {
          label: "Instagram",
          value: "1,3 mil+ seguidores",
          href: "https://www.instagram.com/lucas_lourencoo_/",
        },
        {
          label: "YouTube",
          value: "300+ inscritos",
          href: "https://www.youtube.com/@lucas_lourenco",
        },
        {
          label: "LinkedIn",
          value: "600+ conexões",
          href: "https://www.linkedin.com/in/lucas-lourenco2802/",
        },
        {
          label: "GitHub",
          value: "100+ estrelas",
          href: "https://github.com/lucas-lourencoo",
        },
      ],
      highlight: {
        value: "10 mil+",
        label: "visualizações no vídeo mais popular",
      },
      videosTitle: "Vídeos populares",
      videos: [
        {
          id: "Uoy01i8ilN4",
          title: "Papai Não Dorme | Lucas Lourenço",
          views: "9,6 mil visualizações",
        },
        {
          id: "qfb0hzn4MGA",
          title: "Estou Só | Lucas Lourenço",
          views: "3,9 mil visualizações",
        },
        {
          id: "VO6n-ksqwkQ",
          title: "Vou Ficar Aqui | Lucas Lourenço",
          views: "2,8 mil visualizações",
        },
        {
          id: "00KAxC_NesQ",
          title: "A Voz Que Eu Amo | Lucas Lourenço",
          views: "2,4 mil visualizações",
        },
      ],
      linksTitle: "Me encontre por aí",
    },
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/lucas-lourenco2802/",
      },
      { label: "GitHub", href: "https://github.com/lucas-lourencoo" },
      { label: "Email", href: "mailto:lucascelestiano@gmail.com" },
    ],
  },
};

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return content[locale];
}
