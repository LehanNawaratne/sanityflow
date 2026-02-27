import NodeCache from 'node-cache';

// stdTTL: 86400s = 24 hours
// checkperiod: 3600s = sweep for expired keys every hour
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

export default cache;
