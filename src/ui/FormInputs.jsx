function FormInputs({ register, errors, id, type }) {
  return (
    <>
      <input
        type={type}
        id={id}
        name={id}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(id, { required: `${id} is required` })}
      />
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>
      )}
    </>
  );
}

export default FormInputs;
