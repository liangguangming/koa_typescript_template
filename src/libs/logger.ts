import debug from 'debug';

export default class Logger {
  private infoDebugger: debug.Debugger;

  private debugDebugger: debug.Debugger;

  private warnDebugger: debug.Debugger;

  private errorDebugger: debug.Debugger;

  constructor(namespace: string) {
    const projectName = process.env.PROJECT_NAME || '';
    this.infoDebugger = debug(`${projectName}:${namespace}:info`);
    this.debugDebugger = debug(`${projectName}:${namespace}:debug`);
    this.warnDebugger = debug(`${projectName}:${namespace}:warn`);
    this.errorDebugger = debug(`${projectName}:${namespace}:error`);
  }

  public info(formatter: any, ...data: any[]) {
    this.infoDebugger(formatter, ...data);
  }

  public debug(formatter: any, ...data: any[]) {
    this.debugDebugger(formatter, ...data);
  }

  public warn(formatter: any, ...data: any[]) {
    this.warnDebugger(formatter, ...data);
  }

  public error(formatter: any, ...data: any[]) {
    this.errorDebugger(formatter, ...data);
  }
}
