import { describe, expect, test } from '@jest/globals';
import { Data } from '../../src';
import { createJsonxTypeEncoder } from '../../src/encoder/jsonx-type-encoder';
import data from '../data';

describe('createJsonxTypeEncoder', () => {
  test('prettyPrint: false', async () => {
    const encoder = createJsonxTypeEncoder();

    expect(encoder.contentType).toBe('application/jsonx+xml');

    expect(encoder.encode(data)).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><json:object xsi:schemaLocation=\\"http://www.datapower.com/schemas/json jsonx.xsd\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:json=\\"http://www.ibm.com/xmlns/prod/2009/jsonx\\"><json:number name=\\"page\\">1</json:number><json:number name=\\"perPage\\">10</json:number><json:null name=\\"search\\"></json:null><json:string name=\\"sort\\">name</json:string><json:string name=\\"order\\">asc</json:string><json:object name=\\"_embedded\\"><json:object name=\\"mainItem\\"><json:string name=\\"id\\">id1</json:string><json:string name=\\"name\\"><![CDATA[A f&#228;ncy Name
      ]]></json:string><json:object name=\\"treeValues\\"><json:object name=\\"key1\\"><json:number name=\\"key11\\">3</json:number></json:object></json:object><json:number name=\\"progress\\">76.8</json:number><json:boolean name=\\"active\\">true</json:boolean><json:string name=\\"_type\\">item</json:string><json:object name=\\"_links\\"><json:object name=\\"read\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">GET</json:string></json:object></json:object><json:object name=\\"update\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">PUT</json:string></json:object></json:object><json:object name=\\"delete\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">DELETE</json:string></json:object></json:object></json:object></json:object><json:array name=\\"items\\"><json:object><json:string name=\\"id\\">id1</json:string><json:string name=\\"name\\"><![CDATA[
      A f&#228;ncy Name
      ]]></json:string><json:object name=\\"treeValues\\"><json:object name=\\"key1\\"><json:number name=\\"key11\\">3</json:number></json:object></json:object><json:number name=\\"progress\\">76.8</json:number><json:boolean name=\\"active\\">true</json:boolean><json:string name=\\"_type\\">item</json:string><json:object name=\\"_links\\"><json:object name=\\"read\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">GET</json:string></json:object></json:object><json:object name=\\"update\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">PUT</json:string></json:object></json:object><json:object name=\\"delete\\"><json:string name=\\"href\\">http://test.com/items/id1</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">DELETE</json:string></json:object></json:object></json:object></json:object><json:object><json:string name=\\"id\\">id2</json:string><json:string name=\\"name\\">B fancy Name</json:string><json:object name=\\"treeValues\\"><json:object name=\\"key1\\"><json:number name=\\"key11\\">3</json:number><json:number name=\\"key12\\">4</json:number></json:object></json:object><json:number name=\\"progress\\">24.7</json:number><json:boolean name=\\"active\\">true</json:boolean><json:string name=\\"_type\\">item</json:string><json:object name=\\"_links\\"><json:object name=\\"read\\"><json:string name=\\"href\\">http://test.com/items/id2</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">GET</json:string></json:object></json:object><json:object name=\\"update\\"><json:string name=\\"href\\">http://test.com/items/id2</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">PUT</json:string></json:object></json:object><json:object name=\\"delete\\"><json:string name=\\"href\\">http://test.com/items/id2</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">DELETE</json:string></json:object></json:object></json:object></json:object><json:object><json:string name=\\"id\\">id3</json:string><json:string name=\\"name\\">C fancy Name</json:string><json:object name=\\"treeValues\\"><json:object name=\\"key1\\"><json:number name=\\"key11\\">3</json:number><json:number name=\\"key12\\">4</json:number><json:number name=\\"key13\\">7</json:number></json:object></json:object><json:number name=\\"progress\\">100</json:number><json:boolean name=\\"active\\">false</json:boolean><json:string name=\\"_type\\">item</json:string><json:object name=\\"_links\\"><json:object name=\\"read\\"><json:string name=\\"href\\">http://test.com/items/id3</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">GET</json:string></json:object></json:object><json:object name=\\"update\\"><json:string name=\\"href\\">http://test.com/items/id3</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">PUT</json:string></json:object></json:object><json:object name=\\"delete\\"><json:string name=\\"href\\">http://test.com/items/id3</json:string><json:boolean name=\\"templated\\">false</json:boolean><json:object name=\\"attributes\\"><json:string name=\\"method\\">DELETE</json:string></json:object></json:object></json:object></json:object></json:array></json:object><json:object name=\\"_links\\"><json:object name=\\"self\\"><json:string name=\\"href\\">http://test.com/items/?page=1&#38;perPage=10&#38;sort=name&#38;order=asc</json:string><json:string name=\\"method\\">GET</json:string></json:object><json:object name=\\"create\\"><json:string name=\\"href\\">http://test.com/items/</json:string><json:string name=\\"method\\">POST</json:string></json:object></json:object><json:string name=\\"_type\\">search</json:string></json:object>"
    `);
  });

  test('prettyPrint: true', async () => {
    const encoder = createJsonxTypeEncoder(true);

    expect(encoder.contentType).toBe('application/jsonx+xml');

    expect(encoder.encode(data)).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <json:object xsi:schemaLocation=\\"http://www.datapower.com/schemas/json jsonx.xsd\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:json=\\"http://www.ibm.com/xmlns/prod/2009/jsonx\\">
        <json:number name=\\"page\\">
          1
        </json:number>
        <json:number name=\\"perPage\\">
          10
        </json:number>
        <json:null name=\\"search\\">
        </json:null>
        <json:string name=\\"sort\\">
          name
        </json:string>
        <json:string name=\\"order\\">
          asc
        </json:string>
        <json:object name=\\"_embedded\\">
          <json:object name=\\"mainItem\\">
            <json:string name=\\"id\\">
              id1
            </json:string>
            <json:string name=\\"name\\">
              <![CDATA[A f&#228;ncy Name
      ]]>
            </json:string>
            <json:object name=\\"treeValues\\">
              <json:object name=\\"key1\\">
                <json:number name=\\"key11\\">
                  3
                </json:number>
              </json:object>
            </json:object>
            <json:number name=\\"progress\\">
              76.8
            </json:number>
            <json:boolean name=\\"active\\">
              true
            </json:boolean>
            <json:string name=\\"_type\\">
              item
            </json:string>
            <json:object name=\\"_links\\">
              <json:object name=\\"read\\">
                <json:string name=\\"href\\">
                  http://test.com/items/id1
                </json:string>
                <json:boolean name=\\"templated\\">
                  false
                </json:boolean>
                <json:object name=\\"attributes\\">
                  <json:string name=\\"method\\">
                    GET
                  </json:string>
                </json:object>
              </json:object>
              <json:object name=\\"update\\">
                <json:string name=\\"href\\">
                  http://test.com/items/id1
                </json:string>
                <json:boolean name=\\"templated\\">
                  false
                </json:boolean>
                <json:object name=\\"attributes\\">
                  <json:string name=\\"method\\">
                    PUT
                  </json:string>
                </json:object>
              </json:object>
              <json:object name=\\"delete\\">
                <json:string name=\\"href\\">
                  http://test.com/items/id1
                </json:string>
                <json:boolean name=\\"templated\\">
                  false
                </json:boolean>
                <json:object name=\\"attributes\\">
                  <json:string name=\\"method\\">
                    DELETE
                  </json:string>
                </json:object>
              </json:object>
            </json:object>
          </json:object>
          <json:array name=\\"items\\">
            <json:object>
              <json:string name=\\"id\\">
                id1
              </json:string>
              <json:string name=\\"name\\">
                <![CDATA[
      A f&#228;ncy Name
      ]]>
              </json:string>
              <json:object name=\\"treeValues\\">
                <json:object name=\\"key1\\">
                  <json:number name=\\"key11\\">
                    3
                  </json:number>
                </json:object>
              </json:object>
              <json:number name=\\"progress\\">
                76.8
              </json:number>
              <json:boolean name=\\"active\\">
                true
              </json:boolean>
              <json:string name=\\"_type\\">
                item
              </json:string>
              <json:object name=\\"_links\\">
                <json:object name=\\"read\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id1
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      GET
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"update\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id1
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      PUT
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"delete\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id1
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      DELETE
                    </json:string>
                  </json:object>
                </json:object>
              </json:object>
            </json:object>
            <json:object>
              <json:string name=\\"id\\">
                id2
              </json:string>
              <json:string name=\\"name\\">
                B fancy Name
              </json:string>
              <json:object name=\\"treeValues\\">
                <json:object name=\\"key1\\">
                  <json:number name=\\"key11\\">
                    3
                  </json:number>
                  <json:number name=\\"key12\\">
                    4
                  </json:number>
                </json:object>
              </json:object>
              <json:number name=\\"progress\\">
                24.7
              </json:number>
              <json:boolean name=\\"active\\">
                true
              </json:boolean>
              <json:string name=\\"_type\\">
                item
              </json:string>
              <json:object name=\\"_links\\">
                <json:object name=\\"read\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id2
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      GET
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"update\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id2
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      PUT
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"delete\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id2
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      DELETE
                    </json:string>
                  </json:object>
                </json:object>
              </json:object>
            </json:object>
            <json:object>
              <json:string name=\\"id\\">
                id3
              </json:string>
              <json:string name=\\"name\\">
                C fancy Name
              </json:string>
              <json:object name=\\"treeValues\\">
                <json:object name=\\"key1\\">
                  <json:number name=\\"key11\\">
                    3
                  </json:number>
                  <json:number name=\\"key12\\">
                    4
                  </json:number>
                  <json:number name=\\"key13\\">
                    7
                  </json:number>
                </json:object>
              </json:object>
              <json:number name=\\"progress\\">
                100
              </json:number>
              <json:boolean name=\\"active\\">
                false
              </json:boolean>
              <json:string name=\\"_type\\">
                item
              </json:string>
              <json:object name=\\"_links\\">
                <json:object name=\\"read\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id3
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      GET
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"update\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id3
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      PUT
                    </json:string>
                  </json:object>
                </json:object>
                <json:object name=\\"delete\\">
                  <json:string name=\\"href\\">
                    http://test.com/items/id3
                  </json:string>
                  <json:boolean name=\\"templated\\">
                    false
                  </json:boolean>
                  <json:object name=\\"attributes\\">
                    <json:string name=\\"method\\">
                      DELETE
                    </json:string>
                  </json:object>
                </json:object>
              </json:object>
            </json:object>
          </json:array>
        </json:object>
        <json:object name=\\"_links\\">
          <json:object name=\\"self\\">
            <json:string name=\\"href\\">
              http://test.com/items/?page=1&#38;perPage=10&#38;sort=name&#38;order=asc
            </json:string>
            <json:string name=\\"method\\">
              GET
            </json:string>
          </json:object>
          <json:object name=\\"create\\">
            <json:string name=\\"href\\">
              http://test.com/items/
            </json:string>
            <json:string name=\\"method\\">
              POST
            </json:string>
          </json:object>
        </json:object>
        <json:string name=\\"_type\\">
          search
        </json:string>
      </json:object>"
    `);
  });

  test('with another data set', async () => {
    const encoder = createJsonxTypeEncoder(true);

    expect(encoder.contentType).toBe('application/jsonx+xml');

    expect(
      encoder.encode([
        {
          key1: null,
          key10: [
            [
              {
                key1: null,
                key2: null,
                key3: true,
                key4: false,
                key5: 3,
                key6: 3.3,
                key7: 'value7',
                key8: [null, null, true, false, 3, 3.3, 'value7'],
                key9: {
                  key1: null,
                  key2: null,
                  key3: true,
                  key4: false,
                  key5: 3,
                  key6: 3.3,
                  key7: 'value7',
                  key8: [null, null, true, false, 3, 3.3, 'value7'],
                },
              },
            ],
          ],

          key2: null,
          key3: true,
          key4: false,
          key5: 3,
          key6: 3.3,
          key7: 'value7',
          key8: [null, null, true, false, 3, 3.3, 'value7'],
          key9: {
            key1: null,
            key2: null,
            key3: true,
            key4: false,
            key5: 3,
            key6: 3.3,
            key7: 'value7',
            key8: [null, null, true, false, 3, 3.3, 'value7'],
          },
        },
      ]),
    ).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
      <json:array xsi:schemaLocation=\\"http://www.datapower.com/schemas/json jsonx.xsd\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:json=\\"http://www.ibm.com/xmlns/prod/2009/jsonx\\">
        <json:object>
          <json:null name=\\"key1\\">
          </json:null>
          <json:array name=\\"key10\\">
            <json:array>
              <json:object>
                <json:null name=\\"key1\\">
                </json:null>
                <json:null name=\\"key2\\">
                </json:null>
                <json:boolean name=\\"key3\\">
                  true
                </json:boolean>
                <json:boolean name=\\"key4\\">
                  false
                </json:boolean>
                <json:number name=\\"key5\\">
                  3
                </json:number>
                <json:number name=\\"key6\\">
                  3.3
                </json:number>
                <json:string name=\\"key7\\">
                  value7
                </json:string>
                <json:array name=\\"key8\\">
                  <json:null>
                  </json:null>
                  <json:null>
                  </json:null>
                  <json:boolean>
                    true
                  </json:boolean>
                  <json:boolean>
                    false
                  </json:boolean>
                  <json:number>
                    3
                  </json:number>
                  <json:number>
                    3.3
                  </json:number>
                  <json:string>
                    value7
                  </json:string>
                </json:array>
                <json:object name=\\"key9\\">
                  <json:null name=\\"key1\\">
                  </json:null>
                  <json:null name=\\"key2\\">
                  </json:null>
                  <json:boolean name=\\"key3\\">
                    true
                  </json:boolean>
                  <json:boolean name=\\"key4\\">
                    false
                  </json:boolean>
                  <json:number name=\\"key5\\">
                    3
                  </json:number>
                  <json:number name=\\"key6\\">
                    3.3
                  </json:number>
                  <json:string name=\\"key7\\">
                    value7
                  </json:string>
                  <json:array name=\\"key8\\">
                    <json:null>
                    </json:null>
                    <json:null>
                    </json:null>
                    <json:boolean>
                      true
                    </json:boolean>
                    <json:boolean>
                      false
                    </json:boolean>
                    <json:number>
                      3
                    </json:number>
                    <json:number>
                      3.3
                    </json:number>
                    <json:string>
                      value7
                    </json:string>
                  </json:array>
                </json:object>
              </json:object>
            </json:array>
          </json:array>
          <json:null name=\\"key2\\">
          </json:null>
          <json:boolean name=\\"key3\\">
            true
          </json:boolean>
          <json:boolean name=\\"key4\\">
            false
          </json:boolean>
          <json:number name=\\"key5\\">
            3
          </json:number>
          <json:number name=\\"key6\\">
            3.3
          </json:number>
          <json:string name=\\"key7\\">
            value7
          </json:string>
          <json:array name=\\"key8\\">
            <json:null>
            </json:null>
            <json:null>
            </json:null>
            <json:boolean>
              true
            </json:boolean>
            <json:boolean>
              false
            </json:boolean>
            <json:number>
              3
            </json:number>
            <json:number>
              3.3
            </json:number>
            <json:string>
              value7
            </json:string>
          </json:array>
          <json:object name=\\"key9\\">
            <json:null name=\\"key1\\">
            </json:null>
            <json:null name=\\"key2\\">
            </json:null>
            <json:boolean name=\\"key3\\">
              true
            </json:boolean>
            <json:boolean name=\\"key4\\">
              false
            </json:boolean>
            <json:number name=\\"key5\\">
              3
            </json:number>
            <json:number name=\\"key6\\">
              3.3
            </json:number>
            <json:string name=\\"key7\\">
              value7
            </json:string>
            <json:array name=\\"key8\\">
              <json:null>
              </json:null>
              <json:null>
              </json:null>
              <json:boolean>
                true
              </json:boolean>
              <json:boolean>
                false
              </json:boolean>
              <json:number>
                3
              </json:number>
              <json:number>
                3.3
              </json:number>
              <json:string>
                value7
              </json:string>
            </json:array>
          </json:object>
        </json:object>
      </json:array>"
    `);
  });

  test('with unsupported data type', async () => {
    const encoder = createJsonxTypeEncoder(true);

    expect(encoder.contentType).toBe('application/jsonx+xml');

    const invalidData = { date: new Date('2022-06-06T16:07:34.505Z') } as unknown as Data;

    try {
      encoder.encode(invalidData);
      fail('Expected error');
    } catch (e) {
      expect(e).toMatchInlineSnapshot(`[Error: Unsupported value: "2022-06-06T16:07:34.505Z"]`);
    }
  });
});
