const bodyParser = require('body-parser');
const nanoid = require('nanoid');

const TABLE = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLE);

    }

    function get(id) {
        return store.get(TABLE, id);
    }

    function upsert(body) {
        const user = {
            name:body.name
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return store.upsert(TABLE, user);
    }

    function remove(id) {
        return store.remove(TABLE, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    };
}