import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

export function NotesCard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      content: newNote,
      author: "Current User", // Replace with actual user
      timestamp: new Date().toISOString(),
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button onClick={handleAddNote} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 rounded-lg bg-accent/50 space-y-2"
            >
              <p>{note.content}</p>
              <p className="text-sm text-muted-foreground">
                By {note.author} on {format(new Date(note.timestamp), "PPpp")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}