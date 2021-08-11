import { Row, Col } from 'reactstrap';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import Masthead from 'components/shared/Masthead';
import { useGetUser } from '@/actions/user';
import BlogApi from 'lib/api/blogs';
import BlogItem from 'components/BlogItem';

const Blogs = ({ blogs }) => {
  const { data: user, loading } = useGetUser();
  
  return (
    <BaseLayout
      navClass="transparent" className="blog-listing-page"
      user={user} loading={loading}>
      <Masthead imagePath="/images/home-bg.jpg">
        <h1>Fresh Blogs</h1>
        <span className="subheading">Programming, travelling...</span>
      </Masthead>
      <BasePage
        title="Newst Blog - Filip Jerga"
        className="blog-body"
      >
        <Row>
          {
            blogs.map((blog, author) => 
              <Col key={blog._id} md="10" lg="8" className="mx-auto">
                <BlogItem blog={blog} />
                <hr></hr> 
              </Col>             
            )
          }
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export async function getStaticProps() {
  const { data } = await new BlogApi().getAll();
  const blogs = data.map((item) => ({...item.blog, author: item.author}));

  return {
    props: { blogs },
    revalidate: 1
  }
}

export default Blogs
