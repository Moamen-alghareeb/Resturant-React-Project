function Cartitem(props) {
  return (
    <>
      <div className="flex gap-2 p-2 justify-center items-center ">
        <div style={{ color: 'red' }}>{props.name}</div>

        <button
          className="px-2 me-1 text-black bg-blue-300 rounded"
          onClick={() => {
            props.handleDecreament(props.id);
          }}
        >
          -
        </button>

        <div
          className={`w-4 text-center text-black ${
            props.count === 0 ? 'bg-amber-300' : 'bg-green-300'
          }`}
        >
          {props.count}
        </div>

        <button
          className="px-2 me-1 text-black bg-blue-300 rounded"
          onClick={() => {
            props.handleIncreament(props.id);
          }}
        >
          +
        </button>

        <button
          className="px-2 me-1 bg-red-400 rounded  border-2 border-double border-green-400"
          onClick={() => {
            props.handleDelete(props.id);
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Cartitem;
