import chalk from 'chalk';

export default class Logging {
  public static log = (args: any) => this.info(args);

  public static info = (args: any) => {
    console.log(chalk.green(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk.bgGreenBright(args) : args);
  }

  public static warm = (args: any) => {
    console.log(chalk.yellow(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk.bgYellowBright(args) : args);
  }

  public static error = (args: any) => {
    console.log(chalk.red(`[${new Date().toLocaleString()}][info]`), typeof args === 'string' ? chalk.bgRedBright(args) : args);
  }
};