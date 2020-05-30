/** @jsx jsx */

import { jsx } from 'theme-ui';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Image from 'gatsby-image';

export const query = graphql`
  query {
    image: file(name: { eq: "negroni" }) {
      cloudinary: childCloudinaryAsset {
        fluid(transformations: ["ar_18:9", "c_fill"]) {
          base64
          aspectRatio
          sizes
          src
          srcSet
        }
      }
    }
  }
`;

const Index = ({ data }) => (
  <Layout>
    <Image fluid={data.image.cloudinary.fluid} alt="Negroni." />
    <h1>Negronis: A Love Story</h1>
    <p>
      A Negroni, while simple, is a beautifully complex cocktail with endless
      opportunities to experiment with flavors.
    </p>
    <Link to="/history">Learn the History</Link>
    <Link to="/recipes" sx={{ ml: 2 }}>
      Recipes
    </Link>
    <Link to="/events" sx={{ ml: 2 }}>
      Upcomming Events
    </Link>
  </Layout>
);

export default Index;
