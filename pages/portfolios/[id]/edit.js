import { useState, useEffect } from 'react';
import {Row, Col} from 'reactstrap';
import { toast } from 'react-toastify';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';
import { useRouter } from 'next/router';
import { useGetPortfolio, useUpdatePortfolio } from '@/actions/portfolios';
import PortfolioForm from '@/components/PortfolioForm';
// import Redirect from '@/components/shared/Redirect';

const PortfolioEdit = ({user}) => {
  const router = useRouter();
  const [portfolioData, setPortfioData ] = useState(null);
  const [ updatePortfolio, {data: resData, error, loading }] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);

  const redirectHome = () => {
    router.push('/portfolios');
  };

  const options = {
    autoClose: 4000,
    onClose: ()=>redirectHome()
  };

  const _updatePortfolio = async (data) => {
    try {
      const rData = await updatePortfolio(router.query.id, data);
      // console.log("rData: ", rData);
      toast.success('Portfolio has been updated!', options);
      setPortfioData(rData);
    } catch(e) {
      toast.error(`${e?.response?.data ? e.response.data:e.toString()}`, {autoClose: 4000})
    }

    // await updatePortfolio(router.query.id, data);
    // toast.success("Portfolio has been updated!", toastOptions);
  };
  
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage header="Portfolio Edit">
        <Row>
          <Col md="8">
            { initialData &&
              <PortfolioForm 
                buttonLabel="Update"
                initialData={initialData} 
                onSubmit={_updatePortfolio}
              />
            }
            {loading && <div className="alert alert-danger mb-3">...saving</div>}
            {error && <div className="alert alert-danger mt-3">{error?.response?.data ? error.response.data:error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

export default withAuth(PortfolioEdit)('admin');
