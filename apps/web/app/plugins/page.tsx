import { categories, getPluginsByCategory } from "@/lib/plugins";
import { PluginCard } from "@/components/plugin-card";
import { Search } from "lucide-react";

export default function PluginsPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background p-6 lg:p-10">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">

        {/* Header & Search */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Plugins</h1>
          <p className="text-muted-foreground text-sm">Work with JanataGPT across your favorite tools.</p>

          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plugins..."
              className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring transition-all text-sm"
            />
          </div>
        </div>

        {/* Categories & Plugins */}
        <div className="flex flex-col gap-10 mt-2">
          {categories.map((category) => {
            const categoryPlugins = getPluginsByCategory(category);

            if (categoryPlugins.length === 0) return null;

            return (
              <section key={category} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold tracking-tight text-foreground/80">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {categoryPlugins.map((plugin) => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
