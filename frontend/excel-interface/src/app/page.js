"use client"; // This is a client component 👈🏽

import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";

import MappingManager from "./mapping_manager";
import Header from "./header";
import MappingTable from "./mapping_table";
import ErrorDialog from "./errordialog";

// Example of a data array that

const mappingManager = new MappingManager();
const MAPPINGS = []; //mappingManager.requestMapping();

export default function Home() {
  // const errRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const closeErrorCallback = () => {
    setHasError(false);
  };

  const handleErrorCallback = (val) => {
    console.log("HAI");
    setErrorMsg(val);
    setHasError(true);
  };

  const handleSuccessCallback = (val) => {
    console.log(val);
    setErrorMsg("");
    setHasError(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.maindiv}>
        <Header />
        <MappingTable
          mappings={MAPPINGS}
          mappingManager={mappingManager}
          successCallback={handleSuccessCallback}
          errorCallback={handleErrorCallback}
        />
      </div>
      {hasError && (
        <ErrorDialog
          closeErrorCallback={closeErrorCallback}
          errorMsg={errorMsg}
        />
      )}
    </main>
  );
}
