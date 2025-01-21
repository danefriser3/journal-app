import { JournalEntry } from "../types/JournalEntry";

interface Props {
  entry: JournalEntry;
}

const JournalEntryCard: React.FC<Props> = ({ entry }) => (
  <div className="border p-4 rounded shadow-custom">
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
    <p className="mt-2">{entry.content}</p>
  </div>
);

export default JournalEntryCard;
