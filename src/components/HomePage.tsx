import { useState } from "react";
import JournalEntryCard from "../components/JournalEntryCard";
import JournalForm from "../components/JournalForm";
import { useJournalEntry } from "../hooks/useJournalEntry";

const HomePage: React.FC = () => {
  const { addEntry, journal_entries: entries } = useJournalEntry();

  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 space-y-6">
      <button
        className="bg-blue-500 w-full text-white py-2 shadow-custom px-4 rounded hover:bg-blue-600"
        onClick={() => setOpen((p) => !p)}
      >
        {(open && "Close") || "New Entry"}
      </button>
      {open && (
        <>
          <hr className="border-black" />
          <JournalForm onSubmit={(entry) => addEntry(entry)} />
        </>
      )}
      <hr className="border-black" />
      <div
        className={`space-y-4 overflow-auto p-1 ${
          (open && "h-[480px]") || "h-[764px]"
        }`}
      >
        {entries?.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
