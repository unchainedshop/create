import { mergeSchemas, addSchemaLevelResolveFunction } from 'graphql-tools';
import getConfig from 'next/config';

import getSchemas from './remotes';
import convertStreamToBufferObject from './convertStreamToBufferObject';

const {
  publicRuntimeConfig: { NODE_ENV },
} = getConfig();

const namedQueryCacheMap = {
  // Unchained
  assortmentTree: { maxAge: 60 * 60, scope: 'PUBLIC' },
  assortmentPaths: { maxAge: 60 * 60, scope: 'PUBLIC' },
  assortmentChildren: { maxAge: 60 * 60, scope: 'PUBLIC' },

  // Cockpit
  // cmsPage: { maxAge: 60, scope: 'PUBLIC' },
  // cmsCategories: { maxAge: 60, scope: 'PUBLIC' },
  // cmsInfoText: { maxAge: 60, scope: 'PUBLIC' },
  // cmsNavigationTitles: { maxAge: 60, scope: 'PUBLIC' },
  // cmsPageNavigationTitle: { maxAge: 60, scope: 'PUBLIC' },
  // cmsPageById: { maxAge: 60, scope: 'PUBLIC' },
  // cmsGetEvents: { maxAge: 60, scope: 'PUBLIC' },
  // cmsGetNewsletters: { maxAge: 60, scope: 'PUBLIC' },
  // cmsGetStories: { maxAge: 60, scope: 'PUBLIC' },
  // cmsGetJobs: { maxAge: 60, scope: 'PUBLIC' },
  // cmsCategoryByUnchainedSlug: { maxAge: 60, scope: 'PUBLIC' },
  // cmsHomeCollection: { maxAge: 60, scope: 'PUBLIC' },
};

const addCacheHintToQueryOrType = (
  parent,
  args,
  context,
  { cacheControl, operation, ...info },
) => {
  const cacheHint = namedQueryCacheMap?.[operation?.name?.value];
  if (cacheHint) {
    cacheControl.setCacheHint(cacheHint);
  } else if (NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.warn(
      `Could not find cache configuration for ${operation?.name?.value} (${info.fieldName})`,
    );
  }
};

// eslint-disable-next-line
export default async () => {
  try {
    const [unchainedSchema, getCockpitSchema] = await getSchemas();
    const mergedSchema = mergeSchemas({
      schemas: [unchainedSchema, getCockpitSchema],
      // resolvers: {
      //   Mutation: {
      //     async uploadRecipe(parent, { pdf, ...args }, context, info) {
      //       const file = await pdf;
      //       const fileObj = await convertStreamToBufferObject(file);
      //       const result = await info.mergeInfo.delegateToSchema({
      //         schema: unchainedSchema,
      //         operation: 'mutation',
      //         fieldName: 'uploadRecipe',
      //         args: {
      //           ...args,
      //           pdf: fileObj,
      //         },
      //         context,
      //         info,
      //       });
      //       return result;
      //     },
      //   },
      // },
    });

    const typeMap = mergedSchema.getTypeMap();
    Object.keys(typeMap).forEach((typeName) => {
      const type = mergedSchema.getType(typeName);
      if (type.getFields) {
        const fields = type.getFields();
        Object.keys(fields).forEach((fieldName) => {
          if (
            fields[fieldName]?.resolve &&
            fields[fieldName]?.resolve instanceof Function &&
            fields[fieldName]?.astNode?.kind === 'FieldDefinition'
          ) {
            const originalResolveFn = fields[fieldName].resolve;
            fields[fieldName].resolve = (...rest) => {
              addCacheHintToQueryOrType(...rest);
              return originalResolveFn(...rest);
            };
          }
        });
      }
    });
    addSchemaLevelResolveFunction(mergedSchema, addCacheHintToQueryOrType);

    return mergedSchema;
  } catch (e) {
    // eslint-disable-next-line
    console.error(
      'Could not load all schemas, abort here so the docker container restarts...',
      e,
    );
    process.exit(500);
  }
};
