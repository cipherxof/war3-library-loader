/** @noSelfInFile */

interface ILibrary { name: string, init(): void }

export class LibraryLoader {

  private static libraries: ILibrary[] = [];

  public static logFunction: (this: void, libraryName: string, success: boolean, message: string) => any;

  private constructor() { }

  /**
  * Registers a library to be initialized.
  * @param library - The class with a static init method.
  */
  static register(library: ILibrary) {
    this.libraries.push(library);
  }

  /**
  * Run all libraries init methods.
  */
  static runInitializers() {
    for (let index = 0; index < this.libraries.length; index++) {
      const lib = this.libraries[index];

      try {
        lib.init();
        if (this.logFunction !== undefined) {
          this.logFunction(lib.name, true, '');
        }
      } catch (err) {
        if (this.logFunction !== undefined) {
          this.logFunction(lib.name, false, err);
        }
      }
    }
  }
}