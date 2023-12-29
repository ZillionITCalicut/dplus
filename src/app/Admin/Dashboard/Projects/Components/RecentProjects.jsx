import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../../../../config';
import Table from 'react-bootstrap/Table';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ProjectId1 from '../../../../../../config1';
import ViewRecentProjects from './View/ViewRecentProjects';

const RecentProjects = () => {
    const [data, setData] = useState([]);
    const [properties, setProperties] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [message, setMessage] = useState(null);
    const [userId, setUserId] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
                console.error('Error fetching Project:', error.response.data.message);
            }
        };
        fetchProjects();
        const fetchData = async (ProjectId1) => {
            try {
                const url = `${BASE_URL}/project/view/${ProjectId1}`;
              
                const response = await axios.get(url);
                console.log(response.data);
                setProperties(response.data.recentProject);
            } catch (error) {
                console.error('Error fetching data:', error.message);

            }
        };

        fetchData(ProjectId1);
    }, [ProjectId1]);
   /*  console.log(properties); */
    const handleRowClick = (project) => {
        if (selectedProjects.includes(project)) {
            // If already selected, unselect it
            const updatedSelection = selectedProjects.filter((selectedProject) => selectedProject !== project);
            setSelectedProjects(updatedSelection);
        } else {
            // If not selected, select it
            setSelectedProjects([...selectedProjects, project]);
        }
    };

    const handleSubmit = async () => {
        const Project_Ids1 = selectedProjects.map(project => project._id);
        /* console.log(Project_Ids1); */

        try {
            const response = await axios.post(`${BASE_URL}/recentProjects/${userId}`, { Project_Ids1 });
            console.log(response.data);
            setSnackbarSeverity('success');
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);

            setSelectedProjects([]);


        } catch (error) {
            console.error('Error fetching data:', error.response.data.message);
            setSnackbarSeverity('error');
            setSnackbarMessage(error.response.data.message);
            setSnackbarOpen(true);
        }
    };



    return (

        <div className='mb-5'>
            <div className="row">
                <div className="col-md-12">
                    <h4>Recent Projects</h4>

                    <ViewRecentProjects />
                </div>

            </div>
            <div className="row">
                <h4>Active Projects</h4>
                <div className="col-md-6">
                    <div>
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project Category</th>
                                    <th>Project Published Date</th>
                                    <th>Area</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((project, index) => (
                                    <tr key={project._id} onClick={() => handleRowClick(project)}>
                                        <td>{project.projectName}</td>
                                        <td>{project.projectCategory}</td>
                                        <td>{new Date(project.projectPublishedDate).toLocaleDateString()}</td>
                                        <td>{project.area}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedProjects.includes(project)}
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-md-6">
                    {selectedProjects.length > 0 && (
                        <div>
                            <h5>Selected Projects Details</h5>
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
                                    {selectedProjects.map((selectedProject, index) => (
                                        <tr key={selectedProject._id}>
                                            <td>{selectedProject.projectName}</td>
                                            <td>{selectedProject.projectCategory}</td>
                                            <td>{new Date(selectedProject.projectPublishedDate).toLocaleDateString()}</td>
                                            <td>{selectedProject.area}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                    {selectedProjects.length > 0 && (
                        <button onClick={handleSubmit} className='btn btn-warning'>
                            Update Recent Projects
                        </button>
                    )}
                </div>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        </div>
    );
};

export default RecentProjects;
