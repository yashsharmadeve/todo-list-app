import { Create, Delete } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../../slices/todoSlices";
import Forms from "../forms/Forms";

interface TodoItem {
  data: {
    id: string;
    title: string;
    status: string;
    priority: string;
    time: string;
  }
  setactiveCard: Dispatch<SetStateAction<string | null>>;
}

const Tasks = ({ data, setactiveCard }: TodoItem) => {
  const [checked, setChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [data.status])

  const handleChecked = () => {
    setChecked(!checked);

    dispatch(updateTodo({ ...data, status: checked ? 'pending' : 'complete' }))
  }
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-600';
      default:
        return 'bg-green-100 text-green-600 border-green-600';
    }
  };

  return (
    <>
      <div className="bg-violet-100 p-3 rounded mt-4 active:border border-black border-dashed cursor-grab" draggable
        onDragStart={() => setactiveCard(data.id)}
        onDragEnd={() => setactiveCard(null)}
      >
        <div className="bg-white flex items-center p-3 gap-4 rounded max-[480px]:flex-col max-[480px]:items-start">
          <div className="flex gap-4">
            <div className="inline-flex items-center">
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  onChange={handleChecked}
                  checked={checked}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                  id="check"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>

            <div className={`text-sm ${data.status === 'complete' && 'line-through'}`}>
              <p className="font-semibold">{data?.title}</p>
              {/* <p className="text-gray-500">6:49 PM, 10/27/2024</p> */}
              <p className="text-gray-500">{data?.time}</p>
            </div>
          </div>


          <div className="max-[480px]:w-full flex gap-2 max-[480px]:justify-between min-[480px]:ml-auto">
            <div className="flex gap-2">
              <div className={`inline-flex rounded border py-1 px-2 text-sm bg-opacity-30 font-medium hover:opacity-80 ${getPriorityColor(data.priority)}`}>
                {data.priority || 'low'}
              </div>
              <div className={`inline-flex rounded border py-1 px-2 text-sm ${data.status === 'complete'
                ? 'bg-green-100 text-green-600 border-green-600'
                : 'bg-yellow-100 text-yellow-600 border-yellow-600'
                }`}>
                {data.status === 'complete' ? 'completed' : data.status}
              </div>
            </div>

            <div className="flex gap-2">
              <div onClick={() => handleDelete(data.id)}>
                <Delete className="text-red-600 cursor-pointer" />
              </div>
              <div
                onClick={() => {
                  setModal(true)
                }}
              >
                <Create className="text-blue-700 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div >
      <Forms modal={modal} setModal={setModal} type={'update'} todo={data} />
    </>
  );
};

export default Tasks;
