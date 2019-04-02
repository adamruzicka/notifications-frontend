const apps = {
    data: [
        {
            id: '1',
            type: 'app',
            attributes: {
                name: 'seed-app-0'
            },
            relationships: {
                event_types: {
                    data: []
                }
            }
        },
        {
            id: '2',
            type: 'app',
            attributes: {
                name: 'seed-app-1'
            },
            relationships: {
                event_types: {
                    data: []
                }
            }
        },
        {
            id: '3',
            type: 'app',
            attributes: {
                name: 'seed-app-2'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '1',
                            type: 'event_type'
                        },
                        {
                            id: '2',
                            type: 'event_type'
                        }
                    ]
                }
            }
        },
        {
            id: '4',
            type: 'app',
            attributes: {
                name: 'seed-app-3'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '3',
                            type: 'event_type'
                        },
                        {
                            id: '4',
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
                name: 'seed-app-4'
            },
            relationships: {
                event_types: {
                    data: []
                }
            }
        },
        {
            id: '6',
            type: 'app',
            attributes: {
                name: 'seed-app-5'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '5',
                            type: 'event_type'
                        },
                        {
                            id: '6',
                            type: 'event_type'
                        },
                        {
                            id: '7',
                            type: 'event_type'
                        }
                    ]
                }
            }
        },
        {
            id: '7',
            type: 'app',
            attributes: {
                name: 'seed-app-6'
            },
            relationships: {
                event_types: {
                    data: []
                }
            }
        },
        {
            id: '8',
            type: 'app',
            attributes: {
                name: 'seed-app-7'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '8',
                            type: 'event_type'
                        },
                        {
                            id: '9',
                            type: 'event_type'
                        },
                        {
                            id: '10',
                            type: 'event_type'
                        }
                    ]
                }
            }
        },
        {
            id: '9',
            type: 'app',
            attributes: {
                name: 'seed-app-8'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '11',
                            type: 'event_type'
                        },
                        {
                            id: '12',
                            type: 'event_type'
                        },
                        {
                            id: '13',
                            type: 'event_type'
                        },
                        {
                            id: '14',
                            type: 'event_type'
                        }
                    ]
                }
            }
        },
        {
            id: '10',
            type: 'app',
            attributes: {
                name: 'seed-app-9'
            },
            relationships: {
                event_types: {
                    data: [
                        {
                            id: '15',
                            type: 'event_type'
                        },
                        {
                            id: '16',
                            type: 'event_type'
                        },
                        {
                            id: '17',
                            type: 'event_type'
                        },
                        {
                            id: '18',
                            type: 'event_type'
                        }
                    ]
                }
            }
        }
    ],
    included: [
        {
            id: '1',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '1',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '2',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '2',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '1',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '2',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '3',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '3',
                            type: 'level'
                        },
                        {
                            id: '4',
                            type: 'level'
                        },
                        {
                            id: '5',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '4',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '6',
                            type: 'level'
                        },
                        {
                            id: '7',
                            type: 'level'
                        },
                        {
                            id: '8',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '3',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '4',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '5',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '6',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '7',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '8',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '5',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '9',
                            type: 'level'
                        },
                        {
                            id: '10',
                            type: 'level'
                        },
                        {
                            id: '11',
                            type: 'level'
                        },
                        {
                            id: '12',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '6',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '13',
                            type: 'level'
                        },
                        {
                            id: '14',
                            type: 'level'
                        },
                        {
                            id: '15',
                            type: 'level'
                        },
                        {
                            id: '16',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '7',
            type: 'event_type',
            attributes: {
                title: 'seed-type-2',
                name: 'seed-type-2'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '17',
                            type: 'level'
                        },
                        {
                            id: '18',
                            type: 'level'
                        },
                        {
                            id: '19',
                            type: 'level'
                        },
                        {
                            id: '20',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '9',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '10',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '11',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '12',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '13',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '14',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '15',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '16',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '17',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '18',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '19',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '20',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '8',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '21',
                            type: 'level'
                        },
                        {
                            id: '22',
                            type: 'level'
                        },
                        {
                            id: '23',
                            type: 'level'
                        },
                        {
                            id: '24',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '9',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '25',
                            type: 'level'
                        },
                        {
                            id: '26',
                            type: 'level'
                        },
                        {
                            id: '27',
                            type: 'level'
                        },
                        {
                            id: '28',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '10',
            type: 'event_type',
            attributes: {
                title: 'seed-type-2',
                name: 'seed-type-2'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '29',
                            type: 'level'
                        },
                        {
                            id: '30',
                            type: 'level'
                        },
                        {
                            id: '31',
                            type: 'level'
                        },
                        {
                            id: '32',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '21',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '22',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '23',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '24',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '25',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '26',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '27',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '28',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '29',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '30',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '31',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '32',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '11',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: []
                }
            }
        },
        {
            id: '12',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: []
                }
            }
        },
        {
            id: '13',
            type: 'event_type',
            attributes: {
                title: 'seed-type-2',
                name: 'seed-type-2'
            },
            relationships: {
                levels: {
                    data: []
                }
            }
        },
        {
            id: '14',
            type: 'event_type',
            attributes: {
                title: 'seed-type-3',
                name: 'seed-type-3'
            },
            relationships: {
                levels: {
                    data: []
                }
            }
        },
        {
            id: '15',
            type: 'event_type',
            attributes: {
                title: 'seed-type-0',
                name: 'seed-type-0'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '33',
                            type: 'level'
                        },
                        {
                            id: '34',
                            type: 'level'
                        },
                        {
                            id: '35',
                            type: 'level'
                        },
                        {
                            id: '36',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '16',
            type: 'event_type',
            attributes: {
                title: 'seed-type-1',
                name: 'seed-type-1'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '37',
                            type: 'level'
                        },
                        {
                            id: '38',
                            type: 'level'
                        },
                        {
                            id: '39',
                            type: 'level'
                        },
                        {
                            id: '40',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '17',
            type: 'event_type',
            attributes: {
                title: 'seed-type-2',
                name: 'seed-type-2'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '41',
                            type: 'level'
                        },
                        {
                            id: '42',
                            type: 'level'
                        },
                        {
                            id: '43',
                            type: 'level'
                        },
                        {
                            id: '44',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '18',
            type: 'event_type',
            attributes: {
                title: 'seed-type-3',
                name: 'seed-type-3'
            },
            relationships: {
                levels: {
                    data: [
                        {
                            id: '45',
                            type: 'level'
                        },
                        {
                            id: '46',
                            type: 'level'
                        },
                        {
                            id: '47',
                            type: 'level'
                        },
                        {
                            id: '48',
                            type: 'level'
                        }
                    ]
                }
            }
        },
        {
            id: '33',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '34',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '35',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '36',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '37',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '38',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '39',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '40',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '41',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '42',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '43',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '44',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        },
        {
            id: '45',
            type: 'level',
            attributes: {
                title: 'level-0'
            }
        },
        {
            id: '46',
            type: 'level',
            attributes: {
                title: 'level-1'
            }
        },
        {
            id: '47',
            type: 'level',
            attributes: {
                title: 'level-2'
            }
        },
        {
            id: '48',
            type: 'level',
            attributes: {
                title: 'level-3'
            }
        }
    ],
    meta: {
        total: 10,
        per_page: 10,
        page: 1
    }
};

export default apps;
