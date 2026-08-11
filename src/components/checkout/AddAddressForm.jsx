import { useEffect } from "react";
import InputField from "../shared/InputField";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import Spinners from "../shared/Spinners";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUpdatedUserAddress } from "../../store/actions";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdatedUserAddress(
        data,
        toast,
        address?.addressId,
        setOpenAddressModal,
      ),
    );
  };

  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address.buildingName);
      setValue("city", address.city);
      setValue("state", address.state);
      setValue("eirCode", address.eirCode);
      setValue("street", address.street);
      setValue("country", address.country);
    }
  }, [address, setValue]);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
        <div className="flex items-center justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
          <FaAddressCard className="mr-2 text-2xl" />
          {!address?.addressId ? "Add Address" : "Update Address"}
        </div>

        <div className="flex flex-col gap-4">
          <InputField
            label="Building Name"
            required
            notBlank
            min={5}
            minMessage="*Building name must be at least 5 characters long"
            id="buildingName"
            type="text"
            message="*Building Name is required"
            placeholder="Enter your building name"
            register={register}
            errors={errors}
          />

          <InputField
            label="City"
            required
            notBlank
            min={4}
            minMessage="*City name must be at least 4 characters long"
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
            notBlank
            min={2}
            minMessage="*State name must be at least 2 characters long"
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
            notBlank
            min={5}
            minMessage="*Eircode must be at least 5 characters long"
            id="eirCode"
            type="text"
            message="*Eircode is required"
            placeholder="Enter your eircode"
            register={register}
            errors={errors}
          />

          <InputField
            label="Street"
            required
            notBlank
            min={5}
            minMessage="*Street name must be at least 5 characters long"
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
            notBlank
            min={2}
            minMessage="*Country name must be at least 2 characters long"
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
