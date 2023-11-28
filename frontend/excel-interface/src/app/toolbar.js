import { useState, useRef, useEffect, cloneElement } from "react";

import styles from "./page.module.css";

import DownloadImg from "./img/download.svg";
import UploadImg from "./img/upload.svg";
import DeleteImg from "./img/delete.svg";

// https://www.robinwieruch.de/react-hook-detect-click-outside-component/
const useOutsideClick = (callback) => {
  const ref = useRef();
  console.log("HALLO");
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};

export function UploadDropdownMenu({ trigger, uploadCallback }) {
  const ref = useOutsideClick(() => {
    // console.log("HEEEELO")
    setDropdownOpen(false);
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onMenuClick = (mode) => {
    setDropdownOpen(false);
    uploadCallback(mode);
  };

  // const dropdownCallback = (mode) => {
  //   setDropdownOpen(false);
  //   uploadCallback(mode);
  // };

  return (
    <div className={styles.dropdown} ref={ref}>
      {dropdownOpen ? (
        <ul className={styles.menu}>
          <li className="menu-item">
            <button onClick={() => onMenuClick("add")}>Add Data</button>
          </li>
          <li className="menu-item">
            <button onClick={() => onMenuClick("delete")}>Delete Data</button>
          </li>
          <li className="menu-item">
            <button onClick={() => onMenuClick("modify")}>Modify Data</button>
          </li>
          <li className="menu-item">
            <button onClick={() => onMenuClick("upload")}>Upload Data</button>
          </li>
        </ul>
      ) : null}
      {cloneElement(trigger, {
        onClick: handleOpen,
      })}
    </div>
  );
}

export default function Toolbar({
  downloadCallback,
  uploadCallback,
  deleteCallback,
}) {
  // function changeHandler(){

  // }

  return (
    <div className={styles.toolbar}>
      <div
        id={"dwnBtn"}
        className={styles.toolbar_button}
        onClick={downloadCallback}
      >
        <DownloadImg className={styles.image} alt="HAI" stroke="#333333" />
      </div>
      <UploadDropdownMenu
        trigger={
          <div id={"uplBtn"} className={styles.toolbar_button}>
            <label htmlFor="file-input">
              <UploadImg className={styles.image} alt="HAI" stroke="#333333" />
            </label>
            {/* <input type="file" id="file-input" onChange={changeHandler} /> */}
          </div>
        }
        uploadCallback={uploadCallback}
      />

      <div
        id={"delBtn"}
        className={styles.toolbar_button}
        onClick={deleteCallback}
      >
        <DeleteImg className={styles.image} alt="HAI" stroke="#df2323" />
      </div>
    </div>
  );
}
