// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FolderCard } from "./components/folderCard/folderCard";
import { Topbar } from "./components/topbar/topbar";
import React from "react";
import { S3Link } from "./types/s3Link";
import { load } from "@tauri-apps/plugin-store";
function App() {
  const [s3Links, setS3Links] = React.useState<S3Link[]>([])

  // Fetch Links
  React.useEffect(() => {
    const asyncFunc = async () => {
      const store = await load('store.json', { autoSave: false });
      let newS3Links: S3Link[] = []
      if (await store.has("s3Links")) {
        let storeData = await store.get<S3Link[]>('s3Links');
        newS3Links = storeData ? storeData : []
        setS3Links(newS3Links)
      }
    }
    asyncFunc()

  }, [])

  return (
    <>
      <div className="h-[100vh] w-[100vw] p-2">
        <Topbar setS3Links={setS3Links} />
        <div className="grid grid-cols-4 gap-4">
          {s3Links.map((e) => {
            return (
              <FolderCard s3Link={e}/>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
