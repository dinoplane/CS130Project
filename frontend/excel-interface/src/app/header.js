import styles from './page.module.css';
import DropdownMenu from './dropdown';
import { useState, useRef, useEffect } from 'react';

export function ConnectDialog({
    connectCallback,
    updateCallback,
    closecallback,
    startText,
}) {
    const urlInputRef = useRef(null);

    const onInputSubmit = (e) => {
        connectCallback(urlInputRef.current.value)
            .then((response) => {
                if (response) {
                    return true;
                }
                throw new Error('Something went wrong');
            })
            .then(() => {
                updateCallback(urlInputRef.current.value);
                closecallback();

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
                type="text"
                placeholder="Enter Fuseki Url"
                defaultValue={startText}
                autoFocus
            />
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
                        <div
                            className={
                                !isKBSet
                                    ? styles.unconnect_button
                                    : styles.connect_button
                            }
                        >
                            {!isKBSet ? 'Not Connected' : 'Connected'}
                        </div>
                    }
                    child={
                        <ConnectDialog
                            connectCallback={connectCallback}
                            updateCallback={updateUrl}
                            startText={fusekiUrl}
                        />
                    }
                />
            </div>
        </> //I could use drop down here...
    );
}
