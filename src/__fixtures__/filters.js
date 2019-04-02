const filters = {
    data: [
        {
            id: '13',
            type: 'filter',
            attributes: {
                enabled: true
            },
            relationships: {
                apps: {
                    data: [
                        {
                            id: '1',
                            type: 'app'
                        },
                        {
                            id: '3',
                            type: 'app'
                        },
                        {
                            id: '4',
                            type: 'app'
                        },
                        {
                            id: '8',
                            type: 'app'
                        },
                        {
                            id: '4',
                            type: 'app'
                        }
                    ]
                },
                event_types: {
                    data: [
                        {
                            id: '1',
                            type: 'event_type'
                        },
                        {
                            id: '3',
                            type: 'event_type'
                        },
                        {
                            id: '8',
                            type: 'event_type'
                        }
                    ]
                },
                levels: {
                    data: [
                        {
                            id: '1',
                            type: 'level'
                        },
                        {
                            id: '4',
                            type: 'level'
                        },
                        {
                            id: '22',
                            type: 'level'
                        }
                    ]
                },
                endpoints: {
                    data: [
                        {
                            id: '36',
                            type: 'endpoint'
                        }
                    ]
                }
            }
        }
    ],
    meta: {
        total: 1,
        per_page: 10,
        page: 1
    }
};

export default filters;
