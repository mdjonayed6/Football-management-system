import PageTitle from "./components/ui/PageTitle"
import { FaReact } from "react-icons/fa6";
import { myLibrary } from "./lib/myLibarary";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import moment from "moment";

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const date = new Date();
  const year = date.getFullYear();
  const value = myLibrary.getValue(2, 3)
  // console.log(value)

  return (
    <>
      <PageTitle title={`React.js | Starter Template`} />
      <div className="all-center items-center min-h-screen">
        <div>
          <h3 className="text-center py-4 px-3 font-bold">
            <span className="bg-slate-800 p-2 text-slate-100 mb-2">{moment().format('MMMM Do YYYY, h:mm:ss a')} </span><br /> <br />
            Welcome to React.js Starter Template
            <div className="all-center pt-10">
              <span className="text-4xl font-bold">{count}</span>
            </div>
            <div className="all-center pt-10">
              <FaReact className="text-blue-500" size={70} />
            </div>
          </h3>
          <hr />
          <div className="text-center">
            Developed by <a href="https://www.linkedin.com/in/minhazulabedinmunna/" target="_blank" className="underline text-blue-600">Minhazul Abedin Munna</a> {year}&copy;
          </div>
          <div className="text-center">
            Visit Website: <a href="https://www.techzaint.com/in/minhazulabedinmunna/" target="_blank" className="underline text-blue-600">Tech Zaint</a>
          </div>
          <div className="all-center gap-3 mt-3">
            <div>
              <button className="bg-blue-500 p-2 text-white" onClick={() => dispatch(increment())}>Increment +</button>
            </div>
            <div>
              <button className="bg-blue-500 p-2 text-white" onClick={() => dispatch(decrement())}> Decrement -</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
