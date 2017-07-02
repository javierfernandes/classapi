
export function portExists(config) {
	if (!config.express.port) throw new Error("config.express.port is required")
}

export function mongo(config) {
	if (!config.mongo.url) throw new Error('Must provide the mongo connection url: mongo.url')
}
