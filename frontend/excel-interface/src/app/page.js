/**
 * @export Home
 *
 */

/**
 * A mapping entry used to query the knowledge base
 * @typedef {Object} Entry
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

const mappingManager = new MappingManager();
const excelHandler = new ExcelHandler();

export default function Home() {
    const [hasNotif, setHasNotif] = useState(false);
    const [notifMsg, setNotifMsg] = useState('');
    const [notifError, setNotifError] = useState(false);

    const [showTable, setShowTable] = useState(false);
    const [fusekiUrl, setFusekiUrl] = useState('');

    const closeNotifCallback = () => {
        setHasNotif(false);
    };

    const handleNotifCallback = (val, isError = false) => {
        setHasNotif(true);
        setNotifMsg(val);
        setNotifError(isError);
    };

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
            .catch((error) => {
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
