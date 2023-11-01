import React, { useState } from 'react';

export default function Checkbox({ checked }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [checkedLocal, setCheckedLocal] = useState(checked ? true : false);

  return (
    <input
      className="w-4 h-4 border-2 border-gray-300 rounded-sm"
      type="checkbox"
      value={checkedLocal}
      onChange={e => setCheckedLocal(e.target.checked)}
      checked={checkedLocal}
    />
  );
}
