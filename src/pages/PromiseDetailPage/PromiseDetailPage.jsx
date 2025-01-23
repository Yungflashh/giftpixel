import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar"; // Import Sidebar
import axios from "axios";
import Cookies from "js-cookie";
import { CgToggleOn, CgToggleOff } from "react-icons/cg";

import "../../styles/ListOfRequest.css"; 
import { PiShareThin } from "react-icons/pi";
import { Rings } from "react-loader-spinner"; 
import { FaDollarSign, FaGift } from 'react-icons/fa';
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


const Modal = ({ shareLink, onClose }) => {
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        toast.info("Link copied to clipboard!");
    };

    const togglePrivacy = () => {
        setIsPrivate((prev) => !prev);
    };

    // Function to handle sharing to social media
    const handleShareToSocialMedia = (platform) => {
        const encodedLink = encodeURIComponent(shareLink); // Encode the link to make it URL-safe
        
        let shareUrl = '';
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}`;
                break;
            case 'instagram':
                // Instagram doesn’t allow direct URL sharing, so you may need to guide users to share via the Instagram app.
                // You can suggest copying the link and pasting it into the Instagram app.
                shareUrl = `https://www.instagram.com/?url=${encodedLink}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedLink}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Share Promise List</h3>
                    <button onClick={onClose} className="close-button">X</button>
                </div>
                <p className="modal-description">
                    You can choose to make your username public or private.
                </p>
                <div className="share-link-wrapper">
                    <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="share-link-input"
                    />
                    <button onClick={handleCopyLink} className="copy-link-button">
                        📋
                    </button>
                </div>
                <div className="username-edit">
                    Don&apos;t like your username?
                    <a href="/profileSettings"> Edit username</a>
                </div>
                {/* Divider line */}
                <img
                    src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737374274/Frame_240_gatvwg.png"
                    alt="Divider line"
                    className="divider-line"
                />
                <div className="toggle-wrapper">
                    <label htmlFor="username-toggle">Make username private</label>
                    <div
                        onClick={togglePrivacy}
                        className="toggle-icon"
                        style={{ cursor: "pointer" }}
                    >
                        {isPrivate ? (
                            <CgToggleOn size={26} color="#4caf50" />
                        ) : (
                            <CgToggleOff size={26} color="#ccc" />
                        )}
                    </div>
                </div>
                <div className="social-buttons">
                    <button className="social-button" onClick={() => handleShareToSocialMedia('twitter')}>
                        <img
                            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737374551/TwitterLogo_uenkeg.png"
                            alt="Twitter"
                        />
                    </button>
                    <button className="social-button" onClick={() => handleShareToSocialMedia('instagram')}>
                        <img
                            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737374551/InstagramLogo_qx5m2k.png"
                            alt="Instagram"
                        />
                    </button>
                    <button className="social-button" onClick={() => handleShareToSocialMedia('facebook')}>
                        <img
                            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737374551/Vector_9_gdbyoa.png"
                            alt="Facebook"
                        />
                    </button>
                    <button className="social-button" onClick={() => handleShareToSocialMedia('whatsapp')}>
                        <img
                            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737374551/Logo-WhatsApp_1_inol5g.png"
                            alt="WhatsApp"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreatorView = ({ promiseTitleId }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    navigate("/signIn")
                    setError('User is not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await axios.post(
                    'https://giftpixel.onrender.com/api/auth/get-promise-requests',
                    { promiseTitleId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (Array.isArray(response.data)) {
                    setRequests(response.data);
                } else {
                    setError('Invalid data format');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching request for this promise');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [promiseTitleId]);

    if (loading) {
        return (
            <div className="loading">
                <Rings size={300} color={"#FF5050"} loading={loading} />
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="requests-container">
            {requests.length > 0 ? (
                <ul className="requests-list">
                    {requests.map((request, index) => (
                        <li key={index}>
                            <strong>
                                {request.requestType === 'money' ? (
                                    <>
                                        <FaDollarSign color="green"/> {request.requestType}:
                                    </>
                                ) : request.requestType === 'gift-item' ? (
                                    <>
                                        <FaGift color="#ff5050"/> {request.requestType}:
                                    </>
                                ) : (
                                    <>{request.requestType}:</>
                                )}
                            </strong>  <span className="reqValue">{request.requestValue}</span> 
                            <div className="payment-statu">
                                {request.paid ? (
                                    <span className="paid-status">Paid</span>
                                ) : (
                                    <span className="not-paid-status">Not Paid</span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-requests-message">No requests available for this promise title.</p>
            )}
        </div>
    );
};

const PromiseDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { promise } = location.state || {};
    const promiseId = promise?._id;

    if (!promise) {
        navigate("/"); 
        return null;
    }

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [sharing, setSharing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAddToList = () => {
        setIsSidebarOpen(true);
    };

    const handleSidebarSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = Cookies.get('token');
        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        const requestData = {
            promiseId: promise._id,
            type: promise.type,
            input: input,
        };

        try {
            await axios.post(
                "https://giftpixel.onrender.com/api/auth/user/submit-request",
                requestData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLoading(false);
            setIsSidebarOpen(false);
        } catch (error) {
            setLoading(false);
            console.error("Error submitting request:", error);
        }
    };

    const handleShare = async () => {
        setSharing(true);
        setShareLink('');
        const token = Cookies.get('token');
        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const response = await axios.post(
                `https://giftpixel.onrender.com/api/auth/sharePromise/${promiseId}`,
                
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.shareLink) {
                setShareLink(response.data.shareLink);
                setShowModal(true);
            } else {
                console.error('Error generating share link');
            }
        } catch (err) {
            console.error('Error generating share link', err);
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="promise-detail-page">
            <div className="main-promise-header">
                <div className="promise-header">
                    <h2>{promise.title}</h2>
                    <p>{promise.description}</p>
                </div>
                <button onClick={handleShare} disabled={sharing} className="share-button">
                    {sharing ? 'Generating Link...' : <>Share Promise <PiShareThin size={20} /></>}
                </button>
            </div>

            <CreatorView promiseTitleId={promiseId} />

            {showModal && <Modal shareLink={shareLink} onClose={() => setShowModal(false)} />}

            <button className="add2list-btn" onClick={handleAddToList}>Add to List</button>

            {isSidebarOpen && (
                <Sidebar onClose={() => setIsSidebarOpen(false)} promiseId={promiseId}>
                </Sidebar>
            )}
        </div>
    );
};

export default PromiseDetailPage;
