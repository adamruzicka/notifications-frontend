const apps = {
    data: [
        {
            id: '4',
            type: 'app',
            attributes: {
                name: 'seed-app-0'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '17',
                            type: 'event_type'
                        }
                    ]
                }
            }
        },
        {
            id: '5',
            type: 'app',
            attributes: {
                name: 'seed-app-1'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '18',
                            type: 'event_type'
                        },
                        {
                            id: '19',
                            type: 'event_type'
                        },
                        {
                            id: '20',
                            type: 'event_type'
                        },
                        {
                            id: '21',
                            type: 'event_type'
                        }
                    ]
                }
            }
        }
    ],
    included: [
        {
            id: '17',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            }
        },
        {
            id: '18',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            }
        },
        {
            id: '19',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            }
        },
        {
            id: '20',
            type: 'event_type',
            attributes: {
                title: 'seed-type-2',
                name: 'seed-type-2'
            }
        }
    ]
};

export default apps;
