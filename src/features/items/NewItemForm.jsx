import { useEffect, useState } from "react";
import { useAddNewItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineSave } from "react-icons/ai";
import Image from "../../components/Image";
import Spenner from "../../components/Spenner";
import { BsArrowLeftShort } from 'react-icons/bs';
import { toast } from 'react-toastify';
import iconPicture from "../../assets/icon-item.svg"


const NewUserForm = () => {


  const [btnCancel, setBtnCancel] = useState(false)

  const [addNewItem, { isLoading, isSuccess, isError, error }] =
    useAddNewItemMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [qty, setQTY] = useState(0)
  const [price, setPrice] = useState("")
  const [stockMGT, setStockMGT] = useState(false)
  const [status, setStatus] = useState("Out of Stock")
  const [imageView, setImage] = useState("")
  const [image, setDataImage] = useState()


  useEffect(() => {
    if (isSuccess) {
      setName("")
      setDescription("")
      setCategory("")
      setQTY("")
      setPrice("")
      setStockMGT(false)
      setStatus("")
      setImage("")
      setDataImage()
      navigate("/dashboard/items")
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value)
  const onDescriptionChanged = (e) => setDescription(e.target.value)
  const onCategoryChanged = (e) => setCategory(e.target.value)
  
  const onQTYChanged = (e) => {
    const qty = e.target.value
   
    if(stockMGT && qty > 0){
      setStatus("In Stock")
    }else{
      setStatus("Out of Stock")
    }
    setQTY(qty)
  }
  const onPriceChanged = (e) => setPrice(e.target.value)
  const onStockMGTChanged = (e) => setStockMGT(stock => !stock)
  const onStatusChanged = (e) => setStatus(e.target.value)

  const onImageChanged = (e) => {
    const file = e.target.files[0]
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDataImage(reader.result)
    }

  }


  

  const canSave =
    [name, description, category, image].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {

      const result = await addNewItem({ name, description, stockMGT, category, qty, price, status, image })
      if (result?.error) {
        toast.error(result.error.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })

      } else {
        toast.success(result.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    }
  };


  const errClass = isError
    ? "text-gray-900 sm:text-2xl dark:text-gray-200"
    : "offscreen";

  async function readImage(e, func) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      let binaryData = e.target.result;
      let base64String = window.btoa(binaryData);
      func(base64String);
    };

    let image = reader.readAsBinaryString(file);

    return image;
  }



  return (
    <>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-xl font-semibold  text-gray-500 sm:text-2xl dark:text-gray-200">
          New Item
        </h1>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2">
          <form onSubmit={onSaveUserClicked} >
            <div className="border overflow-hidden rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-10">
                <div className="grid grid-cols-2 gap-20">
                  <div className="col-span-2 sm:col-span-1 ">
                    <div className="">
                      <label
                        className="block text-base text-gray-500 dark:text-gray-200"
                        htmlFor="name"
                      >
                        Item name
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        required
                        value={name}
                        onChange={onNameChanged}
                      />
                    </div>

                    <div className="mt-5">
                      <div>
                        <label htmlFor="OrderNotes" className="block text-base  text-gray-500"> Description </label>

                        <textarea
                          id="description"
                          name="description"
                          required
                          value={description}
                          className="w-full mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                          rows="4"
                          onChange={onDescriptionChanged}

                        // placeholder="Enter any additional order notes..."
                        >{description}</textarea>
                      </div>
                    </div>



                    <div className="mt-10">
                      <label className="block text-base text-center sm:text-left text-gray-500 dark:text-gray-200">
                        Item Photo
                      </label>
                      <div className="mt-1 flex flex-col gap-4 sm:gap-0 sm:flex-row items-center">
                        {imageView
                          ? <Image data={imageView} size="h-40 w-40" rounded="rounded-md" />
                          : <span className="inline-block h-40 w-40 overflow-hidden rounded-md bg-gray-100">
                            <img src={iconPicture} className="h-40 w-40"/>
                          </span>
                        }

                        <label
                          htmlFor="file-upload"
                          className="sm:ml-5 cursor-pointer text-[10px]  px-4 py-2 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
                        >

                          <span className="whitespace-nowrap">Upload Photo</span>

                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            onChange={event => {
                              readImage(event, setImage)
                              onImageChanged(event)
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500 ml-3">
                          JPG, JPEG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-2 sm:col-span-1">
                    <div className="">
                      <label
                        className="block text-base text-gray-500 dark:text-gray-200"
                        htmlFor="position"
                      >
                        Price
                      </label>
                      <input
                        className={`w-full sm:w-1/2 mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-300 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="price"
                        name="price"
                        type="number"
                        autoComplete="off"
                        required
                        value={price}
                        onChange={onPriceChanged}
                      />
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="country"
                        className="block text-base text-gray-500 dark:text-gray-200"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={onCategoryChanged}
                        className="mt-1 block w-full sm:w-1/2 py-3 px-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        <option defaultValue value={""}>
                          ---
                        </option>
                        <option value="Coffee">
                          Coffee
                        </option>
                        <option value="Non Coffee">
                          Non Coffee
                        </option>
                        <option value="Food">
                          Food
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>
                    </div>

                    <div className="mt-10 space-y-4">
                      <label
                        className="block text-base text-gray-500 dark:text-gray-200"
                        htmlFor="position"
                      >
                        Stock management
                      </label>
                      <div className="flex  items-start ">
                        <div
                          className=" flex items-center ">
                          <input
                            type="checkbox"
                            className="accent-slate-200 h-4 w-4 cursor-pointer"
                            id="stockMGT"
                            onChange={onStockMGTChanged}
                            checked={stockMGT}
                          />
                          <label htmlFor="stockMGT" className="text-sm pl-4 cursor-pointer  text-black tracking-wide">
                            Track stock quantity for this item
                          </label>
                        </div>

                      </div>
                    </div>

                    {stockMGT &&
                      <div className="mt-5">
                        <label
                          className="block text-base text-gray-500 dark:text-gray-200"
                          htmlFor="position"
                        >
                          Quantity
                        </label>
                        <input
                          className={`w-full sm:w-1/2 mt-1 px-3 py-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-300 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                          id="qty"
                          name="qty"
                          type="number"
                          autoComplete="off"
                          required
                          value={qty}
                          onChange={onQTYChanged}
                        />
                      </div>}

                    {!stockMGT &&
                      <div className="mt-5">
                        <label
                          htmlFor="country"
                          className="block text-base text-gray-500 dark:text-gray-200"
                        >
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={status}
                          onChange={onStatusChanged}
                          className="mt-1 block w-full sm:w-1/2 py-3 px-3 text-base font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-300 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                        >
                         
                          <option value="In Stock">
                            In Stock
                          </option>
                          <option defaultValue value="Out of Stock">
                            Out of Stock
                          </option>
                        </select>
                      </div>}

                  </div>
                </div>

                {isLoading &&
                  <div className="mt-6 flex text-gray-400 justify-end">
                    <Spenner />
                    <p>Saving.... </p>
                  </div>
                }
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-3 text-base justify-end bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700">


                <button
                  title="Cancel"
                  onClick={() => !btnCancel && navigate("/inventory")}
                  className={
                    `${!btnCancel
                      ? `cursor-pointer text-black  dark:text-gray-300 border-gray-400 dark:border-slate-600 dark:bg-gray-700 hover:bg-gray-200 `
                      : ` text-black  dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 `
                    }flex justify-center px-6 py-2 rounded-full border dark:hover:bg-gray-800 dark:active:bg-slate-800`} >
                  <BsArrowLeftShort size={20} className='mr-2' />
                  Cancel
                </button>

                <button
                  title="Save"
                  onClick={() => setBtnCancel(!btnCancel)}
                  disabled={!canSave}
                  type="submit"
                  className={
                    `${canSave
                      ? `cursor-pointer flex  dark:text-gray-300 border-gray-400 dark:border-slate-600 bg-black  dark:bg-gray-700 hover:bg-gray-700`
                      : `  dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400`
                    } flex justify-center items-center px-3 sm:px-7 py-2 text-white border  dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`}
                >
                  <AiOutlineSave size={20} className="mr-2" />
                  Save
                </button>
              </div>

            </div>
          </form>
          {/* <AddTableRow /> */}
        </div>
      </div>
    </>
  );
};

export default NewUserForm;
