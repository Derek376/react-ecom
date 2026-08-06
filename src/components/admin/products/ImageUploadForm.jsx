import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinners from "../../shared/Spinners";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProductImageFromDashboard } from "../../../store/actions";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const ImageUploadForm = ({ setOpen, product }) => {
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef(null);
  const previewUrlRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    [],
  );

  const resetSelectedImage = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setSelectedFile(null);
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onHandleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      toast.error("Only JPEG, PNG and WebP images are supported.");
      resetSelectedImage();
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be smaller than 5 MB.");
      resetSelectedImage();
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setSelectedFile(file);
    setPreviewImage(objectUrl);
  };

  const addNewImageHandler = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an image before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    dispatch(
      updateProductImageFromDashboard(
        formData,
        product.id,
        toast,
        setLoader,
        setOpen,
        isAdmin,
      ),
    );
  };

  const handleClearImage = () => {
    resetSelectedImage();
  };

  return (
    <div className="py-5 relative h-full">
      <form className="space-y-4" onSubmit={addNewImageHandler}>
        <div className="flex flex-col gap-4 w-full">
          <label className="flex items-center gap-2 cursor-pointer text-custom-blue border border-dashed border-custom-blue rounded-md p-3 w-full justify-center">
            <FaCloudUploadAlt size={24} />
            <span>Upload Product Image</span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onHandleImageChange}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>

          {previewImage && (
            <div>
              <img
                src={previewImage}
                alt="Image Preview"
                className="h-60 rounded-md mb-2"
              />

              <button
                type="button"
                onClick={handleClearImage}
                className="bg-rose-600 text-white px-2 py-1 rounded-md"
              >
                Clear Image
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full justify-between items-center absolute bottom-14">
          <Button
            disabled={loader}
            onClick={() => setOpen(false)}
            variant="outlined"
            className="text-white py-2.5 px-4 text-sm font-medium"
          >
            Cancel
          </Button>

          <Button
            disabled={loader || !selectedFile}
            type="submit"
            variant="contained"
            color="primary"
            className="bg-custom-blue text-white  py-2.5 px-4 text-sm font-medium"
          >
            {loader ? (
              <div className="flex gap-2 items-center">
                <Spinners /> Loading...
              </div>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;
