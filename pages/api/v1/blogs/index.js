
import BlogApi from '@/lib/api/blogs';
import auth0 from '@/utils/auth0';

export default async function createBlog(req, res) {

  try {
    const { accessToken } = await auth0.getSession(req);
    // console.log('index.js pages/api/v1/blogs/index.js session.accessToken: \n', accessToken);
    const resJson = await new BlogApi(accessToken).create(req.body);
    // console.log('index.js pages/api/v1/blogs/index.js resJson.data: \n', resJson.data);
    return res.json(resJson.data);
  } catch (error) {
    // return res.status(error.status || 400).end(error.message);
    return res.status(error.status || 422).json(error.response.data);
  }
}
