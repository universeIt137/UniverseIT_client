import React from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="max-w-[100vw] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-3">
                    <div className="bg-white rounded-md p-6 shadow-md">
                        <h3 className="text-lg font-bold mb-4">Website View</h3>
                        <div className="h-48">
                            <canvas id="websiteViewChart"></canvas>
                        </div>
                        <p className="text-gray-500 mt-4">Last Campaign Performance</p>
                        <div className="flex items-center mt-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="ml-2 text-gray-500">campaign sent 2 days ago</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-md p-6 shadow-md">
                        <h3 className="text-lg font-bold mb-4">Online Admission</h3>
                        <div className="h-48">
                            <canvas id="dailySalesChart"></canvas>
                        </div>
                        <p className="text-gray-500 mt-4">15% increase</p>
                        <div className="flex items-center mt-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="ml-2 text-gray-500">updated 4 min ago</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-md p-6 shadow-md">
                        <h3 className="text-lg font-bold mb-4">Seminar</h3>
                        <div className="h-48">
                            <canvas id="completedTasksChart"></canvas>
                        </div>
                        <p className="text-gray-500 mt-4">Last Campaign Performance</p>
                        <div className="flex items-center mt-4">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="ml-2 text-gray-500">just updated</span>
                        </div>
                    </div>
                </div>

            </div>




        </>
    );
};

export default Dashboard;
