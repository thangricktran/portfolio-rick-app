import { useRouter } from 'next/router';
import { Row, Col } from 'reactstrap';
import { SlateView } from 'slate-simple-editor';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import BlogApi from 'lib/api/blogs';
import Avatar from 'components/shared/Avatar';

const BlogDetail = ({ blog, author }) => {
  const { data, loading } = useGetUser();

  const router = useRouter();

  if (router.isFallback) {
    return <h1>Your page is fetching from the server.</h1>
  }
  
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage 
        title={`${blog.title} - Filip Jerga`}
        className="slate-container"
        metaDescription={blog.subTitle}
      >        
        <Row>
          <Col md={{size: 8, offset: 2}}>
            <Avatar
              title={author.name}
              image={author.picture}
              date={blog.createdAt}
            />
            <SlateView initialContent={blog.content} />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export async function getStaticPaths() {
  const { data } = await new BlogApi().getAll();
  const paths = data.map(({blog}) => ({ params: { slug: blog.slug } }));
  
  // console.log("pages > blogs > [slug].js getStaticPaths() paths: ", paths);
  
  // const json = await new BlogApi().getAll();
  // const blogs = json.data;
  // Line below, Filip re-destructure the blog from item object  
  // const paths = blogs.map(ba => ({params: { slug: ba.blog.slug}}));
  // LONG format
  // const paths = blogs.map((ba) => {
  //   return {
  //     params: { slug: ba.blog.slug }
  //   }
  // });
  // SHORT format
  return { paths, fallback: true };
}

export async function getStaticProps({params}) {
  const { data: {blog, author} } = await new BlogApi().getBySlug(params.slug);
  // console.log("pages > blogs > [slug].js getStaticProps({params}) blog: \n", blog);
  return { props: { blog, author}, revalidate: 1 };
}

export default BlogDetail;
