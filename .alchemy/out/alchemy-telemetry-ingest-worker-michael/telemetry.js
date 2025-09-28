var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@clickhouse/client-common/dist/logger.js
var require_logger = __commonJS({
  "node_modules/@clickhouse/client-common/dist/logger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickHouseLogLevel = exports.LogWriter = exports.DefaultLogger = void 0;
    var DefaultLogger = class {
      static {
        __name(this, "DefaultLogger");
      }
      trace({ module: module2, message, args }) {
        const params = [
          formatMessage({ module: module2, message, level: "TRACE" })
        ];
        if (args) {
          params.push("\nArguments:", args);
        }
        console.debug(...params);
      }
      debug({ module: module2, message, args }) {
        const params = [
          formatMessage({ module: module2, message, level: "DEBUG" })
        ];
        if (args) {
          params.push("\nArguments:", args);
        }
        console.debug(...params);
      }
      info({ module: module2, message, args }) {
        const params = [
          formatMessage({ module: module2, message, level: "INFO" })
        ];
        if (args) {
          params.push("\nArguments:", args);
        }
        console.info(...params);
      }
      warn({ module: module2, message, args, err }) {
        const params = [
          formatMessage({ module: module2, message, level: "WARN" })
        ];
        if (args) {
          params.push("\nArguments:", args);
        }
        if (err) {
          params.push("\nCaused by:", err);
        }
        console.warn(...params);
      }
      error({ module: module2, message, args, err }) {
        const params = [
          formatMessage({ module: module2, message, level: "ERROR" })
        ];
        if (args) {
          params.push("\nArguments:", args);
        }
        params.push("\nCaused by:", err);
        console.error(...params);
      }
    };
    exports.DefaultLogger = DefaultLogger;
    var LogWriter = class {
      static {
        __name(this, "LogWriter");
      }
      constructor(logger, module2, logLevel) {
        Object.defineProperty(this, "logger", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: logger
        });
        Object.defineProperty(this, "module", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: module2
        });
        Object.defineProperty(this, "logLevel", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.logLevel = logLevel ?? ClickHouseLogLevel.OFF;
        this.info({
          message: `Log level is set to ${ClickHouseLogLevel[this.logLevel]}`
        });
      }
      trace(params) {
        if (this.logLevel <= ClickHouseLogLevel.TRACE) {
          this.logger.trace({
            ...params,
            module: params.module ?? this.module
          });
        }
      }
      debug(params) {
        if (this.logLevel <= ClickHouseLogLevel.DEBUG) {
          this.logger.debug({
            ...params,
            module: params.module ?? this.module
          });
        }
      }
      info(params) {
        if (this.logLevel <= ClickHouseLogLevel.INFO) {
          this.logger.info({
            ...params,
            module: params.module ?? this.module
          });
        }
      }
      warn(params) {
        if (this.logLevel <= ClickHouseLogLevel.WARN) {
          this.logger.warn({
            ...params,
            module: params.module ?? this.module
          });
        }
      }
      error(params) {
        if (this.logLevel <= ClickHouseLogLevel.ERROR) {
          this.logger.error({
            ...params,
            module: params.module ?? this.module
          });
        }
      }
    };
    exports.LogWriter = LogWriter;
    var ClickHouseLogLevel;
    (function(ClickHouseLogLevel2) {
      ClickHouseLogLevel2[ClickHouseLogLevel2["TRACE"] = 0] = "TRACE";
      ClickHouseLogLevel2[ClickHouseLogLevel2["DEBUG"] = 1] = "DEBUG";
      ClickHouseLogLevel2[ClickHouseLogLevel2["INFO"] = 2] = "INFO";
      ClickHouseLogLevel2[ClickHouseLogLevel2["WARN"] = 3] = "WARN";
      ClickHouseLogLevel2[ClickHouseLogLevel2["ERROR"] = 4] = "ERROR";
      ClickHouseLogLevel2[ClickHouseLogLevel2["OFF"] = 127] = "OFF";
    })(ClickHouseLogLevel || (exports.ClickHouseLogLevel = ClickHouseLogLevel = {}));
    function formatMessage({ level, module: module2, message }) {
      const ts = (/* @__PURE__ */ new Date()).toISOString();
      return `[${ts}][${level}][@clickhouse/client][${module2}] ${message}`;
    }
    __name(formatMessage, "formatMessage");
  }
});

// node_modules/@clickhouse/client-common/dist/config.js
var require_config = __commonJS({
  "node_modules/@clickhouse/client-common/dist/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prepareConfigWithURL = prepareConfigWithURL;
    exports.getConnectionParams = getConnectionParams;
    exports.mergeConfigs = mergeConfigs;
    exports.createUrl = createUrl;
    exports.loadConfigOptionsFromURL = loadConfigOptionsFromURL;
    exports.booleanConfigURLValue = booleanConfigURLValue;
    exports.numberConfigURLValue = numberConfigURLValue;
    exports.enumConfigURLValue = enumConfigURLValue;
    var logger_1 = require_logger();
    function prepareConfigWithURL(baseConfigOptions, logger, handleImplURLParams) {
      const baseConfig = { ...baseConfigOptions };
      if (baseConfig.additional_headers !== void 0) {
        logger.warn({
          module: "Config",
          message: '"additional_headers" is deprecated. Use "http_headers" instead.'
        });
        baseConfig.http_headers = baseConfig.additional_headers;
        delete baseConfig.additional_headers;
      }
      let configURL;
      if (baseConfig.host !== void 0) {
        logger.warn({
          module: "Config",
          message: '"host" is deprecated. Use "url" instead.'
        });
        configURL = createUrl(baseConfig.host);
        delete baseConfig.host;
      } else {
        configURL = createUrl(baseConfig.url);
      }
      const [url, configFromURL] = loadConfigOptionsFromURL(configURL, handleImplURLParams);
      const config = mergeConfigs(baseConfig, configFromURL, logger);
      if (config.pathname !== void 0) {
        url.pathname = config.pathname;
      }
      config.url = url;
      return config;
    }
    __name(prepareConfigWithURL, "prepareConfigWithURL");
    function getConnectionParams(config, logger) {
      let auth;
      if (config.access_token !== void 0) {
        if (config.username !== void 0 || config.password !== void 0) {
          throw new Error("Both access token and username/password are provided in the configuration. Please use only one authentication method.");
        }
        auth = { access_token: config.access_token, type: "JWT" };
      } else {
        auth = {
          username: config.username ?? "default",
          password: config.password ?? "",
          type: "Credentials"
        };
      }
      return {
        auth,
        url: config.url,
        application_id: config.application,
        request_timeout: config.request_timeout ?? 3e4,
        max_open_connections: config.max_open_connections ?? 10,
        compression: {
          decompress_response: config.compression?.response ?? false,
          compress_request: config.compression?.request ?? false
        },
        database: config.database ?? "default",
        log_writer: new logger_1.LogWriter(logger, "Connection", config.log?.level),
        keep_alive: { enabled: config.keep_alive?.enabled ?? true },
        clickhouse_settings: config.clickhouse_settings ?? {},
        http_headers: config.http_headers ?? {}
      };
    }
    __name(getConnectionParams, "getConnectionParams");
    function mergeConfigs(baseConfig, configFromURL, logger) {
      function deepMerge(base, fromURL, path = []) {
        for (const key of Object.keys(fromURL)) {
          if (typeof fromURL[key] === "object") {
            deepMerge(base, fromURL[key], path.concat(key));
          } else {
            let baseAtPath = base;
            for (const key2 of path) {
              if (baseAtPath[key2] === void 0) {
                baseAtPath[key2] = {};
              }
              baseAtPath = baseAtPath[key2];
            }
            const baseAtKey = baseAtPath[key];
            if (baseAtKey !== void 0) {
              const fullPath = path.concat(key).join(".");
              logger.warn({
                module: "Config",
                message: `"${fullPath}" is overridden by a URL parameter.`
              });
            }
            baseAtPath[key] = fromURL[key];
          }
        }
      }
      __name(deepMerge, "deepMerge");
      const config = { ...baseConfig };
      deepMerge(config, configFromURL);
      return config;
    }
    __name(mergeConfigs, "mergeConfigs");
    function createUrl(configURL) {
      let url;
      try {
        if (typeof configURL === "string" || configURL instanceof URL) {
          url = new URL(configURL);
        } else {
          return new URL("http://localhost:8123");
        }
      } catch (err) {
        throw new Error("ClickHouse URL is malformed. Expected format: http[s]://[username:password@]hostname:port[/database][?param1=value1&param2=value2]", { cause: err });
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error(`ClickHouse URL protocol must be either http or https. Got: ${url.protocol}`);
      }
      return url;
    }
    __name(createUrl, "createUrl");
    function loadConfigOptionsFromURL(url, handleExtraURLParams) {
      let config = {};
      if (url.username !== "") {
        config.username = decodeURIComponent(url.username);
      }
      if (url.password !== "") {
        config.password = decodeURIComponent(url.password);
      }
      if (url.pathname.trim().length > 1) {
        config.database = url.pathname.slice(1);
      }
      const urlSearchParamsKeys = [...url.searchParams.keys()];
      if (urlSearchParamsKeys.length > 0) {
        const unknownParams = /* @__PURE__ */ new Set();
        const settingPrefix = "clickhouse_setting_";
        const settingShortPrefix = "ch_";
        const httpHeaderPrefix = "http_header_";
        urlSearchParamsKeys.forEach((key) => {
          let paramWasProcessed = true;
          const value = url.searchParams.get(key);
          if (key.startsWith(settingPrefix)) {
            const settingKey = key.slice(settingPrefix.length);
            if (config.clickhouse_settings === void 0) {
              config.clickhouse_settings = {};
            }
            config.clickhouse_settings[settingKey] = value;
          } else if (key.startsWith(settingShortPrefix)) {
            const settingKey = key.slice(settingShortPrefix.length);
            if (config.clickhouse_settings === void 0) {
              config.clickhouse_settings = {};
            }
            config.clickhouse_settings[settingKey] = value;
          } else if (key.startsWith(httpHeaderPrefix)) {
            const headerKey = key.slice(httpHeaderPrefix.length);
            if (config.http_headers === void 0) {
              config.http_headers = {};
            }
            config.http_headers[headerKey] = value;
          } else {
            switch (key) {
              case "application":
                config.application = value;
                break;
              case "pathname":
                config.pathname = value;
                break;
              case "session_id":
                config.session_id = value;
                break;
              case "request_timeout":
                config.request_timeout = numberConfigURLValue({
                  key,
                  value,
                  min: 0
                });
                break;
              case "max_open_connections":
                config.max_open_connections = numberConfigURLValue({
                  key,
                  value,
                  min: 1
                });
                break;
              case "compression_request":
                if (config.compression === void 0) {
                  config.compression = {};
                }
                config.compression.request = booleanConfigURLValue({ key, value });
                break;
              case "compression_response":
                if (config.compression === void 0) {
                  config.compression = {};
                }
                config.compression.response = booleanConfigURLValue({
                  key,
                  value
                });
                break;
              case "log_level":
                if (config.log === void 0) {
                  config.log = {};
                }
                config.log.level = enumConfigURLValue({
                  key,
                  value,
                  enumObject: logger_1.ClickHouseLogLevel
                });
                break;
              case "keep_alive_enabled":
                if (config.keep_alive === void 0) {
                  config.keep_alive = {};
                }
                config.keep_alive.enabled = booleanConfigURLValue({ key, value });
                break;
              case "access_token":
                config.access_token = value;
                break;
              default:
                paramWasProcessed = false;
                unknownParams.add(key);
                break;
            }
          }
          if (paramWasProcessed) {
            url.searchParams.delete(key);
          }
        });
        if (handleExtraURLParams !== null) {
          const res = handleExtraURLParams(config, url);
          config = res.config;
          if (unknownParams.size > 0) {
            res.handled_params.forEach((k) => unknownParams.delete(k));
          }
          if (res.unknown_params.size > 0) {
            res.unknown_params.forEach((k) => unknownParams.add(k));
          }
        }
        if (unknownParams.size > 0) {
          throw new Error(`Unknown URL parameters: ${Array.from(unknownParams).join(", ")}`);
        }
      }
      const clickHouseURL = new URL(`${url.protocol}//${url.host}`);
      return [clickHouseURL, config];
    }
    __name(loadConfigOptionsFromURL, "loadConfigOptionsFromURL");
    function booleanConfigURLValue({ key, value }) {
      const trimmed = value.trim();
      if (trimmed === "true" || trimmed === "1")
        return true;
      if (trimmed === "false" || trimmed === "0")
        return false;
      throw new Error(`"${key}" has invalid boolean value: ${trimmed}. Expected one of: 0, 1, true, false.`);
    }
    __name(booleanConfigURLValue, "booleanConfigURLValue");
    function numberConfigURLValue({ key, value, min, max }) {
      const trimmed = value.trim();
      const number = Number(trimmed);
      if (isNaN(number))
        throw new Error(`"${key}" has invalid numeric value: ${trimmed}`);
      if (min !== void 0 && number < min) {
        throw new Error(`"${key}" value ${trimmed} is less than min allowed ${min}`);
      }
      if (max !== void 0 && number > max) {
        throw new Error(`"${key}" value ${trimmed} is greater than max allowed ${max}`);
      }
      return number;
    }
    __name(numberConfigURLValue, "numberConfigURLValue");
    function enumConfigURLValue({ key, value, enumObject }) {
      const values = Object.keys(enumObject).filter((item) => isNaN(Number(item)));
      const trimmed = value.trim();
      if (!values.includes(trimmed)) {
        const expected = values.join(", ");
        throw new Error(`"${key}" has invalid value: ${trimmed}. Expected one of: ${expected}.`);
      }
      return enumObject[trimmed];
    }
    __name(enumConfigURLValue, "enumConfigURLValue");
  }
});

// node_modules/@clickhouse/client-common/dist/client.js
var require_client = __commonJS({
  "node_modules/@clickhouse/client-common/dist/client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickHouseClient = void 0;
    var client_common_1 = require_dist();
    var config_1 = require_config();
    var ClickHouseClient = class {
      static {
        __name(this, "ClickHouseClient");
      }
      constructor(config) {
        Object.defineProperty(this, "clientClickHouseSettings", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "connectionParams", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "connection", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "makeResultSet", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "valuesEncoder", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "sessionId", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "role", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "logWriter", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        const logger = config?.log?.LoggerClass ? new config.log.LoggerClass() : new client_common_1.DefaultLogger();
        const configWithURL = (0, config_1.prepareConfigWithURL)(config, logger, config.impl.handle_specific_url_params ?? null);
        this.connectionParams = (0, config_1.getConnectionParams)(configWithURL, logger);
        this.logWriter = this.connectionParams.log_writer;
        this.clientClickHouseSettings = this.connectionParams.clickhouse_settings;
        this.sessionId = config.session_id;
        this.role = config.role;
        this.connection = config.impl.make_connection(configWithURL, this.connectionParams);
        this.makeResultSet = config.impl.make_result_set;
        this.valuesEncoder = config.impl.values_encoder;
      }
      /**
       * Used for most statements that can have a response, such as `SELECT`.
       * FORMAT clause should be specified separately via {@link QueryParams.format} (default is `JSON`).
       * Consider using {@link ClickHouseClient.insert} for data insertion, or {@link ClickHouseClient.command} for DDLs.
       * Returns an implementation of {@link BaseResultSet}.
       *
       * See {@link DataFormat} for the formats supported by the client.
       */
      async query(params) {
        const format = params.format ?? "JSON";
        const query = formatQuery(params.query, format);
        const queryParams = this.withClientQueryParams(params);
        const { stream, query_id, response_headers } = await this.connection.query({
          query,
          ...queryParams
        });
        return this.makeResultSet(stream, format, query_id, (err) => {
          this.logWriter.error({
            err,
            module: "Client",
            message: "Error while processing the ResultSet.",
            args: {
              session_id: queryParams.session_id,
              role: queryParams.role,
              query,
              query_id
            }
          });
        }, response_headers);
      }
      /**
       * It should be used for statements that do not have any output,
       * when the format clause is not applicable, or when you are not interested in the response at all.
       * The response stream is destroyed immediately as we do not expect useful information there.
       * Examples of such statements are DDLs or custom inserts.
       *
       * @note if you have a custom query that does not work with {@link ClickHouseClient.query},
       * and you are interested in the response data, consider using {@link ClickHouseClient.exec}.
       */
      async command(params) {
        const query = removeTrailingSemi(params.query.trim());
        return await this.connection.command({
          query,
          ...this.withClientQueryParams(params)
        });
      }
      /**
       * Similar to {@link ClickHouseClient.command}, but for the cases where the output _is expected_,
       * but format clause is not applicable. The caller of this method _must_ consume the stream,
       * as the underlying socket will not be released until then, and the request will eventually be timed out.
       *
       * @note it is not intended to use this method to execute the DDLs, such as `CREATE TABLE` or similar;
       * use {@link ClickHouseClient.command} instead.
       */
      async exec(params) {
        const query = removeTrailingSemi(params.query.trim());
        const values = "values" in params ? params.values : void 0;
        const decompress_response_stream = params.decompress_response_stream ?? true;
        return await this.connection.exec({
          query,
          values,
          decompress_response_stream,
          ...this.withClientQueryParams(params)
        });
      }
      /**
       * The primary method for data insertion. It is recommended to avoid arrays in case of large inserts
       * to reduce application memory consumption and consider streaming for most of such use cases.
       * As the insert operation does not provide any output, the response stream is immediately destroyed.
       *
       * @note in case of a custom insert operation (e.g., `INSERT FROM SELECT`),
       * consider using {@link ClickHouseClient.command}, passing the entire raw query there
       * (including the `FORMAT` clause).
       */
      async insert(params) {
        if (Array.isArray(params.values) && params.values.length === 0) {
          return { executed: false, query_id: "", response_headers: {} };
        }
        const format = params.format || "JSONCompactEachRow";
        this.valuesEncoder.validateInsertValues(params.values, format);
        const query = getInsertQuery(params, format);
        const result = await this.connection.insert({
          query,
          values: this.valuesEncoder.encodeValues(params.values, format),
          ...this.withClientQueryParams(params)
        });
        return { ...result, executed: true };
      }
      /**
       * A health-check request. It does not throw if an error occurs - the error is returned inside the result object.
       *
       * By default, Node.js version uses the built-in `/ping` endpoint, which does not verify credentials.
       * Optionally, it can be switched to a `SELECT` query (see {@link PingParamsWithSelectQuery}).
       * In that case, the server will verify the credentials.
       *
       * **NOTE**: Since the `/ping` endpoint does not support CORS, the Web version always uses a `SELECT` query.
       */
      async ping(params) {
        return await this.connection.ping(params ?? { select: false });
      }
      /**
       * Shuts down the underlying connection.
       * This method should ideally be called only once per application lifecycle,
       * for example, during the graceful shutdown phase.
       */
      async close() {
        return await this.connection.close();
      }
      withClientQueryParams(params) {
        return {
          clickhouse_settings: {
            ...this.clientClickHouseSettings,
            ...params.clickhouse_settings
          },
          query_params: params.query_params,
          abort_signal: params.abort_signal,
          query_id: params.query_id,
          session_id: params.session_id ?? this.sessionId,
          role: params.role ?? this.role,
          auth: params.auth,
          http_headers: params.http_headers
        };
      }
    };
    exports.ClickHouseClient = ClickHouseClient;
    function formatQuery(query, format) {
      query = query.trim();
      query = removeTrailingSemi(query);
      return query + " \nFORMAT " + format;
    }
    __name(formatQuery, "formatQuery");
    function removeTrailingSemi(query) {
      let lastNonSemiIdx = query.length;
      for (let i = lastNonSemiIdx; i > 0; i--) {
        if (query[i - 1] !== ";") {
          lastNonSemiIdx = i;
          break;
        }
      }
      if (lastNonSemiIdx !== query.length) {
        return query.slice(0, lastNonSemiIdx);
      }
      return query;
    }
    __name(removeTrailingSemi, "removeTrailingSemi");
    function isInsertColumnsExcept(obj) {
      return obj !== void 0 && obj !== null && typeof obj === "object" && // Avoiding ESLint no-prototype-builtins error
      Object.prototype.hasOwnProperty.call(obj, "except");
    }
    __name(isInsertColumnsExcept, "isInsertColumnsExcept");
    function getInsertQuery(params, format) {
      let columnsPart = "";
      if (params.columns !== void 0) {
        if (Array.isArray(params.columns) && params.columns.length > 0) {
          columnsPart = ` (${params.columns.join(", ")})`;
        } else if (isInsertColumnsExcept(params.columns) && params.columns.except.length > 0) {
          columnsPart = ` (* EXCEPT (${params.columns.except.join(", ")}))`;
        }
      }
      return `INSERT INTO ${params.table.trim()}${columnsPart} FORMAT ${format}`;
    }
    __name(getInsertQuery, "getInsertQuery");
  }
});

// node_modules/@clickhouse/client-common/dist/data_formatter/formatter.js
var require_formatter = __commonJS({
  "node_modules/@clickhouse/client-common/dist/data_formatter/formatter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StreamableFormats = exports.SupportedRawFormats = exports.SupportedJSONFormats = exports.SingleDocumentJSONFormats = exports.RecordsJSONFormats = exports.StreamableJSONFormats = void 0;
    exports.isNotStreamableJSONFamily = isNotStreamableJSONFamily;
    exports.isStreamableJSONFamily = isStreamableJSONFamily;
    exports.isSupportedRawFormat = isSupportedRawFormat;
    exports.validateStreamFormat = validateStreamFormat;
    exports.encodeJSON = encodeJSON;
    exports.StreamableJSONFormats = [
      "JSONEachRow",
      "JSONStringsEachRow",
      "JSONCompactEachRow",
      "JSONCompactStringsEachRow",
      "JSONCompactEachRowWithNames",
      "JSONCompactEachRowWithNamesAndTypes",
      "JSONCompactStringsEachRowWithNames",
      "JSONCompactStringsEachRowWithNamesAndTypes",
      "JSONEachRowWithProgress"
    ];
    exports.RecordsJSONFormats = ["JSONObjectEachRow"];
    exports.SingleDocumentJSONFormats = [
      "JSON",
      "JSONStrings",
      "JSONCompact",
      "JSONCompactStrings",
      "JSONColumnsWithMetadata"
    ];
    exports.SupportedJSONFormats = [
      ...exports.RecordsJSONFormats,
      ...exports.SingleDocumentJSONFormats,
      ...exports.StreamableJSONFormats
    ];
    exports.SupportedRawFormats = [
      "CSV",
      "CSVWithNames",
      "CSVWithNamesAndTypes",
      "TabSeparated",
      "TabSeparatedRaw",
      "TabSeparatedWithNames",
      "TabSeparatedWithNamesAndTypes",
      "CustomSeparated",
      "CustomSeparatedWithNames",
      "CustomSeparatedWithNamesAndTypes",
      "Parquet"
    ];
    exports.StreamableFormats = [
      ...exports.StreamableJSONFormats,
      ...exports.SupportedRawFormats
    ];
    function isNotStreamableJSONFamily(format) {
      return exports.SingleDocumentJSONFormats.includes(format) || exports.RecordsJSONFormats.includes(format);
    }
    __name(isNotStreamableJSONFamily, "isNotStreamableJSONFamily");
    function isStreamableJSONFamily(format) {
      return exports.StreamableJSONFormats.includes(format);
    }
    __name(isStreamableJSONFamily, "isStreamableJSONFamily");
    function isSupportedRawFormat(dataFormat) {
      return exports.SupportedRawFormats.includes(dataFormat);
    }
    __name(isSupportedRawFormat, "isSupportedRawFormat");
    function validateStreamFormat(format) {
      if (!exports.StreamableFormats.includes(format)) {
        throw new Error(`${format} format is not streamable. Streamable formats: ${exports.StreamableFormats.join(",")}`);
      }
      return true;
    }
    __name(validateStreamFormat, "validateStreamFormat");
    function encodeJSON(value, format) {
      if (exports.SupportedJSONFormats.includes(format)) {
        return JSON.stringify(value) + "\n";
      }
      throw new Error(`The client does not support JSON encoding in [${format}] format.`);
    }
    __name(encodeJSON, "encodeJSON");
  }
});

// node_modules/@clickhouse/client-common/dist/data_formatter/format_query_params.js
var require_format_query_params = __commonJS({
  "node_modules/@clickhouse/client-common/dist/data_formatter/format_query_params.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TupleParam = void 0;
    exports.formatQueryParams = formatQueryParams;
    var TupleParam = class {
      static {
        __name(this, "TupleParam");
      }
      constructor(values) {
        Object.defineProperty(this, "values", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: values
        });
      }
    };
    exports.TupleParam = TupleParam;
    function formatQueryParams({ value, wrapStringInQuotes, printNullAsKeyword }) {
      if (value === null || value === void 0) {
        if (printNullAsKeyword)
          return "NULL";
        return "\\N";
      }
      if (Number.isNaN(value))
        return "nan";
      if (value === Number.POSITIVE_INFINITY)
        return "+inf";
      if (value === Number.NEGATIVE_INFINITY)
        return "-inf";
      if (typeof value === "number")
        return String(value);
      if (typeof value === "boolean")
        return value ? "1" : "0";
      if (typeof value === "string") {
        let result = "";
        for (let i = 0; i < value.length; i++) {
          switch (value.charCodeAt(i)) {
            case TabASCII:
              result += "\\t";
              break;
            case NewlineASCII:
              result += "\\n";
              break;
            case CarriageReturnASCII:
              result += "\\r";
              break;
            case SingleQuoteASCII:
              result += `\\'`;
              break;
            case BackslashASCII:
              result += "\\\\";
              break;
            default:
              result += value[i];
          }
        }
        return wrapStringInQuotes ? `'${result}'` : result;
      }
      if (Array.isArray(value)) {
        return `[${value.map((v) => formatQueryParams({
          value: v,
          wrapStringInQuotes: true,
          printNullAsKeyword: true
        })).join(",")}]`;
      }
      if (value instanceof Date) {
        const unixTimestamp = Math.floor(value.getTime() / 1e3).toString().padStart(10, "0");
        const milliseconds = value.getUTCMilliseconds();
        return milliseconds === 0 ? unixTimestamp : `${unixTimestamp}.${milliseconds.toString().padStart(3, "0")}`;
      }
      if (value instanceof TupleParam) {
        return `(${value.values.map((v) => formatQueryParams({
          value: v,
          wrapStringInQuotes: true,
          printNullAsKeyword: true
        })).join(",")})`;
      }
      if (value instanceof Map) {
        return formatObjectLikeParam(value.entries());
      }
      if (typeof value === "object") {
        return formatObjectLikeParam(Object.entries(value));
      }
      throw new Error(`Unsupported value in query parameters: [${value}].`);
    }
    __name(formatQueryParams, "formatQueryParams");
    function formatObjectLikeParam(entries) {
      const formatted = [];
      for (const [key, val] of entries) {
        formatted.push(`${formatQueryParams({
          value: key,
          wrapStringInQuotes: true,
          printNullAsKeyword: true
        })}:${formatQueryParams({
          value: val,
          wrapStringInQuotes: true,
          printNullAsKeyword: true
        })}`);
      }
      return `{${formatted.join(",")}}`;
    }
    __name(formatObjectLikeParam, "formatObjectLikeParam");
    var TabASCII = 9;
    var NewlineASCII = 10;
    var CarriageReturnASCII = 13;
    var SingleQuoteASCII = 39;
    var BackslashASCII = 92;
  }
});

// node_modules/@clickhouse/client-common/dist/settings.js
var require_settings = __commonJS({
  "node_modules/@clickhouse/client-common/dist/settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SettingsMap = void 0;
    var SettingsMap = class {
      static {
        __name(this, "SettingsMap");
      }
      constructor(record) {
        Object.defineProperty(this, "record", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: record
        });
      }
      toString() {
        return `{${Object.entries(this.record).map(([k, v]) => `'${k}':'${v}'`).join(",")}}`;
      }
      static from(record) {
        return new this(record);
      }
    };
    exports.SettingsMap = SettingsMap;
  }
});

// node_modules/@clickhouse/client-common/dist/data_formatter/format_query_settings.js
var require_format_query_settings = __commonJS({
  "node_modules/@clickhouse/client-common/dist/data_formatter/format_query_settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatQuerySettings = formatQuerySettings;
    var settings_1 = require_settings();
    function formatQuerySettings(value) {
      if (typeof value === "boolean")
        return value ? "1" : "0";
      if (typeof value === "number")
        return String(value);
      if (typeof value === "string")
        return value;
      if (value instanceof settings_1.SettingsMap) {
        return value.toString();
      }
      throw new Error(`Unsupported value in query settings: [${value}].`);
    }
    __name(formatQuerySettings, "formatQuerySettings");
  }
});

// node_modules/@clickhouse/client-common/dist/data_formatter/index.js
var require_data_formatter = __commonJS({
  "node_modules/@clickhouse/client-common/dist/data_formatter/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatQuerySettings = exports.formatQueryParams = exports.TupleParam = void 0;
    __exportStar(require_formatter(), exports);
    var format_query_params_1 = require_format_query_params();
    Object.defineProperty(exports, "TupleParam", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return format_query_params_1.TupleParam;
    }, "get") });
    Object.defineProperty(exports, "formatQueryParams", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return format_query_params_1.formatQueryParams;
    }, "get") });
    var format_query_settings_1 = require_format_query_settings();
    Object.defineProperty(exports, "formatQuerySettings", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return format_query_settings_1.formatQuerySettings;
    }, "get") });
  }
});

// node_modules/@clickhouse/client-common/dist/error/error.js
var require_error = __commonJS({
  "node_modules/@clickhouse/client-common/dist/error/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClickHouseError = void 0;
    exports.parseError = parseError;
    exports.getCurrentStackTrace = getCurrentStackTrace;
    exports.enhanceStackTrace = enhanceStackTrace;
    var errorRe = /(Code|Error): (?<code>\d+).*Exception: (?<message>.+)\((?<type>(?=.+[A-Z]{3})[A-Z0-9_]+?)\)/s;
    var ClickHouseError = class _ClickHouseError extends Error {
      static {
        __name(this, "ClickHouseError");
      }
      constructor({ message, code, type }) {
        super(message);
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "type", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.code = code;
        this.type = type;
        Object.setPrototypeOf(this, _ClickHouseError.prototype);
      }
    };
    exports.ClickHouseError = ClickHouseError;
    function parseError(input) {
      const inputIsError = input instanceof Error;
      const message = inputIsError ? input.message : input;
      const match = message.match(errorRe);
      const groups = match?.groups;
      if (groups) {
        return new ClickHouseError(groups);
      } else {
        return inputIsError ? input : new Error(input);
      }
    }
    __name(parseError, "parseError");
    function getCurrentStackTrace() {
      const stack = new Error().stack;
      if (!stack)
        return "";
      return stack.split("\n").slice(3).reverse().join("\n");
    }
    __name(getCurrentStackTrace, "getCurrentStackTrace");
    function enhanceStackTrace(err, stackTrace) {
      if (err.stack && stackTrace) {
        const firstNewlineIndex = err.stack.indexOf("\n");
        const firstLine = err.stack.substring(0, firstNewlineIndex);
        const errStack = err.stack.substring(firstNewlineIndex + 1);
        err.stack = `${firstLine}
${stackTrace}
${errStack}`;
      }
      return err;
    }
    __name(enhanceStackTrace, "enhanceStackTrace");
  }
});

// node_modules/@clickhouse/client-common/dist/error/index.js
var require_error2 = __commonJS({
  "node_modules/@clickhouse/client-common/dist/error/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_error(), exports);
  }
});

// node_modules/@clickhouse/client-common/dist/clickhouse_types.js
var require_clickhouse_types = __commonJS({
  "node_modules/@clickhouse/client-common/dist/clickhouse_types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isProgressRow = isProgressRow;
    exports.isRow = isRow;
    exports.isException = isException;
    function isProgressRow(row) {
      return row !== null && typeof row === "object" && "progress" in row && Object.keys(row).length === 1;
    }
    __name(isProgressRow, "isProgressRow");
    function isRow(row) {
      return row !== null && typeof row === "object" && "row" in row && Object.keys(row).length === 1;
    }
    __name(isRow, "isRow");
    function isException(row) {
      return row !== null && typeof row === "object" && "exception" in row && Object.keys(row).length === 1;
    }
    __name(isException, "isException");
  }
});

// node_modules/@clickhouse/client-common/dist/parse/column_types.js
var require_column_types = __commonJS({
  "node_modules/@clickhouse/client-common/dist/parse/column_types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SimpleColumnTypes = exports.ColumnTypeParseError = void 0;
    exports.parseColumnType = parseColumnType;
    exports.parseDecimalType = parseDecimalType;
    exports.parseEnumType = parseEnumType;
    exports.parseMapType = parseMapType;
    exports.parseTupleType = parseTupleType;
    exports.parseArrayType = parseArrayType;
    exports.parseDateTimeType = parseDateTimeType;
    exports.parseDateTime64Type = parseDateTime64Type;
    exports.parseFixedStringType = parseFixedStringType;
    exports.asNullableType = asNullableType;
    exports.getElementsTypes = getElementsTypes;
    var ColumnTypeParseError = class _ColumnTypeParseError extends Error {
      static {
        __name(this, "ColumnTypeParseError");
      }
      constructor(message, args) {
        super(message);
        Object.defineProperty(this, "args", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.args = args ?? {};
        Object.setPrototypeOf(this, _ColumnTypeParseError.prototype);
      }
    };
    exports.ColumnTypeParseError = ColumnTypeParseError;
    exports.SimpleColumnTypes = [
      "Bool",
      "UInt8",
      "Int8",
      "UInt16",
      "Int16",
      "UInt32",
      "Int32",
      "UInt64",
      "Int64",
      "UInt128",
      "Int128",
      "UInt256",
      "Int256",
      "Float32",
      "Float64",
      "String",
      "UUID",
      "Date",
      "Date32",
      "IPv4",
      "IPv6"
    ];
    function parseColumnType(sourceType) {
      let columnType = sourceType;
      let isNullable = false;
      if (columnType.startsWith(LowCardinalityPrefix)) {
        columnType = columnType.slice(LowCardinalityPrefix.length, -1);
      }
      if (columnType.startsWith(NullablePrefix)) {
        columnType = columnType.slice(NullablePrefix.length, -1);
        isNullable = true;
      }
      let result;
      if (exports.SimpleColumnTypes.includes(columnType)) {
        result = {
          type: "Simple",
          columnType,
          sourceType
        };
      } else if (columnType.startsWith(DecimalPrefix)) {
        result = parseDecimalType({
          sourceType,
          columnType
        });
      } else if (columnType.startsWith(DateTime64Prefix)) {
        result = parseDateTime64Type({ sourceType, columnType });
      } else if (columnType.startsWith(DateTimePrefix)) {
        result = parseDateTimeType({ sourceType, columnType });
      } else if (columnType.startsWith(FixedStringPrefix)) {
        result = parseFixedStringType({ sourceType, columnType });
      } else if (columnType.startsWith(Enum8Prefix) || columnType.startsWith(Enum16Prefix)) {
        result = parseEnumType({ sourceType, columnType });
      } else if (columnType.startsWith(ArrayPrefix)) {
        result = parseArrayType({ sourceType, columnType });
      } else if (columnType.startsWith(MapPrefix)) {
        result = parseMapType({ sourceType, columnType });
      } else if (columnType.startsWith(TuplePrefix)) {
        result = parseTupleType({ sourceType, columnType });
      } else {
        throw new ColumnTypeParseError("Unsupported column type", { columnType });
      }
      if (isNullable) {
        return asNullableType(result, sourceType);
      } else {
        return result;
      }
    }
    __name(parseColumnType, "parseColumnType");
    function parseDecimalType({ columnType, sourceType }) {
      if (!columnType.startsWith(DecimalPrefix) || columnType.length < DecimalPrefix.length + 5) {
        throw new ColumnTypeParseError("Invalid Decimal type", {
          sourceType,
          columnType
        });
      }
      const split = columnType.slice(DecimalPrefix.length, -1).split(", ");
      if (split.length !== 2) {
        throw new ColumnTypeParseError("Expected Decimal type to have both precision and scale", {
          sourceType,
          columnType,
          split
        });
      }
      let intSize = 32;
      const precision = parseInt(split[0], 10);
      if (Number.isNaN(precision) || precision < 1 || precision > 76) {
        throw new ColumnTypeParseError("Invalid Decimal precision", {
          columnType,
          sourceType,
          precision
        });
      }
      const scale = parseInt(split[1], 10);
      if (Number.isNaN(scale) || scale < 0 || scale > precision) {
        throw new ColumnTypeParseError("Invalid Decimal scale", {
          columnType,
          sourceType,
          precision,
          scale
        });
      }
      if (precision > 38) {
        intSize = 256;
      } else if (precision > 18) {
        intSize = 128;
      } else if (precision > 9) {
        intSize = 64;
      }
      return {
        type: "Decimal",
        params: {
          precision,
          scale,
          intSize
        },
        sourceType
      };
    }
    __name(parseDecimalType, "parseDecimalType");
    function parseEnumType({ columnType, sourceType }) {
      let intSize;
      if (columnType.startsWith(Enum8Prefix)) {
        columnType = columnType.slice(Enum8Prefix.length, -1);
        intSize = 8;
      } else if (columnType.startsWith(Enum16Prefix)) {
        columnType = columnType.slice(Enum16Prefix.length, -1);
        intSize = 16;
      } else {
        throw new ColumnTypeParseError("Expected Enum to be either Enum8 or Enum16", {
          columnType,
          sourceType
        });
      }
      if (columnType.length < 6) {
        throw new ColumnTypeParseError("Invalid Enum type values", {
          columnType,
          sourceType
        });
      }
      const names = [];
      const indices = [];
      let parsingName = true;
      let charEscaped = false;
      let startIndex = 1;
      for (let i = 1; i < columnType.length; i++) {
        if (parsingName) {
          if (charEscaped) {
            charEscaped = false;
          } else {
            if (columnType.charCodeAt(i) === BackslashASCII) {
              charEscaped = true;
            } else if (columnType.charCodeAt(i) === SingleQuoteASCII) {
              const name = columnType.slice(startIndex, i);
              if (names.includes(name)) {
                throw new ColumnTypeParseError("Duplicate Enum name", {
                  columnType,
                  sourceType,
                  name,
                  names,
                  indices
                });
              }
              names.push(name);
              i += 4;
              startIndex = i;
              parsingName = false;
            }
          }
        } else if (columnType.charCodeAt(i) < ZeroASCII || columnType.charCodeAt(i) > NineASCII) {
          pushEnumIndex(startIndex, i);
          i += 2;
          startIndex = i + 1;
          parsingName = true;
          charEscaped = false;
        }
      }
      pushEnumIndex(startIndex, columnType.length);
      if (names.length !== indices.length) {
        throw new ColumnTypeParseError("Expected Enum to have the same number of names and indices", { columnType, sourceType, names, indices });
      }
      const values = {};
      for (let i = 0; i < names.length; i++) {
        values[indices[i]] = names[i];
      }
      return {
        type: "Enum",
        values,
        intSize,
        sourceType
      };
      function pushEnumIndex(start, end) {
        const index = parseInt(columnType.slice(start, end), 10);
        if (Number.isNaN(index) || index < 0) {
          throw new ColumnTypeParseError("Expected Enum index to be a valid number", {
            columnType,
            sourceType,
            names,
            indices,
            index,
            start,
            end
          });
        }
        if (indices.includes(index)) {
          throw new ColumnTypeParseError("Duplicate Enum index", {
            columnType,
            sourceType,
            index,
            names,
            indices
          });
        }
        indices.push(index);
      }
      __name(pushEnumIndex, "pushEnumIndex");
    }
    __name(parseEnumType, "parseEnumType");
    function parseMapType({ columnType, sourceType }) {
      if (!columnType.startsWith(MapPrefix) || columnType.length < MapPrefix.length + 11) {
        throw new ColumnTypeParseError("Invalid Map type", {
          columnType,
          sourceType
        });
      }
      columnType = columnType.slice(MapPrefix.length, -1);
      const [keyType, valueType] = getElementsTypes({ columnType, sourceType }, 2);
      const key = parseColumnType(keyType);
      if (key.type === "DateTime64" || key.type === "Nullable" || key.type === "Array" || key.type === "Map" || key.type === "Decimal" || key.type === "Tuple") {
        throw new ColumnTypeParseError("Invalid Map key type", {
          key,
          sourceType
        });
      }
      const value = parseColumnType(valueType);
      return {
        type: "Map",
        key,
        value,
        sourceType
      };
    }
    __name(parseMapType, "parseMapType");
    function parseTupleType({ columnType, sourceType }) {
      if (!columnType.startsWith(TuplePrefix) || columnType.length < TuplePrefix.length + 5) {
        throw new ColumnTypeParseError("Invalid Tuple type", {
          columnType,
          sourceType
        });
      }
      columnType = columnType.slice(TuplePrefix.length, -1);
      const elements = getElementsTypes({ columnType, sourceType }, 1).map((type) => parseColumnType(type));
      return {
        type: "Tuple",
        elements,
        sourceType
      };
    }
    __name(parseTupleType, "parseTupleType");
    function parseArrayType({ columnType, sourceType }) {
      if (!columnType.startsWith(ArrayPrefix) || columnType.length < ArrayPrefix.length + 5) {
        throw new ColumnTypeParseError("Invalid Array type", {
          columnType,
          sourceType
        });
      }
      let dimensions = 0;
      while (columnType.length > 0) {
        if (columnType.startsWith(ArrayPrefix)) {
          columnType = columnType.slice(ArrayPrefix.length, -1);
          dimensions++;
        } else {
          break;
        }
      }
      if (dimensions === 0 || dimensions > 10) {
        throw new ColumnTypeParseError("Expected Array to have between 1 and 10 dimensions", { columnType });
      }
      const value = parseColumnType(columnType);
      if (value.type === "Array") {
        throw new ColumnTypeParseError("Unexpected Array as value type", {
          columnType,
          sourceType
        });
      }
      return {
        type: "Array",
        value,
        dimensions,
        sourceType
      };
    }
    __name(parseArrayType, "parseArrayType");
    function parseDateTimeType({ columnType, sourceType }) {
      if (columnType.startsWith(DateTimeWithTimezonePrefix) && columnType.length > DateTimeWithTimezonePrefix.length + 4) {
        const timezone = columnType.slice(DateTimeWithTimezonePrefix.length + 1, -2);
        return {
          type: "DateTime",
          timezone,
          sourceType
        };
      } else if (columnType.startsWith(DateTimePrefix) && columnType.length === DateTimePrefix.length) {
        return {
          type: "DateTime",
          timezone: null,
          sourceType
        };
      } else {
        throw new ColumnTypeParseError("Invalid DateTime type", {
          columnType,
          sourceType
        });
      }
    }
    __name(parseDateTimeType, "parseDateTimeType");
    function parseDateTime64Type({ columnType, sourceType }) {
      if (!columnType.startsWith(DateTime64Prefix) || columnType.length < DateTime64Prefix.length + 2) {
        throw new ColumnTypeParseError("Invalid DateTime64 type", {
          columnType,
          sourceType
        });
      }
      const precision = parseInt(columnType[DateTime64Prefix.length], 10);
      if (Number.isNaN(precision) || precision < 0 || precision > 9) {
        throw new ColumnTypeParseError("Invalid DateTime64 precision", {
          columnType,
          sourceType,
          precision
        });
      }
      let timezone = null;
      if (columnType.length > DateTime64Prefix.length + 2) {
        timezone = columnType.slice(DateTime64Prefix.length + 4, -2);
      }
      return {
        type: "DateTime64",
        timezone,
        precision,
        sourceType
      };
    }
    __name(parseDateTime64Type, "parseDateTime64Type");
    function parseFixedStringType({ columnType, sourceType }) {
      if (!columnType.startsWith(FixedStringPrefix) || columnType.length < FixedStringPrefix.length + 2) {
        throw new ColumnTypeParseError("Invalid FixedString type", {
          columnType,
          sourceType
        });
      }
      const sizeBytes = parseInt(columnType.slice(FixedStringPrefix.length, -1), 10);
      if (Number.isNaN(sizeBytes) || sizeBytes < 1) {
        throw new ColumnTypeParseError("Invalid FixedString size in bytes", {
          columnType,
          sourceType,
          sizeBytes
        });
      }
      return {
        type: "FixedString",
        sizeBytes,
        sourceType
      };
    }
    __name(parseFixedStringType, "parseFixedStringType");
    function asNullableType(value, sourceType) {
      if (value.type === "Array" || value.type === "Map" || value.type === "Tuple" || value.type === "Nullable") {
        throw new ColumnTypeParseError(`${value.type} cannot be Nullable`, {
          sourceType
        });
      }
      if (value.sourceType.startsWith(NullablePrefix)) {
        value.sourceType = value.sourceType.slice(NullablePrefix.length, -1);
      }
      return {
        type: "Nullable",
        sourceType,
        value
      };
    }
    __name(asNullableType, "asNullableType");
    function getElementsTypes({ columnType, sourceType }, minElements) {
      const elements = [];
      let openParens = 0;
      let quoteOpen = false;
      let charEscaped = false;
      let lastElementIndex = 0;
      for (let i = 0; i < columnType.length; i++) {
        if (charEscaped) {
          charEscaped = false;
        } else if (columnType.charCodeAt(i) === BackslashASCII) {
          charEscaped = true;
        } else if (columnType.charCodeAt(i) === SingleQuoteASCII) {
          quoteOpen = !quoteOpen;
        } else {
          if (!quoteOpen) {
            if (columnType.charCodeAt(i) === LeftParenASCII) {
              openParens++;
            } else if (columnType.charCodeAt(i) === RightParenASCII) {
              openParens--;
            } else if (columnType.charCodeAt(i) === CommaASCII) {
              if (openParens === 0) {
                elements.push(columnType.slice(lastElementIndex, i));
                i += 2;
                lastElementIndex = i;
              }
            }
          }
        }
      }
      if (!openParens && lastElementIndex < columnType.length - 1) {
        elements.push(columnType.slice(lastElementIndex));
      }
      if (elements.length < minElements) {
        throw new ColumnTypeParseError("Expected more elements in the type", {
          sourceType,
          columnType,
          elements,
          minElements
        });
      }
      return elements;
    }
    __name(getElementsTypes, "getElementsTypes");
    var NullablePrefix = "Nullable(";
    var LowCardinalityPrefix = "LowCardinality(";
    var DecimalPrefix = "Decimal(";
    var ArrayPrefix = "Array(";
    var MapPrefix = "Map(";
    var Enum8Prefix = "Enum8(";
    var Enum16Prefix = "Enum16(";
    var TuplePrefix = "Tuple(";
    var DateTimePrefix = "DateTime";
    var DateTimeWithTimezonePrefix = "DateTime(";
    var DateTime64Prefix = "DateTime64(";
    var FixedStringPrefix = "FixedString(";
    var SingleQuoteASCII = 39;
    var LeftParenASCII = 40;
    var RightParenASCII = 41;
    var CommaASCII = 44;
    var ZeroASCII = 48;
    var NineASCII = 57;
    var BackslashASCII = 92;
  }
});

// node_modules/@clickhouse/client-common/dist/parse/index.js
var require_parse = __commonJS({
  "node_modules/@clickhouse/client-common/dist/parse/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_column_types(), exports);
  }
});

// node_modules/@clickhouse/client-common/dist/utils/connection.js
var require_connection = __commonJS({
  "node_modules/@clickhouse/client-common/dist/utils/connection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withCompressionHeaders = withCompressionHeaders;
    exports.withHttpSettings = withHttpSettings;
    exports.isSuccessfulResponse = isSuccessfulResponse;
    exports.isJWTAuth = isJWTAuth;
    exports.isCredentialsAuth = isCredentialsAuth;
    function withCompressionHeaders({ headers, enable_request_compression, enable_response_compression }) {
      return {
        ...headers,
        ...enable_response_compression ? { "Accept-Encoding": "gzip" } : {},
        ...enable_request_compression ? { "Content-Encoding": "gzip" } : {}
      };
    }
    __name(withCompressionHeaders, "withCompressionHeaders");
    function withHttpSettings(clickhouse_settings, compression) {
      return {
        ...compression ? {
          enable_http_compression: 1
        } : {},
        ...clickhouse_settings
      };
    }
    __name(withHttpSettings, "withHttpSettings");
    function isSuccessfulResponse(statusCode) {
      return Boolean(statusCode && 200 <= statusCode && statusCode < 300);
    }
    __name(isSuccessfulResponse, "isSuccessfulResponse");
    function isJWTAuth(auth) {
      return auth !== null && typeof auth === "object" && "access_token" in auth;
    }
    __name(isJWTAuth, "isJWTAuth");
    function isCredentialsAuth(auth) {
      return auth !== null && typeof auth === "object" && "username" in auth && "password" in auth;
    }
    __name(isCredentialsAuth, "isCredentialsAuth");
  }
});

// node_modules/@clickhouse/client-common/dist/utils/sleep.js
var require_sleep = __commonJS({
  "node_modules/@clickhouse/client-common/dist/utils/sleep.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sleep = sleep;
    async function sleep(ms) {
      await new Promise((resolve) => setTimeout(() => {
        resolve(void 0);
      }, ms));
    }
    __name(sleep, "sleep");
  }
});

// node_modules/@clickhouse/client-common/dist/utils/url.js
var require_url = __commonJS({
  "node_modules/@clickhouse/client-common/dist/utils/url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transformUrl = transformUrl;
    exports.toSearchParams = toSearchParams;
    var data_formatter_1 = require_data_formatter();
    function transformUrl({ url, pathname, searchParams }) {
      const newUrl = new URL(url);
      if (pathname) {
        if (newUrl.pathname === "/") {
          newUrl.pathname = pathname;
        } else {
          newUrl.pathname += pathname;
        }
      }
      if (searchParams) {
        newUrl.search = searchParams?.toString();
      }
      return newUrl;
    }
    __name(transformUrl, "transformUrl");
    function toSearchParams({ database, query, query_params, clickhouse_settings, session_id, query_id, role }) {
      const entries = [["query_id", query_id]];
      if (query_params !== void 0) {
        for (const [key, value] of Object.entries(query_params)) {
          const formattedParam = (0, data_formatter_1.formatQueryParams)({ value });
          entries.push([`param_${key}`, formattedParam]);
        }
      }
      if (clickhouse_settings !== void 0) {
        for (const [key, value] of Object.entries(clickhouse_settings)) {
          if (value !== void 0) {
            entries.push([key, (0, data_formatter_1.formatQuerySettings)(value)]);
          }
        }
      }
      if (database !== void 0 && database !== "default") {
        entries.push(["database", database]);
      }
      if (query) {
        entries.push(["query", query]);
      }
      if (session_id) {
        entries.push(["session_id", session_id]);
      }
      if (role) {
        if (typeof role === "string") {
          entries.push(["role", role]);
        } else if (Array.isArray(role)) {
          for (const r of role) {
            entries.push(["role", r]);
          }
        }
      }
      return new URLSearchParams(entries);
    }
    __name(toSearchParams, "toSearchParams");
  }
});

// node_modules/@clickhouse/client-common/dist/utils/index.js
var require_utils = __commonJS({
  "node_modules/@clickhouse/client-common/dist/utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_connection(), exports);
    __exportStar(require_sleep(), exports);
    __exportStar(require_url(), exports);
  }
});

// node_modules/@clickhouse/client-common/dist/index.js
var require_dist = __commonJS({
  "node_modules/@clickhouse/client-common/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enhanceStackTrace = exports.getCurrentStackTrace = exports.DefaultLogger = exports.LogWriter = exports.isJWTAuth = exports.isCredentialsAuth = exports.withHttpSettings = exports.withCompressionHeaders = exports.transformUrl = exports.toSearchParams = exports.sleep = exports.isSuccessfulResponse = exports.numberConfigURLValue = exports.getConnectionParams = exports.enumConfigURLValue = exports.booleanConfigURLValue = exports.validateStreamFormat = exports.isNotStreamableJSONFamily = exports.isStreamableJSONFamily = exports.isSupportedRawFormat = exports.encodeJSON = exports.formatQueryParams = exports.formatQuerySettings = exports.parseColumnType = exports.SimpleColumnTypes = exports.SettingsMap = exports.isException = exports.isRow = exports.isProgressRow = exports.ClickHouseLogLevel = exports.parseError = exports.ClickHouseError = exports.TupleParam = exports.ClickHouseClient = void 0;
    var client_1 = require_client();
    Object.defineProperty(exports, "ClickHouseClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_1.ClickHouseClient;
    }, "get") });
    var data_formatter_1 = require_data_formatter();
    Object.defineProperty(exports, "TupleParam", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_1.TupleParam;
    }, "get") });
    var error_1 = require_error2();
    Object.defineProperty(exports, "ClickHouseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return error_1.ClickHouseError;
    }, "get") });
    Object.defineProperty(exports, "parseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return error_1.parseError;
    }, "get") });
    var logger_1 = require_logger();
    Object.defineProperty(exports, "ClickHouseLogLevel", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return logger_1.ClickHouseLogLevel;
    }, "get") });
    var clickhouse_types_1 = require_clickhouse_types();
    Object.defineProperty(exports, "isProgressRow", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return clickhouse_types_1.isProgressRow;
    }, "get") });
    Object.defineProperty(exports, "isRow", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return clickhouse_types_1.isRow;
    }, "get") });
    Object.defineProperty(exports, "isException", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return clickhouse_types_1.isException;
    }, "get") });
    var settings_1 = require_settings();
    Object.defineProperty(exports, "SettingsMap", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return settings_1.SettingsMap;
    }, "get") });
    var parse_1 = require_parse();
    Object.defineProperty(exports, "SimpleColumnTypes", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return parse_1.SimpleColumnTypes;
    }, "get") });
    Object.defineProperty(exports, "parseColumnType", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return parse_1.parseColumnType;
    }, "get") });
    var data_formatter_2 = require_data_formatter();
    Object.defineProperty(exports, "formatQuerySettings", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.formatQuerySettings;
    }, "get") });
    Object.defineProperty(exports, "formatQueryParams", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.formatQueryParams;
    }, "get") });
    Object.defineProperty(exports, "encodeJSON", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.encodeJSON;
    }, "get") });
    Object.defineProperty(exports, "isSupportedRawFormat", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.isSupportedRawFormat;
    }, "get") });
    Object.defineProperty(exports, "isStreamableJSONFamily", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.isStreamableJSONFamily;
    }, "get") });
    Object.defineProperty(exports, "isNotStreamableJSONFamily", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.isNotStreamableJSONFamily;
    }, "get") });
    Object.defineProperty(exports, "validateStreamFormat", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return data_formatter_2.validateStreamFormat;
    }, "get") });
    var config_1 = require_config();
    Object.defineProperty(exports, "booleanConfigURLValue", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return config_1.booleanConfigURLValue;
    }, "get") });
    Object.defineProperty(exports, "enumConfigURLValue", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return config_1.enumConfigURLValue;
    }, "get") });
    Object.defineProperty(exports, "getConnectionParams", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return config_1.getConnectionParams;
    }, "get") });
    Object.defineProperty(exports, "numberConfigURLValue", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return config_1.numberConfigURLValue;
    }, "get") });
    var utils_1 = require_utils();
    Object.defineProperty(exports, "isSuccessfulResponse", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.isSuccessfulResponse;
    }, "get") });
    Object.defineProperty(exports, "sleep", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.sleep;
    }, "get") });
    Object.defineProperty(exports, "toSearchParams", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.toSearchParams;
    }, "get") });
    Object.defineProperty(exports, "transformUrl", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.transformUrl;
    }, "get") });
    Object.defineProperty(exports, "withCompressionHeaders", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.withCompressionHeaders;
    }, "get") });
    Object.defineProperty(exports, "withHttpSettings", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.withHttpSettings;
    }, "get") });
    Object.defineProperty(exports, "isCredentialsAuth", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.isCredentialsAuth;
    }, "get") });
    Object.defineProperty(exports, "isJWTAuth", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return utils_1.isJWTAuth;
    }, "get") });
    var logger_2 = require_logger();
    Object.defineProperty(exports, "LogWriter", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return logger_2.LogWriter;
    }, "get") });
    Object.defineProperty(exports, "DefaultLogger", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return logger_2.DefaultLogger;
    }, "get") });
    var error_2 = require_error2();
    Object.defineProperty(exports, "getCurrentStackTrace", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return error_2.getCurrentStackTrace;
    }, "get") });
    Object.defineProperty(exports, "enhanceStackTrace", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return error_2.enhanceStackTrace;
    }, "get") });
  }
});

// node_modules/@clickhouse/client-web/dist/utils/stream.js
var require_stream = __commonJS({
  "node_modules/@clickhouse/client-web/dist/utils/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isStream = isStream;
    exports.getAsText = getAsText;
    var MaxStringLength = Math.pow(2, 29) - 24;
    function isStream(obj) {
      return obj !== null && obj !== void 0 && typeof obj.pipeThrough === "function";
    }
    __name(isStream, "isStream");
    async function getAsText(stream) {
      let result = "";
      let isDone = false;
      const textDecoder = new TextDecoder();
      const reader = stream.getReader();
      while (!isDone) {
        const { done, value } = await reader.read();
        const decoded = textDecoder.decode(value, { stream: true });
        if (decoded.length + result.length > MaxStringLength) {
          throw new Error(`The response length exceeds the maximum allowed size of V8 String: ${MaxStringLength}; consider limiting the amount of requested rows.`);
        }
        result += decoded;
        isDone = done;
      }
      result += textDecoder.decode();
      return result;
    }
    __name(getAsText, "getAsText");
  }
});

// node_modules/@clickhouse/client-web/dist/utils/encoder.js
var require_encoder = __commonJS({
  "node_modules/@clickhouse/client-web/dist/utils/encoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebValuesEncoder = void 0;
    var client_common_1 = require_dist();
    var stream_1 = require_stream();
    var WebValuesEncoder = class {
      static {
        __name(this, "WebValuesEncoder");
      }
      encodeValues(values, format) {
        throwIfStream(values);
        if (Array.isArray(values)) {
          return values.map((value) => (0, client_common_1.encodeJSON)(value, format)).join("");
        }
        if (typeof values === "object") {
          return (0, client_common_1.encodeJSON)(values, format);
        }
        throw new Error(`Cannot encode values of type ${typeof values} with ${format} format`);
      }
      validateInsertValues(values) {
        throwIfStream(values);
        if (!Array.isArray(values) && typeof values !== "object") {
          throw new Error(`Insert expected "values" to be an array or a JSON object, got: ${typeof values}`);
        }
      }
    };
    exports.WebValuesEncoder = WebValuesEncoder;
    function throwIfStream(values) {
      if ((0, stream_1.isStream)(values)) {
        throw new Error("Streaming is not supported for inserts in the web version of the client");
      }
    }
    __name(throwIfStream, "throwIfStream");
  }
});

// node_modules/@clickhouse/client-web/dist/utils/index.js
var require_utils2 = __commonJS({
  "node_modules/@clickhouse/client-web/dist/utils/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_stream(), exports);
    __exportStar(require_encoder(), exports);
  }
});

// node_modules/@clickhouse/client-web/dist/connection/web_connection.js
var require_web_connection = __commonJS({
  "node_modules/@clickhouse/client-web/dist/connection/web_connection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebConnection = void 0;
    var client_common_1 = require_dist();
    var utils_1 = require_utils2();
    var WebConnection = class {
      static {
        __name(this, "WebConnection");
      }
      constructor(params) {
        Object.defineProperty(this, "params", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: params
        });
        Object.defineProperty(this, "defaultAuthHeader", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        if (params.auth.type === "JWT") {
          this.defaultAuthHeader = `Bearer ${params.auth.access_token}`;
        } else if (params.auth.type === "Credentials") {
          this.defaultAuthHeader = `Basic ${btoa(`${params.auth.username}:${params.auth.password}`)}`;
        } else {
          throw new Error(`Unknown auth type: ${params.auth.type}`);
        }
      }
      async query(params) {
        const query_id = getQueryId(params.query_id);
        const clickhouse_settings = (0, client_common_1.withHttpSettings)(params.clickhouse_settings, this.params.compression.decompress_response);
        const searchParams = (0, client_common_1.toSearchParams)({
          database: this.params.database,
          clickhouse_settings,
          query_params: params.query_params,
          session_id: params.session_id,
          role: params.role,
          query_id
        });
        const response = await this.request({
          body: params.query,
          params,
          searchParams
        });
        return {
          query_id,
          stream: response.body || new ReadableStream(),
          response_headers: getResponseHeaders(response)
        };
      }
      async exec(params) {
        const result = await this.runExec(params);
        return {
          query_id: result.query_id,
          stream: result.stream || new ReadableStream(),
          response_headers: result.response_headers
        };
      }
      async command(params) {
        const { stream, query_id, response_headers } = await this.runExec(params);
        if (stream !== null) {
          await stream.cancel();
        }
        return { query_id, response_headers };
      }
      async insert(params) {
        const query_id = getQueryId(params.query_id);
        const searchParams = (0, client_common_1.toSearchParams)({
          database: this.params.database,
          clickhouse_settings: params.clickhouse_settings,
          query_params: params.query_params,
          query: params.query,
          session_id: params.session_id,
          role: params.role,
          query_id
        });
        const response = await this.request({
          body: params.values,
          params,
          searchParams
        });
        if (response.body !== null) {
          await response.text();
        }
        return {
          query_id,
          response_headers: getResponseHeaders(response)
        };
      }
      async ping() {
        try {
          const response = await this.request({
            body: null,
            searchParams: (0, client_common_1.toSearchParams)({
              database: void 0,
              query: `SELECT 'ping'`,
              query_id: getQueryId(void 0)
            }),
            method: "GET"
          });
          if (response.body !== null) {
            await response.body.cancel();
          }
          return { success: true };
        } catch (error) {
          if (error instanceof Error) {
            return {
              success: false,
              error
            };
          }
          throw error;
        }
      }
      async close() {
        return;
      }
      async request({ body, params, searchParams, pathname, method }) {
        const url = (0, client_common_1.transformUrl)({
          url: this.params.url,
          pathname,
          searchParams
        }).toString();
        const abortController = new AbortController();
        let isTimedOut = false;
        const timeout = setTimeout(() => {
          isTimedOut = true;
          abortController.abort();
        }, this.params.request_timeout);
        let isAborted = false;
        if (params?.abort_signal !== void 0) {
          params.abort_signal.onabort = () => {
            isAborted = true;
            abortController.abort();
          };
        }
        try {
          const headers = (0, client_common_1.withCompressionHeaders)({
            headers: this.defaultHeadersWithOverride(params),
            // It is not currently working as expected in all major browsers
            enable_request_compression: false,
            enable_response_compression: this.params.compression.decompress_response
          });
          const fetchFn = this.params.fetch ?? fetch;
          const response = await fetchFn(url, {
            body,
            headers,
            keepalive: this.params.keep_alive.enabled,
            method: method ?? "POST",
            signal: abortController.signal
          });
          clearTimeout(timeout);
          if ((0, client_common_1.isSuccessfulResponse)(response.status)) {
            return response;
          } else {
            return Promise.reject((0, client_common_1.parseError)(await (0, utils_1.getAsText)(response.body || new ReadableStream())));
          }
        } catch (err) {
          clearTimeout(timeout);
          if (isAborted) {
            return Promise.reject(new Error("The user aborted a request."));
          }
          if (isTimedOut) {
            return Promise.reject(new Error("Timeout error."));
          }
          if (err instanceof Error) {
            return Promise.reject((0, client_common_1.parseError)(err));
          }
          throw err;
        }
      }
      async runExec(params) {
        const query_id = getQueryId(params.query_id);
        const searchParams = (0, client_common_1.toSearchParams)({
          database: this.params.database,
          clickhouse_settings: params.clickhouse_settings,
          query_params: params.query_params,
          session_id: params.session_id,
          role: params.role,
          query_id
        });
        const response = await this.request({
          body: params.query,
          params,
          searchParams
        });
        return {
          stream: response.body,
          response_headers: getResponseHeaders(response),
          query_id
        };
      }
      defaultHeadersWithOverride(params) {
        let authHeader;
        if ((0, client_common_1.isJWTAuth)(params?.auth)) {
          authHeader = `Bearer ${params?.auth.access_token}`;
        } else if ((0, client_common_1.isCredentialsAuth)(params?.auth)) {
          authHeader = `Basic ${btoa(`${params?.auth.username}:${params?.auth.password}`)}`;
        } else {
          authHeader = this.defaultAuthHeader;
        }
        return {
          // Custom HTTP headers from the client configuration
          ...this.params.http_headers ?? {},
          // Custom HTTP headers for this particular request; it will override the client configuration with the same keys
          ...params?.http_headers ?? {},
          Authorization: authHeader
        };
      }
    };
    exports.WebConnection = WebConnection;
    function getQueryId(query_id) {
      return query_id || crypto.randomUUID();
    }
    __name(getQueryId, "getQueryId");
    function getResponseHeaders(response) {
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return headers;
    }
    __name(getResponseHeaders, "getResponseHeaders");
  }
});

// node_modules/@clickhouse/client-web/dist/connection/index.js
var require_connection2 = __commonJS({
  "node_modules/@clickhouse/client-web/dist/connection/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_web_connection(), exports);
  }
});

// node_modules/@clickhouse/client-web/dist/result_set.js
var require_result_set = __commonJS({
  "node_modules/@clickhouse/client-web/dist/result_set.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResultSet = void 0;
    var client_common_1 = require_dist();
    var utils_1 = require_utils2();
    var NEWLINE = 10;
    var ResultSet = class {
      static {
        __name(this, "ResultSet");
      }
      constructor(_stream, format, query_id, _response_headers) {
        Object.defineProperty(this, "_stream", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: _stream
        });
        Object.defineProperty(this, "format", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: format
        });
        Object.defineProperty(this, "query_id", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: query_id
        });
        Object.defineProperty(this, "response_headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "isAlreadyConsumed", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: false
        });
        this.response_headers = _response_headers !== void 0 ? Object.freeze(_response_headers) : {};
      }
      /** See {@link BaseResultSet.text} */
      async text() {
        this.markAsConsumed();
        return (0, utils_1.getAsText)(this._stream);
      }
      /** See {@link BaseResultSet.json} */
      async json() {
        if ((0, client_common_1.isStreamableJSONFamily)(this.format)) {
          const result = [];
          const reader = this.stream().getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            for (const row of value) {
              result.push(row.json());
            }
          }
          return result;
        }
        if ((0, client_common_1.isNotStreamableJSONFamily)(this.format)) {
          const text = await (0, utils_1.getAsText)(this._stream);
          return JSON.parse(text);
        }
        throw new Error(`Cannot decode ${this.format} as JSON`);
      }
      /** See {@link BaseResultSet.stream} */
      stream() {
        this.markAsConsumed();
        (0, client_common_1.validateStreamFormat)(this.format);
        let incompleteChunks = [];
        let totalIncompleteLength = 0;
        const decoder = new TextDecoder("utf-8");
        const transform = new TransformStream({
          start() {
          },
          transform: /* @__PURE__ */ __name((chunk, controller) => {
            if (chunk === null) {
              controller.terminate();
            }
            const rows = [];
            let idx;
            let lastIdx = 0;
            do {
              idx = chunk.indexOf(NEWLINE, lastIdx);
              if (idx === -1) {
                const incompleteChunk = chunk.slice(lastIdx);
                incompleteChunks.push(incompleteChunk);
                totalIncompleteLength += incompleteChunk.length;
                if (rows.length > 0) {
                  controller.enqueue(rows);
                }
              } else {
                let text;
                if (incompleteChunks.length > 0) {
                  const completeRowBytes = new Uint8Array(totalIncompleteLength + idx);
                  let offset = 0;
                  incompleteChunks.forEach((incompleteChunk) => {
                    completeRowBytes.set(incompleteChunk, offset);
                    offset += incompleteChunk.length;
                  });
                  const finalChunk = chunk.slice(0, idx);
                  completeRowBytes.set(finalChunk, offset);
                  incompleteChunks = [];
                  totalIncompleteLength = 0;
                  text = decoder.decode(completeRowBytes);
                } else {
                  text = decoder.decode(chunk.slice(lastIdx, idx));
                }
                rows.push({
                  text,
                  json() {
                    return JSON.parse(text);
                  }
                });
                lastIdx = idx + 1;
              }
            } while (idx !== -1);
          }, "transform")
        });
        const pipeline = this._stream.pipeThrough(transform, {
          preventClose: false,
          preventAbort: false,
          preventCancel: false
        });
        return pipeline;
      }
      async close() {
        this.markAsConsumed();
        await this._stream.cancel();
      }
      markAsConsumed() {
        if (this.isAlreadyConsumed) {
          throw new Error(streamAlreadyConsumedMessage);
        }
        this.isAlreadyConsumed = true;
      }
    };
    exports.ResultSet = ResultSet;
    var streamAlreadyConsumedMessage = "Stream has been already consumed";
  }
});

// node_modules/@clickhouse/client-web/dist/config.js
var require_config2 = __commonJS({
  "node_modules/@clickhouse/client-web/dist/config.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebImpl = void 0;
    var connection_1 = require_connection2();
    var result_set_1 = require_result_set();
    var utils_1 = require_utils2();
    exports.WebImpl = {
      make_connection: /* @__PURE__ */ __name((config, params) => new connection_1.WebConnection({
        ...params,
        fetch: config.fetch
      }), "make_connection"),
      make_result_set: /* @__PURE__ */ __name(((stream, format, query_id, _log_error, response_headers) => new result_set_1.ResultSet(stream, format, query_id, response_headers)), "make_result_set"),
      values_encoder: new utils_1.WebValuesEncoder()
    };
  }
});

// node_modules/@clickhouse/client-web/dist/client.js
var require_client2 = __commonJS({
  "node_modules/@clickhouse/client-web/dist/client.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createClient = createClient2;
    var client_common_1 = require_dist();
    var config_1 = require_config2();
    var WebClickHouseClientImpl = class extends client_common_1.ClickHouseClient {
      static {
        __name(this, "WebClickHouseClientImpl");
      }
      /** See {@link ClickHouseClient.query}. */
      query(params) {
        return super.query(params);
      }
    };
    function createClient2(config) {
      return new WebClickHouseClientImpl({
        impl: config_1.WebImpl,
        ...config || {}
      });
    }
    __name(createClient2, "createClient");
  }
});

// node_modules/@clickhouse/client-web/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@clickhouse/client-web/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TupleParam = exports.isException = exports.isRow = exports.isProgressRow = exports.SimpleColumnTypes = exports.parseColumnType = exports.SettingsMap = exports.ClickHouseLogLevel = exports.parseError = exports.ClickHouseError = exports.ResultSet = exports.createClient = void 0;
    var client_1 = require_client2();
    Object.defineProperty(exports, "createClient", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_1.createClient;
    }, "get") });
    var result_set_1 = require_result_set();
    Object.defineProperty(exports, "ResultSet", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return result_set_1.ResultSet;
    }, "get") });
    var client_common_1 = require_dist();
    Object.defineProperty(exports, "ClickHouseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.ClickHouseError;
    }, "get") });
    Object.defineProperty(exports, "parseError", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.parseError;
    }, "get") });
    Object.defineProperty(exports, "ClickHouseLogLevel", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.ClickHouseLogLevel;
    }, "get") });
    Object.defineProperty(exports, "SettingsMap", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.SettingsMap;
    }, "get") });
    Object.defineProperty(exports, "parseColumnType", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.parseColumnType;
    }, "get") });
    Object.defineProperty(exports, "SimpleColumnTypes", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.SimpleColumnTypes;
    }, "get") });
    Object.defineProperty(exports, "isProgressRow", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.isProgressRow;
    }, "get") });
    Object.defineProperty(exports, "isRow", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.isRow;
    }, "get") });
    Object.defineProperty(exports, "isException", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.isException;
    }, "get") });
    Object.defineProperty(exports, "TupleParam", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return client_common_1.TupleParam;
    }, "get") });
  }
});

// deployments/telemetry.ts
var import_client_web = __toESM(require_dist2(), 1);
var telemetry_default = {
  async fetch(req, env) {
    const clickhouseClient = (0, import_client_web.createClient)({
      url: env.CLICKHOUSE_URL,
      password: env.CLICKHOUSE_PASSWORD
    });
    const body = await req.json();
    console.log(body);
    body.timestamp = Date.now();
    const table = `${body.event.split(".")[0]}_telemetry`;
    await clickhouseClient.insert({
      table,
      values: [body],
      format: "JSONEachRow"
    });
    return new Response();
  }
};
export {
  telemetry_default as default
};
//# sourceMappingURL=telemetry.js.map
