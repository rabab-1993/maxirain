export type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type InputProps = {
  name: keyof FormFields;
  label: string;
  textarea?: boolean;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function InputField({
  name,
  label,
  textarea = false,
  value,
  error,
  onChange,
}: InputProps) {
  return (
    <div className="relative">
      <label className="block text-sm mt-2 text-slate-500 dark:text-slate-400">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-md
            bg-slate-50 dark:bg-slate-800
            border
            ${
              error
                ? "border-red-500"
                : "border-slate-300 dark:border-slate-700"
            }
            focus:ring-2 focus:ring-blue-600
            outline-none transition
          `}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-3 rounded-md
            bg-slate-50 dark:bg-slate-800
            border
            ${
              error
                ? "border-red-500"
                : "border-slate-300 dark:border-slate-700"
            }
            focus:ring-2 focus:ring-blue-600
            outline-none transition
          `}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
