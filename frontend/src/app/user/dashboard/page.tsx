import { getProfile } from "@/utils/get-profile";

export default function DashboardPage() {
  const user = getProfile();
  return <div>hello {user}</div>;
}
