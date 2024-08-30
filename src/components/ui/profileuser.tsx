import { authSession } from "@/lib/auth";
import Image from "next/image";

const ProfileUser = async () => {
  const { name, email, image }: any = await authSession();
  return (
    <div>
      <Image
        src={image ? image : "/images/default-profile.jpg"}
        width={400}
        height={400}
        alt="user profile"
        className="w-36 rounded-lg object-cover"
      />
      <h2 className="font-semibold">{name}</h2>
    </div>
  );
};

export default ProfileUser;
