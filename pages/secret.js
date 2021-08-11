
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';

const Secret = ({user, loading}) => {
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage>
      <h1>This is my Secret Page - {user && user.name}</h1>
      </BasePage>
    </BaseLayout>
  );
}

export default withAuth(Secret)();