import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import { updateProfilePhoto } from 'features/user';
import { useState } from 'react';
import axios from 'axios';
import { getUser } from 'features/user';

const DashboardPage = () => {
	const { isAuthenticated, user, loading } = useSelector(state => state.user);
	console.log('user1',user)
	const baseURL = 'http://localhost:8000'; 
	const [selectedFile, setSelectedFile] = useState(null);
	const dispatch = useDispatch();

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		
		console.log('Selected File:', selectedFile);
	
	};


		const handleUpload = async (userID) => {
			try {
				const formData = new FormData();
				formData.append('profile_photo',selectedFile );
			  const response = await axios.post(`http://127.0.0.1:8000/api/users/update_profile_photo/${userID}`, formData,{
			  headers: {
				Accept: 'application/json',
			  }
			});	
			const updatedUser = response.data;   
    		dispatch(getUser());
			  
			} catch (error) {
			  console.error('Error creating user:', error);
			}
		  };


	if (!isAuthenticated && !loading && user === null)
		return <Navigate to='/login' />;

	return (
		<Layout title='Auth Site | Dashboard' content='Dashboard page'>
			{loading || user === null ? (
				<div className='spinner-border text-primary' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : (
				<>
					<h1 className='mb-5'>Dashboard</h1>
					<p>User Details</p>
					<ul>
						<li>First Name: {user.first_name}</li>
						<li>Last Name: {user.last_name}</li>
						<li>Email: {user.email}</li>
						<li>
                    Profile Photo:{' '}
                    {user.profile_photo ? (
                        <img src={baseURL+user.profile_photo} alt='Profile' style={{ maxWidth: '100px',padding: '10px', position: 'relative'
   										 ,top:'64px',right: '103px' }} />
                    ) : (
                        'No photo'
                    )}	
                </li>            

            {/* Add an input for file upload */}
            <input type='file' style={{position: 'relative',top: '62px'}} accept='image/png, image/jpeg' onChange={handleFileChange} />
			<button style={{position: 'relative',top: '99px', right: '278px'}} onClick={() => handleUpload(user.email)}>Upload</button>
					</ul>
				</>
			)}
		</Layout>
	);
};

export default DashboardPage;
