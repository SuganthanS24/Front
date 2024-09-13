import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        facebookUrl: '',
        googleMapUrl: '',
        instagramUrl: '',
        websiteUrl: ''
    });
    const [updateStatus, setUpdateStatus] = useState('');

    useEffect(() => {
        fetch('https://robo-jq82.onrender.com/api/profile')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProfileData(data))
            .catch(err => {
                console.error('Failed to fetch profile data:', err);
                setUpdateStatus('Failed to fetch profile data.');
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const updateAllFields = () => {
        fetch('https://robo-jq82.onrender.com/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUpdateStatus('All fields updated successfully.');
        })
        .catch(err => {
            console.error('Failed to update fields:', err);
            setUpdateStatus('Failed to update fields.');
        });
    };

    return (
        <div className="form-container">
            <h2>Edit Profile</h2>
            <form id="profileForm">
                <div className="form-group">
                    <label htmlFor="facebookUrl">Facebook URL</label>
                    <input
                        type="text"
                        id="facebookUrl"
                        name="facebookUrl"
                        value={profileData.facebookUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="googleMapUrl">Google Map URL</label>
                    <input
                        type="text"
                        id="googleMapUrl"
                        name="googleMapUrl"
                        value={profileData.googleMapUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instagramUrl">Instagram URL</label>
                    <input
                        type="text"
                        id="instagramUrl"
                        name="instagramUrl"
                        value={profileData.instagramUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="websiteUrl">Website URL</label>
                    <input
                        type="text"
                        id="websiteUrl"
                        name="websiteUrl"
                        value={profileData.websiteUrl}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={updateAllFields} className="overall-button">
                    Submit All
                </button>
                <button type="button" onClick={() => navigate('/weblinks')} className="back-button">
                    Back to Profile
                </button>
                <div id="updateStatus" className="update-status">{updateStatus}</div>
            </form>
        </div>
    );
};

export default EditProfile;
