

const Contact = () => {
  return (
    <div id="contact-us"
      style={{
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4e5de',
        padding: '30px',
        borderRadius: '15px',
        margin: '50px auto',
        marginTop: '150px',
        width: '80%',
        border: '4px solid #f6f3f3',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        marginBottom: '-80px',
        position: 'relative',
      }}
    >
      {/* Left Section: Form Inputs */}
      <div
        style={{
          flex: 1,
          padding: '10px',
          width: '100%',
        }}
      >
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '16px' }}>
          What’s your name?
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '12px',
          }}
        />
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', fontSize: '16px' }}>
          Message
        </label>
        <textarea
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '12px',
          }}
          rows="4"
        ></textarea>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              backgroundColor: '#f1736a',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Send Message{' '}
            <span style={{ marginLeft: '8px', fontSize: '14px', transform: 'rotate(45deg)' }}>
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Right Section: Contact Header */}
      <div
        style={{
          flex: 1,
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <p style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>Have any query?</p>
        <h1 style={{ color: '#f1736a', fontSize: '30px', margin: 0 }}>CONTACT US</h1>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style*="flex-direction: row"] {
              flex-direction: column !important;
              padding: 20px;
            }
            div[style*="flex: 1"] {
              width: 100%;
              padding: 8px;
            }
            h1 {
              font-size: 24px;
            }
            input, textarea {
              padding: 6px;
              font-size: 13px;
            }
            button {
              padding: 6px 14px;
              font-size: 13px;
            }
          }

          @media (max-width: 480px) {
            h1 {
              font-size: 20px;
            }
            div[style*="flex-direction: column"] {
              padding: 15px;
            }
            input, textarea {
              padding: 4px;
              font-size: 12px;
            }
            button {
              padding: 4px 12px;
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
