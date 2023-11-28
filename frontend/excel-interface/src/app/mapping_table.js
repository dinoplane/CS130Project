import { useState, useRef, useEffect } from "react";
import Toolbar from "./toolbar";
import getDateTodayString from "./getdatestring";

import styles from "./page.module.css";

import AddImg from "./img/add.svg";
import ConfirmImg from "./img/confirm.svg";

function UIMappingRow({ rowCheckboxCallback, mapping, isSelected }) {
  const onSelectChange = (e) => {
    console.log("HAI");
    rowCheckboxCallback(e, mapping);
  };

  return (
    <tr
      // id={mapping.id.toString().padStart(6, "0")}
      className={styles.entry_row}
    >
      <td className={styles.checkbox_col}>
        <input
          type="checkbox"
          onChange={onSelectChange}
          checked={isSelected}
        ></input>
      </td>
      <td className={styles.name_col}>{mapping.name}</td>
      <td className={styles.query_col}>{mapping.query}</td>
      <td className={styles.date_col}>{mapping.date}</td>
    </tr>
  );
}

function UINewRow({ addRowCallback }) {
  const nameInputRef = useRef(null);
  const queryInputRef = useRef(null);
  const onInputSubmit = (e) => {
    addRowCallback(nameInputRef.current.value, queryInputRef.current.value);
  };
  return (
    <tr key={"add-row"} className={styles.newrow}>
      <td className={styles.checkbox_col}>
        <input type="checkbox" disabled={true}></input>
      </td>
      <td className={styles.name_col}>
        <div className={styles.confirm_div}>
          <div
            className={styles.toolbar_button}
            id="addBtn"
            onClick={onInputSubmit}
          >
            <ConfirmImg className={styles.image} alt="HAI" stroke="#00AA00" />
          </div>
        </div>
      </td>
      <td className={styles.query_col}>
        <div>
          <p>Name:</p>
          <input
            ref={nameInputRef}
            className={styles.namefield}
            type="text"
            placeholder="Enter Mapping Name"
          ></input>
        </div>
        <div>
          <p>Query: </p>
          <textarea
            ref={queryInputRef}
            className={styles.queryfield}
            placeholder="Enter Mapping Query"
            // autoFocus
          ></textarea>
        </div>
      </td>
      <td className={styles.date_col}>{getDateTodayString()}</td>
    </tr>
  );
}

// Adapted from https://codesandbox.io/s/react-parent-child-checkboxes-ebjhl?file=/src/Table.js
// https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m

/* istanbul ignore next */
const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
};

export default function MappingTable({
  mappings,
  mappingManager,
  successCallback,
  errorCallback,
}) {
  const [nextId, setNextId] = useState(0); // So we may fetch the ID from the mapping database
  const [showTemplateRow, setShowTemplateRow] = useState(false);
  const [data, setData] = useState(mappings);
  const [isParentChecked, setIsParentChecked] = useState(false);

  const parentCheckboxRef = useRef(null);

  useConstructor(() => {
    console.log("Occurs ONCE, BEFORE the initial render.");
    mappingManager.requestMapping().then((mappings) => {
      if (mappings) {
        let currData = [...mappings];
        let newData = currData.map((row) => {
          return { data: row, isChecked: false };
        });
        console.log(newData);
        if (newData.length > 0) {
          setNextId(newData[newData.length - 1].data.id + 1);
        } else setNextId(0);
        setData([...newData]);
        setParentCheckboxVal();
      } else {
        const d = new Date();
        let text = d.toTimeString().substring(0, 8);
        errorCallback("Hello from " + text);
      }
    });
    // console.log(mappings)
    // let currData = [...mappings];
    // const newData = currData.map((row) => {
    //   return {data: row, isChecked: false};
    // });

    // console.log(newData)
    // if (newData.length > 0) {
    //   setNextId(newData[newData.length - 1].data.id + 1);
    // } else setNextId(0);
    // setData([...newData]);
  });

  // const [count, setCount] = useState(0);
  const openTemplate = () => {
    setShowTemplateRow(true);
  };

  const getSelectedEntries = () => {
    let ret = data.filter((row) => row.isChecked);
    // console.log(ret);
    // if (ret == undefined){
    //   ret = [];
    // }
    return ret;
  };

  const setParentCheckboxVal = () => {
    const currData = [...data];
    if (currData.length == 0) {
      setIsParentChecked(false);
      parentCheckboxRef.current.disabled = true;
      return;
    } else if (currData.length > 0) {
      parentCheckboxRef.current.disabled = false;
    }

    const firstRowChecked = currData[0].isChecked;
    const isAllRowsSame = currData.reduce(
      (accum, row) => accum & (firstRowChecked === row.isChecked),
      true,
    );
    if (isAllRowsSame) {
      setIsParentChecked(firstRowChecked);
      parentCheckboxRef.current.indeterminate = false;
    } else {
      setIsParentChecked(false);
      parentCheckboxRef.current.indeterminate = true;
    }
  };

  useEffect(() => {
    setParentCheckboxVal();
  }, [data]);

  const toggleSelectedEntries = (e, entry) => {
    const currData = [...data];
    const { checked } = e.target;

    if (entry === "all") {
      setIsParentChecked(checked);
    }
    console.log(entry);
    currData.map((row) => {
      if (entry === "all") {
        row.isChecked = checked;
      } else {
        if (row.data.id === entry.id) {
          row.isChecked = checked;
        }
      }
      return row;
    });
    // console.log(getSelectedEntries())
    setData([...currData]);
  };

  // const changeParentCheckbox = (e, )

  const addRow = (in_name, in_query) => {
    // console.log(query);
    let newEntry = {
      id: nextId,
      name: in_name,
      query: in_query,
      date: getDateTodayString(),
      // isChecked: false,
    };
    // console.log("BLEH", getDateTodayString());
    mappingManager.createMapping(newEntry).then((response) => {
      if (response) {
        setData([...data, { data: newEntry, isChecked: false }]);

        setNextId(nextId + 1);
        setShowTemplateRow(false);
        successCallback("YAY");
      } else {
        const d = new Date();
        let text = d.toTimeString().substring(0, 8);
        errorCallback("Hello from " + text);
      }
    });
  };

  function downloadExcel(selectedMappings) {
    console.log(getSelectedEntries());
    successCallback("YAY");
  }

  function uploadExcel(selectedMappings) {
    console.log(getSelectedEntries());
  }

  function deleteRows(selectedMappings) {
    mappingManager.deleteMapping(selectedMappings).then((response) => {
      if (response) {
        const currData = data.filter((row) => !row.isChecked);
        // console.log(currData);
        setData([...currData]);
        successCallback("YAY");
      } else {
        const d = new Date();
        let text = d.toTimeString().substring(0, 8);
        errorCallback("Hello from " + text);
      }
    }); //SO IM GONNA NEED TO FIGURE OUT WHEN TO UPDATE THE UI
  }

  return (
    <div className={styles.datatable}>
      <Toolbar
        downloadCallback={() => {
          downloadExcel(getSelectedEntries());
        }}
        uploadCallback={() => {
          uploadExcel();
        }}
        deleteCallback={() => {
          deleteRows(getSelectedEntries());
        }}
      />

      <table>
        <thead>
          <tr key={"header"}>
            <th>
              <input
                id="parent-checkbox"
                ref={parentCheckboxRef}
                type="checkbox"
                checked={isParentChecked}
                onChange={(e) => toggleSelectedEntries(e, "all")}
              ></input>
            </th>
            <th>Name</th>
            <th>Query</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, id) => {
              return (
                <UIMappingRow
                  key={"ui-mapping-row" + parseInt(id)}
                  mapping={row.data}
                  rowCheckboxCallback={toggleSelectedEntries}
                  isSelected={row?.isChecked}
                />
              );
            })}
          {data.length == 0 && (
            <tr key={"none"} className={styles.norow}>
              <td className={styles.checkbox_col}></td>
              <td className={styles.name_col}></td>
              <td className={styles.query_col}>Nothing to show here!</td>
              <td className={styles.date_col}></td>
            </tr>
          )}

          {showTemplateRow && (
            <UINewRow key={"ui-new-row"} addRowCallback={addRow} />
          )}
          {!showTemplateRow && (
            <tr key={"show"} className={styles.addrow}>
              <td></td>
              <td className={styles.addrow_td}>
                <div
                  className={styles.toolbar_button}
                  id="openBtn"
                  onClick={openTemplate}
                >
                  <AddImg className={styles.image} stroke="#333333" />
                </div>
              </td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
