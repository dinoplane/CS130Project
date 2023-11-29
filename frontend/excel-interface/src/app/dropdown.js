import { useState, useRef, useEffect, cloneElement } from 'react'
import styles from './page.module.css'

const useOutsideClick = (callback) => {
    const ref = useRef()
    console.log('HALLO')
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick, true)

        return () => {
            document.removeEventListener('click', handleClick, true)
        }
    }, [ref])

    return ref
}

export default function DropdownMenu({ trigger, child }) {
    const ref = useOutsideClick(() => {
        // console.log("HEEEELO")
        setDropdownOpen(false)
    })

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const handleOpen = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleClose = () => {
        setDropdownOpen(false)
    }

    // const dropdownCallback = (mode) => {
    //   setDropdownOpen(false);
    //   uploadCallback(mode);
    // };

    return (
        <div className={styles.dropdown} ref={ref}>
            {cloneElement(trigger, {
                onClick: handleOpen,
            })}
            {dropdownOpen ? (
                <div className={styles.menu}>
                    {cloneElement(child, {
                        closeCallback: handleClose,
                    })}
                </div>
            ) : null}
        </div>
    )
}
