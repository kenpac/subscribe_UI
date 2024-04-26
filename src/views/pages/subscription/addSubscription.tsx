import React from "react";
import CardSubscription from "../../components/basis/addSubscription_basis/card-subscription";
import Input from "../../components/basis/Input";
import { BiChevronRight, BiSearch } from "react-icons/bi";

let netflix = require("../../../assets/images/png/netflix.png") as any;
let arrowLeft = require("../../../assets/images/png/Group.png") as any;

const AddSubscription = () => {
  return (
    <div className=" flex flex-col space-y-4 md:px-[73px] lg:px-[173px] xl:px-[273px] 2xl:px-[373px]  md:py-[81px]">
      <div className="space-y-6 md:hidden">
        <img src={arrowLeft} alt="fleche" />
        <h1 className=" font-redRoseBold text-2xl">All Subscriptions</h1>
      </div>

      <div className="relative ">
        <Input
          inputType="text"
          placeholder="Search"
          // handleChange={searchBarChange}
          inputClass=" bg-black-2 py-4 px-4 rounded-[8px] text-sm text-[#5B5B6F] w-full"
        />

        <BiSearch
          size={24}
          color="#ABAAFF"
          className=" absolute top-1/3 right-5 "
        />
      </div>

      <div
        className={`flex justify-between items-center text-[16px] text-white-1 rounded-xl p-4 xl:pr-5 md:py-[14.5px]   m-0 w-full
        linear-gratient-card`}
      >
        <span>Custom Subscription</span>

        <span className="cursor-pointer text-[#E3E3EC] flex items-center justify-center">
          <BiChevronRight size={24} />
        </span>
      </div>

      {Array.from({ length: 6 }).map((_, i) => (
        <CardSubscription imgSrc={netflix} subscriName="Netflix" />
      ))}
    </div>
  );
};

export default AddSubscription;