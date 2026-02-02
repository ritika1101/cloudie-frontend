"use client";

import { useState } from "react";
import { Folder, Star, Trash2, Upload, FileText, RotateCcw } from "lucide-react";

type FileItem = {
  id: string;
  name: string;
  starred: boolean;
  trashed: boolean;
};

export default function Home() {
  const [active, setActive] = useState<"drive" | "starred" | "trash">("drive");
  const [files, setFiles] = useState<FileItem[]>([]);

  function uploadFile() {
    setFiles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: `File_${prev.length + 1}.txt`,
        starred: false,
        trashed: false,
      },
    ]);
  }

  function toggleStar(id: string) {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, starred: !f.starred } : f
      )
    );
  }

  function moveToTrash(id: string) {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, trashed: true } : f
      )
    );
  }

  function restoreFile(id: string) {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, trashed: false } : f
      )
    );
  }

  const visibleFiles = files.filter((f) => {
    if (active === "drive") return !f.trashed;
    if (active === "starred") return f.starred && !f.trashed;
    if (active === "trash") return f.trashed;
  });

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f7f7fb", fontFamily: "Inter, sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{ width: 260, padding: 24, background: "white", boxShadow: "2px 0 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "#7c3aed" }}>☁️ Cloudie</h2>

        <div style={{ marginTop: 40 }}>
          <Menu icon={<Folder />} text="My Drive" active={active === "drive"} onClick={() => setActive("drive")} />
          <Menu icon={<Star />} text="Starred" active={active === "starred"} onClick={() => setActive("starred")} />
          <Menu icon={<Trash2 />} text="Trash" active={active === "trash"} onClick={() => setActive("trash")} />
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>
            {active === "drive" && "My Drive"}
            {active === "starred" && "Starred"}
            {active === "trash" && "Trash"}
          </h1>

          {active === "drive" && (
            <button
              onClick={uploadFile}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(90deg,#6366f1,#ec4899)",
                color: "white",
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Upload size={18} /> Upload
            </button>
          )}
        </div>

        {/* Files */}
        <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 20 }}>
          {visibleFiles.map((file) => (
            <div key={file.id} style={{ padding: 20, background: "white", borderRadius: 16, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}>
              <FileText size={36} />
              <p style={{ marginTop: 10 }}>{file.name}</p>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {!file.trashed && (
                  <button onClick={() => toggleStar(file.id)}>
                    <Star color={file.starred ? "gold" : "gray"} />
                  </button>
                )}

                {!file.trashed ? (
                  <button onClick={() => moveToTrash(file.id)}>
                    <Trash2 />
                  </button>
                ) : (
                  <button onClick={() => restoreFile(file.id)}>
                    <RotateCcw />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleFiles.length === 0 && (
          <p style={{ marginTop: 100, textAlign: "center", color: "#6b7280" }}>
            No files here
          </p>
        )}
      </div>
    </div>
  );
}

function Menu({ icon, text, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 12,
        marginBottom: 10,
        background: active ? "#ede9fe" : "transparent",
        color: active ? "#7c3aed" : "#111827",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {icon}
      {text}
    </div>
  );
}
