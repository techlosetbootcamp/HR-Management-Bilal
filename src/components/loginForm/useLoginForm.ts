import { useState } from "react";
import { signIn } from "next-auth/react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Import useSession

export const useLoginForm = () => {
  useAuth(true);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession(); // Get user session

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }

    const response = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (response?.error) {
      setError("Invalid credentials. Please try again.");
      toast.error("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    toast.success("Successfully logged in!");

    setTimeout(() => {
      const userRole = session?.user?.role || "EMPLOYEE"; // Default to EMPLOYEE

      if (userRole === "ADMIN") {
        router.push("/admin-dashboard");
      } else {
        router.push("/");
      }
    }, 500);
  };

  return { formData, handleChange, handleSubmit, error, loading };
};
