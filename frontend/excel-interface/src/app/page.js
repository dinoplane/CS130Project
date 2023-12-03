'use client'; // This is a client component 👈🏽

import styles from './page.module.css';
import { useState } from 'react';

import MappingManager from './mapping_manager';
import ExcelHandler from './excelhandler';
import Header from './header';
import MappingTable from './mapping_table';
import NotifDialog from './notifdialog';

// Example of a data array that

const mappingManager = new MappingManager();
const MAPPINGS = [];
const excelHandler = new ExcelHandler();

// console.log(MAPPINGS)
export default function Home() {
    // const errRef = useRef(null);
    const [hasNotif, setHasNotif] = useState(false);
    const [notifMsg, setNotifMsg] = useState('');
    const [notifError, setNotifError] = useState(false);

    const [showTable, setShowTable] = useState(false); // Set false later
    const [fusekiUrl, setFusekiUrl] = useState('');

    const closeNotifCallback = () => {
        setHasNotif(false);
    };

    const handleNotifCallback = (val, isError = false) => {
        setHasNotif(true);
        setNotifMsg(val);
        setNotifError(isError);
    };

    // const handleSuccessCallback = (val) => {
    //     console.log(val);
    //     setNotifMsg('');
    //     setHasError(false);
    // };

    async function connectToFuseki(url) {
        if (url == '') {
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
                // Do something with the response
                handleNotifCallback('Connected!', false);
                setFusekiUrl(url);
                return true;
            })
            .catch((error) => {
                // console.log(notif);
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
                        // rerenderCallback={handleRerenderCallback}
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
