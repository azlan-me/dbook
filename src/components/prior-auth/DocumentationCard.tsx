import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export function DocumentationCard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    // Simulate file upload
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("Files uploaded successfully");
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Add files to documents list
    const newDocuments: Document[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    }));

    setDocuments((prev) => [...prev, ...newDocuments]);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUp className="h-5 w-5" />
          Documentation Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors"
        >
          <p className="text-muted-foreground">
            Drag and drop files here or click to select
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Select Files
          </Button>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Uploading...</p>
            <Progress value={uploadProgress} />
          </div>
        )}

        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50"
            >
              <File className="h-4 w-4" />
              <span className="flex-1">{doc.name}</span>
              <span className="text-sm text-muted-foreground">
                {(doc.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}