module.exports = {
  name: 'seed',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/seed',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
