import React, { useState } from "react";
import "../styles/ConfirmTransactionPin.css";
import { FaAngleLeft } from "react-icons/fa";

const ConfirmTransactionPin = () => {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleInputChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Accept only numbers
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move focus to the next input
      if (value && index < pin.length - 1) {
        document.getElementById(`pin-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !pin[index]) {
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    alert(`Your PIN: ${pin.join("")}`);
    setPin(["", "", "", ""]); // Reset PIN inputs
  };

  const isSubmitDisabled = pin.includes("");

  return (
    <div className="popup-overlay">
      <div className="popup">
        <p className="Back" onClick={() => navigate("")}>
          <FaAngleLeft size={20} /> Back
        </p>
        <h2>Confirm Transaction PIN</h2>
        <div className="pin-inputs">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="text"
              maxLength="1"
              className="pin-box"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <div className="popup-buttons">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "disabled-btn" : "active-btn"}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransactionPin;
