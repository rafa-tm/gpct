interface InputProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  register: unknown;
  errors: unknown;
}

export default function Input({ label, type, id, placeholder, register, errors }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label htmlFor="email">{label}</label>}
      <input
        className="w-full py-2 px-4 rounded-md border-2 border-stone-500 focus:outline-none focus:border-secondary-500"
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        {...register(id)}
      />
      {errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
    </div>
  );
}
