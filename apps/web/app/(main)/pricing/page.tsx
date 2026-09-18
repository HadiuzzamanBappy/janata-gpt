import { Button } from "@repo/ui";
import { Check, Sparkles, Image as ImageIcon, HardDrive, Mic, Code, Zap, Crown } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-background">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-10 px-4 py-12 pb-24">
        
        {/* Header section */}
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Upgrade your plan
          </h1>
          
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          
          {/* Free Tier */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-colors min-w-[240px]">
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="font-semibold text-lg">Free</h3>
              <p className="text-sm text-muted-foreground h-10">Try Janata GPT for everyday tasks and casual chatting.</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-semibold">$0</span>
              <span className="text-muted-foreground text-sm">/ month</span>
            </div>
            <Button variant="outline" className="w-full rounded-full font-semibold mb-8 border-border/50 bg-transparent text-muted-foreground hover:bg-muted pointer-events-none">
              Your current plan
            </Button>
            
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-foreground">Start with the basics:</span>
              <Feature icon={Check} text="Unlimited everyday text chats" />
              <Feature icon={ImageIcon} text="Limited access to image creation" />
              <Feature icon={HardDrive} text="Limited memory and storage" />
              <Feature icon={Mic} text="Standard voice chats" />
              <Feature icon={Check} text="Ad supported" />
            </div>
          </div>

          {/* Starter Tier */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-colors min-w-[240px]">
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="font-semibold text-lg">Starter</h3>
              <p className="text-sm text-muted-foreground h-10">Expanded access to tools and extended usage.</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-semibold">$5</span>
              <span className="text-muted-foreground text-sm">/ month</span>
            </div>
            <Button className="w-full rounded-full font-semibold mb-8 bg-foreground text-background hover:bg-foreground/90">
              Upgrade to Starter
            </Button>
            
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-foreground">Everything in Free, and:</span>
              <Feature icon={Sparkles} text="More messages with tools" />
              <Feature icon={ImageIcon} text="More image creation" />
              <Feature icon={HardDrive} text="More memory and storage" />
              <Feature icon={Mic} text="More voice chats" />
            </div>
          </div>

          {/* Premium Tier */}
          <div className="flex flex-col p-6 rounded-2xl border-2 border-primary bg-primary/5 relative min-w-[240px]">
            <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Recommended
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="font-semibold text-lg">Premium</h3>
              <p className="text-sm text-muted-foreground h-10">Your AI assistant. Advanced intelligence for your work.</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-semibold">$20</span>
              <span className="text-muted-foreground text-sm">/ month</span>
            </div>
            <Button className="w-full rounded-full font-semibold mb-8 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <Sparkles className="w-4 h-4" />
              Upgrade to Premium
            </Button>
            
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-foreground">Everything in Starter, and:</span>
              <Feature icon={Zap} text="Advanced intelligence for complex work" />
              <Feature icon={ImageIcon} text="Higher quality image creation" />
              <Feature icon={Code} text="Codex to automate coding" />
              <Feature icon={HardDrive} text="Expanded memory and 20 GB storage" />
              <Feature icon={Check} text="No ads" />
            </div>
          </div>

          {/* Pro Tier */}
          <div className="flex flex-col p-6 rounded-2xl border border-border/50 bg-card hover:border-border transition-colors min-w-[240px]">
            <div className="flex flex-col gap-2 mb-6">
              <h3 className="font-semibold text-lg">Pro</h3>
              <p className="text-sm text-muted-foreground h-10">Maximum power for heavy users and professionals.</p>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-semibold">$100</span>
              <span className="text-muted-foreground text-sm">/ month</span>
            </div>
            <Button className="w-full rounded-full font-semibold mb-8 bg-foreground text-background hover:bg-foreground/90">
              Upgrade to Pro
            </Button>
            
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-foreground">Everything in Premium, and:</span>
              <Feature icon={Crown} text="Our most capable frontier Pro model" />
              <Feature icon={Zap} text="Faster, more powerful Work and Codex" />
              <Feature icon={HardDrive} text="Maximum memory and 100 GB storage" />
              <Feature icon={Sparkles} text="5x Premium usage for longer work sessions" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
      <span className="text-sm text-muted-foreground leading-tight">{text}</span>
    </div>
  );
}
