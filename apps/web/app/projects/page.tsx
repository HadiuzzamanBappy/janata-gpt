"use client";

import { useState } from "react";
import { Search, Folder } from "lucide-react";
import { Button, Input } from "@repo/ui";
import { CreateProjectModal } from "@/components/create-project-modal";

const TABS = ["All", "Created by you", "Shared with you"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-4 py-8 md:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects" 
              className="pl-9 w-full sm:w-64 bg-muted/40 border-border/50 rounded-full h-10"
            />
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full px-5 h-10 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-16">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "secondary" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="rounded-full px-4 font-medium"
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-24">
        <div className="w-16 h-16 bg-muted/60 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-border/40">
          <Folder className="size-8 text-foreground/80" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-foreground tracking-tight">No projects yet</h2>
      </div>

      <CreateProjectModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />
    </div>
  );
}
