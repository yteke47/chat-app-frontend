import { useProfile } from "../context/ProfileContext";

const useUserProfile = () => {
  const { profile } = useProfile();

  return profile ? profile : {
    id: "",
    username: "",
    email: "",
    registeredAt: "",
    friendCode: "",
    chats: [],
    messageRequests: [],
  };
};

export default useUserProfile;
