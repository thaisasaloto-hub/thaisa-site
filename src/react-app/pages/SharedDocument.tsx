import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Icon } from "@iconify/react";

interface SharedDocument {
  id: number;
  name: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "-";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileType: string | null): string {
  if (!fileType) return "lucide:file";
  if (fileType.startsWith("image/")) return "lucide:image";
  if (fileType === "application/pdf") return "lucide:file-text";
  if (fileType.includes("word")) return "lucide:file-type";
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "lucide:table";
  return "lucide:file";
}

function isPreviewable(fileType: string | null): boolean {
  if (!fileType) return false;
  return fileType.startsWith("image/") || fileType === "application/pdf";
}

export default function SharedDocument() {
  const { token } = useParams<{ token: string }>();
  const [document, setDocument] = useState<SharedDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    loadDocument();
  }, [token]);

  async function loadDocument() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shared/${token}`);
      if (!res.ok) {
        setError("Documento não encontrado ou link inválido");
        return;
      }
      const data = await res.json();
      setDocument(data.document);
      
      // Auto-load preview for previewable files
      if (data.document && isPreviewable(data.document.file_type)) {
        loadPreview();
      }
    } catch (err) {
      setError("Erro ao carregar documento");
    } finally {
      setLoading(false);
    }
  }

  async function loadPreview() {
    setPreviewLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shared/${token}/file`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      }
    } catch (err) {
      console.error("Error loading preview:", err);
    } finally {
      setPreviewLoading(false);
    }
  }

  async function handleDownload() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shared/${token}/file`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement("a");
        a.href = url;
        a.download = document?.name || "download";
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error downloading:", err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Icon icon="lucide:loader-2" className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Carregando documento...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:file-x" className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800 mb-2">Documento Não Encontrado</h1>
          <p className="text-slate-500">
            {error || "O link de compartilhamento pode ter expirado ou ser inválido."}
          </p>
        </div>
      </div>
    );
  }

  const canPreview = isPreviewable(document.file_type);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              document.file_type?.startsWith("image/") ? "bg-pink-100" : 
              document.file_type === "application/pdf" ? "bg-red-100" : "bg-slate-100"
            }`}>
              <Icon 
                icon={getFileIcon(document.file_type)} 
                className={`w-6 h-6 ${
                  document.file_type?.startsWith("image/") ? "text-pink-500" : 
                  document.file_type === "application/pdf" ? "text-red-500" : "text-slate-400"
                }`} 
              />
            </div>
            <div>
              <h1 className="font-semibold text-slate-800">{document.name}</h1>
              <p className="text-sm text-slate-500">
                {formatFileSize(document.file_size)} • Compartilhado via Thaisa Advocacia
              </p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            <Icon icon="lucide:download" className="w-5 h-5" />
            Baixar
          </button>
        </div>
      </header>

      {/* Preview Area */}
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto h-full">
          {canPreview ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[calc(100vh-160px)]">
              {previewLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-slate-500">Carregando visualização...</p>
                  </div>
                </div>
              ) : previewUrl ? (
                document.file_type?.startsWith("image/") ? (
                  <div className="flex items-center justify-center h-full p-4 bg-slate-50">
                    <img 
                      src={previewUrl} 
                      alt={document.name}
                      className="max-w-full max-h-full object-contain rounded-lg shadow"
                    />
                  </div>
                ) : document.file_type === "application/pdf" ? (
                  <iframe
                    src={previewUrl}
                    title={document.name}
                    className="w-full h-full"
                  />
                ) : null
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Icon icon="lucide:alert-circle" className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Não foi possível carregar a visualização</p>
                    <button
                      onClick={handleDownload}
                      className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                    >
                      <Icon icon="lucide:download" className="w-4 h-4" />
                      Baixar arquivo
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Icon icon={getFileIcon(document.file_type)} className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{document.name}</h2>
              <p className="text-slate-500 mb-6">
                Este tipo de arquivo não pode ser visualizado no navegador.
              </p>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Icon icon="lucide:download" className="w-5 h-5" />
                Baixar Arquivo
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 py-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            Documento compartilhado pelo sistema <span className="font-medium text-slate-700">Thaisa Advocacia</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
