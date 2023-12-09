import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [icon, setIcon] = useState("");
  const [fileNameDownload, setFileNameDownload] = useState("");

  const changeIcon = (event) => {
    setIcon(event.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", icon);
    axios
      .post("http://localhost:5005/api/upload/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      })
      .then((response) => {
        setFileNameDownload(response.data.fileName);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="App">
      <div>
        <input type="file" name="fileupload" onChange={changeIcon} />
        <div>
          <button onClick={uploadFile}>upload</button>
        </div>
      </div>
      <div>
        <a href={`http://localhost:5005/api/download/${fileNameDownload}`}>
          Download
        </a>
      </div>
    </div>
  );
}

export default App;
