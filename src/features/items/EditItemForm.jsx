/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useUpdateItemMutation, useDeleteItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { AiOutlineCloseCircle, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineSave, AiOutlineWarning } from "react-icons/ai";
import Image from "../../components/Image";
import Spenner from "../../components/Spenner";
import useAuth from "../../hooks/useAuth";
import { AiOutlineUserDelete } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { RiAddFill } from 'react-icons/ri';
import { RiAttachment2 } from 'react-icons/ri';
import Thead from "../../components/Thead"
import { toast } from 'react-toastify';
import Modal from "../../components/Modal";


const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditItemForm = ({ item }) => {


  const { id } = useAuth(); //current user id

  const [updateItem, { isLoading, isSuccess, isError, error }] =
    useUpdateItemMutation();

  const [
    deleteItem,
    { isSuccess: isDelSuccess, isLoading: isDelLoading, },
  ] = useDeleteItemMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [department, setDepartment] = useState(item.department);
  const [position, setPosition] = useState(item.position);
  const [username, setUsername] = useState(item.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(item.roles)
  const [active, setActive] = useState(item.active)
  const [imageView, setImage] = useState("")
  const [image, setDataImage] = useState();
  const [spinText, setSpinText] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const userDocs = []
  if (user?.documents) {
    user.documents.forEach((data) => {
      const item = {
        document_name: data.document_name,
        document_no: data.document_no,
        issue_date: data.issue_date,
        expiry_date: data.expiry_date,
        attachment: {
          fileName: '',
          data: ''
        },
        cloud_info: {
          id: data.document_cloud_id,
          format: data.document_format,
          url: data.document_url
        }
      }
      userDocs.push(item)
    })
  }

  const [rows, setRows] = useState(userDocs)

  const columnsArray = ["", "Document Name", "Document No", "Issue Date", "Expiry Date", "Attachment"]; // pass columns here dynamically



  const handleRemoveSpecificRow = (idx) => {
    const tempRows = [...rows] // to avoid  direct state mutation
    tempRows.splice(idx, 1)
    setRows(tempRows)
  }
  const handleRemoveSpecificFile = (idx) => {
    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[idx]; // copy state object at index to a temporary object
    tempObj.cloud_info = {
      id: tempObj.cloud_info.id,
      format: '',
      url: ''
    }
    tempRows[idx] = tempObj


    setRows(tempRows)
  }

  const updateState = (e) => {
    let prope = e.target.attributes.column.value; // the custom column attribute
    let index = e.target.attributes.index.value; // index of state array -rows
    let fieldValue = e.target.value; // value

    const tempRows = [...rows]; // avoid direct state mutation
    const tempObj = rows[index]; // copy state object at index to a temporary object



    if (prope === 'attachment') {

      const file = e.target.files[0]
      if (file) {
        if (file.size < 10385760) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            tempObj[prope].data = reader.result
          }

          tempObj[prope].fileName = fieldValue
        } else {
          alert("The file size is too large. Maximum 10MB only. Please select again.")
          tempObj[prope].data = ''
          tempObj[prope].fileName = ''
        }
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
      document_name: '',
      document_no: '',
      issue_date: '',
      expiry_date: '',
      attachment: { fileName: '', data: '' },
      cloud_info: {}
    };
    setRows([...rows, item])
  }


  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setEmail("");
      setDepartment("");
      setPosition("");
      setUsername("");
      setPassword("");
      setRoles("");
      setDataImage();
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);


  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value)
  const onDepartmentChanged = (e) => setDepartment(e.target.value)
  const onPositionChanged = (e) => setPosition(e.target.value)
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);

  const onImageChanged = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDataImage(reader.result);
    };
  };

  const onSaveUserClicked = async (e) => {

    const userDocs = []
    if (rows) {
      rows.forEach((data) => {
        const item = {
          Document_Name: data.document_name,
          Document_No: data.document_no,
          Issue_Date: data.issue_date,
          Expiry_Date: data.expiry_date,
          Attachment: data.attachment.data,
          Cloud_Format: data.cloud_info.format,
          Cloud_ID: data.cloud_info.id,
          Cloud_URL: data.cloud_info.url,
        }
        userDocs.push(item)
      })
    }

    if (password) {
      setSpinText('Saving...')
      const result = await updateUser({
        id: user.id,
        name,
        email,
        department,
        position,
        username,
        password,
        roles,
        active,
        image,
        userDocs
      });
      if (result) {
        toast.success(result.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        });
      }

    } else {
      setSpinText('Saving...')
      const result = await updateUser({ id: user.id, name, email, department, position, username, roles, active, image, userDocs });
      if (result) {
        toast.success(result.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        });
      }
    }
  };

  const onDeleteUserClicked = async () => {

    if (!isLoading) {
      setIsModalOpen(false)
      setSpinText('Deleting...')
      const result = await deleteUser({ id: user.id })
      if (result?.error) {
        toast.error(result.error, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        });

      } else {
        toast.success(result.data, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: localStorage.theme,
        });
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

  // Check All Docs if empty
  const isDocsEmpty = rows.every(obj => {
    for (let prop in obj) {
      if (prop === 'cloud_info') {
        if (obj[prop]?.format === '' && obj.attachment.fileName === '') {
          return false;
        } else if (obj[prop]?.format === undefined && obj.attachment.fileName === '') {
          return false;
        }

      } else if (prop !== 'cloud_info' || prop !== 'attachment') {
        if (!obj[prop]) {
          return false;
        }
      }
    }
    return true;
  });


  let canSave;
  if (password) {
    canSave =
      [roles, validUsername, validPassword].every(Boolean) && !isLoading && isDocsEmpty;
  } else {
    canSave = [roles, validUsername].every(Boolean) && !isLoading && isDocsEmpty;
  }

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

  const btnClass = id !== user._id ? 'flex justify-between' : null;


  const content = (
    <>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} onOk={onDeleteUserClicked}>
        <div className="bg-white dark:bg-gray-700 p-4">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-300"><AiOutlineWarning size={50} className="m-auto text-red-600" /></h2>
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-300">{name}</h2>
          <p className=" text-gray-800 dark:text-gray-400">Do you really want to delete this Employee?</p>
        </div>
      </Modal>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200 ">
          {id === user._id ? 'Account Setting' : 'Edit Employee'}
        </h1>
        <p className={errClass}>{error?.data?.message}</p>

        <div className="mt-5 md:col-span-2 ">
          <form onSubmit={(e) => e.preventDefault()}>
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
                        {imageView ? (
                          <Image
                            data={imageView}
                            size="h-16 w-16"
                            rounded="rounded-md"
                          />
                        ) : (
                          <span className="inline-block h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                            <img
                              alt="Man"
                              src={user.avatar}
                              className="h-16 w-16 rounded-md object-cover border border-slate-300  dark:border-slate-600"
                            />
                          </span>
                        )}

                        <label
                          htmlFor="file-upload"
                          className="ml-5 cursor-pointer text-[10px]  px-2 py-1 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                        >
                          <span className="whitespace-nowrap">Replace Photo</span>

                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/png, image/jpeg"
                            onChange={(event) => {
                              readImage(event, setImage);
                              onImageChanged(event);
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-500 ml-3">
                          JPG, JPEG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
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
                        onChange={(e) => setRoles(e.target.value)}
                        className="mt-1 block w-full py-2 px-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md"
                      >
                        {options}
                      </select>
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
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
                        autoComplete="off"
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
                            ? "[empty = no change] 4-12 characters including !@#$%"
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
                          placeholder="Enter password"
                          onChange={onPasswordChanged}
                        />
                      </div>
                    </div>
                    {id !== user._id
                      && <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="mr-2 text-sm">
                            <label
                              htmlFor="user-active"
                              className="font-medium text-gray-700 dark:text-gray-300"
                            >
                              Active
                            </label>
                          </div>
                          <div className="flex h-5 items-center">
                            <input
                              id="user-active"
                              name="user-active"
                              type="checkbox"
                              checked={active}
                              onChange={onActiveChanged}
                              className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="">
                  <div className="mt-6 overflow-x-auto rounded-md border min-w-full dark:border-gray-700 border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                      <thead className="bg-gray-50 dark:bg-gray-800 ">
                        <tr>
                          {columnsArray.map((column, index) => (
                            <Thead thName={column} key={index} />
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:bg-slate-800 divide-gray-200 dark:divide-gray-700 ">
                        {rows.map((item, idx) => (
                          <tr key={idx}>

                            <td className={`whitespace-nowrap px-1 py-1 font-medium text-gray-500 `}>
                              <span
                                title="Delete"
                                onClick={() => handleRemoveSpecificRow(idx)}
                                className="cursor-pointer flex px-1 py-1 justify-center   hover:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-slate-800 rounded-full duration-150" >
                                <MdDelete size={25} className='' /></span>

                            </td>

                            {Object.keys(item).map((key, index) => (
                              index <= 4 &&
                              <td className={`flex-nowrap whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-gray-300 `} key={index}>
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
                                    (indexs === 0 &&

                                      (!item?.cloud_info.url ?
                                        <input
                                          key={indexs}
                                          className={` mt-1 w-52 px-3 py-2 text-sm font-normal text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                          type="file"
                                          accept="image/png, image/jpeg, application/pdf"

                                          column={key}
                                          value={item[key][keys]}
                                          index={idx}
                                          onChange={(e) => updateState(e)}
                                          required
                                        />
                                        :
                                        <div className=" flex items-center  font-normal text-xs w-auto h-12 p-2 mt-2 whitespace-nowrap px-2 py-2" key={indexs}>
                                          <a
                                            href={`https://res.cloudinary.com/drqzvquzr/image/upload/fl_attachment:${item.document_name}_${user.name}/v1677265086/${item.cloud_info.id}.${item.cloud_info.format}`}
                                            title="Download"
                                            className="underline cursor-pointer flex px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
                                            disabled={!canSave}>

                                            <RiAttachment2 size={16} className='mr-2' />
                                            {`${item.document_name}_${user.name}.${item.cloud_info.format}`}
                                            <span
                                              title="Delete"

                                              className="cursor-pointer flex justify-center hover:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-slate-800 rounded-full duration-150" >
                                            </span>
                                          </a>
                                          <span
                                            title="Replace"
                                            className="cursor-pointer ml-1 "
                                            onClick={() => handleRemoveSpecificFile(idx)}
                                          >

                                            <AiOutlineCloseCircle size={22} className=' flex text-center text-slate-400 hover:text-slate-600 dark:text-slate-600 hover:dark:text-slate-500' />
                                          </span>
                                        </div>
                                      ))
                                  ))
                                }

                              </td>

                            ))}
                          </tr>
                        ))
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="font-normal text-xs  w-40 h-12 p-2 mt-2 whitespace-nowrap px-2 py-2 text-gray-500">
                    <span
                      title="Add Row"
                      onClick={!isLoading && !isDelLoading ? handleAddRow : undefined}
                      className={
                        !isLoading && !isDelLoading
                          ? `cursor-pointer flex px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150`
                          : ` flex px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150`
                      }
                      disabled={!isLoading && !isDelLoading}>

                      <RiAddFill size={16} className='mr-2' />Add Document</span>
                  </div>
                </div>

                {isDelLoading || isLoading
                  ?
                  <div className="mt-6 flex text-gray-400 justify-end">
                    <Spenner />
                    <p>{spinText} </p>
                  </div>
                  : null
                }

              </div>

              {/*footer  */}
              <div className={`flex justify-end text-sm bg-gray-50 dark:bg-slate-800 px-4 py-3 text-right sm:px-6 dark:border-t dark:border-slate-700 ${btnClass}`}>
                {id !== user._id
                  && <span
                    className={
                      !isLoading || isDelLoading
                        ? `cursor-pointer flex  px-3 sm:px-4 py-2 text-red-700 border dark:text-red-500 border-red-300 dark:border-red-800  hover:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-slate-800 rounded-md duration-150`
                        : "flex  px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
                    }
                    title="Delete User"
                    disabled={!isLoading || !isDelLoading}
                    onClick={handleModalOpen}
                  >
                    <AiOutlineUserDelete size={20} className='mr-1 sm:mr-2' />
                    Delete
                  </span>
                }

                <div className="flex items-center ">
                  <div>
                    <span
                      title="Cancel"
                      disabled={!isLoading && !isDelLoading}
                      onClick={() => !isLoading && !isDelLoading ? navigate("/dashboard/users") : undefined}
                      className={
                        !isLoading && !isDelLoading
                          ? `cursor-pointer flex mr-6 px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                          : `flex mx-6 px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                      } >
                      <BsArrowLeftShort size={20} className='mr-1 sm:mr-2' />
                      Cancel
                    </span>
                  </div>

                  <span
                    title="Save"
                    disabled={!canSave}
                    onClick={canSave && !isDelLoading ? onSaveUserClicked : undefined}
                    className={
                      canSave && !isDelLoading
                        ? `cursor-pointer flex px-3 sm:px-4 py-2 text-white border dark:text-gray-300 border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                        : `flex px-3 sm:px-4 py-2 text-white border dark:text-slate-600 border-gray-200 dark:border-slate-700 bg-gray-400 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150`
                    }
                  >
                    <AiOutlineSave size={20} className="mr-1 sm:mr-2" />
                    Save
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );

  return content;
};
export default EditItemForm;
