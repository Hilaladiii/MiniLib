import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BarItem({
  Icon,
  text,
  href,
}: {
  Icon: React.ElementType;
  text: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link href={href} className="w-full">
      <div
        className={cn(
          "w-full flex items-center py-2 px-16 gap-5",
          isActive ? "bg-white text-black" : "bg-black text-white"
        )}
      >
        <Icon
          className={cn("text-lg", isActive ? "text-black" : "text-white")}
        />
        <p className="text-sm font-semibold">{text}</p>
      </div>
    </Link>
  );
}
