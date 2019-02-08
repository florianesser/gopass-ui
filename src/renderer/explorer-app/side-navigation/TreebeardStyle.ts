export const globalStyle = {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#FFFFFF',
            margin: 0,
            padding: 0,
            color: '#000000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
            fontSize: '18px'
        },
        node: {
            base: {
                position: 'relative',
                marginLeft: '27px',
                marginTop: '3px'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 500px',
                display: 'block'
            },
            activeLink: {
                background: '#FFFFFF'
            },
            toggle: {
                base: {
                    display: 'none'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 0,
                width: 0,
                arrow: {
                    fill: '#FFFFFF',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#555',
                    cursor: 'pointer'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '60px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
}
