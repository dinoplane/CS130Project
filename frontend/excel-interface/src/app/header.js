import styles from './page.module.css';
import DropdownMenu from './dropdown';
import { useState, useRef, useEffect } from 'react';

export function ConnectDialog({ connectCallback, closeCallback }) {
    const urlInputRef = useRef(null);

    const onInputSubmit = (e) => {
        connectCallback(urlInputRef.current.value);
        closeCallback();
    };
    return (
        <div className={styles.connectDialog}>
            <input
                ref={urlInputRef}
                // className={styles.namefield}
                type="text"
                placeholder="Enter Fuseki Url"
                autoFocus
            ></input>
            <button className={styles.connect_button} onClick={onInputSubmit}>
                SUBMIT
            </button>
        </div>
    );
}

export default function Header({ connectCallback }) {
    const [isKBSet, setIsKBSet] = useState(false);
    const [fusekiUrl, setFusekiUrl] = useState('');

    return (
        <>
            <div className={styles.title_bar}>
                <h1>Excellent Interface</h1>
                <DropdownMenu
                    trigger={
                        <button className={styles.connect_button}>
                            Not Connected
                        </button>
                    }
                    child={<ConnectDialog connectCallback={connectCallback} />}
                />
            </div>
        </> //I could use drop down here...
    );
}
