db.createUser({
    user: 'root',
    pwd: '<password mongo>',
    roles: [
        {
            role: 'readWrite',
            db: 'p4_chat',
        },
    ],
});

db = new Mongo().getDB("p4_chat");

db.createCollection('mensajes', { capped: false });
db.createCollection('usuarios', { capped: false });
db.createCollection('valid_tokens', { capped: false });