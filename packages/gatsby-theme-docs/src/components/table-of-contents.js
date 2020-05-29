/** @jsx jsx */
import { jsx } from 'theme-ui';
import { graphql, Link, useStaticQuery } from 'gatsby';

const TableofContents = () => {
  const data = useStaticQuery(graphql`
    query {
      allDocsPage {
        nodes {
          id
          title
          path
        }
      }
    }
  `);

  const pages = data.allDocsPage.nodes;

  return (
    <div>
      <h2>Explore the docs</h2>
      <ul>
        {pages.map(({ id, path, title }) => (
          <li key={id}>
            <Link
              to={path}
              sx={{
                '&.active': {
                  fontStyle: 'italic',
                  textDecoration: 'node',
                  '::after': { content: '"(currently viewing"' },
                },
              }}
              activeClassName="active"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableofContents;
