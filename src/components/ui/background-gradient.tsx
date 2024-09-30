import { motion } from "framer-motion";

export const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-50">
      <motion.div
        className="absolute -z-10 w-[40rem] h-[40rem] dark:bg-[#00054A] bg-[#88C7FF] rounded-full filter blur-3xl"
        style={{ left: "-10%", top: "-10%" }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 25,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -z-10 w-[35rem] h-[35rem] dark:bg-[#3B004A] bg-[#E2A9FF] rounded-full filter blur-3xl"
        style={{ right: "-5%", top: "30%" }}
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 30,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -z-10 w-[45rem] h-[45rem] dark:bg-[#004a37] bg-[#E2A9FF] rounded-full filter blur-3xl"
        style={{ left: "20%", bottom: "-10%" }}
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["100%", "0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 35,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -z-10 w-[30rem] h-[30rem] dark:bg-[#4a4300] bg-[#88C7FF] rounded-full filter blur-3xl"
        style={{ right: "10%", bottom: "20%" }}
        animate={{
          x: ["100%", "0%", "100%"],
          y: ["100%", "0%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 28,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
