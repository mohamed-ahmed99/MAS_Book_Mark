import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import { useFormDataMethod } from "../../../../hooks/useFormDataMethod";
import { useGlobalData } from "../../../../hooks/useStore";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import PrivacyMessage from "./PrivacyMessage";
import GenderSelect from "./GenderSelect";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

const INITIAL_FORM = {
  username: "",
  password: "",
  confirmPassword: "",
  age: "",
  fullName: "",
  country: "",
  gender: "",
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [_, setGlobalUser] = useGlobalData("user");

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { sendFormData, message_fd, status_fd, loading_fd } = useFormDataMethod();

  const handleChange = (e) => {
    setLocalError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setLocalError("");
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters long.";
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 5 || age > 120)
      return "Age must be between 5 and 120.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMessage("");

    const validationError = validate();
    if (validationError) {
      setLocalError(validationError);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
      return;
    }

    const data = new FormData();
    data.append("username", formData.username.trim());
    data.append("password", formData.password);
    data.append("age", formData.age.toString());
    if (formData.fullName.trim()) data.append("fullName", formData.fullName.trim());
    if (formData.country.trim()) data.append("country", formData.country.trim());
    if (formData.gender) data.append("gender", formData.gender);
    if (profilePicture) data.append("profilePicture", profilePicture);

    const result = await sendFormData("/api/v1/auth/create_account", "POST", data);

    if (result?.success === "success") {
      setSuccessMessage(result.message || "Account created successfully!");
      if (result.data?.newUser) setGlobalUser(result.data.newUser);
      setTimeout(() => navigate("/"), 1500);
    }

    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const displayError = localError || (status_fd !== "success" ? message_fd : "");

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-canvas">
      <div className="w-full max-w-md bg-elevated border border-border rounded p-6 shadow-sm">
        <h1 className="text-2xl font-medium tracking-tight mb-2 text-text-high">Create Account</h1>

        <PrivacyMessage />
        <ErrorMessage displayError={displayError} />
        <SuccessMessage successMessage={successMessage} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="font-mono text-sm"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            required
            value={formData.password}
            onChange={handleChange}
            className="font-mono text-sm"
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="font-mono text-sm"
          />
          <Input
            name="age"
            type="number"
            placeholder="Age (5-120)"
            required
            min="5"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="font-mono text-sm"
          />

          <div className="h-px w-full bg-border my-1" />

          <Input
            name="fullName"
            placeholder="Full Name (Optional)"
            value={formData.fullName}
            onChange={handleChange}
            className="text-sm"
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              name="country"
              placeholder="Country (Optional)"
              value={formData.country}
              onChange={handleChange}
              className="text-sm"
            />
            <GenderSelect value={formData.gender} onChange={handleChange} />
          </div>

          <ProfilePhotoUpload
            previewUrl={previewUrl}
            handleFileChange={handleFileChange}
          />

          <Button
            type="submit"
            disabled={loading_fd || !!successMessage}
            isLoading={loading_fd}
            className="mt-4 w-full"
          >
            {loading_fd ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center text-xs text-text-medium mt-2">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-text-high font-medium hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

