import { useMutation, useQuery } from "@tanstack/react-query";
import { JournalEntry } from "../types/JournalEntry";
import { useUser } from "../context/UserContext";

export const useJournalEntry = () => {
  const { user } = useUser();

  const { data: journal_entries, refetch: getEntries } = useQuery<
    JournalEntry[]
  >({
    queryKey: ["journal_entries"],
    queryFn: () => {
      return fetch(`http://localhost:3000/journal_entries/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    },
    staleTime: 0,
    enabled: !!user?.id,
  });

  const { mutate: addEntry } = useMutation({
    mutationKey: ["addEntry"],
    mutationFn: (newExpense: JournalEntry) => {
      fetch("http://localhost:3000/journal_entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newExpense, user_id: user?.id }),
      });
      return getEntries();
    },
  });
  return { journal_entries, addEntry };
};
