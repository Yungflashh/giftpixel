import React, { useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import "../../styles/AccountSetting.css";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import axios from 'axios';
import { toast } from 'react-toastify';

const AccountSettingPage = () => {
  const navigate = useNavigate(); // Navigate hook
  const [showPinModal, setShowPinModal] = useState(false); // State for showing pin modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for showing logout confirmation modal
  const [pin, setPin] = useState(["", "", "", ""]); // Array to store the 4 digits of pin
  const [error, setError] = useState(""); // State for error message

  // Handle profile settings navigation
  const handleProfileSettings = () => {
    navigate("/profileSettings");
  };

  // Handle the change in input field for the pin
  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only allow digits

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to the next input field automatically
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handlePinSubmit = async () => {
    const pinValue = pin.join('');
    if (pinValue.length === 4) {

      try {
        const token = Cookies.get("token")
       
          const response = await axios.post("https://giftpixel.onrender.com/api/auth/create-payment-pin",

           { paymentPin: pinValue},
             {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
        })
         if(response.data.success){
          toast.info("Transaction Pin created!");
          setShowPinModal(false);
          setPin(["", "", "", ""]);
         }
        else{
          toast.error("An Error Occured")
        }
          
        }



        
       catch (error) {
        
      }
      // Logic for creating the transaction pin (e.g., call API or update state)
     
    } else {
      setError("Please enter a 4-digit pin.");
    }
  };

  // Handle the logout action
  const handleLogout = () => {
    
    Cookies.remove('token'); // Make sure you clear the relevant cookies

    
    navigate("/signIn");
  };

  return (
    <div className='AccountsettingPage'>
      <div className="profile-account-settingbox">
        <div className="profile" onClick={handleProfileSettings}>
          <AiOutlineUser /> Profile settings
        </div>
        <div className="profile">
          <AiOutlineUser /> Account settings
        </div>
      </div>

      <div className='AccountsettingPage-box'>
        <div>Notification</div>

        <div className='services'>
          <div className='center'>
            <p>Security center</p><FaAngleRight />
          </div>
          <div className='center' onClick={() => setShowPinModal(true)}>
            <p>Create Transaction Pin</p><FaAngleRight />
          </div>
          <div className='center'>
            <p>Customer service center</p><FaAngleRight />
          </div>
          <div className='center'>
            <p>Privacy and policy</p><FaAngleRight />
          </div>
          <div className='center'>
            <p>Help and support</p><FaAngleRight />
          </div>
          <div className='center'>
            <p>About us</p><FaAngleRight />
          </div>
          <div className='center'>
            <p>Contact us</p><FaAngleRight />
          </div>
        </div>
        <div className='others'>
          <div><p><FaRegStar />&nbsp;Rate us</p></div>
          <div className='center' onClick={() => setShowLogoutModal(true)}>
            <p><LuLogOut />&nbsp;Log out</p>
          </div>
          <div className='delete'><p><RiDeleteBin6Line />Delete account</p></div>
        </div>
      </div>

      {/* Modal for creating Transaction Pin */}
      {showPinModal && (
        <div className="acct-modal">
          <div className="acct-modal-content">
            <h2>Create Transaction Pin</h2>
            <div className="pin-input-container">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(e, index)}
                  placeholder="•"
                  className="pin-input"
                />
              ))}
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handlePinSubmit}>Create Pin</button>
            <button onClick={() => setShowPinModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="acct-modal">
          <div className="acct-modal-content">
            <h2>Are you sure you want to log out?</h2>
            <div>
            <button className="confirm" onClick={handleLogout}>Yes</button>
<button className="cancel" onClick={() => setShowLogoutModal(false)}>Cancel</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettingPage;
