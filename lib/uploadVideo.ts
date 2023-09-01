import axios from "axios";
import { toast } from "react-toastify";

let cancelSource: any = null;

// Upload Thumbnail
// export const uploadThumbnail = async (
//   data: FormData,
//   setImgLink: stringState,
//   setImgLoading: numberState
// ) => {
//   try {
//     await axios
//       .post(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_SECRET}/image/upload`,
//         data,
//         {
//           onUploadProgress: (data) => {
//             setImgLoading(Math.round((data.loaded / data.total) * 100));
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res);

//         setImgLink(res.data.secure_url);
//       })
//       .catch((err) => {
//         toast.error("Something wrong with thumbnail");
//       });
//   } catch (error) {
//     toast.error("Something wrong! Please try again.");
//   }
// };

// Upload Video
export const uploadVideo = async (
  userId: string,
  data: FormData,
  setLoading: numberState
) => {
  if (cancelSource) {
    cancelSource.cancel();
  }
  cancelSource = axios.CancelToken.source();

  await axios
    .post(`/api/video/upload/${userId}`, data, {
      onUploadProgress: (data) => {
        setLoading(Math.round((data.loaded / data.total) * 100));
      },
      cancelToken: cancelSource.token,
    })
    .then((res) => {
      console.log(res.data);

      toast.success(res.data.message);
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        toast.error("Cancel");
      } else {
        toast.error("Upload error");
      }
    });
};

// Uplaod Cancel funciton
export const uploadingCancel = () => {
  if (cancelSource) {
    cancelSource.cancel();
  }
};
