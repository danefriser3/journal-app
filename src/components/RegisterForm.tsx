import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { register: registerUser } = useUser();
  const { register, handleSubmit, reset } = useForm<RegisterFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    await registerUser(data.name, data.email, data.password);
    reset();
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="w-full md:w-6/12 self-center border p-4 shadow-custom rounded">
        <span>Register</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            placeholder="Name"
            className="p-2 border shadow-custom rounded"
            {...register("name", { required: true })}
          />
          <input
            placeholder="Email"
            className="p-2 border shadow-custom rounded"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border shadow-custom rounded"
            {...register("password", { required: true })}
          />
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 shadow-custom px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
