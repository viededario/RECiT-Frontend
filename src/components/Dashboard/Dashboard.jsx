import './Dashboard.css'

const Dashboard = ({ user }) => {
    return (
      <main>
        <div className='dashboard-content'>
        <div className='dashboard-welcome-message'>
        <h1>Welcome, {user.username}</h1>
        </div>
        
        </div>
      </main>
    );
  };
  
  export default Dashboard;
  