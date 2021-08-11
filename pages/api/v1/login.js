import auth0 from '@/utils/auth0';

const Login = async (req, res) => {
  
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error("pages/api/v1/login error:\n", error);    
    res.status(error.status || 400).end(error.message);
  }
}

export default Login;