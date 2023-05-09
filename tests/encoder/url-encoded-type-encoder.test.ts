import { describe, expect, test } from '@jest/globals';
import { createUrlEncodedTypeEncoder } from '../../src/encoder/url-encoded-type-encoder';
import data from '../data';

describe('createUrlEncodedTypeEncoder', () => {
  test('data', () => {
    const encoder = createUrlEncodedTypeEncoder();

    expect(encoder.contentType).toBe('application/x-www-form-urlencoded');

    expect(encoder.encode(data)).toMatchInlineSnapshot(
      '"page=1&perPage=10&search=null&sort=name&order=asc&_embedded[mainItem][id]=id1&_embedded[mainItem][name]=A%20f%C3%A4ncy%20Name%0A&_embedded[mainItem][treeValues][key1][key11]=3&_embedded[mainItem][progress]=76.8&_embedded[mainItem][active]=true&_embedded[mainItem][_type]=item&_embedded[mainItem][_links][read][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[mainItem][_links][read][templated]=false&_embedded[mainItem][_links][read][attributes][method]=GET&_embedded[mainItem][_links][update][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[mainItem][_links][update][templated]=false&_embedded[mainItem][_links][update][attributes][method]=PUT&_embedded[mainItem][_links][delete][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[mainItem][_links][delete][templated]=false&_embedded[mainItem][_links][delete][attributes][method]=DELETE&_embedded[items][0][id]=id1&_embedded[items][0][name]=%0AA%20f%C3%A4ncy%20Name%0A&_embedded[items][0][treeValues][key1][key11]=3&_embedded[items][0][progress]=76.8&_embedded[items][0][active]=true&_embedded[items][0][_type]=item&_embedded[items][0][_links][read][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[items][0][_links][read][templated]=false&_embedded[items][0][_links][read][attributes][method]=GET&_embedded[items][0][_links][update][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[items][0][_links][update][templated]=false&_embedded[items][0][_links][update][attributes][method]=PUT&_embedded[items][0][_links][delete][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid1&_embedded[items][0][_links][delete][templated]=false&_embedded[items][0][_links][delete][attributes][method]=DELETE&_embedded[items][1][id]=id2&_embedded[items][1][name]=B%20fancy%20Name&_embedded[items][1][treeValues][key1][key11]=3&_embedded[items][1][treeValues][key1][key12]=4&_embedded[items][1][progress]=24.7&_embedded[items][1][active]=true&_embedded[items][1][_type]=item&_embedded[items][1][_links][read][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid2&_embedded[items][1][_links][read][templated]=false&_embedded[items][1][_links][read][attributes][method]=GET&_embedded[items][1][_links][update][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid2&_embedded[items][1][_links][update][templated]=false&_embedded[items][1][_links][update][attributes][method]=PUT&_embedded[items][1][_links][delete][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid2&_embedded[items][1][_links][delete][templated]=false&_embedded[items][1][_links][delete][attributes][method]=DELETE&_embedded[items][2][id]=id3&_embedded[items][2][name]=C%20fancy%20Name&_embedded[items][2][treeValues][key1][key11]=3&_embedded[items][2][treeValues][key1][key12]=4&_embedded[items][2][treeValues][key1][key13]=7&_embedded[items][2][progress]=100&_embedded[items][2][active]=false&_embedded[items][2][_type]=item&_embedded[items][2][_links][read][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid3&_embedded[items][2][_links][read][templated]=false&_embedded[items][2][_links][read][attributes][method]=GET&_embedded[items][2][_links][update][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid3&_embedded[items][2][_links][update][templated]=false&_embedded[items][2][_links][update][attributes][method]=PUT&_embedded[items][2][_links][delete][href]=http%3A%2F%2Ftest.com%2Fitems%2Fid3&_embedded[items][2][_links][delete][templated]=false&_embedded[items][2][_links][delete][attributes][method]=DELETE&_links[self][href]=http%3A%2F%2Ftest.com%2Fitems%2F%3Fpage%3D1%26perPage%3D10%26sort%3Dname%26order%3Dasc&_links[self][method]=GET&_links[create][href]=http%3A%2F%2Ftest.com%2Fitems%2F&_links[create][method]=POST&_type=search"',
    );
  });

  test('empty object', () => {
    const encoder = createUrlEncodedTypeEncoder();

    expect(encoder.encode({ data: {} })).toMatchInlineSnapshot('""');
  });

  test('empty array', () => {
    const encoder = createUrlEncodedTypeEncoder();

    expect(encoder.encode({ data: [] })).toMatchInlineSnapshot('""');
  });
});
