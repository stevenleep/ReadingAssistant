const classAppliersKeyMaps = new Map<string, string>();

// @ts-ignore
export function register(rangy: RangyStatic, highlighter, classAppliers): void {
  const presetClassApplierKeys = Object.keys(classAppliers);

  for (let i = 0; i < presetClassApplierKeys.length; i++) {
    const target = Reflect.get(classAppliers, presetClassApplierKeys[i]);

    if(!target.name || !target.options) {

      throw new Error("name and options are required");

    }

    const classApplierName = composeHighlighterName(target.name);

    if(classAppliersKeyMaps.has(classApplierName)) {

        throw new Error("name is duplicated");

    }

    classAppliersKeyMaps.set(classApplierName, classApplierName);

    // @ts-ignore
    const classApplier = rangy.createClassApplier(classApplierName, target.options || {});
    highlighter.addClassApplier(classApplier);
  }
}

export function generateClassAppliers(name: string, backgroundColor: string) {
  return {
    name: composeHighlighterName(name),
    options: {
      ignoreWhiteSpace: true,
      tagNames: ["mark"],
      elementTagName: "mark",
      elementProperties: {
        style: {
          backgroundColor: backgroundColor || "red",
        }
      }
    }
  }
}

export function composeHighlighterName(name: string): string {
  if(!name) throw new Error("name is required");
  return `$bookmark__highlighter__${name}`;
}
