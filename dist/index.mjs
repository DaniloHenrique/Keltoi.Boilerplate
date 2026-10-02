import Fastify from "fastify";
import fp from "fastify-plugin";
import Cors from "@fastify/cors";
import knex from "knex";
//#region src/util/injection/environment.ts
const env = {
	environment: process.env.NODE_ENV || "development",
	http: {
		port: parseInt(process.env.PORT || "3000"),
		host: process.env.HOST || "localhost"
	},
	cors: {
		origin: process.env.CORS_ORIGIN || "*",
		methods: process.env.CORS_METHODS || "GET,POST,PUT,DELETE,OPTIONS",
		allowedHeaders: process.env.CORS_ALLOWED_HEADERS || "*"
	},
	jwt: {
		validate: process.env.JWT_VALIDATE || "true",
		secret: process.env.JWT_SECRET || "bA2xcjpf8y5aSUFs2o5tNus7tBuRNHNo",
		issuer: process.env.JWT_ISSUER || "Keltoi.Tech",
		expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "300")
	}
};
//#endregion
//#region src/server/plugins/cors.ts
var cors_default = fp(async (fastify) => {
	fastify.register(Cors, {
		origin: env.cors.origin,
		methods: env.cors.methods,
		allowedHeaders: env.cors.allowedHeaders
	});
});
//#endregion
//#region node_modules/@keltoi/hydra-ts/dist/index.mjs
var Result = class {
	code;
	data;
	message;
	constructor(code, data = null, message = null) {
		this.code = code;
		this.data = data;
		this.message = message;
	}
	get isError() {
		return this.code > 299;
	}
	get error() {
		return {
			code: this.code,
			message: this.message ?? "Unknown error"
		};
	}
	get ok() {
		return {
			code: this.code,
			data: this.data
		};
	}
};
let ResultType = /* @__PURE__ */ function(ResultType) {
	ResultType[ResultType["Success"] = 200] = "Success";
	ResultType[ResultType["Created"] = 201] = "Created";
	ResultType[ResultType["Updated"] = 202] = "Updated";
	ResultType[ResultType["Deleted"] = 204] = "Deleted";
	ResultType[ResultType["BadRequest"] = 400] = "BadRequest";
	ResultType[ResultType["NotFound"] = 404] = "NotFound";
	ResultType[ResultType["Validation"] = 422] = "Validation";
	ResultType[ResultType["InternalServerError"] = 500] = "InternalServerError";
	ResultType[ResultType["Unauthorized"] = 401] = "Unauthorized";
	ResultType[ResultType["Forbidden"] = 403] = "Forbidden";
	return ResultType;
}({});
var DbRepository = class {
	factory;
	context;
	_transactionContext = null;
	constructor(factory, context) {
		this.factory = factory;
		this.context = context;
	}
	set transaction(transactionContext) {
		this._transactionContext = transactionContext;
	}
	get database() {
		const tableName = this.factory.tableName;
		return this._transactionContext?.transaction(tableName) ?? this.context.db(tableName);
	}
	insert(entity) {
		return this.database.insert({
			...entity.toKey(),
			...entity.toData()
		}).then((result) => result.length > 0 ? new Result(201, 201) : new Result(400, 400, "Bad Request")).catch((error) => new Result(500, 500, error.message));
	}
	create(entity) {
		return this.database.insert({ ...entity.toData() }, Object.keys(entity.toKey())).then((ids) => ids.length > 0 ? new Result(201, this.factory.build({
			...ids[0],
			...entity.toData()
		})) : new Result(400, 400, "Bad Request")).catch((error) => new Result(500, 500, error.message));
	}
	get(entity) {
		return this.database.first().where(entity.toKey()).then((result) => !!result ? new Result(200, this.factory.build(result)) : new Result(404, 404, "Not Found")).catch((error) => new Result(500, 500, error.message));
	}
	update(entity) {
		return this.database.update(entity.toData()).where(entity.toKey()).then((result) => result > 0 ? new Result(200, 202) : new Result(400, 400, "Bad Request")).catch((error) => new Result(500, 500, error.message));
	}
	delete(entity) {
		return this.database.delete().where(entity.toKey()).then((result) => result > 0 ? new Result(200, 204) : new Result(400, 400, "Bad Request")).catch((error) => new Result(500, 500, error.message));
	}
	list() {
		return this.database.select().then((result) => new Result(200, result.map(this.factory.build))).catch((error) => new Result(500, 500, error.message));
	}
};
(class Url {
	hostName;
	port;
	path;
	static default = new Url("localhost", 8080, "/");
	static from(url) {
		const [hostName, port, path] = url.split("/");
		return new Url(hostName, Number(port), path);
	}
	toString() {
		return `${this.hostName}:${this.port}${this.path}`;
	}
	constructor(hostName, port, path) {
		this.hostName = hostName;
		this.port = port;
		this.path = path;
	}
});
var TransactionContext = class {
	transaction;
	constructor(transaction) {
		this.transaction = transaction;
	}
};
var DbContext = class {
	db;
	constructor(db) {
		this.db = db;
	}
	async transaction() {
		return new TransactionContext(await this.db.transaction());
	}
};
//#endregion
//#region src/adapters/context/person-context.ts
var PersonContext = class extends DbContext {
	constructor(db) {
		super(db);
	}
};
//#endregion
//#region src/infrastructure/db/knexfile.ts
const config = {
	development: {
		client: "better-sqlite3",
		connection: { filename: "C:\\Users\\kelto\\source\\repos\\Keltoi.BFF\\db\\config.sqlite" },
		migrations: {
			directory: "./migrations",
			tableName: "knex_migrations"
		},
		useNullAsDefault: true
	},
	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password"
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations"
		}
	},
	production: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password"
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./db/migrations"
		}
	}
};
//#endregion
//#region src/server/plugins/knex.ts
var knex_default = fp(async (fastify) => {
	const config$1 = config[env.environment];
	if (!config$1) throw new Error(`No configuration found for environment: ${env.environment}`);
	fastify.decorate("personContext", new PersonContext(knex(config$1)));
});
//#endregion
//#region src/server/plugins/end-of-life.ts
var end_of_life_default = fp(async (fastify) => {
	fastify.addHook("onClose", async () => {
		fastify.getDecorator("personContext").db.destroy();
	});
});
//#endregion
//#region src/server/routes/person/schema/create-person.ts
var create_person_default = { body: {
	type: "object",
	properties: {
		firstName: { type: "string" },
		lastName: { type: "string" },
		email: { type: "string" }
	},
	required: [
		"firstName",
		"lastName",
		"email"
	]
} };
//#endregion
//#region src/server/routes/person/schema/get-person.ts
var get_person_default = { params: {
	type: "object",
	properties: { id: { type: "number" } },
	required: ["id"]
} };
//#endregion
//#region src/server/routes/person/schema/list-person.ts
var list_person_default = { params: {
	type: "object",
	properties: {
		number: { type: "number" },
		size: { type: "number" }
	},
	required: ["number", "size"]
} };
//#endregion
//#region src/adapters/entity/person.ts
var Person = class Person {
	constructor(id, firstName, lastName, email, createdAt) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.createdAt = createdAt;
	}
	static build(data) {
		return new Person(data.id, data.firstName, data.lastName, data.email, data.createdAt);
	}
	toData() {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			createdAt: this.createdAt
		};
	}
	toKey() {
		return { id: this.id };
	}
	toModel() {
		return new PersonModel(this.id, this.firstName, this.lastName, this.email, this.createdAt);
	}
};
//#endregion
//#region src/domain/model/person.ts
var PersonModel = class PersonModel {
	constructor(id, firstName, lastName, email, createdAt) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.createdAt = createdAt;
	}
	validate() {
		if (this.firstName.length < 3) return new Result(400, ResultType.BadRequest, "First name must be at least 3 characters");
		if (this.lastName.length < 3) return new Result(400, ResultType.BadRequest, "Last name must be at least 3 characters");
		if (this.email.length < 3) return new Result(400, ResultType.BadRequest, "Email must be at least 3 characters");
		return new Result(200, new Person(this.id, this.firstName, this.lastName, this.email, this.createdAt));
	}
	validateForGet() {
		if (this.id < 0) return new Result(400, ResultType.BadRequest, "Id must be greater than 0");
		return new Result(200, new Person(this.id, this.firstName, this.lastName, this.email, this.createdAt));
	}
	toViewModel() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			createdAt: this.createdAt
		};
	}
	static buildForCreate(input) {
		return new PersonModel(0, input.firstName, input.lastName, input.email, /* @__PURE__ */ new Date());
	}
	static buildForGet(input) {
		return new PersonModel(input.id, "", "", "", /* @__PURE__ */ new Date());
	}
};
//#endregion
//#region src/domain/use-case/person/create.ts
var CreatePersonUseCase = class {
	constructor(personRepository) {
		this.personRepository = personRepository;
	}
	async handle(param) {
		const validation = PersonModel.buildForCreate(param).validate();
		if (validation.isError) return validation;
		const person = validation.ok.data;
		const result = await this.personRepository.create(person);
		if (result.isError) return result;
		return new Result(201, result.ok.data.toModel().toViewModel());
	}
};
//#endregion
//#region src/adapters/factory/person-factory.ts
var PersonFactory = class {
	tableName = "person";
	build(data) {
		return Person.build(data);
	}
};
var person_factory_default = new PersonFactory();
//#endregion
//#region src/infrastructure/repository/person-repository.ts
var PersonRepository = class extends DbRepository {
	constructor(context) {
		super(person_factory_default, context);
	}
	pageSearch(paging) {
		const size = (paging.number - 1) * paging.size;
		return this.database.select().where("active", true).orderBy("createdAt").limit(paging.size).offset(size);
	}
};
//#endregion
//#region src/util/injection/use-case/create-person-use-case.ts
var create_person_use_case_default = (context) => new CreatePersonUseCase(new PersonRepository(context));
//#endregion
//#region src/controller/person/create.ts
const createPersonController = async (request, reply, fastify) => {
	const result = await create_person_use_case_default(fastify.getDecorator("personContext")).handle(request.body);
	if (result.isError) return reply.status(result.error.code).send(result.error.message);
	return reply.status(201).send(result.ok.data);
};
//#endregion
//#region src/domain/query/person/get.ts
var GetPersonQuery = class {
	constructor(personRepository) {
		this.personRepository = personRepository;
	}
	async query(param) {
		const validation = PersonModel.buildForGet(param).validateForGet();
		if (validation.isError) return validation;
		const person = validation.ok.data;
		const result = await this.personRepository.get(person);
		if (result.isError) return result;
		return new Result(200, result.ok.data.toModel().toViewModel());
	}
};
//#endregion
//#region src/domain/query/person/list.ts
var ListPersonQuery = class {
	constructor(personRepository) {
		this.personRepository = personRepository;
	}
	toViewModel(person) {
		return person.toModel().toViewModel();
	}
	async query(data) {
		const result = await this.personRepository.pageSearch(data);
		if (result.isError) return result;
		return new Result(200, result.ok.data.map(this.toViewModel));
	}
};
//#endregion
//#region src/util/injection/query/get-person-query.ts
var get_person_query_default = (context) => new GetPersonQuery(new PersonRepository(context));
//#endregion
//#region src/controller/person/get.ts
const getPersonController = async (request, reply, fastify) => {
	const result = await get_person_query_default(fastify.getDecorator("personContext")).query(request.params);
	if (result.isError) return reply.status(result.error.code).send(result.error.message);
	return reply.status(200).send(result.ok.data);
};
//#endregion
//#region src/util/injection/query/list-person-query.ts
var list_person_query_default = (context) => new ListPersonQuery(new PersonRepository(context));
//#endregion
//#region src/controller/person/list.ts
const listPersonController = async (request, reply, fastify) => {
	const result = await list_person_query_default(fastify.getDecorator("personContext")).query(request.query);
	if (result.isError) return reply.status(result.error.code).send(result.error.message);
	return reply.status(200).send(result.ok.data);
};
//#endregion
//#region src/server/routes/person/index.ts
var person_default = fp(async (fastify) => {
	fastify.post("/person", {
		schema: create_person_default,
		handler: (request, reply) => createPersonController(request, reply, fastify)
	});
	fastify.get("/person/:id", {
		schema: get_person_default,
		handler: (request, reply) => getPersonController(request, reply, fastify)
	});
	fastify.get("/person", {
		schema: list_person_default,
		handler: (request, reply) => listPersonController(request, reply, fastify)
	});
});
//#endregion
//#region src/index.ts
const app = Fastify({ logger: true });
app.register(cors_default);
app.register(knex_default);
app.register(end_of_life_default);
app.register(person_default);
app.listen({
	port: 3e3,
	host: "localhost"
}, ((err) => {
	if (err) throw err;
	console.log("Server is running on port 3000");
}));
//#endregion
export {};

//# sourceMappingURL=index.mjs.map