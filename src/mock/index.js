/**
 * Created by henian.xu on 2018/9/3.
 *
 */

import MockAdapter from 'axios-mock-adapter';
export default {
    install(Axios) {
        const mock = new MockAdapter(Axios);

        mock.onGet('/gd/value/selectByPage').reply(config => {
            const { params } = config || {};
            const { _isMock } = params;
            console.log(_isMock);
            if (!mock) mock.reset();
            return [
                200,
                {
                    users: [{ id: 1, name: 'John Smith' }],
                },
            ];
        });
        /*Axios.get('/gd/value/selectByPage', { params: { mock: true } }).then(
            function(response) {
                console.log(response.data);
            },
        );*/
    },
};
