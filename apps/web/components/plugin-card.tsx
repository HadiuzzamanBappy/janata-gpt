import Link from "next/link";
import { Plugin } from "@/lib/plugins";
import { cn } from "@repo/ui";

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
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50 flex items-center justify-center shrink-0">
        <span className="font-bold text-lg text-primary">{plugin.name.charAt(0)}</span>
      </div>
      
      <div className="flex flex-col gap-1 w-full">
        <h3 className="font-semibold text-base text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
          {plugin.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {plugin.shortDescription}
        </p>
      </div>
    </Link>
  );
}
