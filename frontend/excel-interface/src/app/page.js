"use client"; // This is a client component 👈🏽

import Image from "next/image";
import { useState , useRef} from "react";
import styles from "./page.module.css";

// Example of a data array that

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

  const onSelectChange = (e) => {
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

function UINewRow({addRowCallback}){

  const myRef = useRef(null);
  const onInputSubmit = (e) => {
    addRowCallback(myRef.current.value)
  }
  return (
    <tr key={"add-row"}>
    <td>
      <input type="checkbox" disabled={true}></input>
    </td>
    <td>
        <button id="addBtn" onClick={onInputSubmit}>
          CONFIRM
        </button>
    </td>
    <td>
      <input ref={myRef}
        type="text"
        placeholder="Enter Mapping Query"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addRowCallback(event.target.value);
          }
          // console.log(myRef.current.value)
        }}
      ></input>
    </td>
    <td>10/27/2023</td>
  </tr>
  );

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
                  key={"ui-mapping-row" + parseInt(id)}
                  mapping={val}
                  rowCheckboxCallback={toggleSelectedEntries}
                />
              );
            })
          }
          {showTemplateRow && (
            <UINewRow
              key={"ui-new-row"}
              addRowCallback={addRow}/>
          )}
          {
            !showTemplateRow && (
              <tr key={"show"}>
                <td>

                </td>
                <td>
                  <button id="addBtn" onClick={openTemplate}>
                    ADD ROW
                  </button>
                </td>
                <td>

                </td>
                <td>

                </td>
              </tr>
            )
          }
        </tbody>
      </table>

    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <MappingTable />
    </main>
  );
}
