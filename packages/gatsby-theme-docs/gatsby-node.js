const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const withDefaults = require('./utils/default-options');

exports.onPreBootstrap = ({ store }, options) => {
  const { program } = store.getState();
  const { contentPath } = withDefaults(options);
  const dir = path.join(program.directory, contentPath);

  if (!fs.existsSync(dir)) {
    mkdirp.sync(dir);
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type DocsPage implements Node @dontInfer {
        id: ID!
        title: String!
        path: String!        
        updated: Date! @dateformat
        body: String!
    }
`);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }, options) => {
  const { basePath } = withDefaults(options);
  const parent = getNode(node.parent);

  //Only works on MDX files that were loaded by this theme
  if (
    node.internal.type !== 'Mdx' ||
    parent.sourceInstanceName !== 'gatsby-theme-docs'
  ) {
    return;
  }

  // Treat `Index.mdx` link `Index.html`(i.e. `docs/`vs. `docs/index.html`)
  const pageName = parent.name !== `index` ? parent.name : '';

  actions.createNode({
    id: createNodeId(`DocsPage-${node.id}`),
    title: node.frontmatter.title || parent.name,
    updated: parent.modifiedTime,
    path: path.join('/', basePath, parent.relativeDirectory, pageName),
    parent: node.id,
    internal: {
      type: 'DocsPage',
      contentDigest: node.internal.contentDigest,
    },
  });
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    DocsPage: {
      body: {
        type: 'String!',
        resolve: (source, args, context, info) => {
          // Load the resolver for the `MDX` type `body`field
          const type = info.schema.getType('Mdx');
          const mdxFields = type.getFields();
          const resolver = mdxFields.body.resolve;

          const mdxNode = context.nodeModel.getNodeById({ id: source.parent });

          return resolver(mdxNode, args, context, {
            fieldName: 'body',
          });
        },
      },
    },
  });
};
