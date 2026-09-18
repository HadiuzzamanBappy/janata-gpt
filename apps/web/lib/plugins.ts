// Plugin connection types matching ChatGPT's taxonomy
export type PluginConnectionType = "App" | "MCP Servers" | "Skills";

export type Plugin = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription?: string;
  prompts?: string[];
  icon?: string;
  developer?: string;
  // ChatGPT-style integration attributes
  connectionTypes?: PluginConnectionType[]; // e.g. ["App", "MCP Servers"]
  mcpUrl?: string;                           // MCP server URL if applicable
  skills?: string[];                         // Named skills the plugin provides
  capabilities?: string;                     // e.g. "Interactive, Read, Write"
  // Metadata
  website?: string;
  version?: string;
  legalText?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
};

export const categories = [
  "Popular",
  "Productivity",
  "Developer Tools",
  "Communication",
];

export const plugins: Plugin[] = [
  {
    id: "gmail",
    name: "Gmail",
    category: "Communication",
    shortDescription: "Read and manage Gmail",
    longDescription:
      "Use Gmail to summarize inbox activity, draft replies, and organize email threads through the connected Gmail app.",
    prompts: [
      "@Gmail Summarize the last 5 messages in [subject line] and capture decisions, open questions, and what I should follow up on next",
      "@Gmail Draft a polite, firm reply to our auditor's latest email, with a short bullet list of exactly what we'll provide",
      "@Gmail Turn my latest customer escalation thread into an action tracker with owners, deadlines, and an email reference for each item",
    ],
    connectionTypes: ["App"],
    skills: ["Inbox Summarization", "Draft Replies", "Thread Organization"],
    developer: "OpenAI",
    capabilities: "Interactive, Write",
    website: "https://gmail.com",
    version: "0.1.10",
    privacyPolicyUrl: "https://policies.google.com/privacy",
    termsOfServiceUrl: "https://policies.google.com/terms",
    legalText:
      "When connected to Gmail, the chatbot may share relevant chats and memories with this app to help provide context for your requests. Gmail's use of this data is subject to their terms and privacy policy. If you have Memory enabled, data from the app may be used to proactively provide helpful information or suggestions. The chatbot always respects your training data preferences, including for data from connected apps. Use of apps may come with elevated risk. You can manage your preferences or disconnect from apps anytime in your settings.\n\nNote on Google apps: Any data synced from these apps may be used to provide you with relevant and personalized information. We do not train generalized models on this data or derivations of it, except those submitted in feedback or included in the chatbot's response.",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    shortDescription: "Search and reference your Notion pages",
    longDescription:
      "Connect your Notion workspace to search pages, databases, and documents. Use AI to summarize notes, draft specs, and capture meeting intelligence directly from your chats.",
    prompts: [
      "@Notion Search my workspace for the product roadmap and summarize the Q4 priorities.",
      "@Notion Create a new meeting notes page based on this conversation.",
      "@Notion Find all pages tagged 'Research' and list the key takeaways.",
    ],
    connectionTypes: ["App", "MCP Servers"],
    mcpUrl: "https://mcp.notion.com/mcp",
    skills: [
      "Knowledge Capture",
      "Meeting Intelligence",
      "Research & Documentation",
      "Spec to Implementation",
    ],
    developer: "Notion",
    capabilities: "Interactive, Read, Write",
    website: "https://notion.so",
    version: "0.1.8",
    privacyPolicyUrl: "https://www.notion.com/help/privacy",
    termsOfServiceUrl: "https://www.notion.so/legal/terms-of-use",
    legalText:
      "When connected to Notion, the chatbot may share relevant chats and memories with this app to help provide context for your requests. Notion's use of this data is subject to their terms and privacy policy. If you have Memory enabled, data from the app may be used to proactively provide helpful information or suggestions. Use of apps may come with elevated risk. You can manage your preferences or disconnect from apps anytime in your settings.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Developer Tools",
    shortDescription: "Triage PRs, issues, CI, and publish flows",
    longDescription:
      "Connect your GitHub account to directly query repositories, manage pull requests, review code, and track issues without leaving the chat.",
    prompts: [
      "@GitHub Summarize the recent commits in the main branch of my current project.",
      "@GitHub Create an issue for the bug reported in the last conversation.",
      "@GitHub Check the status of the latest CI/CD pipeline run.",
    ],
    connectionTypes: ["App", "MCP Servers"],
    mcpUrl: "https://api.githubcopilot.com/mcp/",
    skills: ["PR Review", "Issue Triage", "CI/CD Monitoring", "Code Search"],
    developer: "GitHub",
    capabilities: "Interactive, Read, Write",
    website: "https://github.com",
    version: "1.2.0",
    privacyPolicyUrl: "https://docs.github.com/en/site-policy/privacy-policies",
    termsOfServiceUrl: "https://docs.github.com/en/site-policy/github-terms",
    legalText:
      "When connected to GitHub, the chatbot can read and manage code repositories on your behalf. Please ensure you are comfortable with granting access to your private repositories.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "Productivity",
    shortDescription: "Drive, Docs, Sheets or Slides",
    longDescription:
      "Quickly access and search your Google Drive. Summarize Docs, analyze Sheets, or prepare outlines for Slides directly from your chat.",
    prompts: [
      "@Google Drive Summarize the Q3 Planning Document in my Drive.",
      "@Google Drive Find the spreadsheet related to 'Q4 Budget' and list the main expense categories.",
      "@Google Drive Draft a new meeting notes document based on this conversation.",
    ],
    connectionTypes: ["App"],
    skills: ["Document Summarization", "Spreadsheet Analysis", "File Search"],
    developer: "Google",
    capabilities: "Interactive, Read, Write",
    website: "https://drive.google.com",
    version: "0.9.5",
    privacyPolicyUrl: "https://policies.google.com/privacy",
    termsOfServiceUrl: "https://policies.google.com/terms",
    legalText:
      "Your Google Drive data will be accessed securely to provide relevant summaries and document management. You can revoke access at any time.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    shortDescription: "Read and manage Slack",
    longDescription:
      "Bring your team's communication into your workflow. Summarize missed channels, draft messages, and set reminders across your Slack workspaces.",
    prompts: [
      "@Slack Summarize what I missed in the #engineering channel today.",
      "@Slack Draft a message to the #general channel announcing the new release.",
      "@Slack Set a reminder to follow up on the server deployment.",
    ],
    connectionTypes: ["App", "MCP Servers"],
    mcpUrl: "https://mcp.slack.com/mcp",
    skills: ["Channel Summarization", "Message Drafting", "Reminders"],
    developer: "Slack",
    capabilities: "Interactive, Write",
    website: "https://slack.com",
    version: "2.0.1",
    privacyPolicyUrl: "https://slack.com/trust/privacy/privacy-policy",
    termsOfServiceUrl: "https://slack.com/terms-of-service",
    legalText:
      "By connecting Slack, you agree to allow the chatbot to read messages and post on your behalf according to your permissions.",
  },
];

export function getPluginById(id: string): Plugin | undefined {
  return plugins.find((plugin) => plugin.id === id);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return plugins.filter((plugin) => plugin.category === category);
}

export function searchPlugins(query: string): Plugin[] {
  const lowercaseQuery = query.toLowerCase();
  return plugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(lowercaseQuery) ||
      plugin.shortDescription.toLowerCase().includes(lowercaseQuery) ||
      plugin.category.toLowerCase().includes(lowercaseQuery) ||
      plugin.skills?.some((s) => s.toLowerCase().includes(lowercaseQuery))
  );
}
