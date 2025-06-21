import {
  BookmarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface TabIconProps {
  icon: React.ReactNode;
  label: string;
}

function TabIcon({ icon, label }: TabIconProps) {
  return (
    <div className="text-white/75 hover:text-white transition-colors flex flex-col items-center gap-2">
      {icon}
      <p className="text-sm">{label}</p>
    </div>
  );
}
export function MobileTabs({ className }: { className?: string }) {
  return (
    <div
      className={`mt-auto pt-4 px-12 pb-4 flex justify-between items-center ${className}`}
    >
      <TabIcon icon={<HomeIcon className="size-8" />} label="Home" />
      <TabIcon
        icon={<MagnifyingGlassIcon className="size-8" />}
        label="Ricerca"
      />
      <TabIcon
        icon={<BookmarkIcon className="size-8" />}
        label="La tua libreria"
      />
      <TabIcon icon={<PlusIcon className="size-8" />} label="Crea" />
    </div>
  );
}
