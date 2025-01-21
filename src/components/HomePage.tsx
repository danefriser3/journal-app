import JournalEntryCard from "../components/JournalEntryCard";
import JournalForm from "../components/JournalForm";
import { useJournalEntry } from "../hooks/useJournalEntry";

const HomePage: React.FC = () => {
  const { addEntry, journal_entries: entries } = useJournalEntry();

  return (
    <div className="p-4 space-y-6">
      <JournalForm onSubmit={(entry) => addEntry(entry)} />
      <div className="space-y-4">
        {entries?.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
