export default function Input({ label, placeholder, type, register }) {
  return (
    <label>
      {label}
      <input
        className="w-full py-2 px-4 outline-none border rounded-lg focus:border-black mb-3"
        placeholder={placeholder}
        type={type}
        {...register(label)}
      ></input>
    </label>
  );
}
