"use client";

import useStore from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";

import UpdateEmail from "@/components/update-email";

const Account = () => {
  const router = useRouter();
  const { isUnmounted, setIsUnmounted } = useStore();

  const closeAccountOptions = () => {
    router.push("/");
    setIsUnmounted(true);
  };

  return (
    <AnimatePresence>
      {isUnmounted === false && (
        <motion.div
          className="h-screen w-screen bg-white"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.2 }}
          exit={{ x: "-100vw" }}
        >
          <div className="flex justify-end p-4 mb-14">
            <button
              onClick={closeAccountOptions}
              className="h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow"
            >
              <RxCross2 size={30} />
            </button>
          </div>
          <div className="pr-16 pl-8">
            <UpdateEmail />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Account;
