import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import BASE_URL from '../../../../../../config';
import RichTextEditor from 'react-rte';
import './style.css'

const AddBlog = ({ onSuccess }) => {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [blogDescription, setBlogDescription] = useState(RichTextEditor.createEmptyValue());


    const handleBlogDescriptionChange = (value) => {
        setBlogDescription(value);
        setFormData({
            ...formData,
            BlogDescription: value.toString('html'),
        });
    };

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');

        if (storedUserId) {
            setUserId(storedUserId);
        }

        setFormData({
            ...formData,
            id: storedUserId,
        });

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${storedUserId}`);
                setData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        BlogDate: '',
        BlogHeading: '',
        BlogDescription: '',
        BlogDescription1: '',
        BlogDescription2: '',
        BlogDescription3: '',
        Category: '',
        BlogAuthor: '',
        BlogTitleUrl: '',
        BlogPageTitle: '',
        BlogMetaTitle: '',
        BlogMetaKeyword: '',
        BlogMetaDescription: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'BlogTitleUrl') {
            const sanitizedValue = value.replace(/\s+/g, '-').replace(/-+/g, '-');
            setFormData({
                ...formData,
                [name]: sanitizedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        /* console.log(formData); */
        try {
            const response = await axios.post(`${BASE_URL}/AddBlog/${userId}`, formData);
            console.log(response.data);

            if (onSuccess) {
                onSuccess(response.data);

            }
        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
            setError(error.response.data.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name='Category' value={formData.Category} onChange={handleChange}>
                                <option>Open this select menu</option>
                                {Array.isArray(data.projectCategory) &&
                                    data.projectCategory.map((category) => (
                                        <option key={category._id} value={category.projectCategoryName}>
                                            {category.projectCategoryName}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control type="text" name='BlogAuthor' value={formData.BlogAuthor} onChange={handleChange} placeholder="Enter Author Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description 1</Form.Label>
                            <RichTextEditor 
                                value={blogDescription}
                                onChange={handleBlogDescriptionChange}                            />
                        </Form.Group>
                    </div>
                   {/*  <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description 2</Form.Label>
                            <Form.Control as="textarea" name='BlogDescription1' value={formData.BlogDescription1} onChange={handleChange} rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description 3</Form.Label>
                            <Form.Control as="textarea" name='BlogDescription2' value={formData.BlogDescription2} onChange={handleChange} rows={3} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description 4</Form.Label>
                            <Form.Control as="textarea" name='BlogDescription3' value={formData.BlogDescription3} onChange={handleChange} rows={3} />
                        </Form.Group>


                    </div> */}
                </div>
                <div className="row border border-3 p-3">
                    <h5><i className="fa-solid fa-comment me-2"></i>Meta</h5>
                    <div className="col-md-6">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Page Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Blog Page Title"
                                name="BlogPageTitle"
                                value={formData.BlogPageTitle}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Blog Meta Title"
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
    )
}

export default AddBlog