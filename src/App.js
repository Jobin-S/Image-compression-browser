import { useState } from 'react';
import './App.css';
// const imageConversion = require("image-conversion")
import imageCompression from 'browser-image-compression';
function App() {

  const [files, setFiles] = useState([])
  // const [size, setSize] = useState(450)
  // const [accuracy, setAccuracy] = useState(0.5)
  // const [scale, setscale] = useState(0.5)

  const compress = async () => {
    if (files.length) {
      for (var i = 0; i <= files.length; i++) {
        const file = files.item(i)


        const options = {
          maxSizeMB: 0.5,
          // maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        try {
          const compressedFile = await imageCompression(file, options);
          console.log('compressedFile instanceof Blob', compressedFile); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          const url = window.URL.createObjectURL(compressedFile);
          const link = document.createElement("a");
          link.href = url;
          link.download = `COMPRESSED_${file?.name || new Date()}`;
          link.click();
          // await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
          console.log(error);
        }
      

        // imageConversion.compressAccurately(file, {
        //   size, accuracy, scale, type: file?.name || "image/png"
        // }).then((blob) => {
        //   const url = window.URL.createObjectURL(blob);
        //   const link = document.createElement("a");
        //   link.href = url;
        //   link.download = `COMPRESSED_${file?.name || new Date()}`;
        //   link.click();
        // })
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Compression for Ayush 🚀</h1>
        {/* <label>Size
          <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} /> <br />
        </label>
        <label>Accuracy
          <input type="number" value={accuracy} onChange={(e) => setAccuracy(Number(e.target.value))} /> <br />
        </label>
        <label>Scale
          <input type="number" value={scale} onChange={(e) => setscale(Number(e.target.value))} /> <br />
        </label> */}


        <label>Your Image File <br />
          <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" multiple
            onChange={(e) => {

              setFiles(e.target.files)
              console.log(e.target.files)
            }} /><br />
          {/* {files && files.map((file)=>{
            return <img alt='upload' src={URL.createObjectURL(file)} width="50%" />
          })} */}

          <button onClick={compress} >Compress</button>
        </label>

      </header>
    </div>
  );
}

export default App;
