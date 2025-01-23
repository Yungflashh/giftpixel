import "../styles/SidePromise.css";
import Input from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react"; 
import Cookies from "js-cookie"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import gsap from "gsap";  

const SidePromise = ({ closeSidebar }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPromise, setSelectedPromise] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();
  const modalRef = useRef(null); 

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "bounce.out" }
      );
    }
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleRadioChange = (e) => setSelectedPromise(e.target.value);

  const handlePromise = async () => {
    if (!title || !description || !selectedPromise) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = Cookies.get("token"); 

    if (!token) {
      navigate("/signin");
      return;
    }

    const requestData = {
      promiseTitle: title,
      promiseDescription: description,
      promiseType: selectedPromise,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage(""); 
      setSuccessMessage(""); 

      const response = await axios.put(
        "https://giftpixel.onrender.com/api/auth/update-promise",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Promise updated successfully!");
        setTitle("");
        setDescription("");
        setSelectedPromise("");
        setTimeout(() => {
          navigate("/promiseList", { replace: true });
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating promise:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="overlay" onClick={closeSidebar}></div>
      <div className="sidePromise-container" ref={modalRef}>
        <button className="close-btn" onClick={closeSidebar}>
          ✖
        </button>

        <div className="Promise-select">
          <Input
            styleClass={"input-field"}
            type={"text"}
            label={"Promise Title"}
            value={title}
            onChange={handleTitleChange}
          />

          <label className="sideLabel">Description</label>
          <textarea value={description} onChange={handleDescriptionChange} />

          <p>What best describes your promise list?</p>
        </div>

        <div className="promise-btn">
          
            <div>
              <input
                type="radio"
                id="Birthday"
                name="promise"
                value="Birthday"
                onChange={handleRadioChange}
              />
              <label htmlFor="Birthday" className="btn-promise">
                Birthday
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Anniversary"
                name="promise"
                value="Anniversary"
                onChange={handleRadioChange}
              />
              <label htmlFor="Anniversary" className="btn-promise">
                Anniversary
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Valentine"
                name="promise"
                value="Valentine"
                onChange={handleRadioChange}
              />
              <label htmlFor="Valentine" className="btn-promise">
                Valentine
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="New Year Celebration"
                name="promise"
                value="New Year Celebration"
                onChange={handleRadioChange}
              />
              <label htmlFor="New Year Celebration" className="btn-promise">
                New Year Celebration
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Christmas"
                name="promise"
                value="Christmas"
                onChange={handleRadioChange}
              />
              <label htmlFor="Christmas" className="btn-promise">
                Christmas
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Date"
                name="promise"
                value="Date"
                onChange={handleRadioChange}
              />
              <label htmlFor="Date" className="btn-promise">
                Date
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="GoFundme"
                name="promise"
                value="GoFundme"
                onChange={handleRadioChange}
              />
              <label htmlFor="GoFundme" className="btn-promise">
                GoFundme
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="House Building"
                name="promise"
                value="House Building"
                onChange={handleRadioChange}
              />
              <label htmlFor="House Building" className="btn-promise">
                House Building
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="School Fees"
                name="promise"
                value="School Fees"
                onChange={handleRadioChange}
              />
              <label htmlFor="School Fees" className="btn-promise">
                School Fees
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Japa Funds"
                name="promise"
                value="Japa Funds"
                onChange={handleRadioChange}
              />
              <label htmlFor="Japa Funds" className="btn-promise">
                Japa Funds
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Tourism"
                name="promise"
                value="Tourism"
                onChange={handleRadioChange}
              />
              <label htmlFor="Tourism" className="btn-promise">
                Tourism
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Travelling"
                name="promise"
                value="Travelling"
                onChange={handleRadioChange}
              />
              <label htmlFor="Travelling" className="btn-promise">
                Travelling
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Others"
                name="promise"
                value="Others"
                onChange={handleRadioChange}
              />
              <label htmlFor="Others" className="btn-promise">
                Others
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Wedding"
                name="promise"
                value="Wedding"
                onChange={handleRadioChange}
              />
              <label htmlFor="Wedding" className="btn-promise">
                Wedding
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Charity"
                name="promise"
                value="Charity"
                onChange={handleRadioChange}
              />
              <label htmlFor="Charity" className="btn-promise">
                Charity
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Business Startup"
                name="promise"
                value="Business Startup"
                onChange={handleRadioChange}
              />
              <label htmlFor="Business Startup" className="btn-promise">
                Business Startup
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Health"
                name="promise"
                value="Health"
                onChange={handleRadioChange}
              />
              <label htmlFor="Health" className="btn-promise">
                Health
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Vacation"
                name="promise"
                value="Vacation"
                onChange={handleRadioChange}
              />
              <label htmlFor="Vacation" className="btn-promise">
                Vacation
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Loan Repayment"
                name="promise"
                value="Loan Repayment"
                onChange={handleRadioChange}
              />
              <label htmlFor="Loan Repayment" className="btn-promise">
                Loan Repayment
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Investment"
                name="promise"
                value="Investment"
                onChange={handleRadioChange}
              />
              <label htmlFor="Investment" className="btn-promise">
                Investment
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Retirement Fund"
                name="promise"
                value="Retirement Fund"
                onChange={handleRadioChange}
              />
              <label htmlFor="Retirement Fund" className="btn-promise">
                Retirement Fund
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Family Support"
                name="promise"
                value="Family Support"
                onChange={handleRadioChange}
              />
              <label htmlFor="Family Support" className="btn-promise">
                Family Support
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Home Renovation"
                name="promise"
                value="Home Renovation"
                onChange={handleRadioChange}
              />
              <label htmlFor="Home Renovation" className="btn-promise">
                Home Renovation
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Event Planning"
                name="promise"
                value="Event Planning"
                onChange={handleRadioChange}
              />
              <label htmlFor="Event Planning" className="btn-promise">
                Event Planning
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Fitness Goals"
                name="promise"
                value="Fitness Goals"
                onChange={handleRadioChange}
              />
              <label htmlFor="Fitness Goals" className="btn-promise">
                Fitness Goals
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="Personal Growth"
                name="promise"
                value="Personal Growth"
                onChange={handleRadioChange}
              />
              <label htmlFor="Personal Growth" className="btn-promise">
                Personal Growth
              </label>
            </div>
          
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button
          onClick={handlePromise}
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
};

export default SidePromise;
