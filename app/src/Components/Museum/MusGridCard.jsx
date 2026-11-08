import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const MusGridCard = ({ props, index }) => {
  const navigate = useNavigate();
  console.log(props._id);
  const goDTL = () => {
    navigate(`/carsdtl/${props._id}`);
    window.scrollTo(0, 0);
  };
  return (
    <div
      // to={`/carsdtl/${props._id}`}
      // onClick={() => window.scrollTo(0, 0)}
      onClick={goDTL}
      className={`
        bg-[#0c0c0c] hover:scale-95  duration-500
      p-2 transition-all 
      text-white hover:text-red-600 hover:border-red-800
      ${index % 3 === 2 ? "col-span-2 clg:col-span-1" : ""}
    `}
    >
      {/* <div
          onClick={goDTL}
          key={props.id}
          className={`
                      rounded-sm border border-[#4a4a4a] bg-[#1d1d1d]
                      p-5 transition-all duration-500
                      text-white hover:text-red-600 hover:border-red-800
                      ${index % 3 === 2 ? "col-span-2 clg:col-span-1" : ""}
                    `}
        > */}
      <div className="h-20 ">
        <h2 className=" text-[18px] clg:text-[15px] xl:text-[18px] font-array font-semibold uppercase  line-clamp-2">
          {props.title}
        </h2>

        <p className=" text-sm clg:text-xs xl:text-sm font-satosIT  text-white">
          {props.forai.engine.type}
        </p>

        <p className=" text-sm clg:text-xs xl:text-sm  font-satosIT text-white">
          {props.forai.season} season
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0.1, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "linear" }}
        viewport={{ once: false, amount: 0.45 }}
      >
        {/* cursor-target  bg-[#2c2c2c]*/}
        <div
          className={`
                   mt-5 flex h-[280px] items-center justify-center  
                      ${index % 3 === 2 ? " h-[360px] mmd:h-[380px] clg:h-[500px]" : "h-[500px]"}
                    `}
        >
          <img
            src={props.img}
            alt={props.title}
            className="max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-700 "
          />
        </div>
      </motion.div>
      {/* </div> */}
    </div>
  );
};

export default MusGridCard;
