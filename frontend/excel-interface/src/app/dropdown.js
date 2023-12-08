/**
 * @module DropdownMenu
 */

import { useState, useRef, useEffect, cloneElement } from 'react';
import styles from './page.module.css';

/**
 * @callback useOutsideClick
 * @description A hook for handling user clicking outside the specified element.
 *
 * @returns a reference to this hook
 */
const useOutsideClick = (callback) => {
    const ref = useRef();
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);

    return ref;
};

/**
 * @class
 * This component renders a dropdown menu that can be closed when the user
 * clicks outside the element area.
 *
 * @param {HTMLElement} trigger element that prompts dropdown menu to open
 * @param {HTMLElement} child element that is contained in the dropdown
 *
 * @property {Boolean} dropdownOpen whether or not the dropdown is open
 * @property {Callback} ref a reference to the useOutsideClick callback
 *
 * @returns {ReactNode} a React element that renders a dropdown menu
 */
export default function DropdownMenu({ trigger, child }) {
    const ref = useOutsideClick(() => {
        setDropdownOpen(false);
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    /**
     * @method handleOpen
     * @description Opens the dropdown menu.
     */
    const handleOpen = () => {
        setDropdownOpen(!dropdownOpen);
    };

    /**
     * @method handleClose
     * @description Closes the dropdown menu.
     */
    const handleClose = () => {
        setDropdownOpen(false);
    };

    return (
        <div className={styles.dropdown} ref={ref}>
            {cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {dropdownOpen ? (
                <div className={styles.menu}>
                    {cloneElement(child, {
                        closecallback: handleClose,
                    })}
                </div>
            ) : null}
        </div>
    );
}
