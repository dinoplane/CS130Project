/**
 * @module Header
 */

import styles from './page.module.css';
import DropdownMenu from './dropdown';
import { useState, useRef } from 'react';

/**
 * @class
 * A dialog where the user can input the Fuseki KB url.
 *
 * @param {Callback} connectCallback a callback called when the submit button is pressed
 * @param {Callback} updateCallback a callback called to update some data in the parent
 * @param {Callback} closecallback a callback called when the dialog is closed (by external means)
 * @param {String} startText the starting text of the input field
 * @returns {ReactNode} a component that renders a connection dialog
 */
export function ConnectDialog({
    connectCallback,
    updateCallback,
    closecallback,
    startText,
}) {
    const urlInputRef = useRef(null);

    /**
     * @method module:Header.ConnectDialog.onInputSubmit
     * @description Called when the user clicks the submit button.
     */
    const onInputSubmit = () => {
        connectCallback(urlInputRef.current.value)
            .then((response) => {
                if (response) {
                    return true;
                }
                console.log(response)
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

/**
 * @class
 *
 * The header of the webapp, containing the title and the connect button.
 *
 * @param {Callback} connectCallback a callback called when the user submits a url
 * @property {Boolean} isKBSet whether or not the KB url is set
 * @property {String} fusekiUrl the url of the KB
 *
 * @returns {ReactNode} a component that renders the header
 */
export default function Header({ connectCallback }) {
    const [isKBSet, setIsKBSet] = useState(false);
    const [fusekiUrl, setFusekiUrl] = useState('');

    /**
     * @method updateUrl
     *
     * @description Sets the KB url.
     *
     * @param {String} url the url of the Fuseki KB
     */
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
                            {!isKBSet ? 'Not Connected' : 'Connected!'}
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
