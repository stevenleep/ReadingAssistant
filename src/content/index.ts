import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";

rangy.init();
const highlighter = rangy.createHighlighter();

const className = "highlightx";

const classApplier = rangy.createClassApplier(className, {
    ignoreWhiteSpace: true,
    tagNames: ["mark"],
    elementTagName: "mark",
    elementProperties: {
        style: {
            backgroundColor: "red",
        },
    },
});

highlighter.addClassApplier(classApplier);
//
// window.addEventListener("mouseup", mark);
//
// function mark() {
//     console.log("mouseup");
//     const selection = rangy.getSelection();
//     console.log("selection", selection);
//     highlighter.highlightSelection(className);
// }

export {}
