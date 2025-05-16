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

const EditCampaign = () => {
  const { user } = useContext(AuthContext);
  const campaignDetail = useLoaderData();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
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
      setValue('image', res.data.secure_url);
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
    const imageUrl = data.image || campaignDetail.image;
    const categoryValue = data.category?.value || campaignDetail.category;

    const updatedCampaign = {
      petName: data.name || campaignDetail.petName,
      age: data.age || campaignDetail.age,
      category: categoryValue,
      location: data.location || campaignDetail.location,
      shortDescription: data.shortDescription || campaignDetail.shortDescription,
      description: data.longDescription || campaignDetail.description,
      image: imageUrl,
      maxAmount: Number(data.maxAmount) || campaignDetail.maxAmount,
      donatedAmount: Number(data.donatedAmount) || campaignDetail.donatedAmount,
      lastDate: data.lastDate || campaignDetail.lastDate,
      email: user.email,
    };

    const noChanges =
      updatedCampaign.petName === campaignDetail.petName &&
      updatedCampaign.age === campaignDetail.age &&
      updatedCampaign.category === campaignDetail.category &&
      updatedCampaign.location === campaignDetail.location &&
      updatedCampaign.shortDescription === campaignDetail.shortDescription &&
      updatedCampaign.description === campaignDetail.description &&
      updatedCampaign.image === campaignDetail.image &&
      updatedCampaign.maxAmount === campaignDetail.maxAmount &&
      updatedCampaign.donatedAmount === campaignDetail.donatedAmount &&
      updatedCampaign.lastDate === campaignDetail.lastDate;

    if (noChanges) {
      return Swal.fire({
        icon: 'info',
        title: 'No Changes',
        text: 'Please update at least one field before submitting.'
      });
    }

    try {
      await axios.patch(`https://medi-care-cerver.vercel.app/donation-campaigns/${campaignDetail._id}`, updatedCampaign);
      Swal.fire({
        icon: 'success',
        title: 'Campaign Updated!',
        text: 'Your campaign has been successfully updated.',
        confirmButtonColor: '#3085d6',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update campaign. Please try again.',
      });
    }
  };

  const uploadedImage = publicId
    ? cld.image(publicId).format('auto').quality('auto').resize(fill().width(150).height(150))
    : null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md space-y-4">
      <h2 className="text-4xl text-[#22b7cd] font-bold mb-4">Edit Campaign</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {uploadedImage && (
          <div className="mb-2">
            <AdvancedImage cldImg={uploadedImage} className="rounded-md" />
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          {loading && <p className="text-sm text-gray-500">Uploading image...</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Pet Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.petName}
            {...register('name')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.age}
            {...register('age')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <Select
            options={categoryOptions}
            onChange={(val) => setValue('category', val)}
            placeholder={campaignDetail.category}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.location}
            {...register('location')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Short Description</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.shortDescription}
            {...register('shortDescription')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Long Description</label>
          <textarea
            className="w-full border p-2 rounded"
            rows="5"
            defaultValue={campaignDetail.description}
            {...register('longDescription')}
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Maximum Donation Amount</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.maxAmount}
            {...register('maxAmount')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Already Donated Amount</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.donatedAmount}
            {...register('donatedAmount')}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Last Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            defaultValue={campaignDetail.lastDate}
            {...register('lastDate')}
          />
        </div>

        <input type="hidden" {...register('image')} />
        <input type="hidden" {...register('category')} />

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCampaign;
