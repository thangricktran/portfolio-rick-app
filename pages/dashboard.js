import Link from 'next/link';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import MastHead from 'components/shared/Masthead';
import PortDropdown from 'components/shared/Dropdown';
import withAuth from 'hoc/withAuth';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useUpdateBlog, useGetUserBlogs } from 'actions/blogs';

const Dashboard = ({user, loading}) => {
  const [updateBlog] = useUpdateBlog();
  const { data: blogs, mutate } = useGetUserBlogs();
  // swr has a function called 'mutate' to fetch for changed data

  const changeBlogStatus = async (blogId, status) => {
    await updateBlog(blogId, { status })
      .then(()=>mutate())
      .catch((e) => 
        toast.error(`${e?.response?.data ? e.response.data:e.toString()}`));
  };

  const renderBlogs = (blogs = [], status) => (
    <ul className="user-blogs-list">
      {blogs && blogs.filter(blog => blog.status === status).map(blog =>
        <li key={blog._id}>
          <Link href="/blogs/editor/[id]" as={`/blogs/editor/${blog._id}`}>
            <a>{blog.title}</a>
          </Link>
          <PortDropdown key={blog._id} items={createOptions(blog)} />
        </li>
      )}
    </ul>
  );

  const createOption = (blogStatus) => {
    return (blogStatus === 'draft') ? 
      { view: 'Public Story', value: 'published' } :
      { view: 'Make a Draft', value: 'draft' }
  };

  const createOptions = (blog) => {
    const option = createOption(blog.status);

    return [
      { key: `${blog._id}-published`, 
        text: option.view, 
        handlers: { 
          onClick: () => changeBlogStatus(blog._id, option.value)
        }
      },
      { key: `${blog._id}-deleted`, 
        text: 'Delete', 
        handlers: { 
          onClick: () => changeBlogStatus(blog._id, 'deleted')
        }
      }
    ];
  };

  return (
    <BaseLayout navClass="transparent" user={user} loading={loading}>
      <MastHead imagePath="/images/home-bg.jpg">
        <h1>Blogs Dashboard</h1>
          <span className="subheading">
            Let&#39;s write some nice blog today{' '}
            <Link href='/blogs/editor'>
              {/* <Button color="primary">Create a new Blog</Button> */}
              <a color="primary">Create a new Blog</a>
            </Link>
          </span>
      </MastHead>
      <BasePage className="blog-user-page">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
            {renderBlogs(blogs, 'published')}
          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
            {renderBlogs(blogs, 'draft')}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default withAuth(Dashboard)('admin');