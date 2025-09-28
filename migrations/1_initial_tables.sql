-- CLI Telemetry Table
CREATE TABLE IF NOT EXISTS cli_telemetry (
	userId String,
	sessionId String,
	platform String,
	osVersion String,
	arch String,
	cpus UInt32,
	memory UInt64,
	rootCommitHash String,
	gitOriginUrl String,
	gitBranchHash String,
	runtime String,
	runtimeVersion String,
	ciProvider String,
	isCI Boolean,
	alchemyVersion String,
	timestamp UInt64,
	errorTag String,
	errorMessage String,
	errorStack String,
	command String,
	event Enum8(
		'cli.start' = 1,
		'cli.success' = 2,
		'cli.error' = 3
	)
) ENGINE = MergeTree()
ORDER BY
	(timestamp, sessionId) PARTITION BY toYYYYMM(toDateTime(timestamp));

-- Resource Telemetry Table
CREATE TABLE IF NOT EXISTS resource_telemetry (
	userId String,
	sessionId String,
	platform String,
	osVersion String,
	arch String,
	cpus UInt32,
	memory UInt64,
	rootCommitHash String,
	gitOriginUrl String,
	gitBranchHash String,
	runtime String,
	runtimeVersion String,
	ciProvider String,
	isCI Boolean,
	alchemyVersion String,
	timestamp UInt64,
	errorTag String,
	errorMessage String,
	errorStack String,
	phase String,
	event Enum8(
		'resource.start' = 1,
		'resource.success' = 2,
		'resource.error' = 3,
		'resource.skip' = 4,
		'resource.read' = 5
	),
	resource String,
	status Enum8(
		'creating' = 1,
		'created' = 2,
		'updating' = 3,
		'updated' = 4,
		'deleting' = 5,
		'deleted' = 6,
		'unknown' = 7
	),
	duration UInt32,
	replaced Boolean
) ENGINE = MergeTree()
ORDER BY
	(timestamp, sessionId) PARTITION BY toYYYYMM(toDateTime(timestamp));

-- State Store Telemetry Table
CREATE TABLE IF NOT EXISTS statestore_telemetry (
	userId String,
	sessionId String,
	platform String,
	osVersion String,
	arch String,
	cpus UInt32,
	memory UInt64,
	rootCommitHash String,
	gitOriginUrl String,
	gitBranchHash String,
	runtime String,
	runtimeVersion String,
	ciProvider String,
	isCI Boolean,
	alchemyVersion String,
	timestamp UInt64,
	errorTag String,
	errorMessage String,
	errorStack String,
	event Enum8(
		'statestore.init' = 1,
		'statestore.deinit' = 2,
		'statestore.list' = 3,
		'statestore.count' = 4,
		'statestore.get' = 5,
		'statestore.getBatch' = 6,
		'statestore.all' = 7,
		'statestore.set' = 8,
		'statestore.delete' = 9
	),
	stateStore String,
	duration UInt32
) ENGINE = MergeTree()
ORDER BY
	(timestamp, sessionId) PARTITION BY toYYYYMM(toDateTime(timestamp));

-- Alchemy Telemetry Table
CREATE TABLE IF NOT EXISTS alchemy_telemetry (
	userId String,
	sessionId String,
	platform String,
	osVersion String,
	arch String,
	cpus UInt32,
	memory UInt64,
	rootCommitHash String,
	gitOriginUrl String,
	gitBranchHash String,
	runtime String,
	runtimeVersion String,
	ciProvider String,
	isCI Boolean,
	alchemyVersion String,
	timestamp UInt64,
	errorTag String,
	errorMessage String,
	errorStack String,
	event Enum8(
		'alchemy.start' = 1,
		'alchemy.success' = 2,
		'alchemy.error' = 3
	),
	duration UInt32
) ENGINE = MergeTree()
ORDER BY
	(timestamp, sessionId) PARTITION BY toYYYYMM(toDateTime(timestamp));