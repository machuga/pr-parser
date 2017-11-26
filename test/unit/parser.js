const { expect } = require("chai");
const { parseBody } = require('../../src/index');
const prSample = require('../fixtures/pr-with-release-notes.json');

describe("Parsing markdown blocks", function() {
  beforeEach(function() {
    this.blocks = parseBody(prSample.issue.body, "Release Notes");
  });

  it("parses defined block title", function() {
    const releaseNotes = this.blocks[0];

    expect(releaseNotes.title).to.equal("Release Notes");
  });

  it("extracts defined block body", function() {
    const releaseNotes = this.blocks[0];

    expect(releaseNotes.body).to.match(/This is the section/);
  });

  it("captures newlines", function() {
    const releaseNotes = this.blocks[0];

    expect(releaseNotes.body).to.match(/I would like/);
  });

  it("captures related headings", function() {
    const releaseNotes = this.blocks[0];

    expect(releaseNotes.body).to.match(/\#\#\# Related Headings/);
  });

  it("captures up until the next block", function() {
    const releaseNotes = this.blocks[0];

    expect(releaseNotes.title).to.not.match(/\#\# Different Section/);
  });
});
