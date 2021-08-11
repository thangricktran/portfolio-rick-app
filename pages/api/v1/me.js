import auth0 from '@/utils/auth0';

const Me = async (req, res) => {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.error("From pages/api/v1/me error", error);
    res.status(error.status || 400).end(error.message);
    // res.status(200).end({user: null});
  }
}

export default Me;