import { UserProfile } from "@clerk/clerk-react";

export default function UserProfilePage() {
  return (
    <div className="bg-white min-h-[1400px]">
      <UserProfile path="/user" routing="path" />
    </div>
  );
}
