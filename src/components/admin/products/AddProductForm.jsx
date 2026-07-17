import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../shared/InputField";
import { Button } from "@mui/material";

const AddProductForm = ({ setOpen, product, update = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("quantity", product?.quantity);
      setValue("discount", product?.discount);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [update, product, setValue]);

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Product Name"
            required
            id="productName"
            type="text"
            message="This field is required"
            placeholder="Product name"
            register={register}
            errors={errors}
          ></InputField>
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="flex-1 min-w-0">
            <InputField
              label="Price"
              required
              id="price"
              type="number"
              message="This field is required"
              placeholder="Product price"
              register={register}
              errors={errors}
            ></InputField>
          </div>
          <div className="flex-1 min-w-0">
            <InputField
              label="Quantity"
              required
              id="quantity"
              type="number"
              message="This field is required"
              placeholder="Product quantity"
              register={register}
              errors={errors}
            ></InputField>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <div className="flex-1 min-w-0">
            <InputField
              label="Discount"
              required
              id="discount"
              type="number"
              message="This field is required"
              placeholder="Product discount"
              register={register}
              errors={errors}
            ></InputField>
          </div>
          <div className="flex-1 min-w-0">
            <InputField
              label="Special Price"
              required
              id="specialPrice"
              type="number"
              message="This field is required"
              placeholder="Product special price"
              register={register}
              errors={errors}
            ></InputField>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="desc"
            className="font-semibold text-sm  text-slate-800"
          >
            Description
          </label>
          <textarea
            rows={5}
            placeholder="Add product description..."
            className={` px-4 py-2 w-full border outline-hidden bg-transparent text-slate-800 rounded-md ${
              errors["description"]?.message
                ? "border-red-500"
                : "border-slate-700"
            }`}
            {...register("description", {
              required: { value: true, message: "Description is required" },
            })}
          />
          {errors["description"]?.message && (
            <p className="text-sm font-semibold text-red-600 mt-0">
              {errors["description"]?.message}
            </p>
          )}
        </div>

        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-2.5 px-4 text-sm font-medium"
          >
            cancel
          </Button>
          <Button
            disabled={loader}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white py-2.5 px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <Spinners /> Loading...
              </div>
            ) : (
              <div>update</div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
