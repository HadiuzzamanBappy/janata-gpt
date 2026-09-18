"use client";

import { useState } from "react";
import { Folder } from "lucide-react";
import { Button } from "@repo/ui";
import { PageHeader } from "@/components/layout/page-header";
import { CreateProjectModal } from "@/components/projects/create-project-modal";

const TABS = ["All", "Created by you", "Shared with you"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background">
      <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:px-8">
      <PageHeader 
        title="Projects"
        searchPlaceholder="Search projects"
        action={
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full px-5 h-10 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "secondary" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 h-9 font-medium text-sm ${activeTab === tab ? 'bg-muted hover:bg-muted/80' : 'text-muted-foreground'}`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        <div className="w-14 h-14 bg-muted/60 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-border/40">
          <Folder className="size-7 text-foreground/80" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-semibold text-foreground tracking-tight">No projects yet</h2>
      </div>

      <CreateProjectModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />
      </div>
    </div>
  );
}
