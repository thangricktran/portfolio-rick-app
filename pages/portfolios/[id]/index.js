// import Link from 'next/link';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import PortfolioApi from '@/lib/api/portfolios';
import { formatDate } from 'helpers/functions';
import { useRouter } from 'next/router';

const PortfolioDetail = ({portfolio}) => {
  const { data: user, loading: loading2 } = useGetUser();
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Your page is getting server</h1>
  }

  return (
    <BaseLayout navClass="transparent" user={user} loading={loading2}>
      <BasePage
        noWrapper
        indexPage
        title={`${portfolio.title} - Filip Jerga`}
        metaDescription={portfolio.description.substr(0,100)}
      >
        <div className="portfolio-detail">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              { router.isFallback &&
                <h1 className="cover-heading">Your page is getting served...</h1>
              }
              { !router.isFallback &&
                <>
                  <h1 className="cover-heading">{portfolio.title}</h1>
                  <p className="lead dates">{formatDate(portfolio.startDate)} to {formatDate(portfolio.endDate) || 'Present'}</p>
                  <p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
                  <p className="lead">{portfolio.description}</p>
                  <p className="lead">
                    <a href={`${portfolio.companyWebsite}`} target="_" className="btn btn-lg btn-secondary">{portfolio.companyWebsite}</a>
                  </p>
                </>
              }
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
}
// THIS WORKS
// export async function getServerSideProps({query}) {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;

//   return {
//     props: { portfolio }
//   };
// }
// This function is executed at build time
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  // Get the paths we want pre-render based on portfolio ID
  const paths = portfolios.map((portfolio) => {
    return {
      params: {id: portfolio._id}
    }
  });

  // fallback false means page that "not found" and will
  // resolve in rendering 404 page 
  return { paths, fallback: true };
}

export async function getStaticProps({params}) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return {props: {portfolio}, revalidate: 1};
};

export default PortfolioDetail;
