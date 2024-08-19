import React, { useState } from "react";
import { updatePassword } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { Heading } from "@aws-amplify/ui-react";
import LoggedInNav from "./LoggedInNav";
import { Toast, ToastType } from "./Toast";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast("error", "New passwords do not match.");
      return;
    }

    try {
      await updatePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      showToast("success", "Password changed successfully.");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful password change
      }, 2000);
    } catch (err) {
      showToast("error", "Failed to change password.");
    }
  };

  return (
    <div>
      <LoggedInNav />
      <div className="isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20">
          <div className="change-password-container">
            <form
              onSubmit={handleChangePassword}
              className="change-password-form"
            >
              {" "}
              <Heading marginTop="small" level={2} className="heading-cust">
                Change Password
              </Heading>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                className="input-box"
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <label htmlFor="newPassword">New Password</label>
              <input
                className="input-box"
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                className="input-box"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button className="ThemeColorBtn" type="submit">
                Change Password
              </button>
              {toast && (
                <Toast
                  type={toast.type}
                  message={toast.message}
                  onClose={() => setToast(null)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
