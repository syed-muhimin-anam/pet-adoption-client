import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

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

const CreateCampaign = () => {
    const { user } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        setValue,
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
        if (!data.image) {
            setError('image', {
                type: 'manual',
                message: 'Please upload an image before submitting.'
            });
            return;
        }

        const campaignData = {
            petName: data.name,
            age: data.age,
            category: data.category.value,
            location: data.location,
            description: data.longDescription,
            shortDescription: data.shortDescription,
            image: data.image,
            addedDate: new Date().toISOString(),
            email: user.email,
            maxAmount: Number(data.maxAmount),
            donatedAmount: 0,
            lastDate: data.lastDate,
            activate: true,
        };





        try {
            await axios.post('http://localhost:5000/donation-campaigns', campaignData);

            // Show SweetAlert success
            Swal.fire({
                icon: 'success',
                title: 'Pet Added!',
                text: 'Your pet has been successfully added.',
                confirmButtonColor: '#3085d6',
            });

            // Reset form and clear image
            reset();
            setPublicId(null);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit pet. Please try again.',
            });
        }
    };

    const uploadedImage = publicId
        ? cld.image(publicId)
            .format('auto')
            .quality('auto')
            .resize(fill().width(150).height(150)) // small preview
        : null;

    return (
        <div className=" max-w-xl w-10/12 md:w-full  mx-auto p-6 bg-white shadow rounded-md space-y-4">
            <h2 className="text-2xl md:text-4xl text-[#22b7cd] font-bold mb-4">Create a donation Campaign</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Preview */}
                {uploadedImage && (
                    <div className="mb-2">
                        <AdvancedImage cldImg={uploadedImage} className="rounded-md" />
                    </div>
                )}

                {/* Image Upload */}
                <div>
                    <label className="block font-semibold mb-1">Pet Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    {loading && <p className="text-sm text-gray-500">Uploading image...</p>}
                </div>

                {/* Pet Name */}
                <div>
                    <label className="block font-semibold mb-1">Pet Name</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        {...register('name', { required: 'Pet name is required' })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Pet Age */}
                <div>
                    <label className="block font-semibold mb-1">Pet Age</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        {...register('age', { required: 'Pet age is required' })}
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>

                {/* Pet Category */}
                <div>
                    <label className="block font-semibold mb-1">Pet Category</label>
                    <Select
                        options={categoryOptions}
                        onChange={(val) => setValue('category', val)}
                        placeholder="Select a category"
                    />
                    {errors.category && <p className="text-red-500 text-sm">Please select a category</p>}
                </div>

                {/* Pet Location */}
                <div>
                    <label className="block font-semibold mb-1">Pickup Location</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>
                {/* Max Donation Amount */}
                <div>
                    <label className="block font-semibold mb-1">Maximum Donation Amount (BDT)</label>
                    <input
                        type="number"
                        className="w-full border p-2 rounded"
                        {...register('maxAmount', { required: 'Maximum donation amount is required' })}
                    />
                    {errors.maxAmount && <p className="text-red-500 text-sm">{errors.maxAmount.message}</p>}
                </div>
                {/* Last Date of Donation */}
                <div>
                    <label className="block font-semibold mb-1">Last Date of Donation</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        {...register('lastDate', { required: 'Last donation date is required' })}
                    />
                    {errors.lastDate && (
                        <p className="text-red-500 text-sm">{errors.lastDate.message}</p>
                    )}
                </div>


                {/* Short Description */}
                <div>
                    <label className="block font-semibold mb-1">Short Description</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        {...register('shortDescription', { required: 'Short description is required' })}
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>
                    )}
                </div>

                {/* Long Description */}
                <div>
                    <label className="block font-semibold mb-1">Long Description</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        rows="5"
                        {...register('longDescription', { required: 'Long description is required' })}
                    ></textarea>
                    {errors.longDescription && (
                        <p className="text-red-500 text-sm">{errors.longDescription.message}</p>
                    )}
                </div>

                <input type="hidden" {...register('image')} />
                <input type="hidden" {...register('category', { required: true })} />

                {/* Submit Button */}
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

export default CreateCampaign;
