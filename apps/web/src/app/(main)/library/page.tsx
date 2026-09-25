"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  Button,
  Input,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui";
import {
  ListFilter,
  LayoutGrid,
  List,
  Search,
  ChevronDown,
  Settings,
  Upload,
  Sparkles,
  Image as ImageIcon,
  FileText,
  FileSpreadsheet,
  Presentation,
  Folder,
  Braces,
  Cloud,
  Trash2,
  MoreHorizontal,
  FileBadge,
} from "lucide-react";

const TABS = ["Folders", "Images", "All"];

const FILES = [
  {
    name: "chatgpt_clone_database_and_education_blueprint.docx",
    modified: "9:29 AM",
    size: "39.6 KB",
    icon: <FileBadge className="size-5 text-blue-500 fill-blue-500/20" />,
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showHidden, setShowHidden] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background">
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 py-6 md:px-8">
      <PageHeader
        title="Library"
        action={
          <>
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none">
              <ListFilter className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl border-border/40 shadow-xl bg-popover">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">Source</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <Upload className="size-4" />
                  <span className="font-medium text-sm">Uploaded</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <Sparkles className="size-4" />
                  <span className="font-medium text-sm">Generated</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1 border-border/40" />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">File type</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <ImageIcon className="size-4" />
                  <span className="font-medium text-sm">Images</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <FileText className="size-4" />
                  <span className="font-medium text-sm">Documents</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <FileSpreadsheet className="size-4" />
                  <span className="font-medium text-sm">Spreadsheets</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <Presentation className="size-4" />
                  <span className="font-medium text-sm">Presentations</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-muted">
                  <FileText className="size-4" />
                  <span className="font-medium text-sm">PDFs</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggles */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("grid")}
              className={`rounded-full h-9 w-9 ${view === "grid" ? "text-foreground bg-muted/50" : "text-muted-foreground hover:bg-muted"}`}
            >
              <LayoutGrid className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={`rounded-full h-9 w-9 ${view === "list" ? "text-foreground bg-muted/50" : "text-muted-foreground hover:bg-muted"}`}
            >
              <List className="size-5" />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative flex items-center ml-2">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search library"
              className="pl-9 pr-4 h-9 w-64 bg-muted/40 border-border/50 rounded-full"
            />
          </div>

          {/* New Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button className="rounded-full px-4 h-9 font-semibold ml-2 outline-none" />}>
              New
              <ChevronDown className="size-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl border-border/40 shadow-xl bg-popover">
              <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                <ImageIcon className="size-4" />
                <span className="font-medium text-sm">Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                <FileText className="size-4" />
                <span className="font-medium text-sm">Note</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                <Folder className="size-4" />
                <span className="font-medium text-sm">Folder</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-border/40" />
              <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                <Upload className="size-4" />
                <span className="font-medium text-sm">Upload</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors outline-none ml-1">
              <Settings className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-xl border-border/40 shadow-xl bg-popover">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">Settings</DropdownMenuLabel>
                <DropdownMenuItem 
                  className="flex items-center justify-between p-2.5 cursor-pointer rounded-lg hover:bg-muted"
                  onClick={(e) => {
                    e.preventDefault(); // keep open
                    setShowHidden(!showHidden);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Braces className="size-4" />
                    <span className="font-medium text-sm">Show hidden files</span>
                  </div>
                  {/* Custom Toggle Switch */}
                  <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${showHidden ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${showHidden ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1 border-border/40" />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2 py-1.5">Manage</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                  <Cloud className="size-4" />
                  <span className="font-medium text-sm">Storage</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 p-2.5 cursor-pointer rounded-lg hover:bg-muted">
                  <Trash2 className="size-4" />
                  <span className="font-medium text-sm">Trash</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </>
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

      {/* Data Table */}
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-b-border/10 hover:bg-transparent">
              <TableHead className="w-[40px] pl-4">
                <input type="checkbox" className="size-4 rounded border-border bg-transparent accent-primary cursor-pointer mt-1" />
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs">Name</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs w-[150px]">Modified</TableHead>
              <TableHead className="text-muted-foreground font-medium text-xs w-[120px]">Size</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FILES.map((file, idx) => (
              <TableRow key={idx} className="border-b-transparent group hover:bg-muted/30 transition-colors">
                <TableCell className="pl-4">
                  <input type="checkbox" className="size-4 rounded border-border bg-transparent accent-primary cursor-pointer" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10 shrink-0">
                      {file.icon}
                    </div>
                    <span className="font-medium text-sm text-foreground">{file.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{file.modified}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{file.size}</TableCell>
                <TableCell className="pr-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors opacity-0 group-hover:opacity-100 outline-none">
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 p-1.5 rounded-xl border-border/40 shadow-xl bg-popover">
                      <DropdownMenuItem className="p-2 cursor-pointer rounded-lg hover:bg-muted text-sm">Download</DropdownMenuItem>
                      <DropdownMenuItem className="p-2 cursor-pointer rounded-lg hover:bg-muted text-sm">Rename</DropdownMenuItem>
                      <DropdownMenuItem className="p-2 cursor-pointer rounded-lg hover:bg-muted text-sm text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    </div>
  );
}
