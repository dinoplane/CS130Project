'use client'; // This is a client component 👈🏽

import styles from './page.module.css';
import { useState, useRef, useEffect } from 'react';

import MappingManager from './mapping_manager';
import ExcelHandler from './excelhandler';
import Header from './header';
import MappingTable from './mapping_table';
import NotifDialog from './notifdialog';

// Example of a data array that

const mappingManager = new MappingManager();
const MAPPINGS = [];
const excelHandler = new ExcelHandler();

// const MAPPINGS = [
//   {
//     id: 0,
//     name: "PLOOP",
//     query: "SELECT COURSE WHERE COURSE.NAME = CS130",
//     date: "10/19/2023",
//   },
//   {
//     id: 1,
//     name: "BLOOP",
//     query: "SELECT COURSE WHERE STUDENTS_ENROLLED > 30 AND DEPT = CS",
//     date: "10/20/2023",
//   },
//   {
//     id: 2,
//     name: "FLOOP",
//     query: "SELECT PROFESSOR WHERE COURSE.NAME = CS130",
//     date: "10/21/2023",
//   },
// ];

// console.log(MAPPINGS)
export default function Home() {
    // const errRef = useRef(null);
    const [hasNotif, setHasNotif] = useState(false);
    const [notifMsg, setNotifMsg] = useState('');
    const [notifError, setNotifError] = useState(false);

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

    const connectToFuseki = (url) => {
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
                return true;
            })
            .catch((error) => {
                // console.log(notif);
                handleNotifCallback("Can't connect", true);
                return false;
            });
        return success;
    };

    return (
        <main className={styles.main}>
            <div className={styles.maindiv}>
                <Header connectCallback={connectToFuseki} />
                <MappingTable
                    mappings={MAPPINGS}
                    mappingManager={mappingManager}
                    excelHandler={excelHandler}
                    // successCallback={handleSuccessCallback}
                    notifCallback={handleNotifCallback}
                />
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
