import Link from "next/link";
import { Button } from "@repo/ui";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <header className="flex h-16 items-center px-4 md:px-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-6 w-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">AI</div>
          <span>ChatGPT Clone</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-white/80 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-white/80 transition-colors">
            Pricing
          </Link>
          <Link href="/c/new" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Log in
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48 flex items-center justify-center px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center max-w-3xl">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                Think smarter. Work faster.
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                Experience the power of advanced agentic AI. Built with tree-branching conversations, Custom GPTs, and RAG.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Button render={<Link href="/c/new" />} size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200">
                Start chatting
              </Button>
              <Button render={<Link href="#features" />} variant="outline" size="lg" className="h-12 px-8 rounded-full border-zinc-800 hover:bg-zinc-900 hover:text-white text-white bg-transparent">
                Learn more
              </Button>
            </div>
          </div>
        </section>

        {/* Feature Mockup Section */}
        <section className="w-full py-12 md:py-24 bg-zinc-950 flex justify-center px-4">
          <div className="max-w-5xl w-full border border-zinc-800 rounded-2xl bg-zinc-900/50 p-4 backdrop-blur-sm shadow-2xl">
             <div className="aspect-video w-full rounded-xl bg-black border border-zinc-800 overflow-hidden relative flex flex-col">
               <div className="h-12 border-b border-zinc-800 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
               </div>
               <div className="flex-1 p-8 flex flex-col justify-end">
                 <div className="max-w-xl mx-auto w-full">
                    <div className="flex items-center gap-4 text-zinc-400 text-sm mb-4 justify-center">
                       <span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-zinc-800"></div> Create an image</span>
                       <span className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-zinc-800"></div> Write code</span>
                    </div>
                    <div className="h-14 w-full bg-zinc-800/50 rounded-full border border-zinc-700 flex items-center px-4 text-zinc-500">
                      Message ChatGPT Clone...
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-zinc-800 text-zinc-500">
        <p className="text-xs">© 2026 ChatGPT Clone. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
