import { IconContext } from "react-icons";
import { IoMdClose } from "react-icons/io";

export default function ImagePreview({ files, setFiles, fileRef }) {
  return (
    <section className="flex overflow-x-auto">
      {files.map((file, index) => (
        <div
          className={`flex flex-1 ${
            files.length == 1 ? "max-h-[550px]" : "max-h-[200px]"
          }  min-w-[280px] mr-2 last:mr-0 relative`}
          key={file[0]}
        >
          <span
            className="bg-[rgba(255,255,255,0.2)] absolute top-2 right-2 rounded-full cursor-pointer p-2 hover:bg-[rgba(255,255,255,0.8)]"
            onClick={() => {
              console.log(fileRef);
              setFiles((prev) => {
                return [...prev.slice(0, index), ...prev.slice(index + 1)];
              });
            }}
          >
            <IconContext.Provider value={{ size: 20 }}>
              <IoMdClose />
            </IconContext.Provider>
          </span>
          <img src={file[1]} className=" object-cover rounded-lg" />
        </div>
      ))}
    </section>
  );
}
