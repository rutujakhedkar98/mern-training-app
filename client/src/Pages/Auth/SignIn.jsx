// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { contextProvider } from '../../Context/ContextProvider';
// import { MdOutlineArrowBackIosNew } from 'react-icons/md'
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { AiOutlineWarning } from 'react-icons/ai';
// import Spinner from '../Shared/Spinner/Spinner';
// import GoogleSignIn from './GoogleSignIn';

// const SignIn = () => {
//     const { showToast, setIsLoggedIn } = useContext(contextProvider);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [formErrors, setFormErrors] = useState({});
//     const navigate = useNavigate();
//     const location = useLocation();
//     let from = location.state?.from?.pathname || "/";


//     useEffect(() => {
//         const token = localStorage.getItem('auth_token');
//         if (token) {
//             return navigate(from, { replace: true });
            
//         }
//     }, [navigate, from]);



//     // <!-- onChange input -->
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };


//     // <!-- Validate form function -->
//     const validateForm = (data) => {
//         let errors = {};
//         if (!data.email) {
//             errors.email = 'Email is required!';
//         } else if (!/\S+@\S+\.\S+/.test(data.email)) {
//             errors.email = 'Email is invalid!';
//         }
//         if (!data.password) {
//             errors.password = 'Password is required!';
//         } else if (data.password.length < 6) {
//             errors.password = 'Password must be at least 6 characters!';
//         }

//         return errors;
//     };


//     // <!-- Submit Form Data -->
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const errors = validateForm(formData);
//         if (Object.keys(errors).length === 0) {
//             setLoading(true);
//             setFormErrors({});
//             await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/sign-in`, {
//                 email: formData.email,
//                 password: formData.password,
//             })
//                 .then(res => {
//                     if (res.data.auth_token) {
//                         localStorage.setItem('auth_token', res.data.auth_token);
//                         showToast({
//                             succuss: res?.data?.succuss, error: '',
//                         });
//                         setIsLoggedIn(true);
//                         navigate(res.data.redirect)
//                         // navigate(from, { replace: true });
//                     }
//                 })
//                 .catch(err => {
//                     showToast({
//                         succuss: '', error: err?.response?.data?.error,
//                     });
//                 });
//             setLoading(false);
//         } else {
//             setFormErrors(errors);
//         }
//     };

//     return (<>
        
//         <div
//             style={{ backgroundImage: `url(/images/auth/auth_bg.jpg)` }}
//             className='w-screen max-w-full h-screen overflow-y-auto bg-no-repeat bg-center bg-cover grid lg:grid-cols-2 grid-cols-1 items-center relative'
//         >
//             <div className='absolute top-10 left-5 z-50 lg:block hidden'>
//                 <button
//                     onClick={() => navigate(-1)}
//                     className='flex items-center gap-2 border rounded px-3 py-1 text-white hover:bg-white hover:text-gray-700 duration-300'
//                 >
//                     <MdOutlineArrowBackIosNew />
//                     Back
//                 </button>
//             </div>
//             <div className='w-full h-auto p-16 lg:block hidden'>
//                 <img src="/images/auth/login-img.png" alt="" className='' />
//             </div>
//             <div className='w-full lg:h-screen h-full overflow-y-auto backdrop-blur-sm bg-violet-100/10 grid place-items-center'>
//                 <form
//                     onSubmit={handleSubmit}
//                     style={{ textShadow: '1px 1px 1px rgb(0,0,0,0.3)' }}
//                     className='w-full h-auto lg:p-16 md:px-32 md:py-16 sm:p-10 p-7 text-base text-white flex flex-col gap-6'
//                 >
//                     <div>
//                         <h1 className='text-3xl font-semibold'>
//                             Sign-in to ES Training
//                         </h1>
//                     </div>
//                     <div>
//                         <label htmlFor='email' className="px-1">Email</label>
//                         <input
//                             onChange={handleChange}
//                             placeholder="" required
//                             type="email" name='email' id='email'
//                             className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                         />
//                         {
//                             formErrors?.email &&
//                             <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                 <AiOutlineWarning className="text-base mt-0.5" />
//                                 {formErrors?.email}
//                             </p>
//                         }
//                     </div>
//                     <div>
//                         <div className='flex items-center justify-between'>
//                             <label htmlFor='password' className="px-1">Password</label>
//                             <span className='text-base font-light text-yellow-400 cursor-pointer hover:underline'>
//                                 Forgot password?
//                             </span>
//                             </div>
//                         <input
//                             onChange={handleChange}
//                             placeholder="" required
//                             type="password" name='password' id='password'
//                             className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
//                         />
//                         {
//                             formErrors?.password &&
//                             <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
//                                 <AiOutlineWarning className="text-base mt-0.5" />
//                                 {formErrors?.password}
//                             </p>
//                         }
//                     </div>
                   
//                     <div className='flex justify-start'>
//                         <button
//                             type='submit'
//                             className='px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]'
//                         >
//                             Sign In
//                         </button>
//                     </div>
//                     <p className='text-base font-light'>
//                         New user?
//                         <Link to='/sign-up' className='text-yellow-400 ml-2 cursor-pointer hover:underline' >
//                             Create an account
//                         </Link>
//                     </p>
//                     <GoogleSignIn />
//                 </form>
//             </div>
//         </div>
//         {
//             loading && <Spinner />
//         }
//     </>);
// };

//  export default SignIn;
import { useContext, useEffect, useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contextProvider } from '../../Context/ContextProvider';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineWarning } from 'react-icons/ai';
import PropTypes from 'prop-types';
import ForgotPassword from './ForgotPassword';

import SignUp from './SignUp';
const SignIn = ({setSignInPopUp}) => {
    const { showToast, setIsLoggedIn } = useContext(contextProvider);
    const [loading, setLoading] = useState(false);
    const [signUpPopUp, setSignUpPopUp] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    
      
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            return navigate(from, { replace: true });
            
        }
    }, [navigate, from]);



    // <!-- onChange input -->
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    // <!-- Validate form function -->
    const validateForm = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = 'Email is required!';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid!';
        }
        if (!data.password) {
            errors.password = 'Password is required!';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters!';
        }

        return errors;
    };


    // <!-- Submit Form Data -->
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            setFormErrors({});
            await axios.post(`${import.meta.env.VITE_API_V1_URL}/user/sign-in`, {
                email: formData.email,
                password: formData.password,
            })
                .then(res => {
                    console.log(res);
                    if (res.data.auth_token) {
                        localStorage.setItem('auth_token', res.data.auth_token);
                        showToast({
                            succuss: res?.data?.succuss, error: '',
                        });
                        setIsLoggedIn(true);
                        navigate(res.data.redirect)
                        // navigate(from, { replace: true });
                    }
                })
                .catch(err => {
                    showToast({
                        succuss: '', error: err?.response?.data?.error,
                    });
                });
            setLoading(false);
        } else {
            setFormErrors(errors);
        }
    };

    const closeHandler = () =>{
        navigate('/');
    }

    return (
        <div>
            <div className='fixed inset-0 z-50 bg-black/60 grid place-items-center overflow-y-auto py-5'>
                <div className='md:w-[35rem] w-11/12 bg-black md:p-10 p-6 rounded-lg relative'>

                    {/* Close btn */}
                    <div
                        onClick={() => setSignInPopUp(false)}
                        className='absolute top-5 right-5 z-50 rounded-full hover:bg-violet-100 duration-300 p-1 cursor-pointer'
                    >
                        <IoCloseSharp onClick={closeHandler} className='text-3xl text-gray-700' />
                    </div>
                    <form
                    onSubmit={handleSubmit}
                    style={{ textShadow: '1px 1px 1px rgb(0,0,0,0.3)' }}
                    className='w-full h-auto lg:p-16 md:px-32 md:py-16 sm:p-10 p-7 text-base text-white flex flex-col gap-6'
                >
                    <div>
                        <h1 className='text-2xl font-semibold text-yellow-400'>
                            Sign-in to ES Training
                        </h1>
                    </div>
                    <div>
                        <label htmlFor='email' className="px-1">Email</label>
                        <input
                            onChange={handleChange}
                            placeholder="" required
                            type="email" name='email' id='email'
                            className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                        />
                        {
                            formErrors?.email &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.email}
                            </p>
                        }
                    </div>
                    <div>
                        <div className='flex items-center justify-between'>
                            <label htmlFor='password' className="px-1">Password</label>
                            </div>
                        <input
                            onChange={handleChange}
                            placeholder="" required
                            type="password" name='password' id='password'
                            className="block mt-2 px-3 py-2 rounded-lg w-full bg-white text-gray-600 border border-violet-300 placeholder-violet-600 shadow-[5px_5px_0px_rgb(124,58,237,0.5)] focus:shadow-[5px_5px_0px_rgb(124,58,237)] focus:placeholder-violet-500 focus:bg-white focus:border-violet-600 focus:outline-none"
                        />
                        {
                            formErrors?.password &&
                            <p className='relative top-0 mt-1 text-sm text-red-400 flex gap-2 items-start'>
                                <AiOutlineWarning className="text-base mt-0.5" />
                                {formErrors?.password}
                            </p>
                        }
                    </div>
                   
                    <div className='flex justify-start'>
                        <button
                            type='submit'
                            className='px-16 py-2.5 mt-3 text-base font-medium border border-white hover:bg-white duration-300 text-white hover:text-violet-700 flex items-center gap-2 rounded-md shadow-[0_3px_15px_rgb(124,58,237,0.5)]'
                        >
                            Sign In
                        </button>
                        
                    </div>
                    <span>
                    

                 </span>
                
                    <p className='text-base font-light'>
                        New user?
                        <Link onClick={() => setSignUpPopUp(true)} className='text-yellow-400 ml-2 cursor-pointer hover:underline' >
                            Create an account
                        </Link>
                        {
                            signUpPopUp && <SignUp signUpPopUp={signUpPopUp} setSignUpPopUp={setSignUpPopUp} />
                        }
                    </p>
                    <GoogleSignIn />
                </form>
                </div>
            </div>
            
        </div>
    );
};

export default SignIn;