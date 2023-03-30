import {EmployeeOnly, UserOnly} from './components/PrivateRoute';
import './App.css';
import Signup from './components/signup';
import CreateClaim from './components/createClaim';
import Claim from './components/Claim';
import {Container} from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';
import Manager from './components/Manager';
import Login from './components/Login';
import UserProfile from './components/userPofile';
import CreateUser from './components/createUser';
import ManagerDashboard from './components/managerDashboard';
import Signupv2 from './components/signupv2';
import Invite from './components/inviteKey';
import FinanceDashboard from './components/financeDashboard'
import PersonalProfile from "./components/personalProfile"
import PersonalClaim from './components/PersonalClaim'
import FinanceClaim from './components/FinanceClaim';
import FinanceUserProfile from './components/FinanceUserProfile';
function App() {
  return (
    <div 
    style={{minHeight:""}}>
      <div className="">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/"  element={<UserOnly><Dashboard/></UserOnly>}/>
            <Route exact path="/Employee"  element={<UserOnly><Employee/></UserOnly>}/>
            <Route path="/CreateClaim" element={<EmployeeOnly><CreateClaim/></EmployeeOnly>}/>
            <Route path="/Claim/:id" element={<EmployeeOnly><Claim/></EmployeeOnly>}/>
            <Route path="/FinanceClaim/:id" element={<EmployeeOnly><FinanceClaim/></EmployeeOnly>}/>
            <Route path="/PersonalClaim/:id" element={<EmployeeOnly><PersonalClaim/></EmployeeOnly>}/>
            <Route path="/UserProfile/:id" element={<EmployeeOnly><UserProfile/></EmployeeOnly>}/>
            <Route path="/FinanceUserProfile/:id" element={<EmployeeOnly><FinanceUserProfile/></EmployeeOnly>}/>
            <Route path="/PersonalProfile" element={<EmployeeOnly><PersonalProfile/></EmployeeOnly>}/>
            <Route path="/ManagerDashboard" element={<EmployeeOnly><ManagerDashboard/></EmployeeOnly>}/>
            <Route path="/FinanceDashboard" element={<EmployeeOnly><FinanceDashboard/></EmployeeOnly>}/>
            <Route path="/Invite" element={<EmployeeOnly><Invite/></EmployeeOnly>}/>
            <Route path="/CreateUser" element={<EmployeeOnly><CreateUser/></EmployeeOnly>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/registerv2" element={<Signupv2/>}/>
            <Route path="/ManagerDashboard" element={<UserOnly><Manager/></UserOnly>}/>
            <Route path="login" element={<Login/>}/>

          </Routes>
        </AuthProvider>
      </Router>
      
      </div>
      </div>
  );
}

export default App;
