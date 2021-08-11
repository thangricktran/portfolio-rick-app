import auth0 from '@/utils/auth0';

const Logout = async (req, res) => {
  
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error("pages/api/vi/logout error: \n", error);
    res.status(error.status || 400).end(error.message);
  }
}

export default Logout;