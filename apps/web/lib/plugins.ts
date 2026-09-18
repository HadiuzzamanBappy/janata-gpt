export type Plugin = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription?: string;
  prompts?: string[];
  icon?: string;
  developer?: string;
};

export const categories = [
  "Popular",
  "New & Noteworthy",
  "Small Business",
  "Productivity",
  "Creativity",
  "Developer Tools",
  "Business & Operations",
  "Data & Analytics",
  "Communication",
  "Education & Research",
  "Scientific Research",
  "Security",
  "Finance",
  "Healthcare",
  "Travel",
  "Entertainment",
  "Other"
];

export const plugins: Plugin[] = [
  // Popular
  {
    id: "gmail",
    name: "Gmail",
    category: "Popular",
    shortDescription: "Read and manage Gmail",
    longDescription: "Use Gmail to summarize inbox activity, draft replies, and organize email threads through the connected Gmail app.",
    prompts: [
      "@Gmail Summarize the last 5 messages in [subject line] and capture decisions, open questions, and what I should follow up on next",
      "@Gmail Draft a polite, firm reply to our auditor's latest email, with a short bullet list of exactly what we'll provide",
      "@Gmail Turn my latest customer escalation thread into an action tracker with owners, deadlines, and an email reference for each item"
    ],
    developer: "Google",
  },
  { id: "github", name: "GitHub", category: "Popular", shortDescription: "Triage PRs, issues, CI, and publish flows", developer: "GitHub" },
  { id: "google-drive", name: "Google Drive", category: "Popular", shortDescription: "Drive, Docs, Sheets or Slides", developer: "Google" },
  { id: "google-calendar", name: "Google Calendar", category: "Popular", shortDescription: "Manage Google Calendar events", developer: "Google" },
  { id: "notion", name: "Notion", category: "Popular", shortDescription: "Notion docs and workflows", developer: "Notion" },
  { id: "slack", name: "Slack", category: "Popular", shortDescription: "Read and manage Slack", developer: "Slack" },

  // New & Noteworthy
  { id: "data-noteworthy", name: "Data", category: "New & Noteworthy", shortDescription: "Answer questions with data" },
  { id: "tableau", name: "Tableau", category: "New & Noteworthy", shortDescription: "See and understand data" },
  { id: "power-bi", name: "Microsoft Power BI", category: "New & Noteworthy", shortDescription: "Explore and author analytics in your browser" },
  { id: "aws-data", name: "AWS Data Analytics", category: "New & Noteworthy", shortDescription: "AWS Data Analytics Plugin" },
  { id: "clickhouse", name: "ClickHouse", category: "New & Noteworthy", shortDescription: "Explore ClickHouse Cloud" },
  { id: "firebase", name: "Firebase", category: "New & Noteworthy", shortDescription: "Build and manage Firebase apps" },

  // Small Business
  { id: "dropbox", name: "Dropbox", category: "Small Business", shortDescription: "Find, create, and take action" },
  { id: "hubspot-sb", name: "HubSpot", category: "Small Business", shortDescription: "Insights to action in HubSpot" },
  { id: "stripe", name: "Stripe", category: "Small Business", shortDescription: "Accept payments. Grow revenue." },
  { id: "canva-sb", name: "Canva", category: "Small Business", shortDescription: "Create, review, edit designs" },
  { id: "gusto", name: "Gusto", category: "Small Business", shortDescription: "Run payroll and team insights" },
  { id: "figma-sb", name: "Figma", category: "Small Business", shortDescription: "Create designs, ship to code" },

  // Productivity
  { id: "granola", name: "Granola", category: "Productivity", shortDescription: "Add your meeting context" },
  { id: "fireflies", name: "Fireflies", category: "Productivity", shortDescription: "Search meeting transcripts" },
  { id: "outlook-calendar", name: "Outlook Calendar", category: "Productivity", shortDescription: "Manage Outlook schedules" },
  { id: "plaud", name: "Plaud", category: "Productivity", shortDescription: "Retrieve insights from Plaud" },
  { id: "otter", name: "Otter.ai", category: "Productivity", shortDescription: "Search meetings from Otter.ai" },
  { id: "rovo", name: "Atlassian Rovo (Legacy)", category: "Productivity", shortDescription: "Manage Jira and Confluence" },

  // Creativity
  { id: "canva", name: "Canva", category: "Creativity", shortDescription: "Create, review, edit designs" },
  { id: "higgsfield", name: "Higgsfield", category: "Creativity", shortDescription: "Every image and video model" },
  { id: "product-design", name: "Product Design", category: "Creativity", shortDescription: "Explore and prototype ideas" },
  { id: "figma", name: "Figma", category: "Creativity", shortDescription: "Create designs, ship to code" },
  { id: "magnific", name: "Magnific", category: "Creativity", shortDescription: "Create images, video, designs" },
  { id: "heygen", name: "HeyGen", category: "Creativity", shortDescription: "Create AI videos and avatars" },

  // Developer Tools
  { id: "datadog", name: "Datadog", category: "Developer Tools", shortDescription: "Query and visualize data" },
  { id: "supabase", name: "Supabase", category: "Developer Tools", shortDescription: "Manage and query databases" },
  { id: "vercel", name: "Vercel", category: "Developer Tools", shortDescription: "Build and deploy web apps and agents" },
  { id: "exa", name: "Exa", category: "Developer Tools", shortDescription: "Web search for AI agents" },
  { id: "neon", name: "Neon", category: "Developer Tools", shortDescription: "Manage Neon databases" },
  { id: "devpost", name: "Devpost Hackathons", category: "Developer Tools", shortDescription: "Find and submit to hackathons" },

  // Business & Operations
  { id: "shopify", name: "Shopify", category: "Business & Operations", shortDescription: "Create and manage your store" },
  { id: "zoho", name: "Zoho CRM", category: "Business & Operations", shortDescription: "Automate Sales Operations" },
  { id: "hubspot", name: "HubSpot", category: "Business & Operations", shortDescription: "Insights to action in HubSpot" },
  { id: "apollo", name: "Apollo.io", category: "Business & Operations", shortDescription: "Find buyers and close deals" },
  { id: "webflow", name: "Webflow", category: "Business & Operations", shortDescription: "Manage Webflow sites" },
  { id: "zoominfo", name: "ZoomInfo", category: "Business & Operations", shortDescription: "B2B data and GTM insights" },

  // Data & Analytics
  { id: "posthog", name: "PostHog", category: "Data & Analytics", shortDescription: "Analyze your product data" },
  { id: "data", name: "Data", category: "Data & Analytics", shortDescription: "Answer questions with data" },
  { id: "amplitude", name: "Amplitude", category: "Data & Analytics", shortDescription: "Analyze your product data" },
  { id: "mixpanel", name: "Mixpanel", category: "Data & Analytics", shortDescription: "Query and analyze Mixpanel" },
  { id: "bigquery", name: "BigQuery", category: "Data & Analytics", shortDescription: "Query and manage BigQuery" },
  { id: "motherduck", name: "MotherDuck", category: "Data & Analytics", shortDescription: "Get answers from your data" },

  // Communication
  { id: "outlook-email", name: "Outlook Email", category: "Communication", shortDescription: "Triage Outlook inboxes" },
  { id: "superhuman", name: "Superhuman Mail", category: "Communication", shortDescription: "Best email+calendar assistant" },
  { id: "teams", name: "Teams", category: "Communication", shortDescription: "Summarize Teams and follow up" },
  { id: "zoom", name: "Zoom", category: "Communication", shortDescription: "Smart meeting insights from Zoom" },
  { id: "hostinger", name: "Hostinger Mail", category: "Communication", shortDescription: "Use Hostinger Mail" },
  { id: "mailopoly", name: "Mailopoly Inbox", category: "Communication", shortDescription: "Search, send emails & messages" },

  // Education & Research
  { id: "readwise", name: "Readwise", category: "Education & Research", shortDescription: "Save, read, search, and learn" },
  { id: "acumen", name: "Acumen by Talarion", category: "Education & Research", shortDescription: "Keep your AI up to date." },
  { id: "consensus", name: "Consensus", category: "Education & Research", shortDescription: "Explore scientific research" },
  { id: "sider", name: "Sider Scholar", category: "Education & Research", shortDescription: "Search 350M+ Paper. Save. Chat" },
  { id: "elicit", name: "Elicit", category: "Education & Research", shortDescription: "Search scientific literature" },
  { id: "scispace", name: "SciSpace", category: "Education & Research", shortDescription: "For science and research" },

  // Scientific Research
  { id: "biohub", name: "Biohub ESM", category: "Scientific Research", shortDescription: "Understand proteins with ESM" },
  { id: "life-sciences", name: "Life Sciences Literature", category: "Scientific Research", shortDescription: "Find biomedical papers, preprints, and open-access full text" },
  { id: "molecular", name: "Molecular Structure Viewer", category: "Scientific Research", shortDescription: "Visualize and interact with molecular structures in Codex." },
  { id: "inductive-bio", name: "Inductive Bio", category: "Scientific Research", shortDescription: "State-of-the-art ADMET models" },
  { id: "slide-viewer", name: "Slide Viewer", category: "Scientific Research", shortDescription: "Explore whole-slide microscopy, digital pathology, and spatial transcriptomics." },
  { id: "boltz", name: "Boltz", category: "Scientific Research", shortDescription: "Predict structures, screen molecules and proteins, and design binders" },

  // Security
  { id: "codex-security", name: "Codex Security", category: "Security", shortDescription: "Security scanning for your codebase" },
  { id: "malwarebytes", name: "Malwarebytes", category: "Security", shortDescription: "Verify links, domains, phones." },
  { id: "ansvar", name: "Ansvar Gateway", category: "Security", shortDescription: "Laws, Security and Compliance" },
  { id: "nightvision", name: "NightVision", category: "Security", shortDescription: "Secure apps with NightVision" },
  { id: "endor", name: "Endor Labs Agent Kit", category: "Security", shortDescription: "Endor Labs Agentic AppSec" },
  { id: "minimus", name: "Minimus", category: "Security", shortDescription: "Dockerfiles on hardened images" },

  // Finance
  { id: "longbridge", name: "Longbridge", category: "Finance", shortDescription: "Stock quotes, financial data" },
  { id: "interactive-brokers", name: "Interactive Brokers (IBKR)", category: "Finance", shortDescription: "Analyze global markets" },
  { id: "public-equity", name: "Public Equity Investing", category: "Finance", shortDescription: "Public equity research" },
  { id: "quartr", name: "Quartr", category: "Finance", shortDescription: "Company research data" },
  { id: "alpaca", name: "Alpaca", category: "Finance", shortDescription: "Market data: stocks & crypto" },
  { id: "finances", name: "Finances", category: "Finance", shortDescription: "Personalized finance insights" },

  // Healthcare
  { id: "health", name: "Health", category: "Healthcare", shortDescription: "Explore your health data in ChatGPT" },
  { id: "fitness", name: "Fitness AI Connector", category: "Healthcare", shortDescription: "AI coach for your Garmin data" },
  { id: "coros", name: "COROS", category: "Healthcare", shortDescription: "Workout data insights" },
  { id: "tredict", name: "Tredict", category: "Healthcare", shortDescription: "Analyze workouts, create plans" },
  { id: "calorie-tracker", name: "Calorie Tracker", category: "Healthcare", shortDescription: "Track your food and calories" },
  { id: "freddy", name: "freddy", category: "Healthcare", shortDescription: "Ask about your health data" },

  // Travel
  { id: "skyscanner", name: "Skyscanner", category: "Travel", shortDescription: "Find cheap flights" },
  { id: "tripcom", name: "Trip.com", category: "Travel", shortDescription: "All-in-one Travel Companion" },
  { id: "flight-network", name: "Flight Network", category: "Travel", shortDescription: "Search and book flights" },
  { id: "edreams", name: "eDreams", category: "Travel", shortDescription: "Find flights and hotels" },
  { id: "wikiloc", name: "Wikiloc", category: "Travel", shortDescription: "Your perfect trail. Just ask." },
  { id: "komoot", name: "komoot", category: "Travel", shortDescription: "Find outdoor sport routes" },

  // Entertainment
  { id: "apple-music", name: "Apple Music", category: "Entertainment", shortDescription: "Build playlists and find music" },
  { id: "podcast", name: "Podcast App", category: "Entertainment", shortDescription: "Find great podcasts" },
  { id: "chessy", name: "Chessy", category: "Entertainment", shortDescription: "Play Chess Against ChatGPT" },
  { id: "shazam", name: "Shazam", category: "Entertainment", shortDescription: "Identify songs instantly" },
  { id: "flixor", name: "Flixor", category: "Entertainment", shortDescription: "Movie & TV Recommender" },
  { id: "smart-chess", name: "Smart Chess:Train+Learn to win", category: "Entertainment", shortDescription: "Play+improve: coach+strategy" },

  // Other
  { id: "linkedin", name: "LinkedIn", category: "Other", shortDescription: "Find the right professional" },
  { id: "tarot", name: "Tarot", category: "Other", shortDescription: "Tarot Reading & Divination" },
  { id: "idealista", name: "idealista", category: "Other", shortDescription: "Find properties to buy or rent" },
  { id: "ask-tarot", name: "Ask Tarot Cards", category: "Other", shortDescription: "Tarot card readings" },
  { id: "etsy", name: "Etsy", category: "Other", shortDescription: "Shop Home, Style & More" },
  { id: "steer-astro", name: "Steer Astro", category: "Other", shortDescription: "Your Personal AI Astrologer" },
];

export function getPluginById(id: string): Plugin | undefined {
  return plugins.find((plugin) => plugin.id === id);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return plugins.filter((plugin) => plugin.category === category);
}

export function searchPlugins(query: string): Plugin[] {
  const lowercaseQuery = query.toLowerCase();
  return plugins.filter((plugin) => 
    plugin.name.toLowerCase().includes(lowercaseQuery) || 
    plugin.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    plugin.category.toLowerCase().includes(lowercaseQuery)
  );
}
