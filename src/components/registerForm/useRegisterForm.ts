import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store"; 
import { registerUser } from "@/redux/slice/authSlice"; 

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE" as "EMPLOYEE" | "ADMIN",
    password: "", 
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); 
const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill all the fields.");
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const resultAction = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("Successfully registered!");
        setLoading(true);
        router.push("/login");
      } else {
        if (resultAction.payload) {
          toast.error(resultAction.payload as string);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    } catch  {
      toast.error("An unexpected error occurred.");
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
};
