import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data.email, data.password);
    navigate("/");
  };

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="w-full md:w-6/12 self-center border p-4 shadow-custom rounded">
        <span>Login</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            value={watch("email")}
            placeholder="Email"
            className="p-2 border shadow-custom rounded"
            {...register("email", { required: true })}
          />
          <input
            value={watch("password")}
            type="password"
            placeholder="Password"
            className="p-2 border shadow-custom rounded"
            {...register("password", { required: true })}
          />
          <div className="flex flex-row gap-2 justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 shadow-custom px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <Link to="/register">
              <button className="bg-red-500 text-white py-2 shadow-custom px-4 rounded hover:bg-blue-600">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
