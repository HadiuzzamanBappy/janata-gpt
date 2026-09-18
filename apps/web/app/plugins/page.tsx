import { categories, getPluginsByCategory } from "@/lib/plugins";
import { PluginCard } from "@/components/plugin-card";
import { Search } from "lucide-react";

export default function PluginsPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background p-6 lg:p-10">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8">

        {/* Header & Search */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Plugins</h1>
          <p className="text-muted-foreground text-lg">Work with JanataGPT across your favorite tools.</p>

          <div className="relative max-w-xl mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plugins..."
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-base"
            />
          </div>
        </div>

        {/* Categories & Plugins */}
        <div className="flex flex-col gap-12 mt-6">
          {categories.map((category) => {
            const categoryPlugins = getPluginsByCategory(category);

            if (categoryPlugins.length === 0) return null;

            return (
              <section key={category} className="flex flex-col gap-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
