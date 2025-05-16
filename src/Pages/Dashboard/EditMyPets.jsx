import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';

const categoryOptions = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Rabbit', label: 'Rabbit' },
    { value: 'Bird', label: 'Bird' },
    { value: 'Fish', label: 'Fish' },
    { value: 'Turtle', label: 'Turtle' },
    { value: 'Hamster', label: 'Hamster' },
    { value: 'Guinea Pigs', label: 'Guinea Pigs' },
];

// All your imports stay the same...

const EditMyPets = () => {
  const { user } = useContext(AuthContext);
  const petDetail = useLoaderData();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const [publicId, setPublicId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cld = new Cloudinary({ cloud: { cloudName: 'dvp1fpakg' } });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pet_adoption');

    try {
      setLoading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dvp1fpakg/image/upload',
        formData
      );
      setPublicId(res.data.public_id);
      setValue('image', res.data.secure_url); // Store the image URL
      clearErrors('image');
    } catch (err) {
      setError('image', {
        type: 'manual',
        message: 'Image upload failed. Try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const imageUrl = data.image || petDetail.image;
    const categoryValue = data.category?.value || petDetail.category;

    const updatedPet = {
      name: data.name || petDetail.name,
      age: data.age || petDetail.age,
      category: categoryValue,
      location: data.location || petDetail.location,
      shortDescription: data.shortDescription || petDetail.shortDescription,
      longDescription: data.longDescription || petDetail.longDescription,
      image: imageUrl,
    };

    // Check if user changed anything
    const noChanges =
      updatedPet.name === petDetail.name &&
      updatedPet.age === petDetail.age &&
      updatedPet.category === petDetail.category &&
      updatedPet.location === petDetail.location &&
      updatedPet.shortDescription === petDetail.shortDescription &&
      updatedPet.longDescription === petDetail.longDescription &&
      updatedPet.image === petDetail.image;

    if (noChanges) {
      return Swal.fire({
        icon: 'error',
        title: 'Nothing changed!',
        text: 'Please update at least one field before submitting.'
      });
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/pets/${petDetail._id}`,
        updatedPet
      );

      Swal.fire({
        icon: 'success',
        title: 'Pet Updated!',
        text: 'Your pet information has been successfully updated.',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update pet. Please try again.',
      });
    }
  };

  const uploadedImage = publicId
    ? cld.image(publicId)
      .format('auto')
      .quality('auto')
      .resize(fill().width(150).height(150))
    : null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-4xl text-[#22b7cd] font-bold mb-4">Edit Pet Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {uploadedImage && (
          <div className="mb-2">
            <AdvancedImage cldImg={uploadedImage} className="rounded-md" />
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Pet Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          {loading && <p className="text-sm text-gray-500">Uploading image...</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Pet Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={petDetail.name}
            {...register('name')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pet Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            defaultValue={petDetail.age}
            {...register('age')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pet Category</label>
          <Select
            options={categoryOptions}
            onChange={(val) => setValue('category', val)}
            placeholder={petDetail.category}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pickup Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={petDetail.location}
            {...register('location')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={petDetail.shortDescription}
            {...register('shortDescription')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Long Description</label>
          <textarea
            className="w-full border p-2 rounded"
            defaultValue={petDetail.longDescription}
            rows="5"
            {...register('longDescription')}
          ></textarea>
        </div>

        <input type="hidden" {...register('image')} />
        <input type="hidden" {...register('category')} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditMyPets;

