import { useEffect, useState } from "react";
import { useAddNewItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import Image from "../../components/Image";
import Spenner from "../../components/Spenner";
import { BsArrowLeftShort } from 'react-icons/bs';
import { toast } from 'react-toastify';
import iconPicture from "../../assets/icon-item.svg";

const NewUserForm = () => {
  const [btnCancel, setBtnCancel] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState("");
  const [stockMGT, setStockMGT] = useState(false);
  const [status, setStatus] = useState("Out of Stock");
  const [imageView, setImageView] = useState("");
  const [image, setImage] = useState();

  const navigate = useNavigate();
  const [addNewItem, { isLoading, isSuccess, isError, error }] = useAddNewItemMutation();

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      navigate("/inventory");
    }
  }, [isSuccess, navigate]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setQty(0);
    setPrice("");
    setStockMGT(false);
    setStatus("Out of Stock");
    setImageView("");
    setImage("");
  };

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleQtyChange = (e) => {
    const value = e.target.value;
    setStatus(stockMGT && value > 0 ? "In Stock" : "Out of Stock");
    setQty(value);
  };

  const handleStockMGTChange = () => {
    setStockMGT((prev) => !prev);
    setStatus("Out of Stock");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImageView(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const canSave = [name, description, category, image].every(Boolean) && !isLoading;

  const categoryOptions = [
    { value: "--", label: "--" },
    { value: "Coffee", label: "Coffee" },
    { value: "Non Coffee", label: "Non Coffee" },
    { value: "Food", label: "Food" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];


  const handleSaveClick = async (e) => {
    e.preventDefault();
    if (canSave) {
      const result = await addNewItem({ name, description, stockMGT, category, qty, price, status, image });
      toast[result?.error ? 'error' : 'success'](result?.error?.error || result?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const errorClass = isError ? "text-gray-900 sm:text-2xl dark:text-gray-200" : null;

  return (
    <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-xl font-semibold text-gray-500 sm:text-2xl dark:text-gray-200">New Item</h1>
      <p className={errorClass}>{error?.data?.message}</p>
      <div className="mt-5 md:col-span-2">
        <form onSubmit={handleSaveClick}>
          <div className="border overflow-hidden rounded-md">
            <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-10">
              <div className="grid grid-cols-2 gap-20">
                <div className="col-span-2 sm:col-span-1">
                  <InputField label="Item name" value={name} onChange={handleInputChange(setName)} />
                  <TextAreaField label="Description" value={description} onChange={handleInputChange(setDescription)} />
                  <ImageUploadField imageView={imageView} onChange={handleImageChange} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <InputField label="Price" value={price} onChange={handleInputChange(setPrice)} />
                  <SelectField label="Category" value={category} onChange={handleInputChange(setCategory)} options={categoryOptions} />
                  <CheckboxField label="Stock management" checked={stockMGT} onChange={handleStockMGTChange} />
                  {stockMGT ? (
                    <InputField label="Quantity" value={qty} onChange={handleQtyChange} />
                  ) : (
                    <SelectField label="Status" value={status} onChange={handleInputChange(setStatus)} options={statusOptions} />
                  )}
                </div>
              </div>
            </div>
            <FormFooter canSave={canSave} btnCancel={btnCancel} isLoading={isLoading} setBtnCancel={setBtnCancel} navigate={navigate} />
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div className="mt-5">
    <label className="block text-base text-gray-500 dark:text-gray-200">{label}</label>
    <input
      className={`${label == `Item name` ? `w-full` :`w-full sm:w-1/2` } mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border-gray-700 dark:bg-slate-900 outline-none focus:border-gray-300 focus:shadow-sm rounded-md`}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);

const TextAreaField = ({ label, value, onChange }) => (
  <div className="mt-5">
    <label className="block text-base text-gray-500 dark:text-gray-200">{label}</label>
    <textarea
      className="w-full mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border-gray-700 dark:bg-slate-900 outline-none focus:border-gray-300 focus:shadow-sm rounded-md"
      rows="4"
      value={value}
      onChange={onChange}
    />
  </div>
);

const ImageUploadField = ({ imageView, onChange }) => (
  <div className="mt-10">
    <label className="block text-base text-center sm:text-left text-gray-500 dark:text-gray-200">Item Photo</label>
    <div className="mt-1 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center">
      {imageView ? (
        <Image data={imageView} size="h-40 w-40" rounded="rounded-md" />
      ) : (
        <span className="inline-block h-40 w-40 overflow-hidden rounded-md bg-gray-100">
          <img src={iconPicture} className="h-40 w-40" />
        </span>
      )}
      <label
        htmlFor="file-upload"
        className="sm:ml-5 cursor-pointer text-[10px] px-4 py-2 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
      >
        <span className="whitespace-nowrap">Upload Photo</span>
        <input id="file-upload" name="image" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={onChange} />
      </label>
      <p className="text-xs text-gray-500 ml-3">JPG, JPEG, PNG up to 10MB</p>
    </div>
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div className="mt-5">
    <label className="block text-base text-gray-500 dark:text-gray-200">{label}</label>
    <select
      className="mt-1 block w-full sm:w-1/2 py-3 px-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border-gray-700 dark:bg-slate-900 outline-none focus:border-gray-300 focus:shadow-sm rounded-md"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, checked, onChange }) => (
  <div className="mt-10 space-y-4">
    <label className="block text-base text-gray-500 dark:text-gray-200">{label}</label>
    <div className="mt-4">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
        <div className="w-[33px] h-[18px] bg-gray-200 flex-nowrap peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] sm:after:top-[5px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all peer-checked:bg-gray-600"></div>
        <span className="ml-3 text-xs sm:text-base text-gray-900 dark:text-gray-200">Track stock quantity for this item</span>
      </label>
    </div>
  </div>
);

const LoadingIndicator = () => (
  <div className="flex justify-center items-center">
    <Spenner />
    Saving....
  </div>
);

const FormFooter = ({ canSave, btnCancel, setBtnCancel, isLoading, navigate }) => (
  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:px-10 flex justify-between items-center">
    <button
      type="button"
      className="mt-0 inline-flex items-center justify-center rounded-full text-black dark:text-gray-300 dark:bg-gray-700 dark:active:bg-slate-800 dark:hover:bg-gray-800 bg-gray-200 hover:bg-gray-300 px-4 py-2 text-sm font-medium border dark:border-slate-600 sm:w-40"
      onClick={() => {
        setBtnCancel(true);
        if (btnCancel) navigate("/inventory");
      }}
    >
      <BsArrowLeftShort className="mr-2 text-[20px]" />
      Cancel
    </button>
    <button
      type="submit"
      disabled={!canSave}
      className={
        `${canSave
          ? `cursor-pointer flex  dark:text-gray-300 border-gray-400 dark:border-slate-600 bg-black  dark:bg-gray-700 hover:bg-gray-700`
          : `  dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-300 dark:bg-gray-800 hover:bg-gray-400`
        } flex justify-center items-center px-3 sm:px-7 py-2 text-white border  dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`}
    >
    {isLoading
    ? <LoadingIndicator/>
    :<>
      <AiOutlineSave size={20} className="mr-2" />
      Save Item
    </>
    }
     
    </button>

  </div>
);

export default NewUserForm;
