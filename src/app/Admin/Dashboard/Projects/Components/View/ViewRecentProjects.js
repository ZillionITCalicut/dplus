import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../../../../../config';
import ProjectId1 from '../../../../../../../config1';
import { Table } from 'react-bootstrap';

const ViewRecentProjects = () => {
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }

        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projects/all`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching Project:', error);
            }
        };
        fetchProjects();

        const intervalId = setInterval(() => {
            fetchProjects();
        }, 100);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchData = async (projectId) => {
            try {
                const url = `${BASE_URL}/project/view/${projectId}`;
                const response = await axios.get(url);
                const recentProjectIds = response.data.recentProject[0].Project_Ids1;

                // Create a mapping of project IDs to project data
                const projectMap = new Map(data.map((project) => [project._id, project]));

                // Order projects based on recentProjectIds
                const orderedProjects = recentProjectIds.map((projectId) => projectMap.get(projectId));

                setFilteredProjects(orderedProjects);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(ProjectId1);

    }, [ProjectId1, data]);

    return (
        <div className="row">
            <div className='col-md-11'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Project Category</th>
                            <th>Project Published Date</th>
                            <th>Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project?._id}>
                                <td>{project?.projectName}</td>
                                <td>{project?.projectCategory}</td>
                                <td>{project ? new Date(project.projectPublishedDate).toLocaleDateString() : ''}</td>
                                <td>{project?.area}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ViewRecentProjects;
