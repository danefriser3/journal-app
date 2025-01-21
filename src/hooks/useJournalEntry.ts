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
      return fetch(
        `https://journal-app-backend-omega.vercel.app/journal_entries/${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.json());
    },
    staleTime: 0,
    enabled: !!user?.id,
  });

  const { mutate: addEntry } = useMutation({
    mutationKey: ["addEntry"],
    mutationFn: (journal_entry: JournalEntry) => {
      fetch("https://journal-app-backend-omega.vercel.app/journal_entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...journal_entry, user_id: user?.id }),
      });
      return getEntries();
    },
    onSuccess: () => {
      return getEntries();
    },
  });
  const { mutate: deleteEntry } = useMutation({
    mutationKey: ["deleteEntry"],
    mutationFn: (id: string) => {
      fetch(
        `https://journal-app-backend-omega.vercel.app/journal_entries/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return getEntries();
    },
    onSuccess: () => {
      return getEntries();
    },
  });
  return { journal_entries, addEntry, deleteEntry };
};
