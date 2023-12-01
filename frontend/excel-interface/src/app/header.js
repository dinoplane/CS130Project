import styles from './page.module.css';
import DropdownMenu from './dropdown';
import { useState, useRef, useEffect } from 'react';

export function ConnectDialog({
    connectCallback,
    updateCallback,
    closeCallback,
}) {
    const urlInputRef = useRef(null);

    const onInputSubmit = (e) => {
        connectCallback(urlInputRef.current.value)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                // Do something with the response
                updateCallback(urlInputRef.current.value);
                closeCallback();

                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
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
            <div className={styles.connect_button} onClick={onInputSubmit}>
                SUBMIT
            </div>
        </div>
    );
}

export default function Header({ connectCallback }) {
    const [isKBSet, setIsKBSet] = useState(false);
    const [fusekiUrl, setFusekiUrl] = useState('');

    const updateUrl = (url) => {
        setIsKBSet(true);
        setFusekiUrl(url);
    };

    return (
        <>
            <div className={styles.title_bar}>
                <h1>Excellent Interface</h1>
                <DropdownMenu
                    trigger={
                        <div className={styles.connect_button}>
                            {!isKBSet
                                ? 'Not Connected'
                                : 'Connected to ' + fusekiUrl}
                        </div>
                    }
                    child={
                        <ConnectDialog
                            connectCallback={connectCallback}
                            updateCallback={updateUrl}
                        />
                    }
                />
            </div>
        </> //I could use drop down here...
    );
}
