import * as React from "react"
import { Hexagon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean
}

export function BrandLogo({ className, showText = true, ...props }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold", className)} {...props}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Hexagon className="size-5" />
      </div>
      {showText && <span className="text-xl tracking-tight">Brand</span>}
    </div>
  )
}
