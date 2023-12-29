import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../../../config';
import Card from 'react-bootstrap/Card';

const ViewAllCategories = ({ onViewCategoryProjects }) => {
    const [id1, setId] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const id = sessionStorage.getItem('userId');
        setId(id);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/project/view/${id}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const handleViewCategoryProjects = (category) => {
        // Store the category id in sessionStorage
        sessionStorage.setItem('Category_Id', category._id);
        // Call the original onViewCategoryProjects function
        onViewCategoryProjects(category);
    };


    return (
        <div>
            <div className="row">
                {data.projectCategory && data.projectCategory.length > 0
                    ? data.projectCategory.map((category) => (
                        <div className="col-md-3 text-center" key={category._id}>
                            <div className="mt-2 mb-5">
                                <Card className="w-100" style={{ maxHeight: '650px', minHeight: '650px' }}>
                                    <Card.Img
                                        variant="top"
                                        width={'20px'}
                                        style={{ maxHeight: '400px', minHeight: '400px' }}
                                        src={`${BASE_URL}/${category.projectCategoryThumbnail} `}
                                    />
                                    <div>
                                        <Card.Body onClick={() => {
                                            handleViewCategoryProjects(category);
                                        }} className='btn'>
                                            <Card.Title>{category.projectCategoryName}</Card.Title>
                                            <Card.Text>
                                                {category.projectCategoryDescription.slice(0, 100)}
                                            </Card.Text>
                                            <div
                                                className="btn w-100 text-dark"

                                                style={{ border: '1px solid red' }}
                                            >
                                                View <b>{category.projectCategoryName}</b> Projects <i className="fa-solid fa-circle-arrow-right ms-2"></i>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ))
                    : (
                        <h5 className="text-danger ms-5">No Categories Found</h5>
                    )}

            </div>
        </div>
    );
};

export default ViewAllCategories;