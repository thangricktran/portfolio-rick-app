import { useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import { Row, Col, Button } from 'reactstrap';

import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import { useDeletePortfolio } from '@/actions/portfolios';
import PortfolioApi from '@/lib/api/portfolios';
import PortfolioCard from '@/components/PortfolioCard';
import { isAuthorized } from '@/utils/auth0';

const Portfolios = ({portfolios: initialPortfolios}) => { 
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const { data: user, loading: loading2 } = useGetUser();
  const [deletePortfolio, {data, error}] = useDeletePortfolio();

  const _deletePortfolio = async (e, id) => {
    e.stopPropagation();
    const portfolioRec = portfolios.find((p) => p._id === id);
    const isConfirmed = confirm(
      `Are you sure you want to delete this portfolio with id ${id}\n` +
      `and title: ${portfolioRec.title}?`);
    if (isConfirmed) {      
      try {
        await deletePortfolio(id);
        const newPortfolios = portfolios.filter((p) => p._id !== id);
        setPortfolios(newPortfolios);
      } catch (e) {
        // alert(`Unable to delete portifio with id ${id}.`);
        alert(`Unable to delete portifio with id ${id}.\n` +
        `Server response: ${e?.response?.data ? e.response.data:e.toString()}`);
      }
    }
  };

  return (
    <BaseLayout user={user} loading={loading2}>
      <BasePage 
        title="Newest Portfolios - Filip Jerga"
        header="Portfolios"
        className="portfolio-page"
      >        
        <Row>
          {portfolios.map(portfolio => 
            <Col 
              key={portfolio._id} 
              md="4"
              onClick={() => {
                router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`)
              }}
            >
              <PortfolioCard 
                portfolio={portfolio}
              >
                { user && isAuthorized(user, 'admin') &&
                <>
                  <Button 
                    className="mr-2" 
                    color="warning"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`)
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    color="danger"
                    onClick={(e) => _deletePortfolio(e, portfolio._id)}
                  >
                    Delete
                  </Button>
                </>
                }
              </PortfolioCard>
            </Col>
          )}
        </Row>
      </BasePage>
    </BaseLayout>
  );
}

// This function is called during build time
// Improve performance of page loading
// It will create static page with dynamic data
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  return {
    props: { portfolios },
    revalidate: 1
  }
};

export default Portfolios;
