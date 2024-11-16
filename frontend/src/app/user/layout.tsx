import { UserSideBar } from "@/components/layouts/UserSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <UserSideBar />
      <div className="w-full h-screen mt-8 px-5 ml-60">{children}</div>
    </div>
  );
}
