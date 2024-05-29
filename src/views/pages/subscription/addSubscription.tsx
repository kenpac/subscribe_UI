import React, { useEffect, useState } from "react";
import CardSubscription from "../../components/basis/subscription_basis/card-subscription";
import Input from "../../components/basis/Input";
import { BiChevronRight, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import DefaultSubscription from "../../../models/DefaultSubscription.model";
import SubscriptionController from "../../../controllers/subscription/SubscriptionController";

let netflix = require("../../../assets/images/png/netflix.png") as any;
// let arrowLeft = require("../../../assets/images/png/Group.png") as any;

const AddSubscription = () => {
  const [defaultSubs, setDefaultSub] = useState<
    DefaultSubscription[] | undefined
  >([]);

  useEffect(() => {
    const fetchDefaultSubscriptions = async () => {
      await SubscriptionController.getDefaultSubscription()
        .then((response) => {
          setDefaultSub(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.message);
          // setErrorServer(error.message);
        });
    };

    fetchDefaultSubscriptions();
  }, []);

  return (
    <div className=" flex flex-col space-y-4 md:px-[73px] lg:px-[173px] xl:px-[273px] 2xl:px-[373px] ">
      <h1 className="md:hidden font-redRoseBold text-2xl">All Subscriptions</h1>

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

      <Link to="/home/addSubscription/custom">
        <div
          className={` cursor-pointer hover:opacity-50 flex justify-between items-center text-[16px] text-white-1 rounded-xl p-4 xl:pr-5 md:py-[14.5px]   m-0 w-full
        linear-gratient-card`}
        >
          <span>Custom Subscription</span>

          <span className=" text-[#E3E3EC] flex items-center justify-center">
            <BiChevronRight size={24} />
          </span>
        </div>
      </Link>

      {defaultSubs &&
        defaultSubs.map((defaultSub, index) => {
          return (
            <Link key={"link-"+index} to={`/home/addSubscription/${defaultSub.id}`}>
              <CardSubscription key={index + '-' + defaultSub.id} imgSrc={"http://localhost:8000/storage/" + defaultSub.logo} subscriName={defaultSub.name} />
            </Link>
          );
        })}

      {/* {Array.from({ length: 8 }).map((_, i) => (
        <Link to={`/home/addSubscription/${i}`}>
          <CardSubscription imgSrc={netflix} subscriName="Netflix" />
        </Link>
      ))} */}
    </div>
  );
};

export default AddSubscription;
