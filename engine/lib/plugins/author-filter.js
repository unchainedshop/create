import { FilterDirector, FilterAdapter } from 'meteor/unchained:core-filters';

class PublicareAttributeFilter extends FilterAdapter {
  static key = 'currybag.filter.ingredients';

  static label = 'Filter ingredients';

  static version = '0.1';

  static orderIndex = 10;

  static isActivatedFor() {
    // eslint-disable-line
    return true;
  }

  // eslint-disable-next-line
  async transformProductSelector(last, { key, value }) {
    if (key !== 'author') return last;
    return {
      status: 'ACTIVE',
      'meta.currybag.ingredients':
        value !== undefined ? value : { $exists: true },
    };
  }
}

FilterDirector.registerAdapter(PublicareAttributeFilter);
