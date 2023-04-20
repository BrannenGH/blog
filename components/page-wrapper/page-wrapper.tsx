import { Sidebar } from "../sidebar";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-stretch">
      <div className="bg-gray-100 min-h-screen flex-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold italic mb-6">
            Debug Less, Ship More
          </h1>
          {children}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
