import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { Editor } from 'slate-simple-editor';
import { useCreateBlog } from 'actions/blogs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const BlogEditor = ({user, loading}) => {
  const router = useRouter();
  const [createBlog, {data: createdBlog, error, loading: blogLoading}] = useCreateBlog();

  const saveBlogData = async (data) => {
    try {
      const blog = await createBlog(data);
      router.push('/blogs/editor/[id]', `/blogs/editor/${blog._id}`);
    } catch(e) {
      console.log(e);
      // toast.error(`${e?.response?.data ? e.response.data:e.toString()}`, {autoClose: 4000})
    }
  };
 
  if (error) {
    //alert(`${error?.response?.data ? error.response.data:error.toString()}`)
    toast.error(`${error?.response?.data ? error.response.data:error.toString()}`, {autoClose: 4000})  
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        <Editor 
          header="My First Story" 
          loading={blogLoading} 
          onSave={saveBlogData}
        />
      </BasePage>
    </BaseLayout>
  );
}

export default withAuth(BlogEditor)('admin');
