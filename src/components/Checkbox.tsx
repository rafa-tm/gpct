import React, { useState } from 'react';

export default function Checkbox({ checked }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [checkedLocal, setCheckedLocal] = useState(checked ? true : false);

  return (
    <input
      className="w-5 h-5 border-2 border-gray-300 rounded-sm"
      type="checkbox"
      value={checkedLocal ? 'on' : 'off'}
      onChange={e => setCheckedLocal(e.target.checked)}
      checked={checkedLocal}
    />
  );
}
