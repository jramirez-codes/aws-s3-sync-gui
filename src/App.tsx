import "./App.css";
import { FolderCard } from "./components/folderCard/folderCard";
import { Topbar } from "./components/topbar/topbar";
import React from "react";
import { S3Link } from "./types/s3Link";
import { load } from "@tauri-apps/plugin-store";
import { InfoSheet } from "./components/infoSheet/infoSheet";
import { Command } from "@tauri-apps/plugin-shell";
import { ErrorAlert } from "./components/errorAlert/errorAlert";
import { SingleErrorMessage } from "./types/singleErrorMessage";
import { DeleteCard } from "./components/deleteCard.tsx/deleteCard";

function App() {
  const [s3Links, setS3Links] = React.useState<S3Link[]>([]);
  const [selectedS3Link, setSelectedS3Link] = React.useState<S3Link | null>(
    null,
  );
  const [selectedS3LinkIdx, setSelectedS3LinkIdx] = React.useState(-1);
  const [selectedUploadIdx, setSelectedUploadIdx] = React.useState(-1);
  const [selectedDownloadIdx, setSelectedDownloadIdx] = React.useState(-1);
  const [selectedDeleteIdx, setSelectedDeleteIdx] = React.useState(-1);
  const [isPullingAllDirectories, setIsPullingAllDirectories] =
    React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState<
    SingleErrorMessage[]
  >([]);

  async function cacheData(data: any) {
    // Update State Store
    const store = await load("store.json", { autoSave: false });
    await store.set("s3Links", data);
    await store.save();
  }

  async function syncSingleS3Link(idx: number, isUploading: boolean) {
    let res;
    // Handle Upload
    if (isUploading) {
      setSelectedUploadIdx((_) => idx);
      res = await Command.create("aws-s3-sync", [
        "s3",
        "sync",
        s3Links[idx].filePath,
        s3Links[idx].s3Path,
      ]).execute();
      setSelectedUploadIdx((_) => -1);
    }
    // Handle Download
    else {
      setSelectedDownloadIdx((_) => idx);
      res = await Command.create("aws-s3-sync", [
        "s3",
        "sync",
        s3Links[idx].s3Path,
        s3Links[idx].filePath,
      ]).execute();
      setSelectedDownloadIdx((_) => -1);
    }

    // Alert User if error has occured
    if (res.code !== 0) {
      setErrorMessages([
        {
          title: `Error: ${s3Links[idx].title}`,
          description: "Please check file path",
        },
      ]);
    }
  }

  async function handlePullAddDirectories() {
    if (!isPullingAllDirectories) {
      setIsPullingAllDirectories((_) => true);
      for (let idx in s3Links) {
        await syncSingleS3Link(parseInt(idx), false);
      }
      setIsPullingAllDirectories((_) => false);
    }
  }

  async function handleDeleteS3Link(idx: number) {
    // Remove Link From State
    let reducedS3Links = s3Links.filter((_, currIdx) => currIdx !== idx);
    setS3Links((_) => reducedS3Links);

    // Update State Store
    cacheData(reducedS3Links);

    // Updated Selected link to empty
    setSelectedDeleteIdx(-1);
  }

  async function handleUpdateS3Link(newS3Link: S3Link) {
    setS3Links((e) => {
      e[selectedS3LinkIdx] = newS3Link;
      cacheData(e);
      return e;
    });
  }

  async function handleOpenInfo(idx: number) {
    setSelectedS3LinkIdx(idx);
    setSelectedS3Link(s3Links[idx]);
  }

  // Fetch Links
  React.useEffect(() => {
    const asyncFunc = async () => {
      const store = await load("store.json", { autoSave: false });
      let newS3Links: S3Link[] = [];
      if (await store.has("s3Links")) {
        let storeData = await store.get<S3Link[]>("s3Links");
        newS3Links = storeData ? storeData : [];
        setS3Links(newS3Links);
      }
    };
    asyncFunc();
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100vw] p-2">
        <Topbar
          isPullingAllDirectories={isPullingAllDirectories}
          setS3Links={setS3Links}
          onPullAllDirectories={() => {
            handlePullAddDirectories();
          }}
        />
        <div className="grid grid-cols-4 gap-4 items-stretch">
          {s3Links.map((e, idx) => {
            return (
              <FolderCard
                s3Link={e}
                idx={idx}
                key={idx + e.title}
                isDownloading={selectedDownloadIdx === idx}
                isUploading={selectedUploadIdx === idx}
                isFetching={
                  isPullingAllDirectories ||
                  selectedDownloadIdx === idx ||
                  selectedUploadIdx === idx
                }
                onUpload={(idx: number) => {
                  syncSingleS3Link(idx, true);
                }}
                onDownload={(idx: number) => {
                  syncSingleS3Link(idx, false);
                }}
                onDelete={(idx: number) => {
                  setSelectedDeleteIdx(idx);
                }}
                onOpenInfo={(idx: number) => {
                  handleOpenInfo(idx);
                }}
              />
            );
          })}
        </div>
        <InfoSheet
          s3Link={selectedS3Link}
          setSelectedS3Link={setSelectedS3Link}
          onS3LinkUpdate={(newS3Link: S3Link) => {
            handleUpdateS3Link(newS3Link);
          }}
        />
        <ErrorAlert
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
        <DeleteCard
          s3Link={selectedDeleteIdx !== -1 ? s3Links[selectedDeleteIdx] : null}
          onS3LinkDelete={() => {
            handleDeleteS3Link(selectedDeleteIdx);
          }}
          setSelectedS3Link={() => setSelectedDeleteIdx(-1)}
        />
      </div>
    </>
  );
}

export default App;
