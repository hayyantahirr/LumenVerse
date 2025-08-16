import { useNavigate } from "react-router";

const Card = ({ title, subText, article, tags, id }) => {
const navigate = useNavigate()
function handleClick() {
  navigate(`/blogs/${id}`)
}
  return (
    <>
      <div className="bg-white w-[30%] rounded-[30px] flex flex-col justify-center hover:shadow-lg min-h-[280px] dark:bg-gray-800 dark:text-white items-start relative group">
        <div className="m-5">
          <div className="  text-2xl ">{title}</div>

          <div className=" text-left w-full mb-15">
            <h2 className=" roboto-mono-500 text-gray-800 dark:text-white opacity-20 text-l">
              {subText}
            </h2>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-300 mb-5">
              {article}...
            </p>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-300 mb-5">
              🏷️ Tags : {tags}
            </p>
          </div>

          <div onClick={handleClick} className="bg-gray-300 dark:bg-gray-700 w-[25%]  rounded-lg absolute bottom-0 left-0 m-4 flex justify-center items-center hover:ring-4 ring-gray-200 dark:ring-gray-400 hover:transition duration-700 ease-in-out cursor-pointer">
            <h1 className="text-center py-3">Read More</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
