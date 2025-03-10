import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill stylesheet
import { useForm } from 'react-hook-form';
import { Apis, AuthPosturl } from '../../Components/General/Api';
import AdminLayout from '../../Components/Admin/AdminLayout';
import { ErrorAlert, ToastAlert } from '../../Components/General/Utils';

const Marketing = () => {
    const { handleSubmit, formState: { errors } } = useForm();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        const formData = new FormData();
        
        // Extract plain text from the content
        const plainTextContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        formData.append('message', plainTextContent); // Save plain text content

        setLoading(true);
        try {
            const res = await AuthPosturl(Apis.admins.marketing_message, formData);
            if (res.status === true) {
                ToastAlert(res.text)
                setContent(''); // Clear the content after successful submission
            } else {
                ErrorAlert(res.text);
            }
        } catch (error) {
            ErrorAlert('An error occurred while submitting the marketing message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="w-11/12 bg-white p-4 shadow-xl rounded-lg mx-auto my-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <div className="capitalize font-medium mb-5">Enter Content</div>
                        <ReactQuill
                            value={content}
                            onChange={setContent} // Handle content change
                            theme="snow" // Optional: You can choose other themes like 'bubble'
                        />
                        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
                    </div>
                    <button 
                        type="submit" 
                        className={`bg-secondary text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Marketing;
