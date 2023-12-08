/**
 * @module MappingTable
 */

import { useState, useRef, useEffect } from 'react';
import Toolbar from './toolbar';
import getDateTodayString from './getdatestring';

import styles from './page.module.css';

import AddImg from './img/add.svg';
import ConfirmImg from './img/confirm.svg';
import SlashImg from './img/slash.svg';
import CancelImg from './img/cancel.svg';
import DropdownMenu from './dropdown';
import ExcelHandler from './excelhandler';

/**
 * @class
 * A selectable row of a table displaying the fields
 * of a mapping entry.
 *
 * @param {Callback} rowCheckboxCallback a callback called when the checkbox is toggled
 * @param {Entry} mapping the mapping entry to display
 * @param {Boolean} isSelected whether or not the row is selected
 * @returns {ReactNode} a component that renders an entry row of the mapping table.
 */
export function UIMappingRow({ rowCheckboxCallback, mapping, isSelected }) {
    /**
     * @inner
     * @method module:MappingTable.UIMappingRow.onSelectChange
     * @description Called when the checkbox is toggled.
     *
     * @param {HTMLEvent} e the event of the checkbox toggle
     */
    const onSelectChange = (e) => {
        rowCheckboxCallback(e, mapping);
    };

    /**
     * @inner
     * @method module:MappingTable.UIMappingRow.formatQuery
     * @description Formats the mapping query into a readable format
     * @param {String} query the mapping query
     * @returns {String} a formatted query used for display in the row
     */
    const formatQuery = (query) => {
        // Remove new lines
        query = query.replaceAll('\n', '');
        query = query.replaceAll(/\s\s+/g, ' '); // this messes up strings...

        // Add new lines before WHERE,
        query = query.replaceAll('WHERE', '\nWHERE');
        // After . {  )
        query = query.replaceAll(/([\.\{\)])/g, '$&\n    ');
        // query = query.replaceAll(/[A-Z]+\([^.]*\)/g, );
        query = query.replaceAll(/\s+(\})\s*/g, '\n}\n');

        return query;
    };

    return (
        <tr className={styles.entry_row}>
            <td className={styles.checkbox_col}>
                <input
                    type="checkbox"
                    onChange={onSelectChange}
                    checked={isSelected}
                ></input>
            </td>
            <td className={styles.name_col}>{mapping.name}</td>
            <td className={styles.query_col}>
                <DropdownMenu
                    trigger={
                        <div className={styles.querybutton}>
                            <div>View Mapping</div>
                        </div>
                    }
                    child={
                        <textarea
                            value={formatQuery(mapping.query)}
                            readOnly={true}
                        />
                    }
                />
            </td>
            <td className={styles.date_col}>{mapping.date}</td>
        </tr>
    );
}

/**
 * @class
 * A row in the mapping table that allows the user to input the fields of a new mapping.
 * @param {Callback} addRowCallback a callback called when the add row button is clicked.
 * @param {Callback} closeCallback a callback called when the cancel button is clicked
 * @returns {ReactNode} a component that renders an input row in the table.
 */
function UINewRow({ addRowCallback, closeCallback }) {
    const nameInputRef = useRef(null);
    const queryInputRef = useRef(null);

    /**
     * @method  module:MappingTable.UIMappingRow.onInputSubmit
     * @description Called when the user clicks on the submit button.
     */
    const onInputSubmit = () => {
        addRowCallback(nameInputRef.current.value, queryInputRef.current.value);
    };

    return (
        <tr key={'add-row'} className={styles.newrow}>
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
                        <ConfirmImg
                            className={styles.image}
                            alt="HAI"
                            stroke="#00AA00"
                        />
                    </div>

                    <div className={styles.toolbar_slash} id="addBtn">
                        <SlashImg
                            className={styles.image}
                            alt="HAI"
                            stroke="#00AA00"
                        />
                    </div>

                    <div
                        className={styles.toolbar_button}
                        id="addBtn"
                        onClick={closeCallback}
                    >
                        <CancelImg className={styles.image} alt="HAI" />
                    </div>
                </div>
            </td>
            <td className={styles.query_col}>
                <div className={styles.namefield}>
                    <p>Name:</p>
                    <input
                        ref={nameInputRef}
                        type="text"
                        placeholder="Enter Mapping Name"
                        autoFocus
                    ></input>
                </div>
                <div className={styles.queryfield}>
                    <p>Query: </p>
                    <textarea
                        ref={queryInputRef}
                        placeholder="Enter Mapping Query"
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
// const useConstructor = (callBack = () => {}) => {
//     const [hasBeenCalled, setHasBeenCalled] = useState(false);
//     if (hasBeenCalled) return;
//     callBack();
//     setHasBeenCalled(true);
// };

/**
 * @typedef {Object} EntryData
 * Bookkeeping for row selection.
 * @property {Entry} data the contained entry
 * @property {Boolean} isChecked whether or not the associated row is selected
 */

/**
 * @class
 *
 * A table where each row contains an entry and the last row can be used to add mappings.
 *
 * @param {Entry[]} mappings a list of initial mappings (used for debugging)
 * @param {String} fusekiUrl the url of the Fuseki KB
 * @param {MappingManager} mappingManager an instance of the MappingManager
 * @param {ExcelHandler} excelHandler an instance of the ExcelHandler
 * @param {Callback} notifCallback a callback for making notifications
 *
 * @property {Boolean} showTemplateRow whether or not the last row is open or not
 * @property {EntryData[]} data a list of entries in the mapping table with bookkeeping
 * @property {Boolean} isParentChecked whether or not the parent checkbox is checked
 * @returns {ReactNode} a component that renders a table of mappings
 */
export default function MappingTable({
    mappings,
    fusekiUrl,
    mappingManager,
    excelHandler,
    notifCallback,
}) {
    const [showTemplateRow, setShowTemplateRow] = useState(false);
    const [data, setData] = useState(mappings);
    const [isParentChecked, setIsParentChecked] = useState(false);

    const parentCheckboxRef = useRef(null);

    /**
     * @method loadMappings
     * @description Loads mappings into the table by requesting them from the mapping manager.
     */
    const loadMappings = () => {
        mappingManager.requestMapping().then((mappings) => {
            if (mappings) {
                let currData = [...mappings.result];
                let newData = currData.map((row) => {
                    return { data: row, isChecked: false };
                });
                setData([...newData]);
                setParentCheckboxVal();
                notifCallback('Mappings successfully retrieved!', false);
            } else {
                notifCallback(
                    'Mapping retrieval failed. Please refresh and try again.',
                    true
                );
            }
        });
    };

    // useConstructor(() => {
    //     console.log('Occurs ONCE, BEFORE the initial render.');
    // });

    /**
     * @method openTemplate
     * @description Expands the last row for mapping input.
     */
    const openTemplate = () => {
        setShowTemplateRow(true);
    };

    /**
     * @method getSelectedEntries
     * @description Gets a list of EntryData whose row is selected.
     * @returns {EntryData[]} a list of EntryData
     */
    const getSelectedEntries = () => {
        let ret = data.filter((row) => row.isChecked);
        return ret;
    };

    /**
     * @method setParentCheckboxVal
     * @description Sets the value of the parent checkbox based on the values of the child checkboxes.
     */
    const setParentCheckboxVal = () => {
        const currData = [...data];
        if (parentCheckboxRef.current != null) {
            if (currData.length == 0) {
                setIsParentChecked(false);
                parentCheckboxRef.current.disabled = true;
            } else if (currData.length > 0) {
                parentCheckboxRef.current.disabled = false;
                const firstRowChecked = currData[0].isChecked;
                const isAllRowsSame = currData.reduce(
                    (accum, row) => accum & (firstRowChecked === row.isChecked),
                    true
                );
                if (isAllRowsSame) {
                    setIsParentChecked(firstRowChecked);
                    parentCheckboxRef.current.indeterminate = false;
                } else {
                    setIsParentChecked(false);
                    parentCheckboxRef.current.indeterminate = true;
                }
            }
        }
    };

    useEffect(() => {
        setParentCheckboxVal();
    }, [data]);

    useEffect(() => {
        if (fusekiUrl != '') {
            loadMappings();
        }
    }, [fusekiUrl]);

    /**
     * @method uncheckAllEntries
     * @description Unchecks all the rows in the table.
     */
    const uncheckAllEntries = () => {
        const currData = [...data];

        setIsParentChecked(false);
        currData.map((row) => {
            row.isChecked = false;
            return row;
        });
        setData([...currData]);
    };

    /**
     * @method toggleSelectedEntries
     * @description Called whenever a checkbox is toggled.
     * @param {HTMLEvent} e the event associated with the checkbox toggle
     * @param {EntryData} entry the associated entry
     */
    const toggleSelectedEntries = (e, entry) => {
        const currData = [...data];
        const { checked } = e.target;

        if (entry === 'all') {
            setIsParentChecked(checked);
        }
        currData.map((row) => {
            if (entry === 'all') {
                row.isChecked = checked;
            } else {
                if (row.data.id === entry.id) {
                    row.isChecked = checked;
                }
            }
            return row;
        });
        setData([...currData]);
    };

    /**
     * @method addRow
     * @description Requests the mapping manager to create a mapping on the
     * backend, and on success, adds a row to the mapping table.
     * @param {String} in_name the mapping name
     * @param {String} in_query the mapping query
     */
    const addRow = (in_name, in_query) => {
        if (in_name == '') {
            notifCallback('Name field cannot be empty.', true);
            return;
        }

        if (in_query == '') {
            notifCallback('Query field cannot be empty.', true);
            return;
        }

        let newEntry = {
            name: in_name,
            query: in_query,
        };
        mappingManager.createMapping(newEntry).then((response) => {
            if (response) {
                (newEntry.id = response.id),
                    (newEntry.date = response.date),
                    setData([...data, { data: newEntry, isChecked: false }]);
                setShowTemplateRow(false);
                notifCallback(`Mapping "${newEntry.name}" created.`, false);
            } else {
                notifCallback(
                    `Cannot create mapping "${newEntry.name}".`,
                    true
                );
            }
        });
    };

    /**
     * @method downloadExcel
     * @description Requests the excelHandler to download an Excel sheet from the
     * backend based on the selected mapping rows.
     * @param {EntryData[]} selectedMappings a list of selected mappings
     */
    function downloadExcel(selectedMappings) {
        if (selectedMappings.length == 0) {
            notifCallback('No mappings selected for download.', true);
            return;
        }
        excelHandler.downloadExcel(selectedMappings).then((response) => {
            if (response) {
                notifCallback('Successfully downloaded data.', false);
                uncheckAllEntries();
            } else {
                notifCallback('Cannot download excel sheet', true);
            }
        });
    }

    /**
     * @method uploadExcel
     * @description Requests the excelHandler to upload an Excel sheet to the backend
     * for updating the KB.
     * @param {Excel} selectedFile the uploaded file
     */
    function uploadExcel(selectedFile) {
        excelHandler.uploadExcel(selectedFile).then((response) => {
            if (response) {
                notifCallback('Uploaded and updated knowledge base.', false);
            } else {
                notifCallback('Cannot upload/update knowledge base', true);
            }
        });
    }

    /**
     * @method deleteRows
     * @description Requests the mappingManager to delete the selected rows from
     * the backend and on success, the rows are removed from the mapping table.
     * @param {EntryData[]} selectedMappings a list of selected mappings
     */
    function deleteRows(selectedMappings) {
        if (selectedMappings.length == 0) {
            notifCallback('No mappings selected for deletion.', true);
            return;
        }
        mappingManager.deleteMapping(selectedMappings).then((response) => {
            if (response) {
                const beforeLen = data.length;
                const currData = data.filter((row) => !row.isChecked);
                setData([...currData]);
                const newLen = beforeLen - currData.length;
                notifCallback(
                    `Deleted ${newLen} mapping${newLen > 1 ? 's' : ''}.`,
                    false
                );
            } else {
                notifCallback('Cannot delete mappings.', true);
            }
        });
    }

    return (
        <div className={styles.datatable}>
            <Toolbar
                downloadCallback={() => {
                    downloadExcel(getSelectedEntries());
                }}
                uploadCallback={(selectedFile) => {
                    uploadExcel(selectedFile);
                }}
                deleteCallback={() => {
                    deleteRows(getSelectedEntries());
                }}
            />

            <table>
                <thead>
                    <tr key={'header'}>
                        <th>
                            <input
                                id="parent-checkbox"
                                ref={parentCheckboxRef}
                                type="checkbox"
                                checked={isParentChecked}
                                onChange={(e) =>
                                    toggleSelectedEntries(e, 'all')
                                }
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
                                    key={'ui-mapping-row' + parseInt(id)}
                                    mapping={row.data}
                                    rowCheckboxCallback={toggleSelectedEntries}
                                    isSelected={row?.isChecked}
                                />
                            );
                        })}
                    {data.length == 0 && (
                        <tr key={'none'} className={styles.norow}>
                            <td className={styles.checkbox_col}></td>
                            <td className={styles.name_col}></td>
                            <td className={styles.query_col}>
                                Nothing to show here!
                            </td>
                            <td className={styles.date_col}></td>
                        </tr>
                    )}

                    {showTemplateRow && (
                        <UINewRow
                            key={'ui-new-row'}
                            addRowCallback={addRow}
                            closeCallback={() => {
                                setShowTemplateRow(false);
                            }}
                        />
                    )}
                    {!showTemplateRow && (
                        <tr key={'show'} className={styles.addrow}>
                            <td></td>
                            <td className={styles.addrow_td}>
                                <div
                                    className={styles.toolbar_button}
                                    id="openBtn"
                                    onClick={openTemplate}
                                >
                                    <AddImg
                                        className={styles.image}
                                        stroke="#333333"
                                    />
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
