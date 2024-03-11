import axios from "axios";

export async function uploadImageCloudinary(formData) {
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to upload image: ", error);
    throw error;
  }
}
