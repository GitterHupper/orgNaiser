import Resizer from "react-image-file-resizer";

const checkImageWidth = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        resolve(image.width);
        return image.width;
      };
      reader.onerror = (err) => reject(err);
    };
  });
};

const resizeImage = (file) => {
  let quality = 100;

  if (file.size < 4000000) quality = 75;
  if (file.size < 8000000) quality = 70;

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1400,
      1000,
      "JPEG",
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};

export { checkImageWidth, resizeImage };
