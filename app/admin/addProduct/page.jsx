'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  // Handle image selection and preview generation
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    }
  }

  // Clean up the object URL when the component unmounts or image changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // Clean up the object URL
      }
    };
  }, [imagePreview]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        console.log(response.data.data);
        setImage(null); // Clear the image file
        setImagePreview(null); // Clear the image preview
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImg: "/author_img.png",
        })
      } else {
        toast.error("Error!!");
      }
    } catch (error) {
      toast.error("Submission failed!");
      console.error("Error:", error);
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload Thumbnail</p>
        <label htmlFor="image">
          <Image 
            className='mt-4'  
            alt="Thumbnail Preview" 
            src={imagePreview || assets.upload_area} 
            width={140} 
            height={70} 
          />
        </label>

        <input 
          onChange={handleImageChange} 
          type="file" 
          id="image" 
          hidden 
          required 
        />

        <p className='text-xl mt-4'>Blog Title</p>
        <input 
          name="title" 
          onChange={onChangeHandler} 
          value={data.title} 
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
          type="text" 
          placeholder='Type here' 
          required 
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea 
          name="description" 
          onChange={onChangeHandler} 
          value={data.description} 
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
          placeholder='Write your content here' 
          required 
        />

        <p className='text-xl mt-4'>Blog Category</p>
        <select 
          name="category" 
          onChange={onChangeHandler} 
          value={data.category} 
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type='submit' className='mt-6 w-40 h-10 bg-black text-white'>
          ADD
        </button>
      </form>
    </>
  );
}

export default Page;





// 'use client'
// import { assets } from '@/Assets/assets'
// import axios from 'axios'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { toast } from 'react-toastify'

// const Page = () => {
  
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     category: "Startup",
//     author: "Alex Bennet",
//     authorImg: "/author_img.png",
//   })
  
//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData(prevData => ({ ...prevData, [name]: value }));
//     console.log(data);
//   }

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();  // Fix the typo here

//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("category", data.category);
//     formData.append("author", data.author);
//     formData.append("authorImg", data.authorImg);
//     formData.append("image", image);

//     try {
//       const response = await axios.post('/api/blog', formData);
//       if (response.data.success) {
//         toast.success(response.data.msg);
//         console.log(response.data.data);
//       } else {
//         toast.error("Error!!");
//       }
//     } catch (error) {
//       toast.error("Submission failed!");
//       console.error("Error:", error);
//     }
//   }
  
//   return (
//     <>
//       <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
//         <p className='text-xl'>Upload Thumbnail</p>
//         <label htmlFor="image">
//           <Image 
//             className='mt-4'  
//             alt="Thumbnail Preview" 
//             src={image ? URL.createObjectURL(image) : assets.upload_area} 
//             width={140} 
//             height={70} 
//           />
//         </label>

//         <input 
//           onChange={(e) => setImage(e.target.files[0])} 
//           type="file" 
//           id="image" 
//           hidden 
//           required 
//         />

//         <p className='text-xl mt-4'>Blog Title</p>
//         <input 
//           name="title" 
//           onChange={onChangeHandler} 
//           value={data.title} 
//           className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
//           type="text" 
//           placeholder='Type here' 
//           required 
//         />

//         <p className='text-xl mt-4'>Blog Description</p>
//         <textarea 
//           name="description" 
//           onChange={onChangeHandler} 
//           value={data.description} 
//           className='w-full sm:w-[500px] mt-4 px-4 py-3 border' 
//           placeholder='Write your content here' 
//           required 
//         />

//         <p className='text-xl mt-4'>Blog Category</p>
//         <select 
//           name="category" 
//           onChange={onChangeHandler} 
//           value={data.category} 
//           className='w-40 mt-4 px-4 py-3 border text-gray-500'
//         >
//           <option value="Startup">Startup</option>
//           <option value="Technology">Technology</option>
//           <option value="Lifestyle">Lifestyle</option>
//         </select>
//         <br />
//         <button type='submit' className='mt-6 w-40 h-10 bg-black text-white'>
//           ADD
//         </button>
//       </form>
//     </>
//   )
// }

// export default Page;
