import { useForm, SubmitHandler } from "react-hook-form";
import { JournalEntry } from "../types/JournalEntry";
import { useUser } from "../context/UserContext";

interface FormInputs {
  title: string;
  content: string;
}

interface Props {
  onSubmit: (entry: JournalEntry) => void;
}

const JournalForm: React.FC<Props> = ({ onSubmit }) => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onFormSubmit: SubmitHandler<FormInputs> = (data) => {
    onSubmit({
      ...data,
      user_id: user?.id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    reset(); // Resetta il form dopo l'invio
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Title"
          className={`w-full border p-2 shadow-custom rounded ${
            errors.title && "border-red-500"
          }`}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Write your journal entry..."
          className={`w-full border p-2 shadow-custom rounded ${
            errors.title && "border-red-500"
          }`}
          rows={3}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 shadow-custom px-4 rounded hover:bg-blue-600"
      >
        Save Entry
      </button>
    </form>
  );
};

export default JournalForm;
