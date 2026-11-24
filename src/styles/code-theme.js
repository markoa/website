/** One code theme for light and dark pages. The block is the display. */
export const codeTheme = {
  name: "te-glass",
  type: "dark",
  colors: {
    "editor.background": "#0E0E0E",
    "editor.foreground": "#F2F2F2",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#ABABAB",
        fontStyle: "",
      },
    },
    {
      // Quoted and template literals only. Shell grammars mark bare
      // arguments as string.unquoted, and those stay the default ink.
      scope: ["string.quoted", "string.template"],
      settings: {
        foreground: "#5BB1F2",
      },
    },
    {
      scope: ["keyword", "storage"],
      settings: {
        foreground: "#FF4F00",
      },
    },
    {
      // Deeper than a surrounding string, so interpolation and operators
      // stay the default ink instead of inheriting the string colour.
      scope: ["keyword.operator", "punctuation", "meta.embedded"],
      settings: {
        foreground: "#F2F2F2",
      },
    },
  ],
};
