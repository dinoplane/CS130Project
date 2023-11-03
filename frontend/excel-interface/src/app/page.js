"use client"; // This is a client component 👈🏽

import Image from "next/image";
import { useState , useRef} from "react";
import styles from "./page.module.css";

// Example of a data array that
// you might receive from an API
const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
];

function Header() {
  return (
    <>
      <div className="Header">
        <h1>Excellent Interface</h1>
        <button className="square">Connected to: URL</button>
      </div>
    </>
  );
}

function Toolbar() {
  return (
    <div className="Toolbar">
      <button className="Download">DOWNLOAD</button>
      <button className="Upload">UPLOAD</button>
      <button className="Delete">DELETE</button>
    </div>
  );
}

const MAPPINGS = [
  {
    ID: 0,
    mapping_query: "SELECT STUDENT WHERE COURSE.NAME = CS130",
    date_modified: "10/19/2023",
  },
  {
    ID: 1,
    mapping_query: "SELECT COURSE WHERE STUDENTS_ENROLLED > 30 AND DEPT = CS",
    date_modified: "10/20/2023",
  },
  {
    ID: 2,
    mapping_query: "SELECT PROFESSOR WHERE COURSE.NAME = CS130",
    date_modified: "10/21/2023",
  },
];

function UIMappingRow({rowCheckboxCallback, mapping}){
  const [isSelected, setIsSelected] = useState(false);

  // function onSelectChange(entry, isChecked){

  // }

  const onSelectChange = (e) => {
    // console.log(e.target.value)
    console.log(isSelected)
    setIsSelected(!isSelected);

    rowCheckboxCallback(mapping, !isSelected);
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          onChange={onSelectChange}
        ></input>
      </td>
      <td>{mapping.ID.toString().padStart(6, "0")}</td>
      <td>{mapping.mapping_query}</td>
      <td>{mapping.date_modified}</td>
    </tr>
  );
}

function UINewRow(){

}

function MappingTable() {
  const [showTemplateRow, setShowTemplateRow] = useState(false);
  const [data, setData] = useState(MAPPINGS);
  const [selectedEntries, setSelectedEntries] = useState([])

  // const [count, setCount] = useState(0);
  function openTemplate() {
    setShowTemplateRow(true);
  }

  const toggleSelectedEntries = (entry, isChecked) => {
    setSelectedEntries((isChecked) ? [...selectedEntries, entry] :
                          selectedEntries.filter((el) => el.ID != entry.ID));
  }

  function addRow(query) {
    console.log(query);
    setData([
      ...data,
      {
        ID: data[data.length - 1].ID + 1,
        mapping_query: query,
        date_modified: "10/19/2023",
      },
    ]);
    console.log(data);
    setShowTemplateRow(false);
    console.log(uiRows);
    // setState({data:data})
    // setCount(count +1);
  }
  // console.log("Hello")
  return (
    <div className={styles.datatable}>
      <Toolbar />
      <table>
        <thead>
          <tr key={"header"}>
            <th>
              <input type="checkbox"></input>
            </th>
            <th>ID</th>
            <th>Mapping Query</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((val, id) => {
              return (
                <UIMappingRow
                  key={id}
                  mapping={val}
                  rowCheckboxCallback={toggleSelectedEntries}
                />
              );
            })


          }
          {showTemplateRow && (
            <tr key={"add"}>
              <td>
                <input type="checkbox" disabled={true}></input>
              </td>
              <td></td>
              <td>
                <input
                  type="text"
                  placeholder="Enter Mapping Query"
                  onKeyDown={(event) => {
                    console.log(event.key);
                    if (event.key === "Enter") {
                      addRow(event.target.value);
                    }
                  }}
                ></input>
              </td>
              <td>10/27/2023</td>
            </tr>
          )}
        </tbody>
      </table>
      <button id="addBtn" onClick={openTemplate}>
        ADD ROW
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      {/* <div className={styles.description}> */}
      {/* <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p> */}
      {/* <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      {/* </div> */}

      {/*<div className={styles.center}>
         <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>*/}

      <MappingTable />

      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>BAKA BAKA</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p> Responsible for every financial disaster since 1984!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
               SUSSY BAKA
          </p>
        </a>
      </div> */}
    </main>
  );
  // return (
  //   <div className={styles.main}>
  //       <table>
  //           <tr>
  //               <th>Name</th>
  //               <th>Age</th>
  //               <th>Gender</th>
  //           </tr>

  //       </table>
  //   </div>
  // );
}
