import { useState } from 'react';

interface CheckboxCustomProps {
  checked: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
}

export default function CheckboxCustom({ checked, label, onChange: onChangeExternal }: CheckboxCustomProps) {
  const [checkedLocal, setCheckedLocal] = useState(checked ? true : false);

  if (label) {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          value={checkedLocal ? 'on' : 'off'}
          onChange={e => {
            setCheckedLocal(e.target.checked);
            onChangeExternal && onChangeExternal(e.target.checked);
          }}
          checked={checkedLocal}
          className="w-4 h-4"
        />
        <span className="text-base">{label}</span>
      </label>
    );
  }

  return (
    <input
      type="checkbox"
      value={checkedLocal ? 'on' : 'off'}
      onChange={e => setCheckedLocal(e.target.checked)}
      checked={checkedLocal}
      className="w-4 h-4"
    />
  );
}
