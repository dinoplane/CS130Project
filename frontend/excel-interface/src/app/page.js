"use client"; // This is a client component 👈🏽

import Image from "next/image";
import { useState , useRef, useEffect} from "react";
import styles from "./page.module.css";

import MappingManager from "./mappingmanager";
import DownloadImg from './img/download.svg';
import UploadImg from './img/upload.svg';
import DeleteImg from './img/delete.svg';
import AddImg from './img/add.svg';
import ConfirmImg from './img/confirm.svg'
import next from "next";


// Example of a data array that

const mappingManager = new MappingManager();

function Header() {
  return (
    <>
      <div className={styles.title_bar}>
        <h1>Excellent Interface</h1>
        <button className={styles.connect_button}>Connected to: URL</button>
      </div>
    </>
  );
}

function Toolbar({downloadCallback, uploadCallback, deleteCallback}) {

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

const MAPPINGS = [
  {
    id: 0,
    mapping_query: "SELECT STUDENT WHERE COURSE.NAME = CS130",
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

function UIMappingRow({rowCheckboxCallback, mapping, isSelected}){
  // const [isSelected, setIsSelected] = useState(false);

  const onSelectChange = (e) => {
    // console.log(isSelected)
    // setIsSelected(!isSelected);

    rowCheckboxCallback(e, mapping);
  }

  return (
    <tr className={styles.entry_row}>
      <td className={styles.checkbox_col}>
        <input
          type="checkbox"
          onChange={onSelectChange}
          checked={isSelected}
        ></input>
      </td>
      <td className={styles.id_col}>{mapping.id.toString().padStart(6, "0")}</td>
      <td className={styles.query_col}>{mapping.mapping_query}</td>
      <td className={styles.date_col}>{mapping.date_modified}</td>
    </tr>
  );
}

function UINewRow({addRowCallback}){

  const inputRef = useRef(null);
  const onInputSubmit = (e) => {
    addRowCallback(inputRef.current.value)
  }
  return (
    <tr key={"add-row"}
    className={styles.newrow}
    >
    <td className={styles.checkbox_col}>
      <input type="checkbox" disabled={true}></input>
    </td>
    <td className={styles.id_col}>
        <div
        className={styles.confirm_div}>
          <div
          className={styles.toolbar_button}
          id="addBtn" onClick={onInputSubmit}>

          <ConfirmImg
            className={styles.image}
            alt="HAI"
            stroke="#00AA00"
          />
          </div>
        </div>
    </td>
    <td className={styles.query_col}>
      <input ref={inputRef} className={styles.queryfield}
        type="text"
        placeholder="Enter Mapping Query"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addRowCallback(event.target.value);
          }
          // console.log(inputRef.current.value)
        }}
        autofocus
      ></input>
    </td>
    <td className={styles.date_col}>{getDateTodayString()}</td>
  </tr>
  );

}


function getDateTodayString(){
  let today = new Date();
  console.log(today);

  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();

  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }
  today = mm + '/' + dd + '/' + yyyy;

  return today;
}

// Adapted from https://codesandbox.io/s/react-parent-child-checkboxes-ebjhl?file=/src/Table.js
// https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m


const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

function MappingTable() {
  const [nextId, setNextId] = useState(0); // So we may fetch the ID from the mapping database
  const [showTemplateRow, setShowTemplateRow] = useState(false);
  const [data, setData] = useState(MAPPINGS);
  const [isParentChecked, setIsParentChecked] = useState(false);

  const parentCheckboxRef = useRef(null);

  useConstructor(() => {
    // console.log(
    //   "Occurs ONCE, BEFORE the initial render."
    // );
    const currData = [...data]
    currData.map((row) => {
      row.isChecked = false;
      return row;
    });
    setNextId(currData[currData.length - 1].id + 1);
    setData([...currData])
  });

  // const [count, setCount] = useState(0);
  function openTemplate() {
    setShowTemplateRow(true);
  }

  const getSelectedEntries = () => {
    let ret = data.filter((row) => row.isChecked);
    if (ret == undefined){
      ret = [];
    }
    return ret;
  }

  const setParentCheckboxVal = () => {
    const currData = [...data];
    if (currData.length == 0){
      setIsParentChecked(false);
      return;
    }

    const firstRowChecked = currData[0].isChecked;
    const isAllRowsSame = currData.reduce(
      (accum, row) => accum & (firstRowChecked === row.isChecked),
      true
    );
    // console.log(isAllRowsSame)
    // console.log(data.length)
    if (isAllRowsSame) {
      setIsParentChecked(firstRowChecked);
      parentCheckboxRef.current.indeterminate = false
    } else {
      setIsParentChecked(false);
      parentCheckboxRef.current.indeterminate = true
    }
  }

  useEffect( () => {
    setParentCheckboxVal()
  }, [data])

  const toggleSelectedEntries = (e, entry) => {
    const currData = [...data];
    const { checked } = e.target;

    if (entry === "all") {
      setIsParentChecked(checked);
    }

    currData.map((row) => {
      if (entry === "all") {
        row.isChecked = checked;
      } else {
        if (row.id === entry.id) {
          row.isChecked = checked;
        }
      }
      return row;
    });
    console.log(getSelectedEntries())
    setData([...currData])
  }

  // const changeParentCheckbox = (e, )

  function addRow(query) {
    // console.log(query);
    setData([
      ...data,
      {
        id: nextId,
        mapping_query: query,
        date_modified: getDateTodayString(),
        isChecked: false
      },
    ]);
    mappingManager.createMapping("query");
    setNextId(nextId + 1);
    setShowTemplateRow(false);
  }


  function downloadExcel(selectedMappings){
    console.log(getSelectedEntries())

  }

  function uploadExcel(selectedMappings){
    console.log(getSelectedEntries())

  }

  function deleteRows(selectedMappings){
    console.log(getSelectedEntries())

    // mappingManager.deleteMapping(selectedMappings); SO IM GONNA NEED TO FIGURE OUT WHEN TO UPDATE THE UI

    const currData = data.filter((row) => !row.isChecked);
    console.log(currData);
    setData([...currData])
  }

  return (
    <div className={styles.datatable}>
      <Toolbar
        downloadCallback={()=>{downloadExcel(getSelectedEntries())}}
        uploadCallback={()=>{uploadExcel()}}
        deleteCallback={()=>{deleteRows()}}
      />

      <table>
        <thead>
          <tr key={"header"}>
            <th>
              <input
                ref = {parentCheckboxRef}
                type="checkbox"
                checked={isParentChecked}
                onChange={(e) => toggleSelectedEntries(e, "all")}
              ></input>
            </th>
            <th>ID</th>
            <th>Mapping Query</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          { data &&
            data.map((row, id) => {
              return (
                <UIMappingRow
                  key={"ui-mapping-row" + parseInt(id)}
                  mapping={row}
                  rowCheckboxCallback={toggleSelectedEntries}
                  isSelected={row?.isChecked}
                />
              );
            })
          }
          {
            (data.length == 0) && (
              <tr key={"none"} className={styles.norow}>
                <td className={styles.checkbox_col}></td>
                <td className={styles.id_col}></td>
                <td className={styles.query_col}>Nothing to show here!</td>
                <td className={styles.date_col}></td>
              </tr>
            )
          }

          {showTemplateRow && (
            <UINewRow
              key={"ui-new-row"}
              addRowCallback={addRow}/>
          )}
          {
            !showTemplateRow && (
              <tr key={"show"} className={styles.addrow}>
                <td>

                </td>
                <td className={styles.addrow_td}>
                  <div
                    className={styles.toolbar_button}
                    id="addBtn"
                    onClick={openTemplate}>
                    <AddImg className={styles.image}
                      stroke="#333333"
                    />
                  </div>
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
