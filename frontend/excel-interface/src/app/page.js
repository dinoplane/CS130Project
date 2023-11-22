"use client"; // This is a client component 👈🏽

import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";

import MappingManager from "./mapping_manager";
import Header from "./header";
import MappingTable from "./mapping_table";
import ErrorDialog from "./errordialog";

// Example of a data array that

const mappingManager = new MappingManager();
// const MAPPINGS = []; //mappingManager.requestMapping();

const MAPPINGS = [
  {
    id: 0,
    mapping_query: "SELECT COURSE WHERE COURSE.NAME = CS130",
    date_modified: "10/19/2023",
  },
  {
    id: 1,
    mapping_query: "SELECT COURSE WHERE STUDENTS_ENROLLED > 30 AND DEPT = CS",
    date_modified: "10/20/2023",
  },
  {
    id: 2,
    mapping_query: "SELECT PROFESSOR WHERE COURSE.NAME = CS130",
    date_modified: "10/21/2023",
  },
];

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
