import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../../styles/WalletDetails.css";
import "../../styles/ModalWithdrwa.css";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from 'react-router-dom';

const WalletDetails = () => {
    const navigate = useNavigate()
    const [walletData, setWalletData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWithdrawalDetailsModalOpen, setIsWithdrawalDetailsModalOpen] = useState(false);
    const [paymentPin, setPaymentPin] = useState(['', '', '', '']);
    const [pinError, setPinError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [fullName, setFullName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [makePermanent, setMakePermanent] = useState(false);

    const modalContentRef = useRef(null);

    // const validBankNames = [
    //     "Access Bank", "Guaranty Trust Bank", "First Bank", "Zenith Bank", 
    //     "United Bank for Africa", "Stanbic IBTC", "Fidelity Bank", 
    //     "Ecobank", "Wema Bank", "Union Bank", "Standard Chartered Bank"
    // ];

    const fetchWalletDetails = async () => {
        const token = Cookies.get('token');

        if (!token) {
            navigate("/signIn")
            setError('Authorization token is missing.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://giftpixel.onrender.com/api/auth/getWalletDetails', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setWalletData(response.data.wallet);
            } else {
                setError('Failed to fetch wallet details.');
            }
        } catch (err) {
            setError('Error fetching wallet details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWalletDetails();
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            gsap.fromTo(modalContentRef.current, {
                opacity: 0,
                scale: 0.9,
            }, {
                opacity: 1,
                scale: 1,
                duration: 1.3,
                ease: "back.out(1.7)"
            });
        } else {
            gsap.to(modalContentRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "back.in(1.7)"
            });
        }
    }, [isModalOpen]);

    const handleWithdraw = () => {
        if (walletData?.balance < 3000) {
            toast.error('Your wallet balance is below ₦3,000. Withdrawal not allowed.');
            return;
        }

        setIsModalOpen(true);
        toast.error(null); // Clear any previous withdrawal errors
    };

    const handlePinChange = (e, index) => {
        const newPin = [...paymentPin];
        newPin[index] = e.target.value;
        setPaymentPin(newPin);

        if (e.target.value && index < 3) {
            document.getElementById(`pin-input-${index + 1}`).focus();
        }
    };

    const handlePinSubmit = async () => {
        const pin = paymentPin.join('');
        
        if (!/^\d{4}$/.test(pin)) {
            setPinError('Please enter a valid 4-digit payment pin.');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = Cookies.get("token");
            const response = await axios.post("https://giftpixel.onrender.com/api/auth/check-payment-pin", {
                paymentPin: pin,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            setIsModalOpen(false);
            setIsWithdrawalDetailsModalOpen(true);
            setPaymentPin(['', '', '', '']);
            setPinError('');
        } catch (error) {
            setPinError(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateWithdrawalDetails = () => {
        if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
            toast.error('Please enter a valid withdrawal amount.');
            return false;
        }

        if (withdrawalAmount > walletData.balance) {
            toast.error('Withdrawal amount exceeds wallet balance.');
            return false;
        }

        if (!fullName || !accountNumber || !bankName) {
            toast.error('Please fill in all the required fields.');
            return false;
        }

        if (isNaN(accountNumber)) {
            toast.error('Account number must be a valid number.');
            return false;
        }

        // if (!validBankNames.includes(bankName.trim())) {
        //     toast.error('Please enter a valid bank name.');
        //     return false;
        // }

        // toast.error(null);
        return true;
    };

    const handleWithdrawalDetailsSubmit = async () => {
        if (!validateWithdrawalDetails()) {
            return;
        }

        const withdrawalData = {
            amount: withdrawalAmount,
            fullName,
            accountNumber,
            bankName,
            makePermanent,
        };

        try {
            const token = Cookies.get("token");
            const response = await axios.post('https://giftpixel.onrender.com/api/auth/withdraw', withdrawalData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                alert('Withdrawal request submitted successfully.');
            } else {
                alert('Failed to submit withdrawal request.');
            }

            setWithdrawalAmount('');
            setFullName('');
            setAccountNumber('');
            setBankName('');
            setMakePermanent(false);
            setIsWithdrawalDetailsModalOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error submitting withdrawal request.');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="wallet-container">
            <div className="wallet-balance">
                <p>Wallet Balance</p>
                <h1>₦{walletData?.balance?.toLocaleString() || "0.00"}</h1>
                <button onClick={handleWithdraw} className="withdraw-button">
                    Withdraw
                </button>
            </div>

            <div className="transaction-history">
                <h2>Transaction History</h2>
                <div className="transaction-filters">
                    <input type="text" placeholder="Search" className="search-box" />
                    <select className="filter">
                        <option>All Categories</option>
                    </select>
                    <select className="filter">
                        <option>All Status</option>
                    </select>
                </div>

                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Transaction Type</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {walletData.transactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                                <td>{transaction.description || "N/A"}</td>
                                <td>₦{transaction.amount?.toLocaleString() || "0.00"}</td>
                                <td className={`status ${transaction.status ? transaction.status.toLowerCase() : "unknown"}`}>
                                    {transaction.status || "Unknown"}
                                </td>
                                <td>{transaction.transactionType || "Unknown"}</td>
                                
                                <td>{transaction.Transaction_ID || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Payment Pin */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalContentRef}>
                        <h2>Enter Your Payment Pin</h2>
                        <div className="pin-input-container">
                            {paymentPin.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`pin-input-${index}`}
                                    type="password"
                                    value={digit}
                                    onChange={(e) => handlePinChange(e, index)}
                                    maxLength="1"
                                    className="payment-pin-input"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                        {pinError && <p className="error-message">{pinError}</p>}
                        <button 
                            onClick={handlePinSubmit} 
                            className="submit-pin-button" 
                            disabled={isSubmitting}>
                            {isSubmitting ? 'Verifying...' : 'Submit'}
                        </button>
                        <button onClick={() => { 
                            setIsModalOpen(false);
                            setPaymentPin(['', '', '', '']);
                            setPinError('');
                        }} className="close-modal-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Withdrawal Details */}
            {isWithdrawalDetailsModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Enter Withdrawal Details</h2>
                        <div className="withdrawal-form">
                            <input 
                                type="number" 
                                value={withdrawalAmount} 
                                onChange={(e) => setWithdrawalAmount(e.target.value)} 
                                placeholder="Withdrawal Amount" 
                                required 
                            />
                            <input 
                                type="text" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)} 
                                placeholder="Full Name" 
                                required 
                            />
                            <input 
                                type="text" 
                                value={accountNumber} 
                                onChange={(e) => setAccountNumber(e.target.value)} 
                                placeholder="Account Number" 
                                required 
                            />
                            <input 
                                type="text" 
                                value={bankName} 
                                onChange={(e) => setBankName(e.target.value)} 
                                placeholder="Bank Name" 
                                required 
                            />
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={makePermanent} 
                                    onChange={() => setMakePermanent(!makePermanent)} 
                                />
                                Make this my permanent account
                            </label>
                            <button 
                                onClick={handleWithdrawalDetailsSubmit} 
                                className="submit-withdrawal-button">
                                Submit Withdrawal
                            </button>
                            <button onClick={() => setIsWithdrawalDetailsModalOpen(false)} className="close-modal-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletDetails;
