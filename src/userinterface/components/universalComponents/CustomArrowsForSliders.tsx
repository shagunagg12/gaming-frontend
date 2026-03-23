// LeftArrow.tsx
import React from 'react';
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa';

interface ArrowProps {
    onClick?: () => void;
    disabled?: boolean;
}

const LeftArrow: React.FC<ArrowProps> = ({ onClick, disabled }) => {
    return (
        <button
            className={`absolute -top-[1.9rem] sm:right-[3.4rem] right-[2.45rem] transform -translate-y-1/2 sm:w-12 sm:h-9 w-8 h-6  ${disabled ? '' : 'bg-transparent cursor-pointer'} text-gray-300 flex items-center justify-center rounded-l-full border border-gray-500 shadow-lg transition-transform duration-300 ease-in-out  z-10`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <FaChevronLeft  className='sm:text-[16px] text-[10px]' />
        </button>
    );
};

export {LeftArrow};

// RightArrow.tsx



interface ArrowProps {
    onClick?: () => void;
    disabled?: boolean;
}

const RightArrow: React.FC<ArrowProps> = ({ onClick, disabled }) => {
    return (
        <button
            className={`absolute -top-[1.9rem] right-[.5rem] transform -translate-y-1/2 sm:w-12 sm:h-9 w-8 h-6 ${disabled ? '' : 'bg-transparent cursor-pointer'} text-gray-300 flex items-center justify-center rounded-r-full border border-gray-500 shadow-lg transition-transform duration-300 ease-in-out  z-10`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <FaChevronRight className='sm:text-[16px] text-[10px]' />
        </button>
    );
};

export {RightArrow};





// left Arrow
interface   ArrowPromoProps {
    onClick?: () => void;
    disabled?: boolean;
    isVisible: boolean;
}

const LeftArrowForPromo: React.FC<ArrowPromoProps> = ({ onClick, disabled,isVisible }) => {
    return (
        <button
            className={`absolute top-1/2 transform -translate-y-1/2 p-5 -left-8 ${isVisible?'':'hidden'} ${disabled ? '' : ' cursor-pointer'} text-gray-300 flex items-center justify-center  transition-transform duration-300 ease-in-out  z-10`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            
        >
            <FaChevronLeft size={20}  />
        </button>
    );
};

export {LeftArrowForPromo};

// RightArrow.tsx



interface ArrowPromoProps {
    onClick?: () => void;
    disabled?: boolean;
    isVisible: boolean;
}

const RightArrowForPromo: React.FC<ArrowPromoProps> = ({ onClick, disabled ,isVisible}) => {
    return (
        <button
            className={`absolute top-1/2 -right-8 transform duration-800 p-5 -translate-y-1/2 ${isVisible?'':'hidden'}  ${disabled ? '' : 'bg-transparent cursor-pointer'} text-gray-300 flex items-center justify-center transition-transform duration-300 ease-in-out  z-10`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <FaChevronRight size={20}  />
        </button>
    );
};

export {RightArrowForPromo};