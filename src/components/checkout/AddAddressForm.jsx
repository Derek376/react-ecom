import React from "react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import Spinners from "../shared/Spinners";
import { useSelector } from "react-redux";

const AddAddressForm = () => {
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    console.log("Save Address Click");
    // Handle save address logic here
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex items-center justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          Add Address
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            id="building"
            type="text"
            message="*Building Name is required"
            placeholder="Enter your building name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            id="city"
            type="text"
            message="*City is required"
            placeholder="Enter your city"
            register={register}
            errors={errors}
          />

          <InputField
            label="State"
            required
            id="state"
            type="text"
            message="*State is required"
            placeholder="Enter your state"
            register={register}
            errors={errors}
          />

          <InputField
            label="Eircode"
            required
            id="eircode"
            type="text"
            message="*Eircode is required"
            placeholder="Enter your eircode"
            register={register}
            errors={errors}
          />

          <InputField
            label="Street"
            required
            id="street"
            type="text"
            message="*Street is required"
            placeholder="Enter your street"
            register={register}
            errors={errors}
          />

          <InputField
            label="Country"
            required
            id="country"
            type="text"
            message="*Country is required"
            placeholder="Enter your country"
            register={register}
            errors={errors}
          />
        </div>

        <button
          disabled={btnLoader}
          className="text-white bg-custom-blue px-4 py-4 rounded-md mt-4"
          type="submit"
        >
          {btnLoader ? (
            <>
              <Spinners /> Loading...
            </>
          ) : (
            <>Save</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAddressForm;
