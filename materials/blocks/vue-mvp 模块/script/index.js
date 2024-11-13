module.exports = {
  beforeCompile: (context) => {},
  afterCompile: (context) => {
    context.outputChannel.appendLine(JSON.stringify(context.model));
  },
};
