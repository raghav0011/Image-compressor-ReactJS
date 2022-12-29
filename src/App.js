import { Button, Container, Grid, Image, Item } from "semantic-ui-react";
import { useState } from "react";
import "./App.css";
import imageCompression from "browser-image-compression";

function App() {
  const [origImage, setOrigImage] = useState("");
  const [origImageFile, setOrigImageUrl] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileImage] = useState("");

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOrigImage(imageFile);
    setOrigImageUrl(URL.createObjectURL(imageFile));
    setFileImage(imageFile.name);
  };

  const handleImageCompress = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    let output;
    imageCompression(origImage, options).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setCompressedImage(downloadLink);
    });
  };

  return (
    <div className="App">
      <h1></h1>
      <Container>
        <Grid>
          {/* Original Image */}
          <Grid.Column width={6}>
            <Item>
              {origImage ? (
                <Image src={origImageFile}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </Grid.Column>

          {/* Button Section */}
          <Grid.Column width={4}>
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={(e) => handle(e)}
            />
            <h1></h1>
            {origImage && (
              <Button
                primary
                onClick={(e) => {
                  handleImageCompress(e);
                }}>
                Compress Image
              </Button>
            )}
            <h1></h1>
            {compressedImage && (
              <Button>
                <a href={compressedImage} download={fileName}>
                  Download Image
                </a>
              </Button>
            )}
          </Grid.Column>

          {/* Compressed Image */}

          <Grid.Column width={6}>
            <Item>
              {compressedImage ? (
                <Image src={compressedImage}></Image>
              ) : (
                <Image src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"></Image>
              )}
            </Item>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
