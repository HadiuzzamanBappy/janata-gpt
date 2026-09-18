import { notFound } from "next/navigation";
import { getPluginById } from "@/lib/plugins";
import { Button } from "@repo/ui";
import { ArrowRight, Server, AppWindow, Sparkles, ExternalLink } from "lucide-react";

const connectionTypeConfig = {
  "App": { icon: AppWindow, color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  "MCP Servers": { icon: Server, color: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  "Skills": { icon: Sparkles, color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
} as const;

export default async function PluginDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const plugin = getPluginById(resolvedParams.id);

  if (!plugin) {
    notFound();
  }

  const displayPrompts = plugin.prompts || [
    `@${plugin.name} Can you help me set up a new project integration and guide me through the configuration?`,
    `@${plugin.name} Summarize the latest updates or activities related to my connected account.`,
    `@${plugin.name} Generate a report based on the data available in the system.`,
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-[#1b1b1b] p-6 lg:p-12 text-slate-100">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2a2a2a] border border-[#333] flex items-center justify-center overflow-hidden shrink-0">
              <span className="font-bold text-2xl text-white">{plugin.name.charAt(0)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">{plugin.name}</h1>
              <p className="text-[#a1a1aa] text-base">{plugin.shortDescription}</p>
              {/* Connection type badges */}
              {plugin.connectionTypes && plugin.connectionTypes.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {plugin.connectionTypes.map((type) => {
                    const cfg = connectionTypeConfig[type];
                    return (
                      <span
                        key={type}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color}`}
                      >
                        <cfg.icon className="size-3" />
                        {type}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 font-semibold h-10 shadow-sm mt-4 shrink-0">
            Install plugin
          </Button>
        </div>

        {/* Gradient Prompt Showcase */}
        <div className="w-full bg-gradient-to-br from-[#8bd9f9] via-[#bae6fd] to-[#86efac] rounded-3xl p-8 md:p-10 flex flex-col gap-3 shadow-xl">
          {displayPrompts.map((prompt, index) => (
            <div
              key={index}
              className="bg-white/95 hover:bg-white text-[#333] px-5 py-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-4 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <p className="text-sm font-medium leading-relaxed">{prompt}</p>
              <div className="w-7 h-7 rounded-full bg-[#f4f4f5] flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-[#71717a]" />
              </div>
            </div>
          ))}
        </div>

        {/* Long description */}
        {plugin.longDescription && (
          <p className="text-[#d4d4d8] text-base leading-relaxed">
            {plugin.longDescription}
          </p>
        )}

        {/* MCP Server URL */}
        {plugin.mcpUrl && (
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white tracking-tight">MCP Server</h3>
            <div className="flex items-center gap-3 bg-[#252525] border border-[#333] rounded-xl px-4 py-3">
              <Server className="size-4 text-purple-400 shrink-0" />
              <code className="text-sm text-purple-300 font-mono truncate flex-1">{plugin.mcpUrl}</code>
            </div>
          </div>
        )}

        {/* Skills */}
        {plugin.skills && plugin.skills.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white tracking-tight">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {plugin.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-[#252525] border border-[#333] text-[#d4d4d8]"
                >
                  <Sparkles className="size-3 text-amber-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Information grid */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-bold text-white tracking-tight">Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 border-t border-[#2a2a2a] pt-5">
            <InfoRow label="Capabilities" value={plugin.capabilities} />
            <InfoRow label="Developer" value={plugin.developer || plugin.name} />
            <InfoRow label="Category" value={plugin.category} />
            <InfoRow label="Version" value={plugin.version} />
            {plugin.website && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Website</span>
                <a href={plugin.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#60a5fa] hover:underline flex items-center gap-1">
                  Visit website <ExternalLink className="size-3" />
                </a>
              </div>
            )}
            {(plugin.privacyPolicyUrl || plugin.termsOfServiceUrl) && (
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Legal</span>
                <div className="flex items-center gap-3">
                  {plugin.termsOfServiceUrl && (
                    <a href={plugin.termsOfServiceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#60a5fa] hover:underline">
                      Terms of Service
                    </a>
                  )}
                  {plugin.privacyPolicyUrl && (
                    <a href={plugin.privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#60a5fa] hover:underline">
                      Privacy Policy
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legal disclosure */}
        {plugin.legalText && (
          <div className="text-xs text-[#71717a] leading-relaxed border-t border-[#2a2a2a] pt-6 pb-4 whitespace-pre-line">
            {plugin.legalText}
          </div>
        )}

      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-[#71717a] font-medium">{label}</span>
      <span className="text-sm text-[#e4e4e7]">{value}</span>
    </div>
  );
}
