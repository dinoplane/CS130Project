
import { useState , useRef, useEffect} from "react";
import Toolbar from "./toolbar";
import getDateTodayString from "./getdatestring";

import styles from "./page.module.css";

import AddImg from './img/add.svg';
import ConfirmImg from './img/confirm.svg'


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
          autoFocus
        ></input>
      </td>
      <td className={styles.date_col}>{getDateTodayString()}</td>
    </tr>
    );

  }


  // Adapted from https://codesandbox.io/s/react-parent-child-checkboxes-ebjhl?file=/src/Table.js
  // https://dev.to/bytebodger/constructors-in-functional-components-with-hooks-280m


  const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }

  export default function MappingTable({mappings, mappingManager}) {
    const [nextId, setNextId] = useState(0); // So we may fetch the ID from the mapping database
    const [showTemplateRow, setShowTemplateRow] = useState(false);
    const [data, setData] = useState(mappings);
    const [isParentChecked, setIsParentChecked] = useState(false);

    const parentCheckboxRef = useRef(null);

    useConstructor(() => {
      // console.log(
      //   "Occurs ONCE, BEFORE the initial render."
      // );
      console.log(data)
      const currData = [...data]
      currData.map((row) => {
        row.isChecked = false;
        return row;
      });
      if (data.length > 0){
        setNextId(currData[currData.length - 1].id + 1);
      } else setNextId(0);
      setData([...currData])
    });

    // const [count, setCount] = useState(0);
    const openTemplate = () => {
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
        parentCheckboxRef.current.disabled = true;
        return;
      } else if (currData.length == 1) {
        parentCheckboxRef.current.disabled = false;
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

    const addRow = (query) => {
      // console.log(query);
      console.log("BLEH", getDateTodayString());
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
                      id="openBtn"
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
