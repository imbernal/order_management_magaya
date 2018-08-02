
/**
 * Principal routes field
 */

module.exports = app => {
  require('./orders')(app);
  require('./products')(app);
  require('./customers')(app);
}