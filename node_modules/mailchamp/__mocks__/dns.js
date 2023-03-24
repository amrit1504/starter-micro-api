const dns = jest.genMockFromModule('dns');

dns.resolveMx = (hostname, callback) => {
  if (hostname.endsWith('gmail.com')) {
    callback(null, [{ priority: 10, exchange: 'mx.gmail.com '}]);
  } else {
    const error = new Error(`queryMx ENODATA ${hostname}`);
    error.code = 'ENODATA';
    error.errno = 'ENODATA';
    error.syscall = 'queryMx';
    error.hostname = hostname;

    callback(error);
  }
};

module.exports = dns;
