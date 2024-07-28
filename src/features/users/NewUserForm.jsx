import { useEffect, useState } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSave } from "react-icons/ai";
import Image from "../../components/Image";
import Spenner from "../../components/Spenner";
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { RiAddFill } from 'react-icons/ri';
import Thead from "../../components/Thead";
import { toast } from 'react-toastify';


const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {


  const [btnCancel, setBtnCancel] = useState(false)

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [position, setPosition] = useState("")
  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState("")
  const [imageView, setImage] = useState("")
  const [image, setDataImage] = useState()
  const [passwordShown, setPasswordShown] = useState(false)
  const [addDocs, setAddDocs] = useState(false)

  const [rows, setRows] = useState([]);
  // const [userDocs, setUserDocs] = useState([]);
  const columnsArray = ["Document Name", "Document No", "Issue Date", "Expiry Date", "Attachment"]; // pass columns here dynamically

  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows]; // to avoid  direct state mutation
    tempRows.splice(idx, 1);
    setRows(tempRows);
  };

  const handleRemoveAllRow = () => {
    const item = [{
      Document_Name: '',
      Document_No: '',
      Issue_Date: '',
      Expiry_Date: '',
      Attachment: { fileName: '', data: '' }
    }];

    if (!addDocs) {
      setAddDocs(!addDocs)
      setRows(item);
    } else {
      setAddDocs(!addDocs)
      setRows([]);
    }
  };


  const updateState = (e) => {
    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object

    if (prope === 'Attachment') {
      const file = e.target.files[0]
      if (file) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          tempObj[prope].data = reader.result;
        }

        tempObj[prope].fileName = fieldValue

      } else {
        tempObj[prope].data = ''
        tempObj[prope].fileName = ''
      }

    } else {

      tempObj[prope] = fieldValue; // modify temporary object
    }


    // return object to rows` clone
    tempRows[index] = tempObj;
    setRows(tempRows); // update state

  };


  const handleAddRow = () => {
    const item = {
      Document_Name: '',
      Document_No: '',
      Issue_Date: '',
      Expiry_Date: '',
      Attachment: { fileName: '', data: '' }
    };
    setRows([...rows, item]);
  };


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setName("")
      setEmail("")
      setDepartment("")
      setPosition("")
      setUsername("")
      setPassword("")
      setRoles("")
      setImage("")
      setDataImage()
      setAddDocs(false)
      setRows([])
      navigate("/dash/users")
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onDepartmentChanged = (e) => setDepartment(e.target.value)
  const onPositionChanged = (e) => setPosition(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onRolesChanged = (e) => setRoles(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

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


  // Check All Docs if empty
  const isDocsEmpty = rows.every(obj => {
    for (let prop in obj) {
      if (prop === 'Attachment') {
        if (obj.Attachment.fileName === '' && obj.Attachment.data === '') {
          return false;
        }

      } else if (prop !== 'Attachment') {
        if (!obj[prop]) {
          return false;
        }
      }
    }
    return true;
  });

  const canSave =
    [roles, name, validUsername, validPassword, image].every(Boolean) && !isLoading && rows.length >= 0 && isDocsEmpty;

  const onSaveUserClicked = async (e) => {
    e.preventDefault()


    if (canSave) {
      const userDocs = []
      if (addDocs) {
        rows.forEach((data, index) => {
          const item = {
            Document_Name: data.Document_Name,
            Document_No: data.Document_No,
            Issue_Date: data.Issue_Date,
            Expiry_Date: data.Expiry_Date,
            Attachment: data.Attachment.data
          }
          userDocs.push(item)
        })
      }
      const result = await addNewUser({ name, email, department, position, username, password, roles, image, userDocs })
      if (result?.error) {
        toast.error(result.error.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        })

      } else {
        toast.success(result.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        })
      }
    }
  };


  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError
    ? "text-gray-900 sm:text-2xl dark:text-gray-200"
    : "offscreen";
  const validUserClass = !validUsername
    ? "text-red-600 dark:text-red-600"
    : "text-blue-700 dark:text-blue-400";
  const validPwdClass = !validPassword
    ? "text-red-600 dark:text-red-600"
    : "text-blue-700 dark:text-blue-400";

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
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
          New Employee
        </h1>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2">
          <form onSubmit={onSaveUserClicked} >
            <div className="shadow overflow-hidden rounded-md">
              <div className="space-y-6 bg-white dark:bg-slate-800 px-4 py-5 sm:p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1 ">
                    <div className="">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="off"
                        required
                        value={name}
                        onChange={onNameChanged}
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={onEmailChanged}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="department"
                      >
                        Department
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="department"
                        name="department"
                        type="text"
                        autoComplete="off"
                        required
                        value={department}
                        onChange={onDepartmentChanged}
                      />
                    </div>


                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        {imageView
                          ? <Image data={imageView} size="h-16 w-16" rounded="rounded-md" />
                          : <span className="inline-block h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                        }

                        <label
                          htmlFor="file-upload"
                          className="ml-5 cursor-pointer text-[10px]  px-2 py-1 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
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
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="position"
                      >
                        Position
                      </label>
                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                        id="position"
                        name="position"
                        type="text"
                        autoComplete="off"
                        required
                        value={position}
                        onChange={onPositionChanged}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Roles
                      </label>
                      <select
                        id="roles"
                        name="roles"
                        value={roles}
                        onChange={onRolesChanged}
                        className="mt-1 block w-full py-2 px-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        <option defaultValue value={""}>
                          ---
                        </option>
                        {options}
                      </select>
                    </div>

                    <div className="mt-3">
                      <label
                        htmlFor="username"
                        className={`block text-sm font-medium text-gray-700 dark:text-gray-200`}
                      >
                        Username{" "}
                        <span className="nowrap text-[11px] text-red-600 dark:text-red-400">
                          {!validUsername ? "3-20 letters" : ""}
                        </span>
                      </label>

                      <input
                        className={`w-full mt-1 px-3 py-2 text-sm font-normal  border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="false"
                        value={username}
                        onChange={onUsernameChanged}
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        className="mt-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        htmlFor="password"
                      >
                        Password{" "}
                        <span className="nowrap text-[11px] text-red-600 dark:text-red-400">
                          {!validPassword
                            ? "4-12 characters including !@#$%"
                            : ""}
                        </span>
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                          <input
                            className="hidden js-password-toggle"
                            id="toggle"
                            type="checkbox"
                            onClick={togglePasswordVisiblity}
                          />
                          <label
                            className=" bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl px-2 py-1 mt-1 text-lg text-gray-600 font-mono cursor-pointer js-password-label"
                            htmlFor="toggle"
                          >
                            {passwordShown ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
                          </label>
                        </div>
                        <input
                          className={`leading-tight w-full mt-1 px-3 py-2 text-sm font-normal border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md ${validPwdClass}`}
                          id="password"
                          name="password"
                          type={passwordShown ? "text" : "password"}
                          value={password}
                          autoComplete="off"
                          required
                          onChange={onPasswordChanged}
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">

                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={addDocs}
                            onChange={handleRemoveAllRow}
                            className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <label
                            htmlFor="user-active"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            Add Documents Info
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* document files */}
                {addDocs &&
                  <div className="">
                    <div className="mt-6 overflow-x-auto rounded-md border min-w-full dark:border-gray-700 border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                        <thead className="bg-gray-100 dark:bg-gray-800 ">
                          <tr>
                            <Thead thName="" />
                            {columnsArray.map((column, index) => (
                              <Thead thName={column} key={index} />
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y dark:bg-slate-800 divide-gray-200 dark:divide-gray-700 ">
                          {rows.map((item, idx) => (
                            <tr key={idx}>


                              <td className={`whitespace-nowrap px-2 py-2 font-medium text-gray-500 `}>
                                <span
                                  title="Delete"
                                  onClick={() => handleRemoveSpecificRow(idx)}
                                  className="cursor-pointer flex px-1 py-1 justify-center   hover:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-slate-800 rounded-full duration-150" >
                                  <MdDelete size={25} className='' /></span>
                              </td>

                              {Object.keys(item).map((key, index) => (

                                <td className={`flex-nowrap whitespace-nowrap px-2 py-2 font-medium text-gray-900 dark:text-gray-300 `} key={index}>
                                  {index === 0 &&
                                    <input
                                      className={` mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                      type="text"
                                      column={key}
                                      value={item[key]}
                                      index={idx}
                                      onChange={(e) => updateState(e)}
                                      required
                                    />

                                  }
                                  {index === 1 &&
                                    <input
                                      className={` mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                      type="text"
                                      column={key}
                                      value={item[key]}
                                      index={idx}
                                      onChange={(e) => updateState(e)}
                                      required
                                    />

                                  }

                                  {index === 2 &&
                                    <input
                                      className={` mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                      type="date"
                                      column={key}
                                      value={item[key]}
                                      index={idx}
                                      onChange={(e) => updateState(e)}
                                      required
                                    />
                                  }
                                  {
                                    index === 3 &&
                                    <input
                                      className={` mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                      type="date"
                                      column={key}
                                      value={item[key]}
                                      index={idx}
                                      onChange={(e) => updateState(e)}
                                      required
                                    />
                                  }
                                  {index === 4 &&
                                    Object.keys(item[key]).map((keys, indexs) => (
                                      indexs === 0 &&
                                      <input
                                        key={indexs}
                                        className={` mt-1 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                        type="file"
                                        accept="image/png, image/jpeg, application/pdf"

                                        column={key}
                                        value={item[key][keys]}
                                        index={idx}
                                        onChange={(e) => updateState(e)}
                                        required
                                      />


                                    ))
                                  }

                                </td>
                              ))}


                            </tr>

                          ))}

                        </tbody>


                      </table>
                    </div>
                    <div className="font-normal text-xs  w-40 h-12 p-2 mt-2 whitespace-nowrap px-2 py-2 text-gray-500">
                      <span
                        title="Add Row"
                        onClick={handleAddRow}
                        className="cursor-pointer flex px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
                        disabled={!canSave}>

                        <RiAddFill size={16} className='mr-2' />Add Document</span>
                      {/* <span
                        title="Add Row"
                        onClick={postResults}
                        className="cursor-pointer flex px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150" >Show Data</span> */}
                    </div>

                  </div>
                }
                {isLoading &&
                  <div className="mt-6 flex text-gray-400 justify-end">
                    <Spenner />
                    <p>Saving.... </p>
                  </div>
                }
              </div>

              {/* Footer */}
              <div className="flex text-sm justify-between bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700">
                <div>
                  <span
                    title="Cancel"
                    onClick={() => !btnCancel && navigate("/dash/users")}
                    className={
                      !btnCancel
                        ? `cursor-pointer flex px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : `flex px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                    } >
                    <BsArrowLeftShort size={20} className='mr-2' />
                    Cancel
                  </span>
                </div>
                <div className="flex items-center">
                  {/* {spin && <Spenner />} */}

                  <button
                    title="Save"
                    onClick={() => setBtnCancel(!btnCancel)}
                    disabled={!canSave}
                    type="submit"
                    className={
                      canSave
                        ? `cursor-pointer flex px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : `flex px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                    }
                  >
                    <AiOutlineSave size={20} className="mr-2" />
                    Save
                  </button>
                </div>
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
