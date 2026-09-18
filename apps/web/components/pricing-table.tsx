import * as React from "react";
import { Button } from "@repo/ui";
import { Check, Sparkles, Image as ImageIcon, Database, Mic, Code, Calendar, Layout, DollarSign } from "lucide-react";

export function PricingTable() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-[1400px] w-full mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Upgrade your plan</h2>
          <div className="flex items-center p-1 bg-muted rounded-full border border-border">
            <button className="px-6 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full shadow-sm transition-all">
              Personal
            </button>
            <button className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all">
              Business
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Free Tier */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-card-foreground">Free</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-card-foreground mb-2">Try ChatGPT</h4>
              <p className="text-sm text-muted-foreground min-h-[60px]">
                See how AI can help find answers, explore ideas, and get things done in life and work.
              </p>
            </div>
            <div className="mb-6 flex items-end gap-1">
              <span className="text-xl font-bold text-card-foreground">$0</span>
              <span className="text-sm text-muted-foreground mb-1">/ month</span>
            </div>
            <Button disabled variant="secondary" className="w-full mb-6 h-12 rounded-full font-medium">
              Your current plan
            </Button>
            <div className="space-y-4 flex-1">
              <p className="text-sm font-medium text-card-foreground mb-2">Start with the basics:</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Unlimited everyday text chats</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Limited access to image creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Limited memory and storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Limited voice chats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 border border-muted-foreground rounded-sm text-[10px]">Ad</span>
                  <span>Ad supported</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ChatGPT Go Tier */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-card-foreground">ChatGPT Go</h3>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-card-foreground mb-2">Expanded access</h4>
              <p className="text-sm text-muted-foreground min-h-[60px]">
                Write, learn, create, and chat more with extended usage of core intelligence.
              </p>
            </div>
            <div className="mb-6 flex items-end gap-1">
              <span className="text-xl font-bold text-card-foreground">$5</span>
              <span className="text-sm text-muted-foreground mb-1">/ month</span>
            </div>
            <Button className="w-full mb-6 h-12 rounded-full font-semibold">
              Upgrade to Go
            </Button>
            <div className="space-y-4 flex-1">
              <p className="text-sm font-medium text-card-foreground mb-2">Everything in Free, and:</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>More messages with tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>More image creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>More memory and storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>More voice chats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 border border-muted-foreground rounded-sm text-[10px]">Ad</span>
                  <span>Ad supported</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ChatGPT Plus Tier */}
          <div className="flex flex-col rounded-2xl border-2 border-primary bg-card/50 p-6 text-card-foreground relative shadow-lg shadow-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-card-foreground">ChatGPT Plus</h3>
              <span className="text-[10px] font-bold tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-card-foreground mb-2">Your AI assistant</h4>
              <p className="text-sm text-muted-foreground min-h-[60px]">
                Unlock advanced intelligence that adapts to your preferences the more you use it.
              </p>
            </div>
            <div className="mb-6 flex items-end gap-1">
              <span className="text-xl font-bold text-card-foreground">$20</span>
              <span className="text-sm text-muted-foreground mb-1">/ month</span>
            </div>
            <Button className="w-full mb-6 h-12 rounded-full font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Upgrade to Plus
            </Button>
            <div className="space-y-4 flex-1">
              <p className="text-sm font-medium text-card-foreground mb-2">Everything in Go, and:</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 shrink-0 text-primary" />
                  <span>Advanced intelligence for complex work</span>
                </li>
                <li className="flex items-start gap-3">
                  <ImageIcon className="w-5 h-5 shrink-0 text-primary" />
                  <span>Higher quality image creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Layout className="w-5 h-5 shrink-0 text-primary" />
                  <span>Work agent to act across apps and files</span>
                </li>
                <li className="flex items-start gap-3">
                  <Code className="w-5 h-5 shrink-0 text-primary" />
                  <span>Codex to automate coding</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 shrink-0 text-primary" />
                  <span>Expanded memory and 20 GB of storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 shrink-0 text-primary" />
                  <span>Email and calendar connections</span>
                </li>
                <li className="flex items-start gap-3">
                  <Layout className="w-5 h-5 shrink-0 text-primary" />
                  <span>Larger projects to organize your work</span>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 shrink-0 text-primary" />
                  <span>Tools for personal finance and data analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 shrink-0 text-primary" />
                  <span>No ads</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ChatGPT Pro Tier */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-card-foreground">ChatGPT Pro</h3>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-foreground bg-muted px-2 py-0.5 rounded-full border border-border">5x</span>
                <span className="text-[10px] font-bold text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">20x</span>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold text-card-foreground mb-2">Maximum power</h4>
              <p className="text-sm text-muted-foreground min-h-[60px]">
                For people who rely on our most powerful intelligence throughout the workday.
              </p>
            </div>
            <div className="mb-6 flex items-end gap-1">
              <span className="text-xl font-bold text-card-foreground">$115</span>
              <span className="text-sm text-muted-foreground mb-1">/ month</span>
            </div>
            <Button className="w-full mb-6 h-12 rounded-full font-semibold">
              Upgrade to Pro
            </Button>
            <div className="space-y-4 flex-1">
              <p className="text-sm font-medium text-card-foreground mb-2">Everything in Plus, and:</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Our most capable frontier Pro model</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Faster, more powerful Work and Codex</span>
                </li>
                <li className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Maximum memory and 100 GB of storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>5x Plus usage for longer work sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>Early access to new tools and models</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-muted-foreground shrink-0" />
                  <span>No ads</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
