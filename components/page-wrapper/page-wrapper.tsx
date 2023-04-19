import { Sidebar } from "../sidebar"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-stretch">
        <div className="bg-gray-100 min-h-screen flex-auto">
            <div className="container mx-auto px-4 py-8">{children}</div>
        </div>
        <Sidebar />
    </div>
  );
}
