import { usePublicAddress } from "@/hooks/use-public-address";
import useStore from "@/store";

const UserInfos = () => {
  const { truncateAddress, balance } = useStore();
  const publicAddress = usePublicAddress();
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold  text-[3rem] mb-2"> $ {balance}</div>
      <div className="text-gray-500 mb-10">
        {publicAddress?.length == 0
          ? "Fetching address.."
          : truncateAddress(publicAddress as string)}
      </div>
    </div>
  );
};

export default UserInfos;
