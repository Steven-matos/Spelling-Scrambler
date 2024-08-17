import React, { useState } from "react";
import { updatePassword } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { Heading } from "@aws-amplify/ui-react";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await updatePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      setSuccess("Password changed successfully.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful password change
      }, 2000);
    } catch (err) {
      setError("Failed to change password.");
    }
  };

  return (
    <div className="isolate px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-20">
        <div className="change-password-container">
          <form
            onSubmit={handleChangePassword}
            className="change-password-form"
          >
            {" "}
            <Heading marginTop="small" level={2}>
              Change Password
            </Heading>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Change Password</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
