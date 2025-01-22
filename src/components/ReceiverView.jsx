import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ReceiverView.css';

const ReceiverView = () => {
  const { promiseTitleId } = useParams();
  const [ReceiverView, setReceiverView] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [shareToken, setShareToken] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, requestId: null, amount: null });
  const [extraAmount, setExtraAmount] = useState(0);
  const [increaseAmount, setIncreaseAmount] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [extraAmountValid, setExtraAmountValid] = useState(true);
  const [trackingIdModalState, setTrackingIdModalState] = useState({
    isOpen: false,
    requestId: null,
    trackingId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceiverView = async () => {
      try {
        const response = await axios.get(`https://auth-zxvu.onrender.com/api/auth/get-promise-details/${promiseTitleId}`);
        const username = response.data.username;
        Cookies.set("username", username);

        if (response.data.success) {
          setReceiverView(response.data.promise);
          if (response.data.promise.shareToken) {
            setShareToken(response.data.promise.shareToken);
          }
        } else {
          setError('Promise not found');
        }
      } catch (err) {
        setError('Error fetching promise details');
      } finally {
        setLoading(false);
      }
    };

    fetchReceiverView();
  }, [promiseTitleId]);

  useEffect(() => {
    // Check if "Buy Now" was clicked previously and tracking ID has not been submitted yet
    const hasClickedBuyNow = Cookies.get("hasClickedBuyNow");
    const trackingIdSubmitted = Cookies.get("trackingIdSubmitted");

    if (hasClickedBuyNow && !trackingIdSubmitted) {
      // Show the tracking ID modal
      setTrackingIdModalState({
        isOpen: true,
        requestId: hasClickedBuyNow,
        trackingId: ''
      });
    }
  }, []);

  const handleBuyNowRedirect = (requestId, value) => {
    // Set a flag indicating that Buy Now was clicked
    Cookies.set("hasClickedBuyNow", requestId, { expires: 7 });

    // Open the gift item or purchase URL in a new tab
    window.open(value, '_blank');

    // Reload the page to show the tracking ID modal when they return
    window.location.reload();
  };

  const handlePayRequest = async (requestId, amount) => {
    if (!amount || !email || !emailValid) {
      toast.error('Please provide all required fields correctly.');
      return;
    }

    try {
      const username = Cookies.get('username');
      Cookies.set('requestId', requestId, { expires: 7 });
      const response = await axios.post('https://auth-zxvu.onrender.com/api/auth/paystack/payment', 
      { orderId: requestId, amount, email , username});

      if (response.data.success) {
        const authorizationUrl = response.data.authorization_url;
        if (authorizationUrl) {
          navigate('/payment-success', { state: { requestId } });
          window.location.href = authorizationUrl;
        } else {
          setError('Failed to get Paystack authorization URL');
        }
      } else {
        setError('Failed to initialize payment');
      }
    } catch (err) {
      setError('Error processing payment');
    }
  };

  const handleSubmitEmail = (requestId, amount) => {
    if (!email) {
      toast.error('Please enter a valid email');
      setEmailValid(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      setEmailValid(false);
      return;
    }

    setIncreaseAmount(true);
    setModalState({ ...modalState, requestId, amount });
  };

  const handleIncreaseAmount = () => {
    if (isNaN(extraAmount) || extraAmount <= 0) {
      toast.error('Please enter a valid extra amount');
      setExtraAmountValid(false);
      return;
    }

    const updatedAmount = modalState.amount + parseFloat(extraAmount);
    setModalState({ ...modalState, amount: updatedAmount });
    handlePayRequest(modalState.requestId, updatedAmount);
  };

  const retryFetchData = () => {
    setLoading(true);
    setError(null);
    setReceiverView(null);
  };

  // Handle tracking ID modal submit
  const handleTrackingIdSubmit = () => {
    const { trackingId } = trackingIdModalState;
  
    // Check if the tracking ID field is empty
    if (!trackingId) {
      toast.error('Tracking ID cannot be empty.');
      return;
    }
  
    // Check if the tracking ID starts with 'JE-MAE'
    if (!trackingId.startsWith('JE-MAE')) {
      toast.error('Invalid TrackingId".');
      return;
    }
  
    console.log('Tracking ID Submitted:', trackingId);
  
    // Set flag indicating tracking ID has been submitted
    Cookies.set("trackingIdSubmitted", "true", { expires: 7 });
  
    // Close the tracking ID modal
    setTrackingIdModalState({ isOpen: false, requestId: null, trackingId: '' });
  };
  // Handle cancel action in tracking ID modal
  const handleTrackingIdCancel = () => {
    // Remove the "hasClickedBuyNow" flag to prevent modal from showing again without re-clicking Buy Now
    Cookies.remove("hasClickedBuyNow");

    // Close the modal
    setTrackingIdModalState({ isOpen: false, requestId: null, trackingId: '' });
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="skeleton-loader"></div> {/* A simple skeleton loader */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message-box">
        <p>{error}</p>
        <button onClick={retryFetchData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="promise-detail-wrapper">
      <h2 className="promise-title">{ReceiverView.title}</h2>
      <h3 className="request-header">Requests:</h3>
      {ReceiverView.requests.length > 0 ? (
        <ul className="request-list">
          {ReceiverView.requests.map((request, index) => (
            <li key={index} className="request-item">
              <div className="request-info">
                <strong className="request-type">{request.requestType}:</strong>
                <span className="request-value">{request.requestValue}</span>
              </div>
              <div className="payment-status-container">
                {request.paid ? (
                  <span className="payment-status-paid">Paid</span>
                ) : (
                  <span className="payment-status-unpaid">Not Paid</span>
                )}
              </div>

              {!request.paid && request.requestType === 'gift-item' && (
                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNowRedirect(request._id, request.requestValue)}
                >
                  Buy Now
                </button>
              )}

              {!request.paid && request.requestType !== 'gift-item' && (
                <button
                  className="pay-now-btn"
                  onClick={() => setModalState({ isOpen: true, requestId: request._id, amount: request.requestValue })}
                >
                  Pay Now
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-requests-message">No requests available for this promise.</p>
      )}

      {modalState.isOpen && !increaseAmount && (
        <div className="modal-overlay">
          <div className="receiver-modal-content">
            <h3>Enter Your Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {!emailValid && <p className="error-message">Please enter a valid email address</p>}
            <button onClick={() => handleSubmitEmail(modalState.requestId, modalState.amount)}>Submit</button>
            <button onClick={() => setModalState({ isOpen: false, requestId: null, amount: null })}>Cancel</button>
          </div>
        </div>
      )}

      {increaseAmount && (
        <div className="modal-overlay">
          <div className="receiver-modal-content">
            <h3>Your Total Amount</h3>
            <p>Total: {modalState.amount}</p>
            <h3>Do you want to increase the payment?</h3>
            <button onClick={() => setIncreaseAmount(false)}>No, Proceed</button>
            <button onClick={() => setIncreaseAmount(true)}>Yes, Add Extra Amount</button>
          </div>
        </div>
      )}

      {increaseAmount && (
        <div className="modal-overlay">
          <div className="receiver-modal-content">
            <h3>Feel Free to Top Up this User</h3>
            <input
              type="number"
              value={extraAmount}
              onChange={(e) => setExtraAmount(e.target.value)}
              placeholder="Enter extra amount"
              required
            />
            {!extraAmountValid && <p className="error-message">Please enter a valid amount</p>}
            <button onClick={handleIncreaseAmount}>Add and Pay</button>
            <button onClick={() => setIncreaseAmount(false)}>Cancel</button>
          </div>
        </div>
      )}

      {trackingIdModalState.isOpen && (
        <div className="modal-overlay">
          <div className="receiver-modal-content">
            <h3>Enter the Tracking ID</h3>
            <input
              type="text"
              value={trackingIdModalState.trackingId}
              onChange={(e) => setTrackingIdModalState({ ...trackingIdModalState, trackingId: e.target.value })}
              placeholder="Enter tracking ID"
              required
            />
            <button onClick={handleTrackingIdSubmit}>Submit Tracking ID</button>
            <button onClick={handleTrackingIdCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverView;
