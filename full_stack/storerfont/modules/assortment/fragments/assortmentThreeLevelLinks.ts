import { gql } from '@apollo/client';

import AssortmentFragment from './assortment';

const AssortmentThreeLevelLinksFragment = gql`
  fragment AssortmentThreeLevelLinksFragment on AssortmentLink {
    _id
    parent {
      ...AssortmentFragment
    }
    child {
      ...AssortmentFragment
      linkedAssortments {
        _id
        parent {
          ...AssortmentFragment
        }
        child {
          ...AssortmentFragment
          linkedAssortments {
            _id
            parent {
              ...AssortmentFragment
            }
            child {
              ...AssortmentFragment
              linkedAssortments {
                _id
                parent {
                  ...AssortmentFragment
                }
                child {
                  ...AssortmentFragment
                }
              }
            }
          }
        }
      }
    }
  }
  ${AssortmentFragment}
`;

export default AssortmentThreeLevelLinksFragment;
