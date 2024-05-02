import { format, getYear } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import LogoCard from "../../components/basis/logoCard";
import Netflix from "../../../assets/images/png/netflix.png";
import Button from "../../components/basis/buttons/Button";
import CardSelect from "../../components/basis/subscription_basis/card-select";
import { IoChevronDown } from "react-icons/io5";
import InputDiv from "../../components/basis/inputDiv";
// import Input from '../../components/basis/Input';

// limit month naviqgation

const AddSubscriptionParam = () => {
  const selectsLabels = ["Type", "Cycle", "Payment Method", "Remind me"];

  const options = {
    plan: ["Base", "Standart", "Premium"],
    cycle: ["Monthly", "Semester", "Yearly"],
    payment: ["UPI", "Stripe", "Paypal"],
    remind: ["Never", "1 day before", "3 days before", "7 days before"],
  };

  // const optionsCycle = ["Monthly", "Quaterly", "Yearly"];
  // const optionsPayment = ["UPI", "Stripe", "Paypal"];
  // const optionsRemind = ["1 day before", "3 days before", "7 days before"];

  const [optionPayment, setOptionPayment] = useState<string>(
    options.payment[0]
  );
  const [optionCycle, setOptionCycle] = useState<string>(options.cycle[0]);
  const [optionRemind, setOptionRemind] = useState<string>(options.remind[0]);

  const today = new Date();
  const [selected, setSelected] = useState<Date | undefined>();
  const [isDatePickerOpen, setPickerOpen] = useState<Boolean>(false);
  const [planType, setPlanType] = useState<string>("Select the plan type");

  const [isInputShow, setIsInputShow] = useState<boolean>(false);

  let dateSelected = <p>Select date</p>;
  if (selected) {
    dateSelected = <p> {format(selected, "dd MMM yyyy")}</p>;
  }

  const handleDaySelection = () => {
    setPickerOpen(false);
  };

  // const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  //   e.target.
  // }

  const css = `
  .rdp-day_selected{
    background-color: #4649E5;
    font-weight: bold;
  }

  .DayPicker-Day--hover{
    background-color: #4649E5;
    font-weight: bold;
  }

  .rdp-dropdown{
    background: #101019;
    outline: none;
    border: none;
  }

`;

  const rootRef = useRef<HTMLDivElement>(null);
  const planTypeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node) &&
        isDatePickerOpen
      ) {
        setPickerOpen(false);
      }

      if (
        planTypeInputRef.current &&
        !planTypeInputRef.current.contains(event.target as Node) &&
        isInputShow
      ) {
        setIsInputShow(false);
      }
    };

    rootRef.current?.addEventListener("click", handleDocumentClick);
    // planTypeInputRef.current?.addEventListener("click", handleDocumentClick);

    document.addEventListener("click", handleDocumentClick);

    return () => {
      rootRef.current?.removeEventListener("click", handleDocumentClick);
      planTypeInputRef.current?.removeEventListener(
        "click",
        handleDocumentClick
      );
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isDatePickerOpen, isInputShow]);

  return (
    <div className="md:flex md:flex-col lg:flex-row items-start md:space-y-48 lg:space-y-0 md:px-[50px] lg:px-[100px] xl:px-[220px] 2xl:px-[20%] font-redRoseBold ">
      <div className="relative flex flex-col justify-between h-[85vh] md:h-fit w-full md:space-y-12">
        <div className="space-y-6 ">
          <div className=" space-y-4">
            <LogoCard imgSrc={Netflix} />
            <h1 className="  text-2xl text-white-1">Netflix</h1>
          </div>

          <div className="space-y-4">
            <div ref={rootRef}>
              {/* <div className=" flex justify-between p-4 bg-black-2 rounded-xl ">
                <span className=" font-redRoseLight ">Started on</span>
                <div
                  className="cursor-pointer"
                  onClick={() => setPickerOpen(!isDatePickerOpen)}
                >
                  {dateSelected}
                </div>
              </div> */}

              <InputDiv label="Started on">
                <div
                  className="cursor-pointer"
                  onClick={() => setPickerOpen(!isDatePickerOpen)}
                >
                  {dateSelected}
                </div>
              </InputDiv>

              <div
                className={
                  isDatePickerOpen ? "flex justify-end space-y-1 " : "hidden"
                }
              >
                <div className="bg-[#00000006] backdrop-blur-[9px] border border-primary-2  handleSelectedOption rounded-xl absolute z-50">
                  <style>{css}</style>
                  <DayPicker
                    mode="single"
                    required
                    showOutsideDays
                    fixedWeeks
                    fromYear={getYear(today) - 4}
                    // toYear={getYear(today)}
                    toDate={today}
                    selected={selected}
                    onSelect={setSelected}
                    captionLayout="dropdown-buttons"
                    // footer={footer}
                    onDayClick={handleDaySelection}
                    onDayMouseEnter={(day, modifiers, e) => {
                      const target = e.target as HTMLElement;
                      target.classList.add("DayPicker-Day--hover");
                    }}
                    onDayMouseLeave={(day, modifiers, e) => {
                      const target = e.target as HTMLElement;
                      target.classList.remove("DayPicker-Day--hover");
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div
              ref={planTypeInputRef}
              className="flex relative justify-between items-center p-4 bg-black-2 rounded-xl "
            >
              <span className=" font-redRoseLight ">Plan type</span>

              <input
                type="text"
                name="planType"
                className={`outline-none text-black-0 text-center max-md:w-32 ${
                  isInputShow ? "" : "hidden"
                }`}
                onChange={(e) => setPlanType(e.target.value)}
                // onMouseLeave={(e) => handleMouseLeave(e)}
              />

              <span
                className=" cursor-pointer "
                onClick={() => setIsInputShow(!isInputShow)}
              >
                {planType ? planType : "Enter a plan"}{" "}
              </span>
            </div> */}

            {/* add a ccomponent */}
            {selectsLabels.map((label, index) => {
              let options$: string[] = [];
              if (index === 0) {
                options$ = options.plan;
              } else if (index === 1) {
                options$ = options.cycle;
              } else if (index === 2) {
                options$ = options.payment;
              } else if (index === 3) {
                options$ = options.remind;
              }

              return (
                <CardSelect
                  key={label + index}
                  setOption={
                    index === 1
                      ? setOptionCycle
                      : index === 2
                      ? setOptionPayment
                      : index === 0
                      ? setPlanType
                      : setOptionRemind
                  }
                  option={
                    index === 1
                      ? optionCycle
                      : index === 2
                      ? optionPayment
                      : index === 0
                      ? planType
                      : optionRemind
                  }
                  label={label}
                  options={options$}
                />
              );
            })}
          </div>
        </div>

        <div className=" flex justify-start md:py-4">
          <Button
            btnBg=" bg-primary-0"
            btnBorder=" rounded-xl"
            btnClass=" center w-full md:w-fit"
            btnP="py-[14px] md:px-10 "
            btnText="font-redRoseBold text-[16px] text-[#fff] "
            buttonText="Add Subscription"
          />
        </div>
      </div>

      {/* <div className="max-md:hidden rounded-[10px] md:flex justify-between items-start lg:block text-[#30313D] bg-[#12121C] lg:space-y-7 p-6 py-6 lg:w-[30%] md:w-full">
        <div className=" space-y-1">
          <h2 className=" font-redRoseBold">Version</h2>
          <span>V0.1.1</span>
        </div>
        <div className=" space-y-1">
          <h1>Work with Stripe</h1>
          <ul className="">
            <li>
              <a href="" className=" underline">
                Customers
              </a>
            </li>
            <li>
              <a href="" className=" underline">
                Payments
              </a>
            </li>
            <li>
              <a href="" className=" underline">
                Reports
              </a>
            </li>
          </ul>
        </div>
        <div className=" space-y-1">
          <h2 className=" font-redRoseBold">Support</h2>
          <ul className="">
            <li>
              <a href="" className="">
                support@supertodo.me
              </a>
            </li>
            <li>
              <a href="" className=" underline text-[#6A7383] ">
                SuperTodo support site{" "}
              </a>
            </li>
          </ul>
        </div>
        <div className=" space-y-1">
          <h2 className=" font-redRoseBold">Pricing</h2>
          <ul className="">
            <li>
              <a href="" className="">
              Free to your organization
              </a>
            </li>
            <li>
              <a href="" className=" underline text-[#6A7383] ">
              Learn more about pricing{" "}
              </a>
            </li>
          </ul>
        </div>

        <Button 
          btnIcon={<IoChevronDown size={16} color="#3C4257" />}
          buttonText="More details"
          btnClass=" flex items-center space-x-1"
          btnBg="bg-[#fff] "
          btnBorder=" rounded border border-[#EOE6EB] "
          btnP=" px-2 py-1"
          btnText="text-[#3C4257] "
        />
      </div> */}
    </div>
  );
};

export default AddSubscriptionParam;
