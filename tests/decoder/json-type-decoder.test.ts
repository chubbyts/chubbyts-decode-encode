import { describe, expect, test } from '@jest/globals';
import { createJsonTypeDecoder } from '../../src/decoder/json-type-decoder';
import data from '../data';

describe('createJsonTypeDecoder', () => {
  test('data', () => {
    const decoder = createJsonTypeDecoder();

    expect(decoder.contentType).toBe('application/json');

    expect(
      decoder.decode(`{
        "page": 1,
        "perPage": 10,
        "search": null,
        "sort": "name",
        "order": "asc",
        "_embedded": {
            "mainItem": {
                "id": "id1",
                "name": "A fäncy Name\\n",
                "treeValues": {
                    "key1": {
                        "key11": 3
                    }
                },
                "progress": 76.8,
                "active": true,
                "_type": "item",
                "_links": {
                    "read": {
                        "href": "http://test.com/items/id1",
                        "templated": false,
                        "attributes": {
                            "method": "GET"
                        }
                    },
                    "update": {
                        "href": "http://test.com/items/id1",
                        "templated": false,
                        "attributes": {
                            "method": "PUT"
                        }
                    },
                    "delete": {
                        "href": "http://test.com/items/id1",
                        "templated": false,
                        "attributes": {
                            "method": "DELETE"
                        }
                    }
                }
            },
            "items": [
                {
                    "id": "id1",
                    "name": "\\nA fäncy Name\\n",
                    "treeValues": {
                        "key1": {
                            "key11": 3
                        }
                    },
                    "progress": 76.8,
                    "active": true,
                    "_type": "item",
                    "_links": {
                        "read": {
                            "href": "http://test.com/items/id1",
                            "templated": false,
                            "attributes": {
                                "method": "GET"
                            }
                        },
                        "update": {
                            "href": "http://test.com/items/id1",
                            "templated": false,
                            "attributes": {
                                "method": "PUT"
                            }
                        },
                        "delete": {
                            "href": "http://test.com/items/id1",
                            "templated": false,
                            "attributes": {
                                "method": "DELETE"
                            }
                        }
                    }
                },
                {
                    "id": "id2",
                    "name": "B fancy Name",
                    "treeValues": {
                        "key1": {
                            "key11": 3,
                            "key12": 4
                        }
                    },
                    "progress": 24.7,
                    "active": true,
                    "_type": "item",
                    "_links": {
                        "read": {
                            "href": "http://test.com/items/id2",
                            "templated": false,
                            "attributes": {
                                "method": "GET"
                            }
                        },
                        "update": {
                            "href": "http://test.com/items/id2",
                            "templated": false,
                            "attributes": {
                                "method": "PUT"
                            }
                        },
                        "delete": {
                            "href": "http://test.com/items/id2",
                            "templated": false,
                            "attributes": {
                                "method": "DELETE"
                            }
                        }
                    }
                },
                {
                    "id": "id3",
                    "name": "C fancy Name",
                    "treeValues": {
                        "key1": {
                            "key11": 3,
                            "key12": 4,
                            "key13": 7
                        }
                    },
                    "progress": 100,
                    "active": false,
                    "_type": "item",
                    "_links": {
                        "read": {
                            "href": "http://test.com/items/id3",
                            "templated": false,
                            "attributes": {
                                "method": "GET"
                            }
                        },
                        "update": {
                            "href": "http://test.com/items/id3",
                            "templated": false,
                            "attributes": {
                                "method": "PUT"
                            }
                        },
                        "delete": {
                            "href": "http://test.com/items/id3",
                            "templated": false,
                            "attributes": {
                                "method": "DELETE"
                            }
                        }
                    }
                }
            ]
        },
        "_links": {
            "self": {
                "href": "http://test.com/items/?page=1&perPage=10&sort=name&order=asc",
                "method": "GET"
            },
            "create": {
                "href": "http://test.com/items/",
                "method": "POST"
            }
        },
        "_type": "search"
    }`),
    ).toEqual(data);
  });
});
