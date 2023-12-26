import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EditUserForm } from './EditUserForm';
import { Button } from 'react-bootstrap';
import CreateUserModal from './CreateUserModal';



function UserTable() {
const [userlist, setUserList] = useState([]);
const [editUserId, setEditUserId] = useState(null);
const [showCreateModal, setShowCreateModal] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
useEffect(() => {
  const fetchData=async()=>{
    const response = await axios.get('http://127.0.0.1:8000/api/users/userlist')
    const filteredList = response.data.filter(user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUserList(filteredList)
    console.log(userlist)
  }
  
  fetchData();
}, [userlist]);
const handleEdit = (userId) => {
  console.log(userId)
  setEditUserId(userId);
};
const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/delete_user/${userId}/`);
      // After deletion, trigger a refetch by setting showCreateModal to true
      
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

const handleCreateUser = (newUser) => {
  setUserList([...userlist, newUser]);
  handleCloseCreateModal();
};

const handleShowCreateModal = () => setShowCreateModal(true);
const handleCloseCreateModal = () => setShowCreateModal(false);
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};


return (
  <div>
    <Table striped bordered hover variant="dark" style={{ width: '95%', textAlign: 'center' }}>
    <thead style={{textAlign:'center'}}>
       <tr >
           <th colSpan="6" ><Button variant="primary" onClick={handleShowCreateModal}>
           <ControlPointIcon /> Create User</Button>
           <span style={{paddingLeft:'130px'}}><input type="text" placeholder='search' value={searchTerm} onChange={handleSearchChange}/></span></th>
          
        </tr>
        <tr>
          <th>#</th>
          <th>Name</th>          
           <th>Email</th>          
          <th>Actions</th>
          
    </tr>
        
    </thead>
      <tbody>
        {userlist.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td>{user.email}</td>
            <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div onClick={() => handleEdit(user.id)}>
                <EditIcon style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }} />
              </div>
              <div onClick={() => handleDelete(user.id)}>
                <DeleteIcon  style={{ cursor: 'pointer', color: 'red' }} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    {editUserId && <EditUserForm editUserId={editUserId} setEditUserId={setEditUserId} />}
    <CreateUserModal
        showModal={showCreateModal}
        handleClose={handleCloseCreateModal}
        onCreateUser={handleCreateUser}
      />
  </div>
);
}

export default UserTable;

//   return (    
//     <Table striped bordered hover variant="dark" style={{width:'95%',textAlign:'center'}}>
//       <thead style={{textAlign:'center'}}>
//       <tr >
//           <th colSpan="6" ><ControlPointIcon/><span>Create</span><span style={{paddingLeft:'130px'}}><input type="text" placeholder='search' /></span></th>
          
//         </tr>
//         <tr>
//           <th>#</th>
//           <th>Name</th>          
//           <th>Email</th>          
//           <th>Actions</th>
          
//         </tr>
        
//       </thead>
//       <tbody>
//       {userlist.map((user, index) => (
//    <tr key={index}>
//       <td>{index + 1}</td>
//       <td>{user.first_name+" "+user.last_name}</td>
//       <td>{user.email}</td>
//       <td>{user.number}</td>
//       <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
//          <div>
//             <EditIcon style={{ cursor: 'pointer', marginRight: '10px', color: 'green' }} />
//          </div>
//          <div>
//             <DeleteIcon style={{ cursor: 'pointer', color: 'red' }} />
//          </div>
//       </td>
//    </tr>
// ))}

      
//       </tbody>
//     </Table>
//   );
// }

// export default UserTable;