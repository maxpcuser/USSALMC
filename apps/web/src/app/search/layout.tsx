import { SearchNavigation } from './SearchNavigation';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SearchNavigation />
      <main>{children}</main>
    </div>
  );
}