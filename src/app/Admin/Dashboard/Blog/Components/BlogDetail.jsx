import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import RichTextEditor from 'react-rte';

const BlogDetail = ({ blogDetails, selectedBlogId, handleCloseBlogDetail, onSuccess }) => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        BlogDate: '',
        BlogHeading: '',
        BlogDescription: RichTextEditor.createEmptyValue(), // Initialize with an empty value
        BlogDescription1: '',
        BlogDescription2: '',
        BlogDescription3: '',
        Category: '',
        BlogAuthor: '',
        BlogTitleUrl: '',
        BlogPageTitle: '',
        BlogMetaKeyword: '',
        BlogMetaDescription: ''
    });

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');

        if (storedUserId) {
            setUserId(storedUserId);
        }
        if (blogDetails) {
            setFormData({
                BlogDate: blogDetails.BlogDate || '',
                BlogHeading: blogDetails.BlogHeading || '',
                BlogDescription: RichTextEditor.createValueFromString(blogDetails.BlogDescription, 'html'), // Create Value from HTML string
                BlogDescription1: blogDetails.BlogDescription1 || '',
                BlogDescription2: blogDetails.BlogDescription2 || '',
                BlogDescription3: blogDetails.BlogDescription3 || '',
                BlogAuthor: blogDetails.BlogAuthor || '',
                BlogTitleUrl: blogDetails.BlogTitleUrl || '',
                BlogMetaTitle: blogDetails.BlogMetaTitle || '',
                BlogPageTitle: blogDetails.BlogPageTitle || '',
                BlogMetaKeyword: blogDetails.BlogMetaKeyword || '',
                BlogMetaDescription: blogDetails.BlogMetaDescription || '',
            });
        }
    }, [blogDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'BlogTitleUrl') {
            // Replace spaces with a single hyphen and ensure no consecutive hyphens
            const sanitizedValue = value.replace(/\s+/g, '-').replace(/-+/g, '-');
            setFormData({
                ...formData,
                [name]: sanitizedValue,
            });
        } else {
            // For other fields, update the state as usual
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = { ...formData, BlogDescription: formData.BlogDescription.toString('html') };
            const response = await axios.post(`${BASE_URL}/UpdateBlog/${userId}/blogs/${selectedBlogId}`, updatedFormData);
            console.log(response.data.message);
            if (onSuccess) {
                onSuccess(response.data.message);
            }
            handleCloseBlogDetail();
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.response.data.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };
    

    const handleBlogDescriptionChange = (value) => {
        setFormData({
            ...formData,
            BlogDescription: value,
        });
    };

    return (
        <div>
            <h5>{blogDetails.BlogHeading}</h5>
            <Form>
                <div className="row">
                    <div className="col-md-12">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name='BlogDate' value={formData.BlogDate} onChange={handleChange} placeholder="Blog Heading" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text" name='BlogHeading' value={formData.BlogHeading} onChange={handleChange} placeholder="Blog Heading" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="text" name='BlogAuthor' value={formData.BlogAuthor} onChange={handleChange} placeholder="Enter Author Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description 1</Form.Label>

                            <RichTextEditor
                                value={formData.BlogDescription}
                                onChange={handleBlogDescriptionChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="row border border-3 p-3">
                    <h5><i className="fa-solid fa-comment me-2"></i>Meta</h5>
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Page Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Blog Title"
                                name="BlogPageTitle"
                                value={formData.BlogPageTitle}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Meta Title"
                                name="BlogMetaTitle"
                                value={formData.BlogMetaTitle}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title Url</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="BlogTitleUrl"
                                value={formData.BlogTitleUrl}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meta Keywords</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="BlogMetaKeyword"
                                value={formData.BlogMetaKeyword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meta Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="BlogMetaDescription"
                                value={formData.BlogMetaDescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </div>
                </div>
                <p className="text-danger">{error}</p>
                <div className='text-end mb-3'>
                    <div type="submit" className='w-100 btn btn-outline-primary' onClick={handleSubmit} >
                        Submit
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default BlogDetail;
