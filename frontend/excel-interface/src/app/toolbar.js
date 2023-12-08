/**
 * @module Toolbar
 */

import styles from './page.module.css';

import DownloadImg from './img/download.svg';
import UploadImg from './img/upload.svg';
import DeleteImg from './img/delete.svg';

// https://www.robinwieruch.de/react-hook-detect-click-outside-component/

/**
 * @class
 * This component renders the toolbar of the mapping table,
 * with the upload, download, and delete buttons.
 * @param {Callback} downloadCallback the callback called when the download button is pressed
 * @param {Callback} uploadCallback the callback called when the upload button is pressed
 * @param {Callback} deleteCallback the callback called when the delete button is pressed
 *
 * @returns a React element that renders a toolbar
 */
export default function Toolbar({
    downloadCallback,
    uploadCallback,
    deleteCallback,
}) {
    /**
     * @method changeHandler
     * @description A callback called when the file is selected for upload.
     * @param {HTMLEvent} event the HTMLEvent of the file selection
     */
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
