import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://robo-jq82.onrender.com/api/profile')
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`HTTP error! Status: ${response.status} - ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => setProfileData(data))
            .catch(err => {
                console.error('Failed to fetch profile data:', err);
                setError('Failed to load profile data.');
            });
    }, []);

    const navigateToQRCode = (media) => {
        localStorage.setItem('selectedMedia', media);
        navigate('/qrcode');
    };

    return (
        <div className="profile-container">
            <h2>Company Profile</h2>
            <div id="profileContent">
                {error && <p>{error}</p>}
                {profileData.facebookUrl && (
                    <div className="profile-item" onClick={() => navigateToQRCode('facebook')}>
                        <strong>Facebook</strong>
                    </div>
                )}
                {profileData.googleMapUrl && (
                    <div className="profile-item" onClick={() => navigateToQRCode('googleMap')}>
                        <strong>Google Map</strong>
                    </div>
                )}
                {profileData.instagramUrl && (
                    <div className="profile-item" onClick={() => navigateToQRCode('instagram')}>
                        <strong>Instagram</strong>
                    </div>
                )}
                {profileData.websiteUrl && (
                    <div className="profile-item" onClick={() => navigateToQRCode('website')}>
                        <strong>Website</strong>
                    </div>
                )}
                {!Object.keys(profileData).length && !error && <p>No profile data found.</p>}
            </div>
            <div className="button-container">
            <button className="home-button" onClick={() => window.location.href = '/'}>
            <img src="/home.png" alt="Home" />
          </button>
                <button onClick={() => navigate('/editprofile')} className="button">
                    Edit
                </button>
            </div>
        </div>
    );
};

export default Profile;
