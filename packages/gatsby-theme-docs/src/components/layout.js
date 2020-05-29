/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from 'theme-ui';

const Layout = ({ children }) => (
  <Fragment>
    <header
      sx={{ bg: 'primary', color: 'background', fontFamily: 'heading', p: 3 }}
    >
      gatsby-theme-docs
    </header>
    <main sx={{ mx: 'auto', maxWidth: 650, width: '90vw' }}>{children}</main>
  </Fragment>
);

export default Layout;
