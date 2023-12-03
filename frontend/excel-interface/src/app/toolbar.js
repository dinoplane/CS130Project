import { useState, useRef, useEffect, cloneElement } from 'react';

import styles from './page.module.css';

import DownloadImg from './img/download.svg';
import UploadImg from './img/upload.svg';
import DeleteImg from './img/delete.svg';

// https://www.robinwieruch.de/react-hook-detect-click-outside-component/

export default function Toolbar({
    downloadCallback,
    uploadCallback,
    deleteCallback,
}) {
    const changeHandler = (event) => {
        uploadCallback(event.target.files[0]);
    };

    return (
        <div className={styles.toolbar}>
            <div
                id={'dwnBtn'}
                className={styles.toolbar_button}
                onClick={downloadCallback}
            >
                <DownloadImg
                    className={styles.image}
                    alt="HAI"
                    stroke="#333333"
                />
            </div>
            <div id={'uplBtn'} className={styles.toolbar_button}>
                <label htmlFor="file-input">
                    <UploadImg
                        className={styles.image}
                        alt="HAI"
                        stroke="#333333"
                    />
                </label>
                <input
                    type="file"
                    id="file-input"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={changeHandler}
                />
            </div>

            {/* <UploadDropdownMenu
        trigger={

        uploadCallback={uploadCallback}
      /> */}

            <div
                id={'delBtn'}
                className={styles.toolbar_button}
                onClick={deleteCallback}
            >
                <DeleteImg
                    className={styles.image}
                    alt="HAI"
                    stroke="#df2323"
                />
            </div>
        </div>
    );
}
