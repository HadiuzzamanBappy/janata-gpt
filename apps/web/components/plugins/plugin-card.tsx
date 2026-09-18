import Link from "next/link";
import { Plugin } from "@/lib/plugins";
import { cn } from "@repo/ui/lib/utils";

interface PluginCardProps {
  plugin: Plugin;
  className?: string;
}

export function PluginCard({ plugin, className }: PluginCardProps) {
  return (
    <Link 
      href={`/plugins/${plugin.id}`}
      className={cn(
        "group flex flex-col items-start gap-3 p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-colors h-full cursor-pointer",
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <span className="font-semibold text-base text-foreground">{plugin.name.charAt(0)}</span>
      </div>
      
      <div className="flex flex-col w-full">
        <h3 className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
          {plugin.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {plugin.shortDescription}
        </p>
      </div>
    </Link>
  );
}
