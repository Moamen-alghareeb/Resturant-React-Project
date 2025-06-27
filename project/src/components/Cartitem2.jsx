function Cartitem(props) {
  // Ensure minimum count is 1
  const count = props.count < 1 ? 1 : props.count;

  return (
    <div className="flex gap-4 p-4 my-3 bg-white shadow-md rounded-lg items-center max-w-md mx-auto border border-gray-200">
      <div className="flex-1 text-lg font-semibold text-green-800">{props.name}</div>
      <button
        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        onClick={() => props.handleDecreament(props.id)}
      >
        -
      </button>
      <div
        className={`w-8 text-center text-lg font-bold mx-2 py-1 rounded ${count === 1 ? 'bg-amber-300 text-gray-800' : 'bg-green-300 text-green-900'}`}
      >
        {count}
      </div>
      <button
        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        onClick={() => props.handleIncreament(props.id)}
      >
        +
      </button>
      <button
        className="ml-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 border-2 border-double border-green-400 transition-colors"
        onClick={() => props.handleDelete(props.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Cartitem;
