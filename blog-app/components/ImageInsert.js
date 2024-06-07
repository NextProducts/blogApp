import { MdInsertPhoto } from "react-icons/md";
import { IconContext } from "react-icons";
import { forwardRef, useImperativeHandle } from "react";
const ImageInsert = forwardRef(function ImageInsert(
  { files, setFiles, register },
  fileRef
) {
  const { ref, onChange, ...rest } = register("images");
  useImperativeHandle(ref, () => fileRef.current);

  return (
    <IconContext.Provider value={{ size: 25 }}>
      <label className=" cursor-pointer flex items-center">
        <span className="mr-2">
          <MdInsertPhoto />
        </span>
        Insert Image
        <div className=" hidden">
          <input
            type="file"
            multiple
            {...rest}
            ref={fileRef}
            onChange={(e) => {
              for (let file of e.target.files) {
                const index = files.findIndex((f) => {
                  return file.name == f[0];
                });

                if (index == -1) {
                  setFiles((prev) => [
                    ...prev,
                    [file.name, URL.createObjectURL(file), file],
                  ]);
                }
              }
              e.target.value = "";
              onChange(e);
            }}
          />
        </div>
      </label>
    </IconContext.Provider>
  );
});
export default ImageInsert;
