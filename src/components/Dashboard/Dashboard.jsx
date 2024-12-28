import './Dashboard.css'

const Dashboard = ({ user }) => {
    return (
      <main>
        <div className='dashboard-content'>
        <div className='dashboard-welcome-message'>
        <h1>Welcome, {user.username}</h1>
        </div>
        <p>
          See today's most liked and unliked RECs below
        </p>
        </div>
      </main>
    );
  };
  
  export default Dashboard;
  