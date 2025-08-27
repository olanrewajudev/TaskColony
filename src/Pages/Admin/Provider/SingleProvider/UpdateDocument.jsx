import React, { useEffect, useState } from 'react';
import ModalLayout from '../../../../Components/Admin/ModalLayout';
import { Apis, AuthPosturl } from '../../../../Components/General/Api';
import { useForm } from 'react-hook-form';
import { ToastAlert } from '../../../../Components/General/Utils';
import { FaPlus } from 'react-icons/fa';

const statusToVariant = {
    approved: 'success',
    pending: 'warn',
    rejected: 'dark',
    processing: 'accept',
};

// Status options for dropdown display
const statusOptions = Object.keys(statusToVariant).map(status => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1)
}));

// Numeric mapping for API
const statusToNumber = {
    approved: 1,
    pending: 0,
    rejected: 2,
    processing: 3,
};

const UpdateDocument = ({ closeView, singles, resendSignal, trackid }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Add this state
    const [showPreview, setShowPreview] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];

        if (file) {
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (JPEG/PNG/SVG).');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                alert('File size should not exceed 2MB.');
                return;
            }
            setImage(file);
            setImageUrl(null); // Clear URL when a new file is chosen
        }
    };

    useEffect(() => {
        if (singles.status_text) {
            setValue('status', singles.status_text.toLowerCase());
        }
        if (singles) {
            setValue('firstname', singles.fname);
            setValue('lastname', singles.lname);
            // Set image URL from singles.business_cc if available
            if (singles.business_cc && singles.business_cc.length > 0) {
                setImageUrl(singles.business_cc[0]);
            } else {
                setImageUrl(null);
            }
        }
    }, [singles, setValue]);

    const onSubmit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            // Validate status
            const statusNumber = statusToNumber[data.status] !== undefined ? statusToNumber[data.status] : 0; // Default to 0 (Pending)

            // Use FormData if image is present
            let payload;
            let useFormData = !!image;
            if (useFormData) {
                payload = new FormData();
                payload.append('status', statusNumber);
                payload.append('firstname', data.firstname);
                payload.append('lastname', data.lastname);
                payload.append('data_tid', trackid);
                payload.append('images', image); // Add image
            } else {
                payload = {
                    status: statusNumber,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    data_tid: trackid,
                    image: imageUrl || '', // Send existing image URL if no new image
                };
            }

            const res = await AuthPosturl(
                Apis.admins.update_providers_docs,
                payload,
                useFormData // Pass true if using FormData, so your API helper can set headers
            );
            if (res.status) {
                ToastAlert(res.text);
                resendSignal();
                closeView();
            } else {
                ToastAlert(res.text || 'Update failed');
            }
        } catch (error) {
            console.error('Error:', error);
            ToastAlert('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalLayout closeView={closeView}>
            <div className="bg-white w-[95%] mx-auto text-primary h-[27rem] pt-10 overflow-y-auto scrollsdown">
                <div className="text-slate-600 text-xl rounded-lg shadow-xl mb-5 bg-blue-50 p-3">Update Document</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-5">
                        <div className="">
                            {/* Name Field */}
                            <div>
                                <label className="text-xs">First Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    {...register('firstname', { required: 'Name is required' })}
                                />
                                {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname.message}</p>}
                            </div>
                            <div>
                                <label className="text-xs">Last Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    {...register('lastname', { required: 'Name is required' })}
                                />
                                {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname.message}</p>}
                            </div>
                       </div>
                        <div className="mb-10">
                            <label className="text-xs">Status</label>
                            <select className="admininput" {...register('status')}>{statusOptions.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}</select>
                        </div>
                        <div className="my-4 w-full overflow-x-auto">
                            <div className="flex gap-2">
                                {!image && !imageUrl ? (
                                    <label className="w-full h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer">
                                        <FaPlus className="text-gray-500 mb-2" size={24} />
                                        <span className="text-gray-500">Choose from gallery</span>
                                        <span className="text-xs text-gray-400">(PNG, JPG, JPEG or SVG - max. 2MB)</span>
                                        <input
                                            onChange={handleUpload}
                                            type="file"
                                            accept=".png,.jpg,.jpeg,.svg"
                                            hidden
                                        />
                                    </label>
                                ) : image ? (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Preview"
                                            className="w-screen h-40 border rounded-md object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded shadow text-xs"
                                            onClick={() => setShowPreview(true)}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={imageUrl}
                                            alt="Preview"
                                            className="w-screen h-40 border rounded-md object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded shadow text-xs"
                                            onClick={() => setShowPreview(true)}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Preview Modal */}
                            {showPreview && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                                    <div className="relative">
                                        <img
                                            src={image ? URL.createObjectURL(image) : imageUrl}
                                            alt="Full Preview"
                                            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 shadow"
                                            onClick={() => setShowPreview(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button type="submit" className={`bg-pink px-10 py-2 text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </ModalLayout>
    );
};

export default UpdateDocument;