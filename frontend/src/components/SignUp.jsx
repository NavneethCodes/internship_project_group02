import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    userContact: '',
    userEmail: '',
    userName: '',
    userPassword: '',
    userStatus: 'active',
  });

  const [rePass, setRePass] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userRePassword') {
      setRePass(value);
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    if (details.userPassword !== rePass) {
      toast.error("Passwords don't match!");
      setRePass('');
    } else {
      console.log(details);
      axios.post('http://localhost:4000/usernew', details)
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          sessionStorage.setItem('user_id', res.data.savedUser._id);
          sessionStorage.setItem('userName', res.data.savedUser.userName);
          navigate('/login');
        })
        .catch((error) => {
          if (error.response) {
            toast.error(`Error: ${error.response.data}`);
          } else {
            toast.error('Sign up failed, try again later!');
          }
        });
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  const handleAgree = () => {
    setTermsAccepted(true);
    setShowTerms(false);
  };

  const handleDisagree = () => {
    setTermsAccepted(false);
    setShowTerms(false);
  };

  return (
    <div className='sign-main-bg'>
      <div className='sign_bg'>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          {/* ... (rest of the form remains unchanged) ... */}
          <div>
            <h2>Sign Up</h2>
          </div>
          <div className='input_box'>
            <input
              name='userName'
              type='text'
              placeholder='Full name'
              required
              value={details.userName}
              onChange={handleChange}
            />
          </div>
          <div className='input_box'>
            <input
              name='userEmail'
              type='text'
              placeholder='Email'
              required
              value={details.userEmail}
              onChange={handleChange}
            />
          </div>
          <div className='input_box'>
            <input
              name='userContact'
              type='text'
              placeholder='Contact'
              required
              value={details.userContact}
              onChange={handleChange}
            />
          </div>
          <div className='input_box'>
            <input
              name='userPassword'
              type='password'
              placeholder='Password'
              required
              value={details.userPassword}
              onChange={handleChange}
            />
          </div>
          <div className='input_box'>
            <input
              name='userRePassword'
              type='password'
              placeholder='Re-enter Password'
              required
              value={rePass}
              onChange={handleChange}
            />
          </div>
          <div className='terms'>
            <label>
              <input 
                type='checkbox' 
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              /> 
              By signing up you accept the{' '}
              <a href='#' onClick={handleTermsClick}>Terms of Service and Privacy Policy</a>
            </label>
          </div>
          <div className='sign_btn'>
            <button type='submit'>Sign Up</button>
          </div>
          <div className='already_acc'>
            <label>
              Already have an account? <Link to='/login'>Sign In</Link>
            </label>
          </div>
        </form>
      </div>

      {showTerms && (
        <div className="terms-popup">
          <div className="terms-content">
            <div className="terms-header">
              <h3>Terms of Service and Privacy Policy</h3>
              <button className="close-button" onClick={handleCloseTerms}>&times;</button>
            </div>
            <div className="terms-body">
            <h5>1. Introduction</h5>
            <p>Welcome to Gleve. These Terms and Conditions govern your use of our online event management platform. By accessing or using our Service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our Service.</p>
            
            <h5>2. Use of the Service</h5>
            <p>You must be at least 18 years old or have the consent of a parent or guardian to use our Service. By using our Service, you represent that you meet these eligibility requirements.
              To use certain features of our Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            
            <h5>3. Event Creation and Management</h5>
            <p>You are responsible for the accuracy and legality of the information you provide when creating an event. We reserve the right to remove or modify event listings that violate our policies or applicable laws.
                We may charge fees for certain features or services within our platform. Fees will be clearly stated before you make any payment. All payments are non-refundable unless otherwise specified.</p>
            
            <h5>4. User Conduct</h5>
            <p>You agree not to engage in any activity that is illegal, fraudulent, or harmful to our Service or other users. Prohibited activities include, but are not limited to:</p>
            <ul>
              <li>Posting or distributing false or misleading information.</li>
              <li>Engaging in harassment or abuse of other users.</li>
              <li>Attempting to interfere with the operation of our Service.</li>
            </ul> 

            <h5>5. Intellectual Property</h5>
            <p>All content, trademarks, and other intellectual property related to our Service are owned by us or our licensors. You may not use, copy, or distribute any of our intellectual property without our prior written consent.
               By submitting content to our Service, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with our Service.</p>
              
            <h5>6. Privacy</h5>
            <p>We collect and use personal data in accordance with our Privacy Policy. By using our Service, you consent to the collection and use of your data as described in our Privacy Policy.</p>
            
            <h5>7. Limitation of Liability</h5>
            <p>Our Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of the Service.
            In no event shall we be liable for any indirect, incidental, consequential, or punitive damages arising out of or related to your use of our Service. Our total liability for any claim arising from or related to our Service shall not exceed the amount you paid to us for the Service.</p>
            
            <h5>8. Termination</h5>
            <p>We reserve the right to suspend or terminate your access to our Service at any time, with or without cause, and with or without notice.
            You may terminate your account at any time by contacting us. Upon termination, your access to our Service will be revoked, and you will no longer be able to use certain features.</p>
            
            <h5>9. Changes to These Terms</h5>
            <p>We may update these Terms and Conditions from time to time. We will notify you of any significant changes by posting the new Terms and Conditions on our website. Your continued use of our Service after any changes constitutes your acceptance of the new terms.</p>
            
            <h5>10. Contact Us</h5>
            <p>If you have any questions about these Terms and Conditions, please contact us at +1 (123) 456-7890</p>
            
            </div>
            <div className="terms-footer">
              <button onClick={handleAgree}>I Agree</button>
              <button onClick={handleDisagree}>I Disagree</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;



