const endpoints = {
    data: [
        {
            id: '36',
            type: 'endpoint',
            attributes: {
                name: 'Test 1',
                url: 'http://whatever.com',
                active: true,
                filter_count: 1
            }
        },
        {
            id: '37',
            type: 'endpoint',
            attributes: {
                name: 'Test 2',
                url: 'http://whatever1.com',
                active: true,
                filter_count: 1
            }
        },
        {
            id: '38',
            type: 'endpoint',
            attributes: {
                name: 'Test 3',
                url: 'http://whatever2.com',
                active: true,
                filter_count: 1
            }
        }
    ],
    meta: {
        total: 3,
        per_page: 10,
        page: 1
    }
};

export const endpoint = {
    data: [ endpoints.data[0] ]
};

export default endpoints;
