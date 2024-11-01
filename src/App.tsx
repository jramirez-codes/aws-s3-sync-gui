// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { FolderCard } from "./components/folderCard/folderCard";
import { Topbar } from "./components/topbar/topbar";
import React from "react";
import { S3Link } from "./types/s3Link";
import { load } from "@tauri-apps/plugin-store";
import { InfoSheet } from "./components/infoSheet/infoSheet";
import { Command } from '@tauri-apps/plugin-shell'
function App() {
  const [s3Links, setS3Links] = React.useState<S3Link[]>([])
  const [selectedS3Link, setSelectedS3Link] = React.useState<S3Link | null>(null)
  const [selectedUploadIdx, setSelectedUploadIdx] = React.useState(-1)
  const [selectedDownloadIdx, setSelectedDownloadIdx] = React.useState(-1)

  async function syncSingleS3Link(idx: number, isUploading: boolean) {
    let res
    // Handle Upload
    if (isUploading) {
      setSelectedUploadIdx(_ => idx)
      res = await Command.create('aws-s3-sync', ['s3', 'sync', s3Links[idx].filePath, s3Links[idx].s3Path]).execute()
      setSelectedUploadIdx(_ => -1)
    }
    // Handle Download
    else {
      setSelectedDownloadIdx(_ => idx)
      res = await Command.create('aws-s3-sync', ['s3', 'sync', s3Links[idx].s3Path, s3Links[idx].filePath]).execute()
      setSelectedDownloadIdx(_ => -1)
    }
  }

  async function handleDeleteS3Link(idx: number) {
    // Remove Link From State
    let reducedS3Links = s3Links.filter((_, currIdx) => currIdx !== idx)
    setS3Links(_ => reducedS3Links)

    // Update State Store
    const store = await load('store.json', { autoSave: false });
    await store.set('s3Links', reducedS3Links)
    await store.save()

    setSelectedS3Link(null)
  }

  async function handleOpenInfo(idx: number) {
    setSelectedS3Link(s3Links[idx])
  }


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
        <div className="grid grid-cols-4 gap-4 items-stretch">
          {s3Links.map((e, idx) => {
            return (
              <FolderCard
                s3Link={e}
                idx={idx}
                key={idx + e.title}
                isDownloading={selectedDownloadIdx === idx}
                isUploading={selectedUploadIdx === idx}
                isFetching={selectedDownloadIdx === idx || selectedUploadIdx === idx}
                onUpload={(idx: number) => {
                  syncSingleS3Link(idx, true)
                }}
                onDownload={(idx: number) => {
                  syncSingleS3Link(idx, false)
                }}
                onDelete={(idx: number) => {
                  handleDeleteS3Link(idx)
                }}
                onOpenInfo={(idx: number) => {
                  handleOpenInfo(idx)
                }}
              />
            )
          })}
        </div>
        <InfoSheet s3Link={selectedS3Link} setSelectedS3Link={setSelectedS3Link} />
      </div>
    </>
  );
}

export default App;
