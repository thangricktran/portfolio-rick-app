
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { withAuth } from '@/utils/auth0';

const OnlyAdminSSR = ({user, title}) => {
  
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
      <h1>This is my OnlyAdmin SSR Page - {user && user.name}</h1>
      <h2>{title}</h2>
      </BasePage>
    </BaseLayout>
  );
}

const getTitle = () => {
  return new Promise((resolve) => {
    const item = {title: "My New  AdminSSR Title"};
    
    setTimeout(() => {
      resolve(item);
    }, 500);
  })
}

export const getServerSideProps = withAuth(async ({req, res}, user) => {

  const title = await getTitle();
  return title;
})('admin');

export default OnlyAdminSSR;