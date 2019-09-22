import Vue from 'vue';
import _ from '../common/helpers';

class AsyncExtension {
    /**
     * @typedef {object} defaultAsyncConfig
     * @type {{
     *  limit: number,
     *  minValueLength: number,
     *  cacheExpirationTime: number,
     *  debounceDelay: number
     * }}
     */

    static defaultConfig = {
        limit: 10, // query values limit
        // minValueLength - value length to handle asyncFind method
        // default value 0 - will loaded default values list on created
        minValueLength: 0,
        cacheExpirationTime: 5000, // 5 sec ms or false
        debounceDelay: 500, // user input debounce delay
    };

    static findMethodTypes = {
        bySearchInput: 'bySearchInput',
        byValue: 'byValue',
    };

    constructor({
                    component,
                    config,
                    asyncGetInitValue,
                    asyncFind,
                    prepareCacheValuePrefix,
                }) {
        this.component = component;
        this.config = AsyncExtension.prepareConfig(config);

        // prepare input value to get the uniq primitive value for cache key prefix
        this.prepareCacheValuePrefix = prepareCacheValuePrefix;

        // methods map to getting the options list
        this.methodsmap = {
            [AsyncExtension.findMethodTypes.byValue]: asyncGetInitValue,
            [AsyncExtension.findMethodTypes.bySearchInput]: asyncFind,
        };

        // request results cache
        this.cache = {
            lastRequestId: 0,
            itemsByKey: {},
            lastKey: null, // last request cache key
        };

        // request query params
        this.query = {
            offset: 0,
            limit: this.getConfig().limit,
        };

        // async loading state
        this.isLoading = false;

        // debounced public find methods
        const {
            findByValue, findBySearch, loadMore, loadByQuery,
        } = this;


        // wrapper for public methods
        const debounceWrapper = (func, delay, ctx) => {
            const method = _.debounce(func, delay);
            return async function wrapper(...args) {
                return method.apply(ctx, args);
            };
        };

        // rewrite class instance method to debounced methods
        this.findByValue = debounceWrapper(findByValue, this.getConfig().debounceDelay, this);
        this.findBySearch = debounceWrapper(findBySearch, this.getConfig().debounceDelay, this);
        this.loadMore = debounceWrapper(loadMore, this.getConfig().debounceDelay, this);
        this.loadByQuery = debounceWrapper(loadByQuery, this.getConfig().debounceDelay, this);
    }

    static prepareConfig(config) {
        return {
            ...AsyncExtension.defaultConfig,
            ...config,
            limit: config.limit === undefined ? AsyncExtension.defaultConfig.limit : config.limit,
        };
    }

    static makeCacheKey({
                            type,
                            value,
                            limit,
                            offset,
                        }) {
        return [
            value,
            limit,
            offset,
        ].reduce((m, v) => `${m}-${v}`, type);
    }

    /**
     *
     * @param {object} data - cache item
     * @param {number} expiration - actual params
     * @return {boolean} - try if cache item is valid
     */
    static validateCacheData(data, {expiration}) {
        if (!data) {
            // cache not found
            return false;
        }
        if (!data.options) {
            // cache is empty
            return false;
        }
        if (Date.now() - expiration > data.created) {
            // expired
            return false;
        }
        if (Array.isArray(data.options) && !data.options.length) {
            // cache is array and array is empty
            return false;
        }
        if (_.isObject(data.options)
            && Object.keys(data.options).length === 0) {
            // cache options is empty object
            return false;
        }
        return true;
    }

    /**
     * @public
     * @return {Readonly<{}>}
     */
    getConfig() {
        return Object.freeze({...this.config});
    }

    /**
     * @public
     * @return {*}
     */
    getLastCachedFindResult() {
        if (this.cache.lastKey === null) {
            return undefined;
        }
        return this.getFromCache(this.cache.lastKey);
    }

    /**
     * @public
     * @return {undefined}
     */
    getLastCachedSearchFindResult() {
        const result = this.getLastCachedFindResult();
        return result && result.isSearch
            ? result
            : undefined;
    }

    /**
     * Returns actual query offset value.
     * @public
     * @return {number}
     */
    getOffset() {
        return this.query.offset;
    }

    /**
     * Manual sets offset value.
     * @public
     * @param {number} offset
     * @return {undefined}
     */
    setOffset(offset) {
        this.query.offset = offset;
    }

    /**
     * Returns actual query limit value.
     * @public
     * @return {number}
     */
    getLimit() {
        return this.query.limit;
    }

    /**
     * Returns true if last request has any options.
     * @public
     * @return {boolean}
     */
    hasOptions() {
        const cache = this.getLastCachedFindResult();
        if (!cache || !cache.options) {
            return false;
        }
        if (Array.isArray(cache.options) && cache.options.length) {
            return true;
        }
        if (_.isObject(cache.options) && Object.keys(cache.options).length) {
            return true;
        }
        return false;
    }

    /**
     * @private
     *
     * @param {string} type
     * @param {string|number} value
     * @param {object} [params = {}]
     */
    async find(type, value, params = {}) {
        // api props find method
        const method = this.methodsmap[type];
        const requestId = this.cache.lastRequestId + 1;

        // set active request id
        Vue.set(this.component.async.cache, 'lastRequestId', requestId);

        const {minValueLength, limit: defaultLimit, cacheExpirationTime} = this.getConfig();
        const isSearchMethod = type === AsyncExtension.findMethodTypes.bySearchInput;

        const shouldUpdateQuery = isSearchMethod;

        // offset shouldn't to be less that 0
        const prepareOffset = valOffset => (valOffset < 0 ? 0 : valOffset);

        // limit shouldn't to be less than config limit
        const prepareLimit = valLimit => (valLimit < defaultLimit ? defaultLimit : valLimit);


        const query = _.deepClone({
            ...this.query,
            offset: prepareOffset(params.offset === undefined ? this.query.offset : params.offset),
            limit: prepareLimit(params.limit === undefined ? this.query.limit : params.limit),
        });

        // cache item key. Includes offset, limit, type and value
        const cacheKey = AsyncExtension.makeCacheKey({
            type,
            value: this.prepareCacheValuePrefix(value),
            offset: query.offset,
            limit: query.limit,
        });

        // set state isLoading
        Vue.set(this.component.async, 'isLoading', true);

        const saveProperties = () => {
            if (this.cache.lastRequestId !== requestId || !isSearchMethod) {
                return;
            }
            Vue.set(this.component.async.cache, 'lastKey', cacheKey);
            if (shouldUpdateQuery) {
                // update query offset value
                Vue.set(this.component.async.query, 'offset', query.offset);
                Vue.set(this.component.async.query, 'limit', query.limit);
            }
        };

        try {
            // only on search mode if input value length less than minValueLength do nothing
            if (isSearchMethod && minValueLength && cacheKey.length < minValueLength) {
                // emit ready and update params
                saveProperties();
                this.handleLoaded();
                return undefined;
            }

            /**
             * in that case we should to call a find method
             * but, before that, we should to try to get the values from the cache
             */

            const cache = this.getFromCache(cacheKey);
            const isCacheActual = AsyncExtension.validateCacheData(cache, {
                expiration: cacheExpirationTime,
            });

            if (cacheExpirationTime && isCacheActual) {
                // don't need to call asyncFind method
                // emit ready and update params
                saveProperties();
                this.handleLoaded();
                return undefined;
            }

            // load new options
            const optionsResultList = await method(value, query);

            // delete old cache
            Vue.delete(this.component.async.cache.itemsByKey, cacheKey);
            saveProperties();

            // save results
            this.saveToCache({
                key: cacheKey,
                type,
                options: optionsResultList,
                value,
                query: _.deepClone(query),
            });

            // emit ready and update params
            this.handleLoaded();
        } catch (error) {
            this.component.$toast.fromError(error, 'Something went wrong, please contact support');
        } finally {
            Vue.set(this.component.async, 'isLoading', false);
        }

        return undefined;
    }

    /**
     * @public
     * @param value
     * @return {Promise<*>}
     */
    findByValue(value) {
        return this.find(AsyncExtension.findMethodTypes.byValue, value);
    }

    /**
     * @public
     * @param search
     * @return {Promise<*>}
     */
    findBySearch(search) {
        return this.find(AsyncExtension.findMethodTypes.bySearchInput, search);
    }

    /**
     * @public
     * @return {Promise<*>}
     */
    findNext() {
        const prev = this.getLastCachedSearchFindResult();
        const {limit} = this.getConfig();

        return this.find(
            AsyncExtension.findMethodTypes.bySearchInput,
            prev ? prev.value : '',
            {offset: this.query.offset + limit, limit},
        );
    }

    /**
     * @public
     * @return {Promise<*>}
     */
    findPrev() {
        const prev = this.getLastCachedSearchFindResult();
        const {limit} = this.getConfig();
        return this.find(
            AsyncExtension.findMethodTypes.bySearchInput,
            prev ? prev.value : '',
            {offset: this.query.offset - limit, limit},
        );
    }

    /**
     * @pubic
     * @param count
     * @return {Promise<*>}
     */
    loadMore(count) {
        const prev = this.getLastCachedSearchFindResult();
        return this.find(
            AsyncExtension.findMethodTypes.bySearchInput,
            prev ? prev.value : '',
            {limit: this.query.limit + count},
        );
    }

    /**
     * @public
     * @param limit
     * @param offset
     */
    loadByQuery({limit, offset}) {
        const prev = this.getLastCachedSearchFindResult();
        return this.find(
            AsyncExtension.findMethodTypes.bySearchInput,
            prev ? prev.value : '',
            {limit, offset},
        );
    }

    /**
     * @private
     * @param key
     * @return {*}
     */
    getFromCache(key) {
        return this.cache.itemsByKey[key];
    }

    /**
     * @public
     * @return {any[]}
     */
    getAllCacheItems() {
        return Object.values(this.cache.itemsByKey);
    }

    /**
     * @private
     * @param key
     * @param type
     * @param options
     * @param value
     * @param query
     */
    saveToCache({
                    key,
                    type,
                    options,
                    value,
                    query,
                }) {
        Vue.set(this.cache.itemsByKey, key, {
            created: Date.now(),
            key,
            type,
            options,
            value,
            query,
            isSearch: type === AsyncExtension.findMethodTypes.bySearchInput,
            isValue: type === AsyncExtension.findMethodTypes.byValue,
        });
    }

    /**
     * @private
     */
    handleLoaded() {
        Vue.set(this.component.async, 'isLoading', false);
        this.component.$emit('async-loaded');
    }
}

export default class AsyncInputMixin {
    constructor({asyncValuePropsKey, limit} = {}) {
        this.asyncValuePropsKey = asyncValuePropsKey || 'value';
        this.asyncCustomDefaultLimit = limit;
    }

    getMixin() {
        return (function getMixin(options) {
            return {
                props: {
                    // function is using to getting the values by id (initial values labels)
                    asyncGetInitValue: Function,
                    // function is using to getting the values by search input value
                    asyncFind: Function,
                    // async configuration object see {defaultAsyncConfig}
                    asyncConfig: {
                        type: Object,
                        default: () => ({}),
                    },
                },
                data() {
                    return {
                        async: new AsyncExtension({
                            component: this,
                            config: {
                                ...this.asyncConfig,
                                limit: this.asyncConfig.limit || options.asyncCustomDefaultLimit,
                            },
                            asyncGetInitValue: this.asyncGetInitValue,
                            asyncFind: this.asyncFind,
                            prepareCacheValuePrefix: this.prepareCacheValuePrefix,
                        }),
                    };
                },
                created() {
                    if (this.computedIsAsync) {
                        /**
                         * load initial data
                         * 1. load labels for initial value (for example ids)
                         * 2. load init values list for selection
                         */
                        if (this.computedValueProps) {
                            if (!this.asyncGetInitValue) {
                                throw new Error(`Please pass asyncGetInitValue method to load init values data ${this.computedValueProps}`);
                            }
                            // 1. load labels for init values preview
                            // 2. then load init values list for selection
                            this.async.findByValue(this.computedValueProps)
                                .then(this.async.findBySearch(''));
                        } else {
                            // only load init values list for selection
                            this.async.findBySearch('');
                        }
                    }
                },
                computed: {
                    computedIsAsync() {
                        return !!this.asyncFind;
                    },
                    // returns props is loading or local async is loading
                    computedIsLoading() {
                        return this.loading || this.async.isLoading;
                    },
                    computedValueProps() {
                        return this[options.asyncValuePropsKey];
                    },
                    // returns last async cache item options list or object
                    computedAsyncLastOptions() {
                        const cache = this.async.getLastCachedFindResult();
                        if (!cache || !cache.options) {
                            return undefined;
                        }
                        return cache.options;
                    },
                    computedAsyncHasOptions() {
                        return this.async.hasOptions();
                    },
                    computedAsyncHasPrevOptions() {
                        return this.async.getOffset() > 0;
                    },
                    computedAsyncHasNextOptions() {
                        if (!this.computedAsyncHasOptions) {
                            return false;
                        }

                        const {limit} = this.async.getConfig();

                        const hasNextOptions = (cachedOptions) => {
                            if (!cachedOptions) {
                                return false;
                            }
                            if (Array.isArray(cachedOptions)) {
                                return cachedOptions.length >= limit;
                            }
                            if (_.isObject(cachedOptions)) {
                                return Object.keys(cachedOptions).length >= limit;
                            }
                            return false;
                        };
                        return hasNextOptions(this.computedAsyncLastOptions);
                    },
                },
                methods: {
                    // returns primitive uniq cache value prefix per value
                    prepareCacheValuePrefix(value) {
                        return String(value).trim();
                    },
                    async handleAsyncFind(search, params = {}) {
                        if (this.computedIsAsync) {
                            if (typeof params.offset === 'number') {
                                this.async.setOffset(params.offset);
                            }
                            return this.async.findBySearch(search);
                        }
                        return undefined;
                    },
                    async handleAsyncLoadNext() {
                        if (this.computedIsAsync) {
                            return this.async.findNext();
                        }
                        return undefined;
                    },
                    async handleAsyncLoadPrev() {
                        if (this.computedIsAsync) {
                            return this.async.findPrev();
                        }
                        return undefined;
                    },
                    async handleAsyncLoadMore(count) {
                        if (this.computedIsAsync) {
                            return this.async.loadMore(count);
                        }
                        return undefined;
                    },
                    async handleAsyncLoadByQuery({limit, offset}) {
                        if (this.computedIsAsync) {
                            return this.async.loadByQuery({limit, offset});
                        }
                        return undefined;
                    },
                },
            };
        }(this));
    }
}
