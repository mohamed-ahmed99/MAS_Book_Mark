/**
 * useLoginForm.js
 * ──────────────────────────────────────────────────────────────────────────────
 * Custom hook that encapsulates all login form logic:
 *   - Controlled form state (username + password)
 *   - Client-side validation
 *   - API call via the shared `usePostMethod` hook
 *   - Success navigation via react-router
 *   - Exposes loading / error states for the UI
 *
 * Server contract (POST /auth/login):
 *   Request body : { username: string, password: string }
 *   200 success  : { status:"success", message, data:{ _id, username, role, fullName, profilePicture } }
 *   400/401/403  : { status:"fail",    message }
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostMethod } from "../../../../hooks/usePostMethod";
import { useGlobalData } from "../../../../hooks/useStore";

export const useLoginForm = () => {
  const navigate = useNavigate();

  /* ── Global store: persist logged-in user across the app ─────────────── */
  const [, setUser] = useGlobalData("user");

  /* ── Shared POST hook ──────────────────────────────────────────────────── */
  const { postData, loading_p, status_p, message_p } = usePostMethod();

  /* ── Local form state ─────────────────────────────────────────────────── */
  const [fields, setFields] = useState({ username: "", password: "" });

  /* ── Client-side field errors ─────────────────────────────────────────── */
  const [errors, setErrors] = useState({});

  /* ── Password visibility toggle ───────────────────────────────────────── */
  const [showPassword, setShowPassword] = useState(false);

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** Update a single field and clear its error on change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /** Basic client-side validation before hitting the server */
  const validate = () => {
    const newErrors = {};
    if (!fields.username.trim()) newErrors.username = "Username is required";
    if (!fields.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Form submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await postData("/api/v1/auth/login", {}, fields);

    if (result?.success === "success" && result?.data) {
      // Persist user in global store so any component can read it
      setUser(result.data);
      // Navigate to the dashboard (adjust path as needed)
      navigate("/");
    }
    // On failure, message_p from the hook is already set and will render below
  };

  return {
    fields,
    errors,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    loading: loading_p,
    serverStatus: status_p,
    serverMessage: message_p,
  };
};
