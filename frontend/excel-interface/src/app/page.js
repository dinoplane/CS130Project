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

    const [showTable, setShowTable] = useState(true); // Set false later
    const [fusekiUrl, setFusekiUrl] = useState('');

    const closeNotifCallback = () => {
        setHasNotif(false);
    };

    const handleNotifCallback = (val, isError = false) => {
        console.log('HAI');
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
        setShowTable(true);

        // if (showTable)
        // {setShowTable(false);}
        // else

        // return true;
        let success = fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                fusekiUrl: url,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    mappingManager.setFusekiUrl(url);
                    excelHandler.setFusekiUrl(url);
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
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
                        // successCallback={handleSuccessCallback}
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
