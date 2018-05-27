import { RouteComponentProps } from 'react-router';
import { match } from 'react-router-dom';
import { UnregisterCallback, Href, LocationListener } from 'history';

export class MockRouterProps {
    public static listener: LocationListener = () => { };

    public static getMockRouterProps<P>(data: P) {

        let location = {
            hash: "",
            key: "",
            pathname: "",
            search: "",
            state: {}
        };

        let props: RouteComponentProps<P> = {
            match: {
                isExact: true,
                params: data,
                path: "",
                url: ""
            },
            location: location,
            history: {
                length: 2,
                action: "POP",
                location: location,
                push: () => { },
                replace: () => { },
                go: (num) => { },
                goBack: () => { },
                goForward: () => { },
                block: (t) => {
                    let temp: UnregisterCallback = () => { };
                    return temp;
                },
                createHref: (t) => {
                    var temp: Href = "";
                    return temp;
                },
                listen: (t) => {
                    let temp: UnregisterCallback = () => { };
                    return temp;
                }

            },
            staticContext: {
            }
        };

        return props;
    }
}