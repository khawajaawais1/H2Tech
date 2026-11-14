export type ChatLocale = "en" | "fi";

type Localized = Record<ChatLocale, string>;

export type ChatIntent = {
  id: string;
  /** Short text shown on the quick-reply chip that triggers this intent. */
  label: Localized;
  /**
   * Matched against the user's message. Words of 4+ letters match as word
   * prefixes (so "hint" catches "hinta"), shorter ones only as whole words,
   * and phrases with spaces match anywhere in the message.
   */
  keywords: Record<ChatLocale, string[]>;
  reply: Localized;
  link?: { href: string; label: Localized };
  /** Intent ids offered as follow-up chips after this reply. */
  next?: string[];
  /** Opens the email-support form instead of replying. */
  escalate?: boolean;
  /** Score multiplier; generic intents use < 1 so specific topics win ties. */
  weight?: number;
};

export const START_SUGGESTIONS = ["services", "websitePricing", "timeline", "human"];

export const chatIntents: ChatIntent[] = [
  {
    id: "greeting",
    label: { en: "Hi!", fi: "Hei!" },
    keywords: {
      en: ["hi", "hello", "hey", "good morning", "good evening", "howdy"],
      fi: ["hei", "moi", "terve", "moro", "huomenta", "päivää", "iltaa"],
    },
    reply: {
      en: "Hi there! 👋 I'm the Happy2Tech assistant. I can tell you about our services, pricing, timelines and how to get started. What would you like to know?",
      fi: "Hei! 👋 Olen Happy2Techin avustaja. Kerron mielelläni palveluistamme, hinnoista, aikatauluista ja siitä, miten pääset alkuun. Mitä haluaisit tietää?",
    },
    next: ["services", "websitePricing", "timeline", "human"],
    weight: 0.5,
  },
  {
    id: "services",
    label: { en: "What do you offer?", fi: "Mitä tarjoatte?" },
    keywords: {
      en: ["service", "offer", "what do you do", "what can you do", "help with", "provide"],
      fi: ["palvelu", "tarjoa", "mitä teette", "mitä te teette", "tuottei"],
    },
    reply: {
      en: "We build websites, mobile apps, web apps & SaaS platforms, AI agents and custom software — plus cloud, hosting, SEO and IT consulting. Which one are you interested in?",
      fi: "Teemme verkkosivuja, mobiilisovelluksia, verkkosovelluksia ja SaaS-alustoja, tekoälyagentteja sekä räätälöityä ohjelmistoa — lisäksi pilvipalvelut, hostingin, hakukoneoptimoinnin ja IT-konsultoinnin. Mikä niistä kiinnostaa?",
    },
    link: { href: "/services", label: { en: "See all services", fi: "Katso kaikki palvelut" } },
    next: ["websitePricing", "mobile", "webapps", "aiAgents"],
  },
  {
    id: "websitePricing",
    label: { en: "Website pricing", fi: "Verkkosivujen hinnat" },
    keywords: {
      en: ["website", "web site", "webpage", "landing page", "homepage", "wordpress", "site"],
      fi: ["verkkosiv", "kotisiv", "nettisiv", "sivusto", "laskeutumissiv", "wordpress"],
    },
    reply: {
      en: "Our website packages:\n• Starter — €99–199, single-page website\n• Business — from €399, 1–4 pages\n• Advanced — from €699, 3–7 pages\n• Premium — €3000+, 7+ pages, custom development\nAll sites are mobile-first and fast-loading.",
      fi: "Verkkosivupakettimme:\n• Starter — 99–199 €, yksisivuinen sivusto\n• Business — alk. 399 €, 1–4 sivua\n• Advanced — alk. 699 €, 3–7 sivua\n• Premium — 3000+ €, 7+ sivua, räätälöity kehitys\nKaikki sivustot ovat mobiiliystävällisiä ja nopeita.",
    },
    link: { href: "/promotions", label: { en: "View packages & sample designs", fi: "Katso paketit ja esimerkit" } },
    next: ["ecommerce", "timeline", "quote"],
  },
  {
    id: "ecommerce",
    label: { en: "Online store", fi: "Verkkokauppa" },
    keywords: {
      en: ["ecommerce", "e-commerce", "webshop", "web shop", "online store", "online shop", "shopify", "woocommerce", "sell online", "klarna", "mobilepay", "payment"],
      fi: ["verkkokaup", "nettikaup", "kauppa", "shopify", "woocommerce", "myydä verkossa", "klarna", "mobilepay", "maksu"],
    },
    reply: {
      en: "Yes, we build online stores — from a starter Woo/Shopify shop to a fully custom webshop with MobilePay, Klarna, Nordea/OP payments, inventory and invoicing (verkkolasku) integrations.",
      fi: "Kyllä, teemme verkkokauppoja — kevyestä Woo/Shopify-kaupasta täysin räätälöityyn verkkokauppaan, jossa on MobilePay-, Klarna- ja Nordea/OP-maksut sekä varasto- ja verkkolaskuintegraatiot.",
    },
    link: { href: "/promotions", label: { en: "See e-commerce packages", fi: "Katso verkkokauppapaketit" } },
    next: ["websitePricing", "quote", "human"],
  },
  {
    id: "mobile",
    label: { en: "Mobile apps", fi: "Mobiilisovellukset" },
    keywords: {
      en: ["mobile", "app", "apps", "ios", "android", "iphone", "react native", "flutter"],
      fi: ["mobiili", "sovellu", "äppi", "appi", "ios", "android", "iphone"],
    },
    reply: {
      en: "We build iOS and Android apps. A Starter App (3–6 screens, single platform, MVP-ready) starts from €999. Cross-platform, advanced and fully native apps are quoted to your scope.",
      fi: "Teemme iOS- ja Android-sovelluksia. Starter-sovellus (3–6 näkymää, yksi alusta, MVP-valmis) alkaen 999 €. Monialustaiset, laajemmat ja natiivit sovellukset hinnoitellaan tarpeen mukaan.",
    },
    link: { href: "/promotions", label: { en: "See app packages", fi: "Katso sovelluspaketit" } },
    next: ["timeline", "quote", "human"],
  },
  {
    id: "webapps",
    label: { en: "Web apps & SaaS", fi: "Verkkosovellukset" },
    keywords: {
      en: ["web app", "webapp", "saas", "dashboard", "portal", "platform", "software", "system", "crm", "erp"],
      fi: ["verkkosovellu", "saas", "hallintapaneel", "portaal", "alusta", "ohjelmisto", "järjestelm", "crm", "erp"],
    },
    reply: {
      en: "We build web apps from single-tool apps (login + dashboard, from €799) to dashboards/portals, SaaS MVPs with billing, and enterprise platforms with SSO and custom integrations.",
      fi: "Teemme verkkosovelluksia yksittäisistä työkaluista (kirjautuminen + hallintapaneeli, alk. 799 €) portaaleihin, laskutuksella varustettuihin SaaS-MVP:hin ja yritysalustoihin, joissa on SSO ja räätälöidyt integraatiot.",
    },
    link: { href: "/promotions", label: { en: "See web app packages", fi: "Katso verkkosovelluspaketit" } },
    next: ["integrations", "timeline", "quote"],
  },
  {
    id: "aiAgents",
    label: { en: "AI agents & chatbots", fi: "Tekoälyagentit" },
    keywords: {
      en: ["ai", "chatbot", "chat bot", "bot", "agent", "gpt", "automation", "artificial intelligence"],
      fi: ["tekoäly", "chatbot", "botti", "agentti", "automaati", "gpt"],
    },
    reply: {
      en: "We build AI agents: an FAQ Agent website widget from €299, a multi-channel Lead-Capture Agent from €699, plus document-trained RAG assistants and fully custom voice/multi-agent solutions.",
      fi: "Teemme tekoälyagentteja: FAQ-agentti verkkosivuille alk. 299 €, monikanavainen liidiagentti alk. 699 €, sekä dokumenteilla koulutettuja RAG-avustajia ja räätälöityjä ääni- ja moniagenttiratkaisuja.",
    },
    link: { href: "/promotions", label: { en: "See AI agent packages", fi: "Katso tekoälypaketit" } },
    next: ["timeline", "quote", "human"],
  },
  {
    id: "pricing",
    label: { en: "How much does it cost?", fi: "Paljonko maksaa?" },
    keywords: {
      en: ["price", "pricing", "cost", "how much", "budget", "cheap", "expensive", "rate", "fee", "package", "plan"],
      fi: ["hint", "hinn", "maksa", "kustann", "budjet", "halpa", "kallis", "paketti", "paketi"],
    },
    reply: {
      en: "Prices depend on what you need. Quick guide:\n• Websites — from €99\n• AI agents — from €299\n• Web apps — from €799\n• Mobile apps — from €999\nLarger projects get a free, tailored quote within 24 hours.",
      fi: "Hinta riippuu tarpeistasi. Suuntaa-antavasti:\n• Verkkosivut — alk. 99 €\n• Tekoälyagentit — alk. 299 €\n• Verkkosovellukset — alk. 799 €\n• Mobiilisovellukset — alk. 999 €\nIsommista projekteista saat ilmaisen tarjouksen 24 tunnin sisällä.",
    },
    link: { href: "/promotions", label: { en: "See all packages", fi: "Katso kaikki paketit" } },
    next: ["websitePricing", "mobile", "quote"],
    weight: 0.5,
  },
  {
    id: "quote",
    label: { en: "Get a quote", fi: "Pyydä tarjous" },
    keywords: {
      en: ["quote", "estimate", "proposal", "start a project", "get started", "hire", "work with you", "new project"],
      fi: ["tarjous", "tarjouk", "arvio", "aloittaa projekt", "uusi projekti", "palkata"],
    },
    reply: {
      en: "Great! Send us a short description of your project through the contact form and we'll get back with a quote within 24 hours. You can also leave your details right here in the chat.",
      fi: "Mahtavaa! Kerro projektistasi lyhyesti yhteydenottolomakkeella, niin palaamme tarjouksen kanssa 24 tunnin sisällä. Voit myös jättää yhteystietosi suoraan tähän chattiin.",
    },
    link: { href: "/contact?topic=Project%20Request", label: { en: "Open the contact form", fi: "Avaa yhteydenottolomake" } },
    next: ["human", "timeline"],
  },
  {
    id: "timeline",
    label: { en: "How long does it take?", fi: "Kauanko se kestää?" },
    keywords: {
      en: ["how long", "timeline", "time frame", "timeframe", "deadline", "duration", "when ready", "fast", "quick", "weeks", "days"],
      fi: ["kauanko", "kuinka kauan", "aikatau", "kestää", "kesto", "valmis", "nopea", "viiko", "päivä"],
    },
    reply: {
      en: "A one-page Starter site can be live in about 3 days. Larger websites take 1–3 weeks, a focused MVP 6–10 weeks, and enterprise platforms 3–6 months. You always get a timeline estimate before we start.",
      fi: "Yksisivuinen Starter-sivusto voi olla valmis noin 3 päivässä. Laajemmat sivustot vievät 1–3 viikkoa, MVP 6–10 viikkoa ja yritysalustat 3–6 kuukautta. Saat aina aikatauluarvion ennen aloitusta.",
    },
    next: ["process", "quote", "pricing"],
  },
  {
    id: "process",
    label: { en: "How do you work?", fi: "Miten työskentelette?" },
    keywords: {
      en: ["process", "how do you work", "how does it work", "steps", "workflow", "approach", "methodology"],
      fi: ["prosessi", "miten työskentel", "miten se toimii", "vaihee", "työtapa", "menetelm"],
    },
    reply: {
      en: "We start with a short discovery call to understand your goals, then agree on a clear scope and timeline. After that we design and build in sprints, show you regular demos, and launch once you're happy.",
      fi: "Aloitamme lyhyellä kartoituspuhelulla tavoitteidesi ymmärtämiseksi ja sovimme selkeän laajuuden ja aikataulun. Sen jälkeen suunnittelemme ja toteutamme sprinteissä, näytämme säännöllisesti demoja ja julkaisemme, kun olet tyytyväinen.",
    },
    next: ["timeline", "support", "quote"],
  },
  {
    id: "support",
    label: { en: "Support after launch", fi: "Tuki julkaisun jälkeen" },
    keywords: {
      en: ["maintenance", "support", "after launch", "update", "bug", "fix", "hosting", "host", "domain", "seo"],
      fi: ["ylläpi", "tuki", "julkaisun jälkeen", "päivity", "bugi", "korja", "hosting", "verkkotunn", "domain", "hakukone", "seo"],
    },
    reply: {
      en: "Yes — we offer ongoing support after launch: hosting, monitoring, security updates, bug fixes, SEO and new features as your business grows.",
      fi: "Kyllä — tarjoamme jatkuvaa tukea julkaisun jälkeen: hosting, valvonta, tietoturvapäivitykset, virheenkorjaukset, hakukoneoptimointi ja uudet ominaisuudet liiketoimintasi kasvaessa.",
    },
    next: ["quote", "human"],
  },
  {
    id: "integrations",
    label: { en: "Work with our systems?", fi: "Nykyiset järjestelmät?" },
    keywords: {
      en: ["existing", "integrate", "integration", "api", "tech stack", "migrate", "migration", "legacy", "redesign"],
      fi: ["nykyi", "integro", "integraati", "rajapint", "api", "siirto", "uudistu", "vanha"],
    },
    reply: {
      en: "Absolutely. We integrate with existing platforms, APIs and third-party services, and can redesign or migrate your current site or system. We review your setup first and recommend the best approach.",
      fi: "Ehdottomasti. Integroimme olemassa oleviin alustoihin, rajapintoihin ja kolmannen osapuolen palveluihin ja voimme uudistaa tai siirtää nykyisen sivustosi tai järjestelmäsi. Käymme ensin läpi nykytilan ja suosittelemme parasta ratkaisua.",
    },
    next: ["quote", "human"],
  },
  {
    id: "careers",
    label: { en: "Jobs at Happy2Tech", fi: "Työpaikat" },
    keywords: {
      en: ["job", "jobs", "career", "hiring", "vacanc", "intern", "work for you", "apply", "position", "recruit"],
      fi: ["työpaik", "ura", "rekry", "harjoittel", "hae", "haku", "avoin", "työnhak"],
    },
    reply: {
      en: "We're always happy to meet talented people! Check our open positions, or send an open application from the Careers page.",
      fi: "Tapaamme mielellämme lahjakkaita ihmisiä! Katso avoimet paikat tai lähetä avoin hakemus Ura-sivulta.",
    },
    link: { href: "/careers", label: { en: "Go to Careers", fi: "Siirry Ura-sivulle" } },
    next: ["services", "human"],
  },
  {
    id: "contact",
    label: { en: "Contact details", fi: "Yhteystiedot" },
    keywords: {
      en: ["contact", "email", "phone", "call", "number", "address", "location", "where are you", "office", "reach"],
      fi: ["yhtey", "sähköpost", "puhel", "soita", "numero", "osoite", "sijainti", "missä", "toimisto"],
    },
    reply: {
      en: "You can reach us at info@happy2tech.fi or +358 44 433 3433. We're based in Finland and usually reply within one business day.",
      fi: "Tavoitat meidät osoitteesta info@happy2tech.fi tai numerosta +358 44 433 3433. Olemme Suomessa ja vastaamme yleensä yhden arkipäivän sisällä.",
    },
    link: { href: "/contact", label: { en: "Open contact page", fi: "Avaa yhteystiedot" } },
    next: ["human", "quote"],
  },
  {
    id: "human",
    label: { en: "Email our support", fi: "Lähetä viesti tuelle" },
    keywords: {
      en: ["human", "real person", "agent please", "talk to someone", "speak to someone", "support team", "representative", "operator"],
      fi: ["ihmi", "henkilö", "asiakaspalvel", "puhua jonkun", "tukitiim"],
    },
    reply: {
      en: "Sure — leave your details and message below and our team will reply by email.",
      fi: "Totta kai — jätä yhteystietosi ja viestisi alle, niin tiimimme vastaa sähköpostitse.",
    },
    escalate: true,
  },
  {
    id: "thanks",
    label: { en: "Thanks!", fi: "Kiitos!" },
    keywords: {
      en: ["thank", "thanks", "thx", "great", "awesome", "perfect", "cool", "ok", "okay"],
      fi: ["kiitos", "kiitti", "kiitoksia", "kiva", "mahtava", "hienoa", "selvä", "okei"],
    },
    reply: {
      en: "You're welcome! Is there anything else I can help you with?",
      fi: "Ole hyvä! Voinko auttaa vielä jossain muussa?",
    },
    next: ["services", "pricing", "human"],
    weight: 0.5,
  },
  {
    id: "bye",
    label: { en: "Bye", fi: "Hei hei" },
    keywords: {
      en: ["bye", "goodbye", "see you", "that's all", "thats all", "nothing else"],
      fi: ["hei hei", "heippa", "näkemiin", "moikka", "ei muuta", "siinä kaikki"],
    },
    reply: {
      en: "Thanks for stopping by! If anything comes up, I'm right here. Have a great day! 😊",
      fi: "Kiitos käynnistä! Jos jotain tulee mieleen, olen tässä. Mukavaa päivää! 😊",
    },
    next: ["services", "human"],
  },
];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Returns the best-matching intent for a free-text message, or null if nothing fits. */
export const matchIntent = (message: string, locale: ChatLocale): ChatIntent | null => {
  const text = normalize(message);
  if (!text) return null;
  const words = text.split(" ");
  const padded = ` ${text} `;

  let best: ChatIntent | null = null;
  let bestScore = 0;

  for (const intent of chatIntents) {
    // Check both languages so a Finnish visitor typing English (or vice versa) still gets an answer.
    const keywords = [...intent.keywords[locale], ...intent.keywords[locale === "en" ? "fi" : "en"]];
    let score = 0;

    for (const raw of keywords) {
      const keyword = normalize(raw);
      if (!keyword) continue;
      const hit = keyword.includes(" ")
        ? padded.includes(` ${keyword}`)
        : keyword.length <= 3
          ? words.includes(keyword)
          : words.some((w) => w.startsWith(keyword));
      // Longer keywords are more specific, so they count for more.
      if (hit) score += keyword.includes(" ") ? 3 : keyword.length > 4 ? 2 : 1;
    }

    score *= intent.weight ?? 1;
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }

  return best;
};

export const getIntent = (id: string) => chatIntents.find((i) => i.id === id) ?? null;
