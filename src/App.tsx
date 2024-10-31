// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FolderCard } from "./components/folderCard/folderCard";
import { Topbar } from "./components/topbar/topbar";
function App() {
  return (
    <>
      <div className="h-[100vh] w-[100vw] p-2">
        <Topbar />

        <div className="grid grid-cols-4 gap-4">
          <FolderCard />
          <FolderCard />
          <FolderCard />
          <FolderCard />
          <FolderCard />
          <FolderCard />
        </div>
      </div>
    </>
  );
}

export default App;
