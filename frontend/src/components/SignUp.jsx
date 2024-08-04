import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
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
          sessionStorage.setItem('userPassword', res.data.savedUser.userPassword);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  return (
    <div className='sign-main-bg'>
      <div className='sign_bg'>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
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
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              value={details.userPassword}
              onChange={handleChange}
            />
            {showPassword ? (
              <AiOutlineEye className='icon eye-icon' onClick={togglePasswordVisibility} />
              
            ) : (
              <AiOutlineEyeInvisible className='icon eye-icon' onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className='input_box'>
            <input
              name='userRePassword'
              type={showRePassword ? 'text' : 'password'}
              placeholder='Re-enter Password'
              required
              value={rePass}
              onChange={handleChange}
            />
            {showRePassword ? (
              <AiOutlineEye className='icon eye-icon' onClick={toggleRePasswordVisibility} />
              
            ) : (
              <AiOutlineEyeInvisible className='icon eye-icon' onClick={toggleRePasswordVisibility} />
            )}
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
            <h4>Terms and Conditions</h4>
            
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
            
            <h4>Privacy Policy</h4>

            <h5>1. Information We Collect</h5>
            <p>When you use our Service, we may collect personal information that you provide to us directly, including but not limited to:</p>
            <ul>
              <li>Account Information: Name, email address, phone number, and any other information you provide when creating an account.</li>
              <li>Event Information: Details about the events you create or participate in, such as event names, descriptions, dates, and locations.</li>
              <li>Payment Information: Payment details, such as credit card information or billing address, when you make purchases or payments through our Service.</li>
            </ul>

            <p>We may also collect information about your use of our Service, including:</p>
            <ul>
              <li>Log Data: IP address, browser type, operating system, referring URLs, and other usage statistics.</li>
              <li>Cookies and Tracking Technologies: We use cookies and similar technologies to enhance your experience and analyze usage patterns.</li>
            </ul>

            <h5>2. How We Use Your Information</h5>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>To Provide and Improve Our Service: Managing your account, processing transactions, and delivering event-related services.</li>
              <li>To Communicate with You: Sending updates, promotional materials, and other information related to your use of our Service.</li>
              <li>To Personalize Your Experience: Customizing content and recommendations based on your preferences and usage.</li>
              <li>To Analyze and Monitor Usage: Understanding how our Service is used to improve functionality and user experience.</li>
            </ul>

            <h5>3. How We Share Your Information</h5>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li>With Service Providers: We may share your information with third-party service providers who perform services on our behalf, such as payment processors, email providers, and data analytics companies.</li>
              <li>For Legal Reasons: We may disclose your information if required to do so by law or in response to legal processes, such as a subpoena or court order.</li>
              <li>In Connection with Business Transfers: If we are involved in a merger, acquisition, or other business transfer, your information may be transferred as part of that transaction.</li>
            </ul>

            <h5>4. Data Security</h5>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security.</p>
            
            <h5>5. Your Rights and Choices</h5>
            <p>You can access and update your personal information by logging into your account or contacting us.
              You may opt-out of receiving promotional communications from us by following the unsubscribe instructions in those communications or by contacting us directly.
              You can manage cookies through your browser settings. Note that disabling cookies may affect your ability to use certain features of our Service.</p>
            
            <h5>6. International Data Transfers</h5>
            <p>If you are accessing our Service from outside [Your Country], your information may be transferred to and processed in India where our servers are located. By using our Service, you consent to the transfer and processing of your information in India.</p>
            
            <h5>7. Changes to This Privacy Policy</h5>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on our website. Your continued use of our Service after any changes constitutes your acceptance of the new policy.</p>
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
