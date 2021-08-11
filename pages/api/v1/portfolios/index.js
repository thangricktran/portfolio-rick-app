
import PortfolioApi from '@/lib/api/portfolios';
import auth0 from '@/utils/auth0';

export default async function createPortfolio(req, res) {

  try {
    const { accessToken } = await auth0.getSession(req);
    // console.log('portfolios.js pages/api/v1 session.accessToken: \n', accessToken);
    const resData = await new PortfolioApi(accessToken).create(req.body);
    // console.log('portfolios.js pages/api/v1 resData.data: \n', resData.data);
    return res.json(resData.data);
  } catch (error) {
    // return res.status(error.status || 400).end(error.message);
    return res.status(error.status || 422).json(error.response.data);
  }
}
