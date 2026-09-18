import { notFound } from "next/navigation";
import { getPluginById } from "@/lib/plugins";
import { Button } from "@repo/ui";
import { ArrowRight } from "lucide-react";

export default function PluginDetailsPage({ params }: { params: { id: string } }) {
  const plugin = getPluginById(params.id);

  if (!plugin) {
    notFound();
  }

  // Placeholder prompts if the plugin doesn't have specific ones
  const displayPrompts = plugin.prompts || [
    `@${plugin.name} Can you help me set up a new project integration and guide me through the configuration?`,
    `@${plugin.name} Summarize the latest updates or activities related to my connected account.`,
    `@${plugin.name} Generate a report based on the data available in the system.`
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-[#1b1b1b] p-6 lg:p-12 text-slate-100">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#2a2a2a] border border-[#333] flex items-center justify-center overflow-hidden">
              <span className="font-bold text-2xl text-white">{plugin.name.charAt(0)}</span>
            </div>
            
            <div className="flex flex-col gap-1 mt-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">{plugin.name}</h1>
              <p className="text-[#a1a1aa] text-base">{plugin.shortDescription}</p>
            </div>
          </div>
          
          <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 font-semibold h-10 shadow-sm mt-4">
            Install plugin
          </Button>
        </div>

        {/* Gradient Prompt Showcase */}
        <div className="w-full bg-gradient-to-br from-[#8bd9f9] via-[#bae6fd] to-[#86efac] rounded-3xl p-8 md:p-12 flex flex-col gap-4 shadow-xl">
          {displayPrompts.map((prompt, index) => (
            <div 
              key={index} 
              className="bg-white/95 hover:bg-white text-[#333] px-6 py-4 rounded-full shadow-sm flex items-center justify-between gap-4 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <p className="text-sm font-medium leading-relaxed truncate md:whitespace-normal">
                {prompt}
              </p>
              <div className="w-8 h-8 rounded-full bg-[#f4f4f5] flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-[#71717a]" />
              </div>
            </div>
          ))}
        </div>

        {/* Description & Information */}
        <div className="flex flex-col gap-12 mt-2">
          <p className="text-[#d4d4d8] text-base leading-relaxed max-w-3xl">
            {plugin.longDescription || `Use ${plugin.name} to seamlessly integrate its powerful features directly into your chats. Simplify your workflow by taking action right from this interface.`}
          </p>
          
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white tracking-tight">Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 border-t border-[#333] pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Developer</span>
                <span className="text-sm text-[#e4e4e7]">{plugin.developer || plugin.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Category</span>
                <span className="text-sm text-[#e4e4e7]">{plugin.category}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Website</span>
                <a href="#" className="text-sm text-[#60a5fa] hover:underline">Visit website</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#71717a] font-medium">Legal</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="text-sm text-[#60a5fa] hover:underline">Terms of Use</a>
                  <a href="#" className="text-sm text-[#60a5fa] hover:underline">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
