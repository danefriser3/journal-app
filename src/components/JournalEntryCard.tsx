import { useState } from "react";
import { useJournalEntry } from "../hooks/useJournalEntry";
import { JournalEntry } from "../types/JournalEntry";

interface Props {
  entry: JournalEntry;
}

const JournalEntryCard: React.FC<Props> = ({ entry }) => {
  const { deleteEntry } = useJournalEntry();

  const [maxLength, setMaxLength] = useState(190);
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="border p-4 rounded shadow-custom flex flex-row">
      <div className="w-11/12">
        <h2 className="font-bold text-lg">{entry.title}</h2>
        <p className="text-sm text-gray-600">
          {new Date(entry.created_at).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
        <p className="mt-2 text-justify">
          {entry.content.slice(0, maxLength)}{" "}
          {entry.content.length > 190 && !readMore && (
            <button
              onClick={() => {
                setMaxLength(entry.content.length);
                setReadMore(true);
              }}
              className="text-blue-700 font-bold"
            >
              ...read more...
            </button>
          )}
        </p>
      </div>
      <button
        className="w-1/12 self-start text-center p-0 bg-blue-500 font-bold text-white rounded"
        onClick={() => deleteEntry(entry.id!)}
      >
        x
      </button>
    </div>
  );
};

export default JournalEntryCard;
