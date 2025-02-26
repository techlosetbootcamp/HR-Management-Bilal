import React from "react";
import InfoInput from "../infoInput/InfoInput";

interface AccountAccessProps {
  form: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AccountAccess({ form, handleChange }: AccountAccessProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
      <InfoInput
        type="email"
        name="email"
        placeholder="Enter Email Address"
        value={form.email}
        onChange={handleChange}
      />
      
      <InfoInput
        name="slackId"
        placeholder="Enter Slack ID"
        value={form.slackId}
        onChange={handleChange}
      />

      <InfoInput
        name="skypeId"
        placeholder="Enter Skype ID"
        value={form.skypeId}
        onChange={handleChange}
      />

      <InfoInput
        name="githubId"
        placeholder="Enter Github ID"
        value={form.githubId}
        onChange={handleChange}
      />
    </div>
  );
}