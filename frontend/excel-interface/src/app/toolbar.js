
import { useState , useRef, useEffect} from "react";

import styles from "./page.module.css";

import DownloadImg from './img/download.svg';
import UploadImg from './img/upload.svg';
import DeleteImg from './img/delete.svg';

export default function Toolbar({downloadCallback, uploadCallback, deleteCallback}) {

    function changeHandler(){

    }

    return (
      <div className={styles.toolbar}>
        <div
        className={styles.toolbar_button}
        onClick={downloadCallback}
        >
          <DownloadImg
            className={styles.image}
            alt="HAI"
            stroke="#333333"
          />
        </div>

        <div
        className={styles.toolbar_button}
        onClick={uploadCallback}
        >
          <label htmlFor="file-input">
          <UploadImg
            className={styles.image}
            alt="HAI"
            stroke="#333333"
          />
          </label>
          <input type="file" id="file-input" onChange={changeHandler} />

        </div>

        <div
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
