import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { contextProvider } from '../../../Context/ContextProvider';
import HeaderProfile from './HeaderProfile';
import NotificationIcon from './NotificationIcon';
import { RiArrowDownSLine } from 'react-icons/ri';

const MobileView = ({ openMenu }) => {
    const { isLoggedIn } = useContext(contextProvider);
    const [openPrograms, setOpenPrograms] = useState(false);

    return (
        <ul
            className={`fixed left-1/2 -translate-x-1/2 w-[94%] h-auto list-none bg-white text-gray-600 border shadow-lg rounded-md duration-300 flex flex-col ${openMenu ? 'top-[74px] opacity-100 visible' : '-top-[24rem] opacity-0 invisible'}`
            }
        >
            {isLoggedIn &&
                <li className='border-b py-3'>
                    <ul>
                        <HeaderProfile />
                    </ul>
                </li>
            }
            <li className='border-b relative'>
                <div
                    onClick={() => setOpenPrograms(pre => !pre ? true : false)}
                    className='w-full h-auto py-3 px-5 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300 cursor-pointer flex items-center gap-1'
                    end='true'
                >
                    Programs <RiArrowDownSLine className='text-xl' />
                </div>
                <ul className={`list-none overflow-hidden maxH-0 ${openPrograms ? 'maxH-full' : ''}`}>
                    <li className='w-full'>
                        <NavLink
                            to='/programs/mern-stack-web-development'
                            className='block w-full h-auto py-3 px-8 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300'
                        >
                            MERN Stack Web Development
                        </NavLink>
                    </li>
                </ul>
            </li>
            <li className='border-b'>
                <NavLink
                    to='/projects'
                    className='block w-full h-auto py-3 px-5 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300'
                >
                    Projects
                </NavLink>
            </li>
            <li className='border-b'>
                <NavLink
                    to='/placements'
                    className='block w-full h-auto py-3 px-5 text-base hover:text-violet-600 side-nav hover:bg-violet-100 duration-300'
                >
                    Placements
                </NavLink>
            </li>

            {isLoggedIn ? <>
                <li className=''>
                    <div className='flex justify-start px-5 py-3'>
                        <NotificationIcon />
                    </div>
                </li>
            </> : <>
                <li className='border-b py-1.5 px-5'>
                    <Link
                        to='/sign-in'
                        className='inline-block text-base font-medium py-1.5 px-6 bg-transparent hover:bg-violet-600 duration-300 text-violet-600 hover:text-white border-2 border-violet-600 rounded-full'
                    >
                        Sign in
                    </Link>
                </li>
                <li className='py-1.5 px-5'>
                    <Link
                        to='/sign-up'
                        className='inline-block text-base font-medium py-1.5 px-6 bg-violet-600 hover:bg-violet-500 border-2 border-violet-600 duration-300 text-white rounded-full'
                    >
                        Sign Up
                    </Link>
                </li>
            </>}
        </ul>
    );
};


MobileView.propTypes = {
    openMenu: PropTypes.bool.isRequired,
};

MobileView.propTypes = {
    openMenu: PropTypes.func.isRequired,
};



export default MobileView;
