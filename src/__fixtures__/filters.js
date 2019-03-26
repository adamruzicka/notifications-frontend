const filters = {
    data: [
        {
            id: '11',
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
                            id: '2',
                            type: 'app'
                        },
                        {
                            id: '3',
                            type: 'app'
                        }
                    ]
                },
                event_types: {
                    data: []
                },
                levels: {
                    data: []
                },
                endpoints: {
                    data: [
                        {
                            id: '11',
                            type: 'endpoint'
                        }
                    ]
                }
            }
        }
    ]
};

export default filters;
