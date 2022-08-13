import { Link } from 'react-router-dom';
import React from 'react';

// Navigation bar
function Nav() {
    return (
        <nav className="mx-4 mb-4 sm-mb-20 pt-4 h-auto sm-h-20 flex flex-col sm:flex-row items-center">
            <Link to='/' className="font-bold mb-4 sm:mb-0 border-b border-transparent">
                <h1 >cosmos odyssey</h1>
            </Link>
            <ul className="flex align-center sm:ml-8 flex-col sm:flex-row text-center">
                <Link to='/' className='mx-1 hover:border-white border-b border-transparent'>
                    <li className="p-2">routes</li>
                </Link>
                <Link to='/bookings' className='mx-1 hover:border-white border-b border-transparent'>
                    <li className="p-2">bookings</li>
                </Link>
                <Link to='/about' className='mx-1 hover:border-white border-b border-transparent'>
                    <li className="p-2">about</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;