import { useState, useRef, useEffect } from "react";
import { userContext } from "./context.jsx";
import { useNavigate } from "react-router-dom";

function App() {
  const [passwords, setPasswords] = useState([]);
  const [isUpdatable, setIsUpdatable] = useState(false);
  const [passID, setPassID] = useState("");
  const serviceRef = useRef(null);
  const passwordRef = useRef(null);
  const { userID } = userContext();
  const [formData, setFormData] = useState({
    email: userID,
    service: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlePassChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getPasswords = async (userID) => {
    const response = await fetch("https://passbackend.vercel.app/getPasswords", {
      method: "POST",
      body: JSON.stringify({ email: userID }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.text();
    const parsedData = JSON.parse(data);
    setPasswords(parsedData);
  };

  const createPassword = async (e) => {
    e.preventDefault();
    const response = await fetch("https://passbackend.vercel.app/createPassword", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-type": "application/json",
      },
    });
    await getPasswords(userID);
    passwordRef.current.value = "";
    serviceRef.current.value = "";
    setFormData({
      email: userID,
      service: "",
      password: "",
    });
  };

  const deletePassword = async (e) => {
    e.preventDefault();
    const id = e.target.dataset.deleteid;
    await fetch("https://passbackend.vercel.app/deletePassword", {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-type": "application/json",
      },
    });
    await getPasswords(userID);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    await fetch("https://passbackend.vercel.app/updatePassword", {
      method: "POST",
      body: JSON.stringify({
        _id: passID,
        service: serviceRef.current.value,
        password: passwordRef.current.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    setIsUpdatable(false);
    await getPasswords(userID);
    passwordRef.current.value = "";
    serviceRef.current.value = "";
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      service: "",
      password: "",
    });
    setPasswords([]);
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    serviceRef.current.value = "";
    passwordRef.current.value = "";
    serviceRef.current.focus();
    getPasswords(userID);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gradient-to-br from-lime-200 to-green-600">
        <button type="button" onClick={handleLogOut} className="p-3 bg-red-600 rounded-xl text-white relative top-[-10%] right-[-45%]">
          Log Out
        </button>
        <div className="bg-white shadow-md shadow-neutral-800 flex flex-col items-center justify-center p-8 rounded-xl space-y-4">
          <h1 className="text-green-500 text-4xl font-bold">
            Bye's PassWord Manager
          </h1>
          <p className="text-gray-500">
            This is a password manager that will help you to store your
            passwords securely.
          </p>
          <div className="flex flex-col items-start justify-center space-y-4">
            <label htmlFor="service" className="block">
              Enter a Service
            </label>
            <input
              ref={serviceRef}
              type="text"
              id="service"
              name="service"
              className="border border-gray-300 rounded-md p-2 min-w-2xl"
              onChange={handlePassChange}
            />
            <label htmlFor="password" className="block">
              Enter a Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="passwordService"
              name="password"
              className="border border-gray-300 rounded-md p-2 min-w-2xl"
              onChange={handlePassChange}
            />
            {isUpdatable ? (
              <button
                type="submit"
                className="bg-green-500 text-white rounded-md p-2 w-2xl"
                onClick={updatePassword}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white rounded-md p-2 w-2xl"
                onClick={createPassword}
              >
                Save Password
              </button>
            )}
          </div>
          <label htmlFor="stored-passwords" className="block">
            Saved Passwords
          </label>
          <div
            id="stored-passwords"
            className="min-w-2xl min-h-10 max-h-64 overflow-y-scroll scroll-smooth border-2 rounded-xl border-gray-400"
          >
            {passwords.length === 0 && (
              <p className="text-gray-500 w-full text-center pt-2">
                No passwords saved yet
              </p>
            )}
            {passwords.map((password, index) => (
              <div
                key={index}
                className="w-full border-b border-gray-400 flex items-center justify-between p-2"
              >
                <p>{index + 1}</p>
                <p>{password.service}</p>
                <p>{password.password}</p>
                <button
                  key={index + 2}
                  onClick={(e) => {
                    e.preventDefault();
                    passwordRef.current.value = password.password;
                    serviceRef.current.value = password.service;
                    passwordRef.current.focus();
                    setPassID(password._id);
                    setIsUpdatable(true);
                  }}
                  className="bg-green-500 text-white rounded-md p-2 w-[5rem] mx-3"
                >
                  Edit
                </button>
                <button
                  key={index + 3}
                  data-deleteid={password._id}
                  onClick={deletePassword}
                  type="button"
                  className="bg-red-500 text-white rounded-md p-2 w-[5rem] mx-3"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
