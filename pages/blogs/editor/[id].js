import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { Editor } from 'slate-simple-editor';
import { toast } from 'react-toastify';
import { useGetBlog, useUpdateBlog } from 'actions/blogs';
import { useRouter } from 'next/router';

const BlogUpdateEditor = ({user, loading}) => {
  const router = useRouter();
  const { data } = useGetBlog(router.query.id);
  const [updateBlog, {error, loading: isBlogSaving}] = useUpdateBlog();

  const _updateBlog = async (data) => {
    try {
      await updateBlog(router.query.id, data);
      toast.success('This blog has been updated!');      
    } catch (error) {
    }
  };

  if (error) {
    toast.error(`${error?.response?.data ? error.response.data:error.toString()}`);
  }

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
        { data && data.content &&
          <Editor 
            header="Update Your Blog"
            initialContent={data.content}
            loading={isBlogSaving}
            onSave={_updateBlog}
          />
        }  
      </BasePage>
    </BaseLayout>
  );
}

export default withAuth(BlogUpdateEditor)('admin');
