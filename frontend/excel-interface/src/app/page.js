"use client"; // This is a client component 👈🏽

import styles from "./page.module.css";

import MappingManager from "./mapping_manager";
import Header from "./header";
import MappingTable from "./mapping_table";

// Example of a data array that

const mappingManager = new MappingManager();
const MAPPINGS = []; //mappingManager.requestMapping();

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <MappingTable mappings={MAPPINGS} mappingManager={mappingManager} />
    </main>
  );
}
