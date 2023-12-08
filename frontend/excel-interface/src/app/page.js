/**
 * @module Home
 */

/**
 * @global
 * @typedef {Object} Entry
 * @description A mapping entry used to query the knowledge base
 * @property {int} id - The mapping id
 * @property {String} name - The mapping name
 * @property {String} query - The mapping query
 * @property {String} date - The date created
 */

'use client';

import styles from './page.module.css';
import { useState } from 'react';

import MappingManager from './mapping_manager';
import ExcelHandler from './excelhandler';
import Header from './header';
import MappingTable from './mapping_table';
import NotifDialog from './notifdialog';

/**
 * @global
 * @constant
 * @description an instance of MappingManager
 */
const mappingManager = new MappingManager();

/**
 * @global
 * @constant
 * @description an instance of ExcelHandler
 */
const excelHandler = new ExcelHandler();

/**
 * @class
 *
 * The interface of the webapp.
 *
 * @param {Boolean} hasNotif whether or not there is a notification
 * @param {Boolean} notifMsg the notification message
 * @param {Boolean} notifError whether or not the notification is an error
 *
 * @param {Boolean} showTable whether or not the mapping table should be shown
 * @param {String} fusekiUrl the url of the Fuseki KB
 *
 * @returns {ReactNode} the rendered interface
 */
export default function Home() {
    const [hasNotif, setHasNotif] = useState(false);
    const [notifMsg, setNotifMsg] = useState('');
    const [notifError, setNotifError] = useState(false);

    const [showTable, setShowTable] = useState(false);
    const [fusekiUrl, setFusekiUrl] = useState('');

    /**
     * @method closeNotifCallback
     * @description Closes the notification.
     */
    const closeNotifCallback = () => {
        setHasNotif(false);
    };

    /**
     * @method handleNotifCallback
     * @description Called when there is a notification.
     *
     * @param {String} msg the notification message
     * @param {Boolean} isError whether or not the notification is an error
     */
    const handleNotifCallback = (msg, isError = false) => {
        setHasNotif(true);
        setNotifMsg(msg);
        setNotifError(isError);
    };

    /**
     * @method connectToFuseki
     * @description Validates and connects to the Fuseki KB provided by the url.
     * Prompts the fetching of mappings on success.
     *
     * @param {String} url the url of the Fuseki KB
     * @returns {Boolean} true on success, false otherwise
     */
    async function connectToFuseki(url) {
        if (url == '') {
            console.log('HAI');
            handleNotifCallback('Url cannot be empty.', true);
            return false;
        }

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            fuseki_url: url,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        let success = fetch(
            'http://0.0.0.0:8000/excel-interface/operations/check-connection',
            requestOptions
        )
            .then((response) => {
                if (response.ok) {
                    mappingManager.setFusekiUrl(url);
                    excelHandler.setFusekiUrl(url);
                    setShowTable(true);
                    return true;
                }
                throw new Error('Something went wrong');
            })
            .then(() => {
                handleNotifCallback('Connected!', false);
                setFusekiUrl(url);
                return true;
            })
            .catch(() => {
                handleNotifCallback("Can't connect to " + url, true);
                return false;
            });
        return success;
    }

    return (
        <main className={styles.main}>
            <div className={styles.maindiv}>
                <Header connectCallback={connectToFuseki} />
                {showTable ? (
                    <MappingTable
                        mappings={[]}
                        fusekiUrl={fusekiUrl}
                        mappingManager={mappingManager}
                        excelHandler={excelHandler}
                        notifCallback={handleNotifCallback}
                    />
                ) : (
                    <p>Nothing to see here!</p>
                )}
            </div>
            {hasNotif && (
                <NotifDialog
                    closeNotifCallback={closeNotifCallback}
                    notifMsg={notifMsg}
                    notifError={notifError}
                />
            )}
        </main>
    );
}
