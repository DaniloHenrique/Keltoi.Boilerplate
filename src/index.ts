import Fastify from "fastify";
import cors from "./server/plugins/cors";
import knex from "./server/plugins/knex";
import endOfLife from "./server/plugins/end-of-life";
import personRoutes from "./server/routes/person";

const app = Fastify({logger: true});

app.register(cors);
app.register(knex);
app.register(endOfLife)

app.register(personRoutes);

app.listen({
    port: 3000,
    host: 'localhost'
},(err=>{
    if (err) throw err;
    console.log('Server is running on port 3000');
})
);