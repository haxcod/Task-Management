const Dropdown = ({ name, options, value, onChange }) => (
  <select
    name={name}
    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
  >
    {options.map((opt, idx) => (
      <option key={idx} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);


export default Dropdown;
