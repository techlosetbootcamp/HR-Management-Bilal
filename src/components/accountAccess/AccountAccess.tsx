import React from "react";
import InfoInput from "../infoInput/InfoInput";

interface AccountAccessProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function AccountAccess({ form, handleChange }: AccountAccessProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Account Access</h3>
      <InfoInput name="userName" placeholder="Username" value={form.userName} onChange={handleChange} />
      <InfoInput name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} />
      <InfoInput name="skypeId" placeholder="Skype ID" value={form.skypeId} onChange={handleChange} />
      <InfoInput name="slackId" placeholder="Slack ID" value={form.slackId} onChange={handleChange} />
      <InfoInput name="githubId" placeholder="GitHub ID" value={form.githubId} onChange={handleChange} />
    </div>
  );
}
