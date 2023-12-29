"use client"

import React from 'react'
import ViewAllMembers from './Components/ViewAllMembers'
import AddMember from './Components/AddMember'

const ManageMenbers = () => {

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 p-2">
                        <AddMember />
                    </div>
                    <div className="col-md-9 p-2">
                        <ViewAllMembers />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ManageMenbers