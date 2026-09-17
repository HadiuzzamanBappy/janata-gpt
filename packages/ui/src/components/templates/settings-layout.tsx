import * as React from "react"

interface SettingsLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  sidebarNav: { title: string; url: string; isActive?: boolean }[]
}

export function SettingsLayout({
  children,
  title,
  description,
  sidebarNav,
}: SettingsLayoutProps) {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0 bg-border h-[1px] w-full" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNav.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className={`inline-flex items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  item.isActive ? "bg-muted" : "transparent"
                }`}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
