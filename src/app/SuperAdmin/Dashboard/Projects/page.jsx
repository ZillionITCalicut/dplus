"use client"

import React, { useState } from 'react';
import AddProject from './Components/AddProject';
import ViewAllProjects from './Components/ViewAllProjects';

const Projects = () => {
    const [showAddProject, setShowAddProject] = useState(false);

    const handleAddProjectClick = () => {
        setShowAddProject((prevShowAddProject) => !prevShowAddProject);
    };

    const handleProjectAdded = () => {
        // You can fetch the updated project list or perform any other actions here
        setShowAddProject(false)
    };

    return (
        <div>
            <div className="row mt-2 mb-4 text-end">
                <div className="col-md-12">

                    <div className='btn btn-primary me-5' onClick={handleAddProjectClick}>
                        {showAddProject ? 'Go Back' : 'Add Project'}
                    </div>

                </div>
            </div>

            {showAddProject ? (
                <AddProject onClose={() => setShowAddProject(false)} onProjectAdded={handleProjectAdded} />
            ) : (
                <ViewAllProjects />
            )}

        </div>
    );
};

export default Projects;