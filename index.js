const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const sha = require('sha');

function PackageJSONChanged() {
  this.packageJson = loadJsonFile.sync('./package.json');
  this.packageLockJsonHash = sha.getSync('./package-lock.json');

  this.update = function() {
    this.packageJson['tracks'] = {
      'package-json': this.packageLockJsonHash
    };

    writeJsonFile('./package.json', this.packageJson);
  };

  this.check = function() {
    if (this.packageJson.tracks && this.packageJson.tracks['package-json']) {
      return this.packageLockJsonHash === this.packageJson.tracks['package-json'];
    }

    return false;
  };
}

module.exports = new PackageJSONChanged();
