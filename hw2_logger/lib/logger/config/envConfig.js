const envConfig = {}

envConfig.logFilePath = process.env.LOG_FILE_PATH
envConfig.logLevel = process.env.LOG_LEVEL
envConfig.appender = process.env.LOG_APPENDER

export default envConfig

