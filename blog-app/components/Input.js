export default function Input({
  label,
  placeholder,
  type,
  register,
  requirements,
  errors,
}) {
  return (
    <label>
      {label}
      <div
        className={`flex border rounded-lg mb-5 py-2 px-4 ${
          errors[label] ? " border-red-600" : " focus:border-black"
        }`}
      >
        <input
          className="w-full outline-none "
          placeholder={placeholder}
          type={type}
          {...register(label, { ...requirements })}
        ></input>
        {errors[label] && (
          <span className=" text-nowrap text-red-600">
            {errors[label].message}
          </span>
        )}
      </div>
    </label>
  );
}
