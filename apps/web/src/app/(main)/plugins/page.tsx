import { categories, getPluginsByCategory } from "@/lib/plugins";
import { PluginCard } from "@/components/plugins/plugin-card";
import { PageHeader } from "@/components/layout/page-header";

export default function PluginsPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 py-6 md:px-8">

        <PageHeader 
          title="Plugins"
          searchPlaceholder="Search plugins..."
        />

        {/* Categories & Plugins */}
        <div className="flex flex-col gap-10 mt-2">
          {categories.map((category) => {
            const categoryPlugins = getPluginsByCategory(category);

            if (categoryPlugins.length === 0) return null;

            return (
              <section key={category} className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold tracking-tight text-foreground/80">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
