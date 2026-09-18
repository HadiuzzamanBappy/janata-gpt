"use client";

import { useState } from "react";
import { Plus, Mic, Brain, Sparkles } from "lucide-react";
import { Button } from "@repo/ui";

const IMAGE_DATA = [
  { title: "Stickers", img: "/images/stickers.jpg" },
  { title: "Photosynthesis as a diagram", img: "/images/stickers.jpg" },
  { title: "Map of ancient Rome", img: "/images/stickers.jpg" },
  { title: "Timeline of the Civil War", img: "/images/stickers.jpg" },
  { title: "Plant cell diagram", img: "/images/stickers.jpg" },
  { title: "Cozy reading nook for my room", img: "/images/stickers.jpg" },
  { title: "Skateboard stickers based on hobbies", img: "/images/stickers.jpg" },
  { title: "Vintage punk band poster", img: "/images/stickers.jpg" },
];

export default function ImagesPage() {
  const [thinkEnabled, setThinkEnabled] = useState(false);

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-4 py-8 md:px-8">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Images</h1>

      {/* Input Bar */}
      <div className="w-full relative flex items-center bg-muted/40 border border-border/40 rounded-full px-2 h-14 mb-12 shadow-sm focus-within:ring-1 focus-within:ring-border">
        <button className="p-2.5 rounded-full hover:bg-muted/80 text-muted-foreground transition-colors ml-1">
          <Plus className="size-5" />
        </button>
        
        <input 
          className="flex-1 bg-transparent px-3 text-foreground placeholder:text-muted-foreground/70 outline-none text-[15px]" 
          placeholder="Describe a new image" 
        />
        
        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          <button 
            onClick={() => setThinkEnabled(!thinkEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              thinkEnabled 
                ? "bg-muted text-foreground" 
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            <Brain className="size-4" />
            Think
          </button>
          
          <button className="p-2 rounded-full hover:bg-muted/80 text-foreground transition-colors mx-1" title="Voice input">
            <Mic className="size-5" />
          </button>
          
          <button className="flex items-center justify-center size-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors" title="Generate Image">
            <Sparkles className="size-4" />
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="w-full">
        <Button variant="secondary" className="rounded-full px-5 h-8 text-sm font-semibold mb-6">
          Trending
        </Button>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {IMAGE_DATA.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-end aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-border/10"
            >
              {/* Background Image - Reusing the successfully generated stickers image since API rate limited */}
              {/* In production, we would map over distinct generated images. */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-muted transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.img})` }} 
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              
              {/* Text Content */}
              <div className="relative z-10 p-4">
                <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
