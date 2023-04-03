import { motion } from "framer-motion";
import { BiErrorAlt } from "react-icons/bi";
import { AiOutlineFileDone } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const Toast = ({ payload, open }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className={`absolute top-5 right-5 ${
          payload.error
            ? "from-red-400 to-red-600"
            : "from-indigo-400 to-indigo-600"
        } rounded-md p-5 opacity-95 bg-gradient-to-br w-72 md:w-80 `}
      >
        <TiDelete
          className="absolute text-white text-2xl top-1 right-1 cursor-pointer"
          onClick={() => open(false)}
        />
        <motion.div
          initial={{ x: 0 }}
          animate={
            payload.error ? { x: [0, -10, 10, -8, 8, -4, 0, 0, 0, 0, 0] } : {}
          }
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-1">
            <h2 className="text-white font-bold select-none">{payload.msg}</h2>
            {payload.error ? (
              <BiErrorAlt className="text-white" />
            ) : (
              <AiOutlineFileDone className="text-white" />
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Toast;
